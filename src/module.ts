import { execMacro as execMacroFromDirectory } from "./directory";
import { execMacro as execMacroFromCompendium } from "./compendium";
import { LocalizedError } from "errors";
import "./settings";

Hooks.on("getMacroContextOptions", (app: MacroDirectory, entries: foundry.applications.ux.ContextMenu.Entry<HTMLLIElement>[]) => {
  entries.push({
    name: "MACRO.Execute",
    icon: `<i class="fa-solid fa-fw fa-play"></i>`,
    // Ideally, we would properly check Macro.canExecute, but we can't do that for macros
    // from compendia that have not been properly loaded (since this function cannot be async)
    // And also realistically, if the user has the ability to SEE this menu, then they have
    // sufficient permission to run the macro.
    condition: () => !!game?.settings?.get(__MODULE_ID__, "addToContextMenu"),
    callback: (li: HTMLLIElement) => {
      const { entryId, packId } = li.dataset;
      if (typeof entryId !== "string") throw new LocalizedError("MACRONOTFOUND", { id: typeof entryId });
      if (typeof packId === "string") void execMacroFromCompendium(entryId, packId);
      else void execMacroFromDirectory(entryId);
    }
  })
});
