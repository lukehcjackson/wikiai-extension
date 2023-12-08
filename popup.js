//this script runs alongside the popup and is essentially in it's own contained universe, separate from the browser

function disableButton() {
    document.getElementById("runAIbutton").disabled = true;
    console.log("disable button");
}

function enableButton() {
    document.getElementById("runAIbutton").disabled = false;
    console.log("enable button");
}

const getTitleFromStorage = async (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], function (result) {
        if (result[key] === undefined) {
          reject();
        } else {
          resolve(result[key]);
        }
      });
    });
  };

async function loadTitle() {
    let title = await getTitleFromStorage('pageTitle');
    createTitleText(title);
}

function createTitleText(title) {
    console.log("title:");
    console.log(title);
    enableButton();
    const newDiv = document.createElement("div");
    const divText = document.createTextNode(title);
    newDiv.appendChild(divText);
    document.body.appendChild(newDiv);
}

function buttonClicked() {
    console.log("clicked");
    disableButton();
    const newDiv = document.createElement("div");
    const divText = document.createTextNode("CHATGPT OUTPUT!!!!");
    newDiv.appendChild(divText);
    document.body.appendChild(newDiv);
    enableButton();
}

//want: WAIT for "pageTitle" to be set BEFORE we can enable the button or display it's content
//want: loadtitle to happen on opening the popup, not clicking on it
//so: page loads -> user clicks/scrolls? -> store title -> user opens popup -> loadTitle(), enable button, display title
//      |                   |                   |                   ^
//      V                   V                   V                   |
//    --X-------------------X---->do not enable button or show title until title stored and popup opened


//load title once the extension html has loaded
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        disableButton()
        loadTitle();
    }
}

//NO BRACKETS AFTER FUNCTION BECAUSE THAT CALLS IT INSTEAD OF REFERENCING IT!!
document.getElementById("runAIbutton").addEventListener('click', buttonClicked);









