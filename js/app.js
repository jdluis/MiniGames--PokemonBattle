// Funcion para empezar, que oculte el start e inicie una serie de eventos
// Tendremos que ejecutar la aparicion del primer pokemon: Pikachu ha aparecido
// Tendremos que escribir un texto: uy parece que un pokemon salvaje a aparecido
// variable que muestre de un array de pokemons, por ahora 3, seleccionando uno (objeto)
// el objeto de cada pokemon tendra: opciones para las habilidades, ataque basico, ataque especial, defensa y huida
// tambien tendra unos valores numericos para cada habilidad y o porcentjes
// tendra una vida establecida
//añadir animacion al muñeco al atacar y recibir golpe
// añadir audio de batalla, de golpe, de victoria
//agregar animacion al btn de start
//Implementar PokeApi

const startBtn = document.querySelector("#start");
let root = document.querySelector(":root");

let playerTime = true;

let pokemon_left = document.querySelector(".pokemon_left");
let pokemon_left_name = document.querySelector("#pokemon_left_name");
let pokemon_left_hp = document.querySelector("#pokemon_left_hp");
let pokemon_left_LVL = document.querySelector("#pokemon_left_LVL");

let pokemon_right = document.querySelector(".pokemon_right");
let pokemon_right_name = document.querySelector("#pokemon_right_name");
let pokemon_right_hp = document.querySelector("#pokemon_right_hp");
let pokemon_right_LVL = document.querySelector("#pokemon_right_LVL");

//In the case that i want to implement any automatic creation,
//in the future i will use pokeAPI
class Pokemon {
  constructor(name, lvl, hp, basic_damage, special_damage, img) {
    (this.name = name),
      (this.lvl = lvl),
      (this.hp = hp),
      (this.basic_damage = basic_damage),
      (this.special_damage = special_damage),
      (this.img = img);
  }
  special_atack(pokemonAtack, pokemonDefend) {
    pokemonDefend.hp = pokemonDefend.hp - pokemonAtack.special_damage;
      return pokemonDefend.hp;
  }
  basic_atack(pokemonAtack, pokemonDefend) {
      pokemonDefend.hp = pokemonDefend.hp - pokemonAtack.basic_damage;
      return pokemonDefend.hp;
  }

  defend(pokemon_left, pokemon_right) {
    if (playerTime) {
      pokemon_right.hp = pokemon_right.hp + 10;
    } else if (!playerTime) {
      pokemon_left.hp = pokemon_left.hp + 10;
    }
  }
  run(pokemon_left) {
    gameFinish(pokemon_left);
  }
}

let pikachu = new Pokemon(
  "Pikachu",
  6,
  100, //hp
  20, //basic atack
  50, //special atack
  "./assets/pikachu.png"
);

let charmander = new Pokemon(
  "Charmander",
  5,
  100, //hp
  15, //basic atack
  40, //special atack
  "./assets/charmander.png"
);

function start() {
  //se oculta la pantalla de start (poner animacion mas adelante)
  let start_container = document.querySelector(".start_container");
  start_container.style.display = "none";

  //inicio de musica de batalla
  song();
  //entrada de pokemon 1
  setTimeout(leftSideActions, 1000);
  //entrada pokemon 2
  setTimeout(rightSideActions, 3000);

  setValuesHp();
  ///añadir funcion de turno siguiente
  //añadir eventlistener de pasar de turno
  if (pikachu.hp > 0 && charmander.hp > 0) {
    //turno player:
    if (playerTime && pikachu.hp > 0 && charmander.hp > 0) {
      basicAtack.addEventListener("click", () => {
        pikachu.basic_atack(pikachu, charmander);
        console.log(charmander.hp);
        console.log(pikachu.hp);
        playerTime = false;
        setValuesHp();
      });

      specialATack.addEventListener("click", () => {
        pikachu.special_atack(pikachu, charmander);
        playerTime = false;
        setValuesHp();
      });

      defend.addEventListener("click", () => {
        pikachu.defend(pikachu, charmander);
        console.log(pikachu.hp);

        playerTime = false;
        setValuesHp();
      });

      run.addEventListener("click", () => {
        pikachu.run(pikachu);
        playerTime = false;
      });
    }

    if (!playerTime) {
      debugger
      //turno maquina:
      charmander.basic_atack(charmander, pikachu);
      console.log("COMPUTER ATACK");
      playerTime = true;
      setValuesHp();
    }
  } else {
    //NO FUNCIONA EL ELSE NO SÉ PQ
    //si uno llega a zero entonces devolver el perdedor
    pikachu.hp <= 0
      ? gameFinish(pikachu)
      : charmander.hp <= 0
      ? gameFinish(charmander)
      : console.log("continue");
  }
}

//set hp values
function setValuesHp() {
  pokemon_left_hp.innerText = pikachu.hp;
  pokemon_right_hp.innerText = charmander.hp;
}

function gameFinish(looser) {
  alert(`${looser.name} ha sido derrotado`);
}

function leftSideActions() {
  pokemon_left.classList.add("leftToRight");
}

function rightSideActions() {
  pokemon_right.classList.add("rightToLeft");
}

function song() {
  let audio = new Audio("./assets/audioBattle.mp4");
  audio.play();
}

startBtn.addEventListener("click", () => {
  start();
});
