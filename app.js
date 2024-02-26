//Elements du DOM
const divHearts = document.querySelector(".vies");
const message = document.getElementById("message");
const formulaire = document.getElementById("inputBox");
const input = document.getElementById("number");
const tryBtn = document.getElementById("tryBtn");
const restart = document.getElementById("restart");
const body = document.getElementsByTagName("body")[0];

//Modèles de coeurs
const fullHeart = `<ion-icon name="heart"></ion-icon>`;
const emptyHeart = `<ion-icon name="heart-dislike-outline"></ion-icon>`;

//Fond
const bgCold = "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";
const bgLukewarm = "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)";
const bgWarm = "linear-gradient(to right, #f83600 0%, #f9d423 100%)";
const bgHot = "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)";

const bgWin = "linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%)";
const bgLoose = "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)";

//Function
function play() {
  //Variable du jeu
  let nbrToGuess = Math.floor(Math.random() * 101);
  console.log("Nombre à deviner:", nbrToGuess);

  let totalLifes = 6;
  let lifes = totalLifes;

  //Actualisation et algorithme
  formulaire.addEventListener("submit", (e) => {
    e.preventDefault();

    const valeurInput = parseInt(input.value);

    if (valeurInput < 0 || valeurInput > 100) return;

    if (valeurInput === nbrToGuess) {
      body.style.backgroundImage = bgWin;
      message.textContent = `Félicitation, vous avez gagné! Le nombre était ${nbrToGuess}`;
      restart.style.display = "block";
      restart.addEventListener("click", function () {
        window.location.reload();
      });
    }

    if (valeurInput !== nbrToGuess) {
      if (nbrToGuess < valeurInput + 3 && nbrToGuess > valeurInput - 3) {
        body.style.backgroundImage = bgHot;
        message.textContent = "C'est brûlant !";
      } else if (nbrToGuess < valeurInput + 6 && nbrToGuess > valeurInput - 6) {
        body.style.backgroundImage = bgWarm;
        message.textContent = "C'est chaud !";
      } else if (nbrToGuess < valeurInput + 11 && nbrToGuess > valeurInput - 11) {
        body.style.backgroundImage = bgLukewarm;
        message.textContent = `C'est tiède !`;
      } else {
        body.style.backgroundImage = bgCold;
        message.textContent = "C'est froid !";
      }
      lifes--;
      verifyLoose();
    }
    checkHearts(lifes);
    restart.addEventListener("click", () => {
      message.style.display = "none";
      document.location.reload(true);
    });
  });

  const verifyLoose = () => {
    if (lifes === 0) {
      body.style.backgroundImage = bgLoose;
      message.textContent = `Vous avez perdu ! La réponse était ${nbrToGuess}`;
      restart.style.display = "block";
      restart.addEventListener("click", function () {
        window.location.reload();
      });
    }
  };

  const checkHearts = (lifes) => {
    divHearts.innerHTML = "";
    let arrayHearts = [];
    for (let i = 0; i < lifes; i++) {
      arrayHearts.push(fullHeart);
    }
    for (let i = 0; i < totalLifes - lifes; i++) {
      arrayHearts.push(emptyHeart);
    }
    arrayHearts.forEach((heart) => {
      divHearts.innerHTML += heart;
    });
  };
  checkHearts(lifes);
}

play();
