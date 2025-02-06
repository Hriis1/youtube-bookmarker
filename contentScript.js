(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            console.log("Video id:" + currentVideo);
            newVideoLoaded();
        }
    });

    function waitForElement(selector, callback) {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                callback(element);
            }
        }, 300); // checks every 300ms
    }

    function newVideoLoaded() {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

        if (!bookmarkBtnExists) {

            waitForElement(".ytp-right-controls", (leftControls) => {
                const bookmarkBtn = document.createElement("img");
                bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
                bookmarkBtn.className = "ytp-button bookmark-btn";
                bookmarkBtn.title = "Click to bookmark current timestamp";

                leftControls.insertBefore(bookmarkBtn, leftControls.children[1] || null);
                console.log("Bookmark button appended successfully zaza.");

                // bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
            });
        }
    }

})();
