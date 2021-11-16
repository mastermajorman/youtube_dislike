chrome.runtime.sendMessage({ 
    message: "get_dislikes"
}, response => {
    // don't want to have to do this, but w/e
    setTimeout(function () {
        // setup
        //console.log("DISLIKES: " + response.message.items[0].statistics.dislikeCount);
        let dislikeCount = response.message.items[0].statistics.dislikeCount;

        let countArea = document.getElementsByClassName("style-scope ytd-menu-renderer force-icon-button style-text")[1].childNodes[0].childNodes[1];
        countArea.innerText = intToString(dislikeCount);

        let dislikeButton = document.getElementsByClassName("style-scope ytd-menu-renderer force-icon-button style-text")[1].childNodes[0].childNodes[0].childNodes[1];
        //console.log(dislikeButton);
    }, 500);

    //account for user clicking dislike, local value should change +1/-1
    dislikeButton.addEventListener("click", function () {
        //console.log("button value: " + dislikeButton.ariaPressed);
        if (dislikeButton.ariaPressed === "false") {
            dislikeCount ++;
        } else {
            dislikeCount--;
        }
        countArea.innerText = intToString(dislikeCount);
    });
});

function intToString(num) {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}