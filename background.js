chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "steal-tailwind",
    title: "Steal Element Styles",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "steal-tailwind") {
    chrome.tabs.sendMessage(tab.id, { action: "triggerTailwindSteal" });
  }
});