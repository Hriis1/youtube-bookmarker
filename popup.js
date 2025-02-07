import { getCurrentTab, fetchBookmarks } from "./utils.js";

// adding a new bookmark row to the popup
function addNewBookmark(container, bookmark) {
    const bookmarkTitleElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");

    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "bookmark-title";

    newBookmarkElement.id = "bookmark-" + bookmark.time;
    newBookmarkElement.className = "bookmark";
    newBookmarkElement.setAttribute("timestamp", bookmark.time);
    newBookmarkElement.appendChild(bookmarkTitleElement);

    container.appendChild(newBookmarkElement);
}

//Show the user their bookmarks
function viewBookmarks(vidBookmarks) {
    const container = document.querySelector("#popup-container");
    const bookmarksContainer = container.querySelector("#bookmarks");
    bookmarksContainer.innerHTML = "";

    for (let i = 0; i < vidBookmarks.length; i++) {
        addNewBookmark(bookmarksContainer, vidBookmarks[i]);
    }

}

const onPlay = e => { };

const onDelete = e => { };

const setBookmarkAttributes = () => { };

document.addEventListener("DOMContentLoaded", async () => {

    //Get the tab and vid
    const activeTab = await getCurrentTab();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    const currVidID = urlParameters.get("v");

    if (activeTab.url.includes("youtube.com/watch") && currVidID) { //if tab is a youtube video
        const vidBookMarks = await fetchBookmarks(currVidID);
        viewBookmarks(vidBookMarks);
    }
    else { //if tab is not a youtube video
        const container = document.querySelector("#popup-container");
        container.querySelector(".title").textContent = "This is not a youtube video :)";
        container.querySelector("#bookmarks").innerHTML = "";
    }
});
