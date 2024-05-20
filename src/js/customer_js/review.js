// Globala konstanter och variabler
let starBtns;
let starValue;
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    starBtns = document.getElementsByClassName('starBtn');
    console.log(starBtns);
    for (let index = 0; index < starBtns.length; index++) {
        starBtns[index].addEventListener('click', rate)
    }

    form = document.getElementById('reviewForm')
    // form submit event
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const details = [...formData.entries()];
        postReview(details);
    });
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

function rate() {
    document.getElementById('starMsg').innerHTML = "&nbsp;";
    console.log(+this.id);
    starValue = +this.id;
    let word = ['en stjärna', 'två sjtärnor', 'tre sjtärnor', 'fyra sjtärnor', 'fem sjtärnor']
    for (let index = 0; index < starBtns.length; index++) {
        starBtns[index].innerHTML = `<img src='star.fa806e3c.svg' alt='${word[index]}'>`
    }
    for (let index = 0; index < starValue; index++) {
        starBtns[index].innerHTML = `<img src='star_filled.643ec095.svg' alt='${word[index]} klickad'>`
    }
}

async function postReview(reviewParams) {
    document.getElementById('starMsg').innerHTML = "&nbsp;";
    console.log(reviewParams);
    console.log(typeof starValue);
    if (starValue == undefined) {
        document.getElementById('starMsg').innerHTML = "Ange ett betyg med stjärnorna";
        return;
    }

    let review = {
        "name": reviewParams[0][1],
        "content": reviewParams[1][1],
        "stars": starValue
    }
    console.log(review);
    const response = await fetch(`http://127.0.0.1:3000/postreview`, {
            method: "POST",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(review)
        });
        const res = await response.json();
        console.log(res);
}