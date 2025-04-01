
const blockedPatterns = [
  "/s/js/pendo/pendo.js",
  "/service/notification/",

  "googleadservices.com",
  "adservice.google.com",
  "pagead2.googlesyndication.com",
  "tpc.googlesyndication.com",
  "securepubads.g.doubleclick.net",
  "googletagservices.com",
  "google-analytics.com",
  "analytics.google.com",
  "googletagmanager.com",
  "google.com/ads",
  "google.com/pagead"
];


function updateRules() {
  const rules = blockedPatterns.map((pattern, index) => ({
    id: index + 1, 
    priority: 1, 
    action: { type: "block" }, 
    condition: { 
      urlFilter: pattern, 
      resourceTypes: ["main_frame", "sub_frame", "script", "xmlhttprequest"] 
    }
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(r => r.id),
    addRules: rules
  });
}

chrome.runtime.onInstalled.addListener(updateRules);
chrome.runtime.onStartup.addListener(updateRules);