import { getCompendiumApps } from "functions";

Hooks.once("ready", () => {
  game?.settings?.register(__MODULE_ID__, "addToListItem", {
    name: "MACRO-EXECUTOR.SETTINGS.ADDTOLISTITEM.LABEL",
    hint: "MACRO-EXECUTOR.SETTINGS.ADDTOLISTITEM.HINT",
    config: true,
    scope: "user",
    type: Boolean,
    default: true,
    requiresReload: false,
    onChange() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      (foundry as any).ui.macros.render();
      const apps = getCompendiumApps();
      apps
        .filter(app => app.rendered)
        .forEach(app => { void app.render(); });
    }
  });

  game?.settings?.register(__MODULE_ID__, "addToContextMenu", {
    name: "MACRO-EXECUTOR.SETTINGS.ADDTOCONTEXTMENU.LABEL",
    hint: "MACRO-EXECUTOR.SETTINGS.ADDTOCONTEXTMENU.HINT",
    config: true,
    scope: "user",
    type: Boolean,
    default: true,
    requiresReload: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  (foundry as any).ui.macros.render();
})