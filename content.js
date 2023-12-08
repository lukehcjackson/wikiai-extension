document.addEventListener('click', () => active(), { once: true });
document.addEventListener('scroll', () => active(), { once: true });

function active() {
    console.log("Loading wikipedia page title");
    //APPEARS IN BROWSER CONSOLE!!

    title = document.getElementsByClassName("mw-page-title-main")[0].innerHTML;

    console.log(title);

}