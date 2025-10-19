// Check if anti-debug is enabled before injecting
chrome.storage.local.get(['antiDebugEnabled'], (result) => {
  const isEnabled = result.antiDebugEnabled !== false; // Default to true

  if (isEnabled) {
    var sc = document.createElement('script');
    sc.src = chrome.runtime.getURL("anti-anti-debug.js");
    var it = document.head || document.documentElement;

    it.appendChild(sc);
    sc.remove();
  }
});
