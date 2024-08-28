"use strict";

document.addEventListener("click", (event) => {
    if(event.target.tagName.toLowerCase() == "button") {
        document.querySelector("#canvas").setAttribute("level", event.target.id);
        
        document.querySelector(".placeholder").hidden = true;
        document.querySelector("#canvas").hidden = false;

        let game = document.createElement("script");
        game.src = "scripts/game.js";
        game.id="game";
        game.defer = true;
        document.head.append(game);
    }
});