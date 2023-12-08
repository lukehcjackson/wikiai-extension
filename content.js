//want to disable generate button NOT IN THIS SCRIPT  so it's disabled even on other pages

document.addEventListener('click', () => active(), { once: true });
document.addEventListener('scroll', () => active(), { once: true });

function active() {
    console.log("Loading wikipedia page title");
    //APPEARS IN BROWSER CONSOLE!!

    title = document.getElementsByClassName("mw-page-title-main")[0].innerHTML;

    console.log(title);

    //store the title
    chrome.storage.local.set({"pageTitle": title});

}

