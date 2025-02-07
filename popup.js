import { getCurrentTab } from "./utils";

// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {

    //Get the tab and vid
    const activeTab = await getCurrentTab();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    const currVid = urlParameters.get("v");

    if(activeTab.url.includes("youtube.com/watch") && currVid) //if tab is a youtube video
    {

    }
});
