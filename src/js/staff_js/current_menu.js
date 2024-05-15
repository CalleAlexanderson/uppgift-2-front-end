// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init(){
    console.log("funkar");
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html"
    }
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------