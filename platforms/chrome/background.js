// dislikes enabled by default
chrome.storage.sync.set({"dislikesEnabled": true}, function() {});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.storage.sync.get(['dislikesEnabled'], function(result) {
        if (result.dislikesEnabled) {
            if (changeInfo.status === 'complete' && /^https:\/\/www\.youtube.com\/watch\?v=.*/.test(tab.url)) {
                chrome.scripting.insertCSS({
                    target: { tabId: tabId },
                    files: ["./foreground_styles.css"]
                })
                .then(() => {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ["./foreground.js"]
                    });
                })
                .catch(err => console.log(err));
            }
        }
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_dislikes') {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            let url = tabs[0].url;
            // accounts for https://www.youtube.com/ (length 25), additional check
            if (url.length > 25) {
                let youtubeId = url.split("v=")[1].substring(0,11);
                fetch(`https://s7vueecr2e.execute-api.us-east-1.amazonaws.com/prod?videoId=${youtubeId}`)
                .then(response => {
                    // indicates whether the response is successful (status code 200-299) or not
                    if (!response.ok) {
                    throw new Error(`Request failed with status ${reponse.status}`)
                    }
                    return response.json()
                })
                .then(data => {
                    sendResponse({ message: data });
                })
                .catch(error => console.log(error))
            }
        });
        return true;
    }
});