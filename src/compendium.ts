import { LocalizedError } from "errors";
import { createExecuteButton } from "./functions";

Hooks.on("renderCompendium", (compendium: foundry.applications.sidebar.apps.Compendium, html: HTMLElement) => {
  const listItems = Array.from<HTMLElement>(html.querySelectorAll(`li.entry.macro`));
  console.log("Rendering compendium:", compendium, listItems)
  listItems.forEach(li => {
    const entryId = li.dataset.entryId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const packId = (compendium as any).collection?.metadata?.id;

    if (typeof entryId === "string" && typeof packId === "string") {
      const link = createExecuteButton(entryId);
      link.dataset.packId = packId;
      li.dataset.packId = packId;

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
