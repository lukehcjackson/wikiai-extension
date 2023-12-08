//this script ONLY runs on wikipedia and is injected into the code of the browser

//wait for page to fully load and then call active()
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      active();
    }
}

function active() {
    console.log("Loading wikipedia page title");
    //APPEARS IN BROWSER CONSOLE!!

    //get wikipedia page title
    title = document.getElementsByClassName("mw-page-title-main")[0].innerHTML;

    console.log(title);

    //store the title in local chrome storage
    chrome.storage.local.set({"pageTitle": title});

}

