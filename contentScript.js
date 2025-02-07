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
        } else if (type === "PLAY") {
            youtubePlayer.currentTime = value;
        } else if (type === "DELETE") {

            //Filter
            currentVideoBookmarks = currentVideoBookmarks.filter((el) => el.time != value);

            //Store to chrome storage
            chrome.storage.sync.set({
                [currentVideo]: JSON.stringify(currentVideoBookmarks)
            });

            //Send the updated bookmarks as callback param
            response(currentVideoBookmarks);
        }
    });

    function fetchBookmarks(currentVideoID) {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideoID], (obj) => {
                resolve(obj[currentVideoID] ? JSON.parse(obj[currentVideoID]) : []);
            });
        });
    }

    function waitForElement(selector, callback) {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                callback(element);
            }
        }, 300); // checks every 300ms
    }

    async function newVideoLoaded() {

        //Get the stored bookmarks
        currentVideoBookmarks = await fetchBookmarks(currentVideo);
        console.log("Video Bookmarks: ");
        console.log(currentVideoBookmarks);

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
        //Get the time
        const vidTime = youtubePlayer.currentTime;
        if (!currentVideoBookmarks.includes(vidTime)) {
            //Create the bookmark
            const newBookMark = {
                time: vidTime,
                desc: "Bookmark at: " + secsToTime(vidTime)
            }

            //Push and sort the array
            currentVideoBookmarks.push(newBookMark);
            currentVideoBookmarks.sort((a, b) => a.time - b.time);

            //Store to chrome storage
            chrome.storage.sync.set({
                [currentVideo]: JSON.stringify(currentVideoBookmarks)
            });

            console.log("Bookmarks stored successfully :)");
        } else {
            console.log("Bookmark already exists :)");
        }
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
