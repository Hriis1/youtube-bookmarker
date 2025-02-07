(() => {
    let youtuberightControls, youtubePlayer;
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

            //Get the right controls when they load
            waitForElement(".ytp-right-controls", (rightControls) => {
                youtuberightControls = rightControls;

                //Insert the new button
                const bookmarkBtn = document.createElement("img");
                bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
                bookmarkBtn.className = "ytp-button bookmark-btn";
                bookmarkBtn.title = "Click to bookmark current timestamp";
                rightControls.insertBefore(bookmarkBtn, rightControls.children[1] || null);
                bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
            });

            //Get the yt player when it loads
            waitForElement(".video-stream", (ytPlayer) => {
                youtubePlayer = ytPlayer;

            });
        }
    }

    function addNewBookmarkEventHandler() {
        const vidTime = youtubePlayer.currentTime;
        const newBookMark = {
            time: vidTime,
            desc: "Book mark at: " + secsToTime(vidTime)
        }

        console.log(newBookMark);
    }

    function secsToTime(time) {
        const hrs = Math.floor(time / 3600);
        let mins = Math.floor((time % 3600) / 60);
        const secs = String(Math.floor(time % 60)).padStart(2, '0');

        if (hrs > 0) {
            //Pad mins if there is an hour
            mins = String(mins).padStart(2, '0');
            return `${hrs}:${mins}:${secs}`;
        } else {
            return `${mins}:${secs}`;
        }
    }
})();
