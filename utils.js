//Get the active tab
export async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

//Get the video bookmarks of this vid
export function fetchBookmarks(currentVideoID) {
    return new Promise((resolve) => {
        chrome.storage.sync.get([currentVideoID], (obj) => {
            resolve(obj[currentVideoID] ? JSON.parse(obj[currentVideoID]) : []);
        });
    });
}