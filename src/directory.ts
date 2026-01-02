import { createExecuteButton } from "functions";
import { LocalizedError } from "./errors";

Hooks.on("renderMacroDirectory", (app: MacroDirectory, html: HTMLElement) => {
  const listItems = Array.from<HTMLElement>(html.querySelectorAll(`li.entry.macro`));
  listItems.forEach(li => {
    if (!(game.settings?.settings.get(`${__MODULE_ID__}.addToListItem`) && game?.settings?.get(__MODULE_ID__, "addToListItem"))) return;
    const entryId = li.dataset.entryId;
    if (typeof entryId === "string") {
      const link = createExecuteButton(entryId)
      link.addEventListener("click", () => { void execMacro(entryId); });
      li.appendChild(link);
    }
  });
});

export async function execMacro(id: string) {
  try {
    const macro = game.macros?.get(id);
    if (!macro) throw new LocalizedError("MACRONOTFOUND", { entryId: id });
    if (!macro.canExecute) throw new LocalizedError("PERMISSIONDENIED");
    return macro.execute();

  } catch (err) {
    console.error(err);
    if (err instanceof Error) ui.notifications?.error(err.message, { console: false, localize: true });
  }
}
