// Globala konstanter och variabler
let restrictMenuElem;
let restrictBtnElem;

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    restrictMenuElem = document.getElementById('restrict_menu');
    restrictBtnElem = document.getElementById('restrict_btn');
    restrictBtnElem.addEventListener('click', restrictDropDown);

    let form = document.getElementById('addForm')
    // form submit event
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const menuItem = [...formData.entries()];
        formatData(menuItem);
    });

} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

function restrictDropDown() {
    if (restrictMenuElem.classList.contains("dropdownHidden")) {
        restrictMenuElem.classList.remove("dropdownHidden");
        restrictMenuElem.ariaHidden = "false"
    } else {
        restrictMenuElem.classList.add("dropdownHidden");
        restrictMenuElem.ariaHidden = "true"
    }
}

function formatData(params) {
    let restricts = [];
    let menuItemData = [];

    // lägger till kostrekstriktioner i en array
    for (let index = 0; index < params.length; index++) {
        switch (params[index][0]) {
            case "pork": restricts.push("pork"); break;
            case "gluten": restricts.push("gluten"); break;
            case "nuts": restricts.push("nuts"); break;
            case "vegan": restricts.push("vegan"); break;
            case "fish": restricts.push("fish"); break;
            case "dairy": restricts.push("dairy"); break;
            default: menuItemData.push(params[index][1]); break;
        }
    }
    let newItem = {
        "user": localStorage.getItem("user"),
        "name": menuItemData[0],
        "cost": menuItemData[2],
        "description": menuItemData[4],
        "restrictions": restricts,
        "menu": menuItemData[1],
        "category": menuItemData[3]
    }
    addToMenu(newItem);
}

async function addToMenu(newMenuItem) {
    const response = await fetch(`http://127.0.0.1:3000/addtomenu`, {
        method: "POST",
        headers: {
            "content-type": "Application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(newMenuItem)
    });
    const res = await response.json();
    console.log(res);
    alert("Rätt tillagd på meny")
}
