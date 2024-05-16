// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init(){
    console.log("funkar");
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html"
    } else {
        checkToken();
    }
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

async function checkToken() {
    token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:3000/checktoken`, {
            method: "GET",
            headers: {
                "content-type": "Application/json",
                "Authorization": "Bearer "+token
            }
        });
    const res = await response.json();
    console.log(res.message);
    if (res.message == "not correct JWT") {
        window.location.href = "login.html"
    }
}