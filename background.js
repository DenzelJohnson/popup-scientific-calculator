// background.js

console.log("Background script loaded.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Background script received a message:", request);

  if (request.action === "getResourceURLs") {
    const jsURL = chrome.runtime.getURL('calculator.js');
    console.log("Background script responding with calculator.js URL:", jsURL);
    sendResponse({ jsURL: jsURL });
    return true; // Keeps the message channel open for sendResponse
  }

  // Handle other actions if necessary
  console.warn("Background script received an unknown action:", request.action);
});
