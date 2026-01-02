import { LocalizedError } from "errors";
import { createExecuteButton } from "./functions";

Hooks.on("renderCompendium", (compendium: foundry.applications.sidebar.apps.Compendium, html: HTMLElement) => {
  const listItems = Array.from<HTMLElement>(html.querySelectorAll(`li.entry.macro`));
  listItems.forEach(li => {
    const entryId = li.dataset.entryId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const packId = (compendium as any).collection?.metadata?.id;

    if (typeof entryId === "string" && typeof packId === "string") {
      li.dataset.packId = packId;
      if (!(game.settings?.settings.get(`${__MODULE_ID__}.addToListItem`) && game?.settings?.get(__MODULE_ID__, "addToListItem"))) return;
      const link = createExecuteButton(entryId);
      link.dataset.packId = packId;
      

      link.addEventListener("click", () => { void execMacro(entryId, packId)})
      li.appendChild(link);
    }
  });
});

export async function execMacro(id: string, packId: string) {
  try {
    const pack = game?.packs?.get(packId);
    if (!pack) throw new LocalizedError("PACKNOTFOUND", { id: packId });
    const item = pack.index.find(item => item._id === id);
    if (!item?.uuid) throw new LocalizedError("MACRONOTFOUND", { id });
    const macro = await fromUuid(item.uuid as any);
    if (!(macro instanceof Macro)) throw new LocalizedError("MACRONOTFOUND", { id });
    if (!macro.canExecute) throw new LocalizedError("PERMISSIONDENIED");
    return macro.execute();
  } catch (err) {
    console.error(err);
    if (err instanceof Error) ui.notifications?.error(err.message, { console: false, localize: true });
  }
}
