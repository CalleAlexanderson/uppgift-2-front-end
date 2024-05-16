// Globala konstanter och variabler
let form;
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    form = document.getElementById('loginForm')
    // form submit event
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const details = [...formData.entries()];
        logIn(details);
    });
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

async function logIn(userParams) {
    let msg = document.getElementById('loginMsg');
    msg.innerHTML = "&#8203;" // tomrum så utseende inte ändras när meddelande skrivs
    
    // kollar om input fälten är blanka
    if (userParams[0][1] != "" && userParams[1][1] != "") {
        accountDetails = {
            "username": userParams[0][1],
            "password": userParams[1][1]
        }
        
        const response = await fetch(`http://127.0.0.1:3000/login`, {
            method: "POST",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(accountDetails)
        });
        const res = await response.json();
        
        // kollar om user skickats tillbaka
        if (res.user != undefined) {
            sessionStorage.setItem("user", res.user[0].fullname)
            localStorage.setItem("token", res.token)
            console.log(sessionStorage.getItem("user"));
            console.log(localStorage.getItem("token"));
            redirect();
        } else {
            msg.innerHTML = "Fel användarnamn eller lösenord"
        }
    } else{
        msg.innerHTML = "Var snäll och fyll i rutorna"
    }
}

// skickar vidare användaren till current_menu sidan
async function redirect() {
    token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:3000/currentmenu`, {
            method: "GET",
            headers: {
                "content-type": "Application/json",
                "Authorization": "Bearer "+token
            }
        });
    const res = await response.json();
    site = res.protectedSite
    if (site == "current_menu.html") {
        window.location.href = site
    }
}