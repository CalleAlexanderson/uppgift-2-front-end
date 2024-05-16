// Globala konstanter och variabler
import menuItems from '../../../menu.json';
let starters = [];
let chicken = [];
let salads = [];
let deserts = [];
let specials = [];
let sides = [];
let burgers = [];
let steaks = [];
let comboPlates = [];
let drinks = [];
let ribs = [];
let kidsMeals = [];
let menuDiv;
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    menuDiv = document.getElementsByClassName("menu")[0];
    let selectMenu = document.getElementsByClassName('choseMenu')[0];
    console.log(selectMenu.value);
    selectMenu.addEventListener('change', () => {
        choseMenu(selectMenu.value)
    });
    getMenu();
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

async function getMenu() {
    const response = await fetch(`http://127.0.0.1:3000/menu`);
    const menuItems = await response.json();

    // skapar en array för varje meny
    for (let index = 0; index < menuItems.length; index++) {
        switch (menuItems[index].menu) {
            case "Förrätter": starters.push(menuItems[index]); break;
            case "Kyckling": chicken.push(menuItems[index]); break;
            case "Sallader": salads.push(menuItems[index]); break;
            case "Efterrätter": deserts.push(menuItems[index]); break;
            case "Specialrätter": specials.push(menuItems[index]); break;
            case "Tillägg": sides.push(menuItems[index]); break;
            case "Burgare": burgers.push(menuItems[index]); break;
            case "Kött": steaks.push(menuItems[index]); break;
            case "Combo Tallrickar": comboPlates.push(menuItems[index]); break;
            case "Drickor": drinks.push(menuItems[index]); break;
            case "Ribs": ribs.push(menuItems[index]); break;
            default: kidsMeals.push(menuItems[index]); break;
        }
    }
    showMenu(starters)
}

function choseMenu(value) {
    let tempArr = []
    switch (value) {
        case "Förrätter": tempArr = starters; break;
        case "Kyckling": tempArr = chicken; break;
        case "Sallader": tempArr = salads; break;
        case "Efterrätter": tempArr = deserts; break;
        case "Specialrätter": tempArr = specials; break;
        case "Tillägg": tempArr = sides; break;
        case "Burgare": tempArr = burgers; break;
        case "Kött": tempArr = steaks; break;
        case "Combo Tallrickar": comboPlates = starters; break;
        case "Drickor": tempArr = drinks; break;
        case "Ribs": tempArr = ribs; break;
        default: tempArr = kidsMeals; break;
    }
    showMenu(tempArr);
}

function showMenu(chosenMenu) {
    menuDiv.innerHTML = "";
    let categories = [];
    let h2 = document.createElement('h2');
    console.log(chosenMenu);
    h2.innerHTML = chosenMenu[0].menu;

    // gör en array med alla kategorier på menyn
    menuDiv.appendChild(h2);
    for (let index = 0; index < chosenMenu.length; index++) {
        if (!categories.includes(chosenMenu[index].category)) {
            categories.push(chosenMenu[index].category);
        }
    }
    console.log(categories);

    // skapar en section för varje kategori
    for (let index = 0; index < categories.length; index++) {

        let sect = document.createElement('section')
        let h3 = document.createElement('h3')
        h3.innerHTML = categories[index];
        sect.appendChild(h3);
        let ul = document.createElement('ul');

        for (let i = 0; i < chosenMenu.length; i++) {
            // Kollar om saken på menyn hör till kategorin
            if (chosenMenu[i].category == categories[index]) {

                let li = document.createElement('li');
                // skapar en variabel som kommer bli namnet
                let itemName = chosenMenu[i].name;
                console.log(itemName);

                //sorterar efter bokstavsordning
                chosenMenu[i].restrictions = chosenMenu[i].restrictions.sort((a, b) =>
                    a > b ? 1 : -1
                );

                // kollar om det finns någon kostrestriktion på saken
                for (let u = 0; u < chosenMenu[i].restrictions.length; u++) {
                    console.log(chosenMenu[i].restrictions[u]);
                    switch (chosenMenu[i].restrictions[u]) {
                        case "pork": itemName += " Ⓟ"; break;
                        case "gluten": itemName += " Ⓖ"; break;
                        case "nuts": itemName += " Ⓝ"; break;
                        case "vegan": itemName += " Ⓥ"; break;
                        case "fish": itemName += " Ⓕ"; break;
                        default: itemName += " Ⓓ"; break;
                    }
                }

                let h4 = document.createElement('h4');
                h4.innerHTML = itemName;

                let desc = document.createElement('p');
                desc.innerHTML = chosenMenu[i].description;
                desc.classList.add("desc");

                let price = document.createElement('p');
                price.innerHTML = chosenMenu[i].cost;
                price.classList.add("price");

                li.appendChild(h4);
                li.appendChild(desc);
                li.appendChild(price);
                ul.appendChild(li);
            }
        }
        sect.appendChild(ul);
        menuDiv.appendChild(sect);
    }
}