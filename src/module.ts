function getMacro(elem: HTMLElement): Macro | undefined {
  const id = elem.dataset?.entryId;
  if (id) return game?.macros?.get(id);
}

async function execMacro(elem: HTMLElement): Promise<void> {
  const macro = getMacro(elem);
  if (macro?.canExecute) await macro.execute();
}

Hooks.on("getMacroContextOptions", (app: MacroDirectory, entries: foundry.applications.ux.ContextMenu.Entry<HTMLLIElement>[]) => {
  entries.push({
    name: "MACRO.Execute",
    icon: `<i class="fa-solid fa-play"></i>`,
    condition: (li: HTMLLIElement) => {
      const macro = getMacro(li);
      return !!macro?.canExecute;
    },
    callback: (li: HTMLLIElement) => { void execMacro(li); }
  });
});

Hooks.on("renderMacroDirectory", (app: MacroDirectory, html: HTMLElement) => {
  const listItems = Array.from<HTMLElement>(html.querySelectorAll(`li.entry.macro`));
  for (const listItem of listItems) {
    const button = document.createElement("a");
    button.style.maxWidth = "fit-content";
    button.dataset.entryId = listItem.dataset.entryId;
    button.dataset.tooltip = game?.i18n?.localize("MACRO.Execute");
    button.addEventListener("click", () => { void execMacro(button); });

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-play", "fa-fw", "exec-macro");
    button.appendChild(icon);
    listItem.appendChild(button);
  }
})