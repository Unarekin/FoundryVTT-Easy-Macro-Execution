export function createExecuteButton(id: string): HTMLAnchorElement {
  const link = document.createElement("a");
  link.classList.add("exec-macro");
  link.dataset.entryId = id;
  link.dataset.tooltip = game.i18n?.localize("MACRO.Execute");
  
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-fw", "fa-play");
  
  link.appendChild(icon);

  return link;
}

export function getCompendiumApps(): foundry.applications.sidebar.apps.Compendium[] {
  return (game.packs?.contents.flatMap(pack => pack.apps) as foundry.applications.sidebar.apps.Compendium[]) ?? [];
}