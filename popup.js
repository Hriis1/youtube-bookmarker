import { getCurrentTab, fetchBookmarks } from "./utils.js";

// adding a new bookmark row to the popup
const addNewBookmark = () => { };

const viewBookmarks = () => { };

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
        console.log("YT VID YT VID");
    }
    else {
        const container = document.querySelector("#popup-container");
        container.querySelector(".title").textContent = "This is not a youtube video :)";
        container.querySelector("#bookmarks").innerHTML = "";
    }
});
