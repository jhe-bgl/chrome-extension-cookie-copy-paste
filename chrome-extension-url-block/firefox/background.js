
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

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (blockedPatterns.some(pattern => details.url.includes(pattern))) {
      return { cancel: true };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
