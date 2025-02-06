chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only act when the tab is completely loaded
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    })
    .then(() => {
      console.log("Message sent successfully to tab:", tabId);
    })
    .catch(err => {
      console.error("Message failed to send:", err);
    });
  }
});
