const cardsColors = ["red", "red", "green", "green", "blue", "blue",
                    "brown", "brown", "yellow", "yellow", "gray", "gray",
                    "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];


// Pobranie wszystkich divów - kart i stworzenie tablicy z NodeList.
// NodeList uzyskano za pomocą metody getElementsByTagName, która tworzy HTMLCollection

let cards = [...(document.querySelectorAll("div"))];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;

const clickedCard = function () {

    activeCard = this;

    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");

    if (activeCards.length === 0) {
        activeCards[0] = activeCard;d
        return;
    }

    else {
        cards.forEach(card => card.removeEventListener("click", clickedCard))
        activeCards[1] = activeCard;

        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add("off"))
                gameResult += 1;
                cards = cards.filter(card => !card.classList.contains("off"))
                if (gameResult == gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime =  (endTime - startTime)/1000;
                    alert(`Wygrałeś grę! Twój czas to: ${gameTime.toFixed(2)} sekund`);
                    location.reload();
                }
            }
            else {
                activeCards.forEach(card => card.classList.add("hidden"))
            };

            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickedCard));

        }, 600);
    };
};

const init = function () {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsColors.length);
        card.classList.add(cardsColors[position]);
        cardsColors.splice(position, 1);
    });

    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickedCard)
        })
    }, 2000)
};


init();




