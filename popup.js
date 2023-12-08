//this script runs alongside the popup and is essentially in it's own contained universe, separate from the browser

function disableButton() {
    document.getElementById("runAIbutton").disabled = true;
}

function enableButton() {
    document.getElementById("runAIbutton").disabled = false;
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

window.onload = disableButton();

//want: WAIT for "pageTitle" to be set BEFORE we can enable the button or display it's content
//want: loadtitle to happen on opening the popup, not clicking on it

//so: page loads -> user clicks/scrolls? -> store title -> user opens popup -> loadTitle(), enable button, display title
//      |                   |                   |                   ^
//      V                   V                   V                   |
//    --X-------------------X---->do not enable button or show title until title stored and popup opened

document.addEventListener('click', () => loadTitle(), { once: true });

//not working because every click both loads the title, creates a div, and disables the button
//but then why don't multiple text elements appear?
document.getElementById("runAIbutton").addEventListener('click', disableButton());




