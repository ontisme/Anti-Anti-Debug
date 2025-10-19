// Default state: enabled
let isEnabled = true;

// Initialize state from storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['antiDebugEnabled'], (result) => {
    isEnabled = result.antiDebugEnabled !== false; // Default to true
    updateIcon();
  });
});

// Load state on startup
chrome.storage.local.get(['antiDebugEnabled'], (result) => {
  isEnabled = result.antiDebugEnabled !== false;
  updateIcon();
});

// Handle icon click
chrome.action.onClicked.addListener((tab) => {
  isEnabled = !isEnabled;

  // Save state
  chrome.storage.local.set({ antiDebugEnabled: isEnabled });

  // Update icon
  updateIcon();

  // Notify user
  chrome.action.setTitle({
    title: `Anti Anti Debug (${isEnabled ? 'Enabled' : 'Disabled'})`
  });

  // Reload the current tab to apply changes
  chrome.tabs.reload(tab.id);
});

// Update icon based on state
function updateIcon() {
  chrome.action.setTitle({
    title: `Anti Anti Debug (${isEnabled ? 'Enabled' : 'Disabled'})`
  });

  // Update badge to show status
  chrome.action.setBadgeText({
    text: isEnabled ? 'ON' : 'OFF'
  });

  chrome.action.setBadgeBackgroundColor({
    color: isEnabled ? '#4CAF50' : '#F44336'
  });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getState') {
    sendResponse({ enabled: isEnabled });
  }
  return true;
});
