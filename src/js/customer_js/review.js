// Globala konstanter och variabler
let starBtns;
let starValue;
let reviewsDiv;
let reviewsDivBtn;
let reviews;
let word = ['en stjärna', 'två sjtärnor', 'tre sjtärnor', 'fyra sjtärnor', 'fem sjtärnor']
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    starBtns = document.getElementsByClassName('starBtn');
    console.log(starBtns);

    reviewsDiv = document.getElementById('reviews');
    reviewsDivBtn = document.getElementById('showReviews');

    reviewsDivBtn.addEventListener('click', () => {
        reviewsDivBtn.classList.toggle("showReviewsOpen")
        reviewsDiv.classList.toggle("reviewsOpen")
        showReviews();
    })

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

    getReviews();
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

async function getReviews() {
    const response = await fetch(`http://127.0.0.1:3000/reviews`)
    reviews = await response.json();
    console.log(reviews);
}

// när review fliken fälls ut skapas 3 slumpade reviews från databasen
async function showReviews() {
    let nr;
    let oldNr;
    let oldNr2;
    if (reviewsDiv.children.length == 0) {
        let div = document.createElement('div');
        for (let index = 0; index < 3; index++) {
            while(nr == oldNr || nr == oldNr2){
                nr = Math.floor(Math.random() * reviews.length);
            }
            if (oldNr == undefined) {
                oldNr = nr;
            } else {
                oldNr2 = oldNr;
                oldNr = nr;
            }
            let art = document.createElement("article");
            let h3 = document.createElement('h3')
            h3.innerText = reviews[nr].name;
            let p = document.createElement('p')
            p.innerText = `"${reviews[nr].content}"`;
            let date = document.createElement('p')
            date.innerText = reviews[nr].whenMade.substring(0,10);
            let stars = document.createElement('div')
            let starV = reviews[nr].stars -1;
            //skriver ut stjärnorna fyllda eller inte beroende på hur många stjärnor review har
            for (let index = 0; index < starBtns.length; index++) {
                let star = document.createElement("img")
                stars.appendChild(star)
                if (starV >= index) {
                    star.src = "star_filled.643ec095.svg";
                } else {
                    star.src = "star.fa806e3c.svg";
                }
            }
            art.appendChild(h3);
            art.appendChild(p);
            art.appendChild(stars);
            art.appendChild(date);
            div.appendChild(art);
        }

        setTimeout(() => {
            reviewsDiv.appendChild(div);
        }, 500)
    } else {
        reviewsDiv.innerHTML = ""
    }
}

function rate() {
    document.getElementById('starMsg').innerHTML = "&nbsp;";
    starValue = +this.id;
    for (let index = 0; index < starBtns.length; index++) {
        starBtns[index].innerHTML = `<img src='star.fa806e3c.svg' alt='${word[index]}'>`
    }
    for (let index = 0; index < starValue; index++) {
        starBtns[index].innerHTML = `<img src='star_filled.643ec095.svg' alt='${word[index]} klickad'>`
    }
}

async function postReview(reviewParams) {
    document.getElementById('starMsg').innerHTML = "&nbsp;";
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
    document.getElementById('starMsg').innerHTML = "Review skapad, tack för din feedback";
    document.getElementById('comment').value = "";
    document.getElementById('reviewer').value = "";
    starValue = undefined;
    for (let index = 0; index < starBtns.length; index++) {
        starBtns[index].innerHTML = `<img src='star.fa806e3c.svg' alt='${word[index]}'>`
    }
    getReviews();
}