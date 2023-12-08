function disableButton() {
    document.getElementById("runAIbutton").disabled = true;
}

function enableButton() {
    document.getElementById("runAIbutton").disabled = false;
}

function hello() {
    alert('hello');
    disableButton();
    /*
    chrome.tabs.executeScript({
      file: 'alert.js'
    }); 
    */
}

window.onload = disableButton();

//want: WAIT for "pageTitle" to be set BEFORE we can enable the button or display it's content

//want: this to happen on opening the popup, not clicking on it
//so: page loads -> user clicks/scrolls? -> store title -> user opens popup -> enable button, display title
//      |                   |                   |                   ^
//      V                   V                   V                   |
//         ---------------------------->do not enable button or show title until

document.addEventListener('click', () => loadTitle(), { once: true });

function loadTitle() {
    title = ""
    chrome.storage.local.get(("pageTitle"),function(res) {
        console.log(res["pageTitle"]);
        title = res["pageTitle"];  
    });
    enableButton();
    const newDiv = document.createElement("div");
    const divText = document.createTextNode(title);
    newDiv.appendChild(divText);
    document.body.appendChild(newDiv);
    
}

document.getElementById("runAIbutton").addEventListener('click', hello);




