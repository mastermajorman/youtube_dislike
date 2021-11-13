chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./foreground_styles.css"]
        })
        .then(() => {
            console.log("INJECTED THE FOREGROUND STYLES.");

            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["./foreground.js"]
            })
                .then(() => {
                    console.log("INJECTED THE FOREGROUND SCRIPT.");
                });
        })
        .catch(err => console.log(err));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_dislikes') {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            let url = tabs[0].url;
            console.log("Current URL: " + url);
            let youtubeId = url.split("v=")[1].substring(0,11);
            console.log("YoutubeID: " + youtubeId)
            //sendResponse({ message: youtubeId });
            console.log("CURRENT youtubeID: " + youtubeId);
            fetch(`https://s7vueecr2e.execute-api.us-east-1.amazonaws.com/prod?videoId=${youtubeId}`)
            .then(response => {
                // indicates whether the response is successful (status code 200-299) or not
                if (!response.ok) {
                throw new Error(`Request failed with status ${reponse.status}`)
                }
                console.log("OK, RETURNING WITH DATA");
                return response.json()
            })
            .then(data => {
                console.log(data);
                sendResponse({ message: data });
            })
            .catch(error => console.log(error))
        });
        
        return true;
    }
});