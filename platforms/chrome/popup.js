window.addEventListener('load', function () {
    // update button with storage upon load
    chrome.storage.sync.get(['dislikesEnabled'], function(result) {
        document.getElementsByTagName("input")[0].checked = result.dislikesEnabled;
    });
    //user changes whether dislikes are enabled
    document.getElementsByTagName("label")[0].addEventListener('change', (event) => {
        chrome.storage.sync.get(['dislikesEnabled'], function(result) {
            chrome.storage.sync.set({"dislikesEnabled": !result.dislikesEnabled}, function() {});
        });
    });
});
