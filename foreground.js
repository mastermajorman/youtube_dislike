chrome.runtime.sendMessage({ 
    message: "get_dislikes"
}, response => {
    // use reponse.message to add dislike count onto the screen
    console.log("DISLIKES: " + response.message.items[0].statistics.dislikeCount);
    let dislikeCount = response.message.items[0].statistics.dislikeCount;
    let dislikeElement = document.createElement("yt-formatted-string");
    let dislikeCountTextNode = document.createTextNode(dislikeCount);
    dislikeElement.appendChild(dislikeCountTextNode);
    //error with this line
    dislikeElement.classList.add("style-scope ytd-toggle-button-renderer style-text");

    var x = document.getElementsByClassName("yt-simple-endpoint style-scope ytd-toggle-button-renderer")[1].childNodes[1];
    //x.appendChild(dislikeElement);
});