/*
$(".smallbox:even").css("background","#CFA175");

$(".smallbox:odd").css("background","#2C3D50");
*/

// const { nodeName } = require("jquery");

window.onload = function () {
  // let locationaddress = window.location.href;
  // console.log(locationaddress);
  // let parameterlist = locationaddress.split("?")[1].split("&");
  // console.log(parameterlist);
  // //alert(parameterlist);
  // player1_name = parameterlist[0].split("=")[1];
  // player2_name = parameterlist[1].split("=")[1];
  // who_first_player = parameterlist[2].split("=")[1];
  // if (!player1_name === true) {
  //   player1_name = "player1";
  // }
  // if (!player2_name === true) {
  //   player2_name = "player2";
  // }

  //alert("player1_name=" + player1_name);
  //alert("player2_name=" + player2_name);
  //alert("who_first_player=" + who_first_player);

  $(".smallbox:even").css("background", "#2C3D50");
  $(".smallbox:odd").css("background", "#CFA175");
  // Weiguang: setup player using jquery; should be ale to be achieved using js as well.
  // Temporarily comment out above code while testing pre-placed player in div1;

  // $("#player1").appendTo("#div0");
  // $("#player2").appendTo("#div0");

  let moves = 0;
  let playerNum = 2; // set default player number;
  let messageBox = document.getElementById("movingmessage");
  let startingMessageBox = document.getElementById("startingMessage"); // For on screen message
  const playerAvatarsSrc = {
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  }; // get object from login page;
  console.log(playerAvatarsSrc);
  const playerNames = { player1: "", player2: "", player3: "", player4: "" }; // Create object with empty value for holding palyer names;
  const locations = { player1: 0, player2: 0 }; // players start from location 0;
  let playerNewLocation;
  let tempNewLocation; // Added new var to hold the temporary location before checking ladder and snake;
  //  Weiguang comment out, no need it;

  const stepSound = new Audio("./audio/move-self.mp3"); // Add step sound file
  const stairSound = new Audio("./audio/stairSound1.mp3");
  const snakeSound = new Audio("./audio/snakeSound3.wav");
  const gameMusic = new Audio("./audio/gamemusic.mp3");
  const winningMusic = new Audio("./audio/winningsound.mp3");
  const fireworkSound = new Audio("./audio/fireworks.mp3");
  const soundBtn = document.getElementById("sound");
  console.log(soundBtn);
  var isPaused = false;
  var isRolling = false; // Rob: added to prevent double/triple rolls for same player
  // rob: locks out user input with disabled attribute for as long as roll animation preventing multiple turns
  var buttonElement = document.getElementById("rolldice_button");

  // Get value from login page(localStorage) and pass to the game;
  // If no input then automatically take player1 or player2 as name;
  localStorage.getItem("player1Name") == ""
    ? (playerNames.player1 = "player1")
    : (playerNames.player1 = localStorage.getItem("player1Name"));

  localStorage.getItem("player2Name") == ""
    ? (playerNames.player2 = "player2")
    : (playerNames.player2 = localStorage.getItem("player2Name"));

  // get each player's avatar in the format of avatar2.png;
  playerAvatarsSrc.player1 = localStorage.getItem("avatarPlayer1");
  playerAvatarsSrc.player2 = localStorage.getItem("avatarPlayer2");
  console.log(playerAvatarsSrc.player1);

  document.getElementById(
    "img_player1"
  ).src = `imgs/${playerAvatarsSrc.player1}`;

  document.getElementById(
    "img_player2"
  ).src = `imgs/${playerAvatarsSrc.player2}`;
  document.getElementById(
    "player1_body_img"
  ).src = `imgs/body_${playerAvatarsSrc.player1}`;
  // alert(document.getElementById("player1_body_img").src);
  document.getElementById(
    "player2_body_img"
  ).src = `imgs/body_${playerAvatarsSrc.player2}`;
  // alert(document.getElementById("player2body_img").src);
  // playerNames.player1 = localStorage.getItem("player1Name");
  // playerNames.player2 = localStorage.getItem("player2Name");

  let startPlayer = localStorage.getItem("starter");
  console.log(startPlayer);
  console.log(playerNames);

  buttonElement.addEventListener("click", function () {
    if (isRolling) return;
    isRolling = true;
    buttonElement.setAttribute("disabled", true);
    rollDice();
    setTimeout(function () {
      buttonElement.removeAttribute("disabled");
      isRolling = false;
    }, 1500);
  });
  // define start player, can be assigned by sperate function in the future
  switch (startPlayer) {
    case "player1":
      moves = 0;
      break;
    case "player2":
      moves = 1;
      break;
    case "player3":
      moves = 2;
      break;
    case "player4":
      moves = 3;
      break;
  }

  // slowly show on screen message(the message was hidden as default)
  setTimeout(() => {
    startingMessageBox.textContent = `${
      playerNames[`${startPlayer}`]
    } starts first!`;
    // startingMessageBox.style.background = "white";
    startingMessageBox.classList.add("showMessage");
  }, 800);
  // remove on screen message when mouse click any where of the screen; the event only execute once;
  function removeMessage() {
    $(`#startingMessage`).css("transform", "scale(0)");
    setTimeout(() => {
      messageBox.textContent = `${playerNames[`${startPlayer}`]} roll dice`;
      $(`#${startPlayer} .indicator`).css("visibility", "visible");
      document
        .getElementById(`img_${startPlayer}`)
        .classList.remove("white_color");
      document.getElementById(`img_${startPlayer}`).classList.add("red_color");
    }, 2000);
  }
  document.addEventListener("click", removeMessage, { once: true });
  //************** */

  // Background sound control:

  gameMusic.addEventListener(
    "load",
    function () {
      gameMusic.play();
    },
    true
  );
  gameMusic.autoplay = true; //autoplay
  const toggleGameMusic = () => {
    isPaused ? (isPaused = false) : (isPaused = true);
    console.log(isPaused);
    if (isPaused) {
      // gameMusic.loop = false;
      gameMusic.pause();
      soundBtn.src = "./imgs/soundicon_round3_mute.jpg";
    } else {
      gameMusic.play();
      gameMusic.loop = true;
      soundBtn.src = "./imgs/soundicon_round3.png";

      // gameMusic.currentTime = 0;
    }
  };

  soundBtn.addEventListener("click", toggleGameMusic);
  const rollDice = () => {
    moves += 1;
    console.log(moves);
    var randomNumber = Math.trunc(Math.random() * 6 + 1);
    var cubeElement = document.getElementById("cube");
    // Indicate the player's turn

    // Weiguang comment out:
    // $(`#${previousPlayer}indicator`).css("visibility", "hidden");
    // moves % 2 === 1
    //   ? $(`#player1indicator`).css("visibility", "visible")
    //   : $(`#player2indicator`).css("visibility", "visible");

    // Player panel indicator
    // if (moves % 2 === 1) {
    //   document.getElementById("img_player2").classList.remove("red_color");

    //   document.getElementById("img_player1").classList.remove("white_color");
    //   document.getElementById("img_player1").classList.add("red_color");
    // } else {
    //   document.getElementById("img_player1").classList.remove("red_color");

    //   document.getElementById("img_player2").classList.remove("white_color");
    //   document.getElementById("img_player2").classList.add("red_color");
    // }

    /*  let img_player=`img_${player}`;
      document.getElementById(`${img_player}`).classList.toggle('red_color');
*/

    // console.dir(cubeElement);
    switch (randomNumber) {
      case 1:
        cubeElement.style.WebkitTransform =
          "rotateX(90deg) rotateY(180deg) rotateZ(180deg)";

        break;
      case 2:
        cubeElement.style.WebkitTransform =
          "rotateX(90deg) rotateY(90deg) rotateZ(90deg)";
        break;
      case 3:
        cubeElement.style.WebkitTransform =
          "rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
        break;
      case 4:
        cubeElement.style.WebkitTransform =
          "rotateX(0deg) rotateY(90deg) rotateZ(0deg)";
        break;
      case 5:
        cubeElement.style.WebkitTransform =
          "rotateX(0deg) rotateY(180deg) rotateZ(0deg)";
        break;
      case 6:
        cubeElement.style.WebkitTransform =
          "rotateX(90deg) rotateY(0deg) rotateZ(0deg)";
        break;
    }
    cubeElement.style["animation-name"] = "rotate";
    cubeElement.style["animation-timing-function"] = "linear";
    cubeElement.style["animation-duration"] = "1.5s";
    setTimeout(function () {
      cubeElement.style.animationName = "none";

      // check snake or ladders and return new location:
      const snakeOrLadder = (playerNewLocation) => {
        switch (playerNewLocation) {
          case 13:
            return 2;
            break;
          case 5:
            return 7;
            break;
          case 20:
            return 12;
            break;
          case 18:
            return 24;
            break;
          case 21:
            return 17; // 18 conflict with Ladder, move back to 17
            break;
          default:
            return playerNewLocation;
        }
      };
      // Player moves
      const playerMoves = (player) => {
        // Assign values:
        // previousPlayer = player; //Assign the player to be previous owner for next click;
        tempNewLocation = randomNumber + locations[`${player}`];
        playerNewLocation = snakeOrLadder(tempNewLocation); // check snake or ladders and update the new location accordingly

        // define next player in situation of 2 players
        let nextPlayer = `${player === "player1" ? "player2" : "player1"}`;

        // 2 or more than 2 users: Testing stage

        // switch (player) {
        //   case "player1":
        //     nextPlayer = "player2";
        //     break;
        //   case "player2":
        //     nextPlayer = "player3";
        //     break;
        //   case "player3":
        //     nextPlayer = "player4";
        //     break;
        //   case "player4":
        //     nextPlayer = "player1";
        //     break;
        // }

        // let player move step by step using 2 different method:
        // Function: Move forward step by step with step sound:
        const sleepNow = (delay) =>
          new Promise((resolve) => setTimeout(resolve, delay));
        async function moveSelfForward(steps) {
          for (let i = 1; i <= steps; i++) {
            await sleepNow(500);
            $(`#${player}`).appendTo(`#div${locations[`${player}`] + i}`);
            stepSound.play();
          }
        }
        // FUNCTION: Move backward step by step:
        async function moveSelfBackward(steps) {
          for (let i = 1; i <= steps; i++) {
            await sleepNow(500);
            $(`#${player}`).appendTo(`#div${25 - i}`);
            stepSound.play();
          }
        }

        // const moveSelfBackward = (steps) => {
        //   for (let i = 1; i <= steps; i++) {
        //     console.log("i: ", i);
        //     const moveWithSound = () => {
        //       $(`#${player}`).appendTo(`#div${25 - i}`);
        //       stepSound.play();
        //     };
        //     setTimeout(() => moveWithSound(), 500 * i);
        //   }
        // };

        // Indicate the player's turn
        const indicatorChange = () => {
          $(`#${player} .indicator`).css("visibility", "hidden");
          setTimeout(() => {
            $(`#${nextPlayer} .indicator`).css("visibility", "visible");
          }, 500);

          messageBox.textContent = `${playerNames[`${nextPlayer}`]}'s turn`;
          document
            .getElementById(`img_${player}`)
            .classList.remove("red_color");
          document
            .getElementById(`img_${nextPlayer}`)
            .classList.add("red_color");
        };

        // Activate firework effect:
        const firework = () => {
          document.getElementById("firework1").classList.toggle("firework");
          document.getElementById("firework2").classList.toggle("firework");
          document.getElementById("firework3").classList.toggle("firework");
        };

        // Weiguang commented out:
        // Displaying detailed message:
        // playerNewLocation === tempNewLocation
        //   ? (document.getElementById(
        //       "movingmessage"
        //     ).textContent = `${player} rolled dice of ${randomNumber} and moved to ${playerNewLocation}`)
        //   : (document.getElementById(
        //       "movingmessage"
        //     ).textContent = `${player} rolled dice of ${randomNumber},moved to ${tempNewLocation}, then took the ${
        //       playerNewLocation > tempNewLocation ? "ladder up" : "snake down"
        //     } to ${playerNewLocation}`);
        // console.log(playerNewLocation);

        if (playerNewLocation < 25) {
          // Weiguang rewrite moves: Use promise to make the player move step by step;
          // When done, write the new player location to the Locations object for next turn;
          moveSelfForward(randomNumber)
            .then(() => {
              locations[`${player}`] = playerNewLocation;
            })
            // Weiguang update: Wait 700ms to run snake or ladder and play sound effect;
            .then(() => {
              setTimeout(() => {
                if (playerNewLocation !== tempNewLocation) {
                  $(`#${player}`).appendTo(`#div${playerNewLocation}`);
                  playerNewLocation > tempNewLocation
                    ? stairSound.play()
                    : snakeSound.play();
                }
              }, 700);
            })
            .catch((err) => {
              throw "Error in if condition1";
            });
          setTimeout(() => {
            indicatorChange();
          }, randomNumber * 550);
        } else if (playerNewLocation === 25) {
          moveSelfForward(randomNumber)
            .then(() => {
              document.getElementById("movingmessage").textContent = `${
                playerNames[`${player}`]
              } Won! Click button to play again!`;
              winningMusic.play();
              fireworkSound.play();
              firework();
              buttonElement.innerText = "Play again";
              // reload page in 1s after clicking the the button;
              buttonElement.addEventListener("click", function () {
                setTimeout(function () {
                  window.location.reload();
                  firework();
                }, 1000); // perhaps change to 1500 to match others?
              });
            })
            .catch((err) => {
              throw "Error calculating location in else if condition";
            });
        } else {
          tempNewLocation = 25 - (randomNumber - (25 - locations[`${player}`]));
          playerNewLocation = snakeOrLadder(tempNewLocation); // check snake or ladders
          console.log(tempNewLocation);
          console.log(playerNewLocation);
          moveSelfForward(`${25 - locations[`${player}`]}`)
            .then(() => {
              locations[`${player}`] = playerNewLocation;
            })
            .then(() => {
              moveSelfBackward(`${25 - tempNewLocation}`); // Fixed a logic bug here;
            })
            // Let palyer got on the temp location first then to use anake or ladder;
            .then(() => {
              if (playerNewLocation < tempNewLocation) {
                setTimeout(() => {
                  $(`#${player}`).appendTo(`#div${playerNewLocation}`);
                  snakeSound.play();
                }, 700 * `${25 - tempNewLocation}`);
              }
            })
            .catch((err) => {
              throw "Error calculating location";
            });
          setTimeout(() => {
            indicatorChange();
          }, randomNumber * 550);
          // Weiguang comment out: // Displaying detailed message:
          // playerNewLocation === tempNewLocation
          //   ? (document.getElementById(
          //       "movingmessage"
          //     ).textContent = `${player} rolled dice of ${randomNumber} and moved back to ${playerNewLocation}`)
          //   : (document.getElementById(
          //       "movingmessage"
          //     ).textContent = `${player} rolled dice of ${randomNumber},moved back to ${tempNewLocation}, then took the ${
          //       playerNewLocation > tempNewLocation ? "ladder up" : "snake down"
          //     } to ${playerNewLocation}`);
          // $(`#${player}`).appendTo(`#div${playerNewLocation}`);
          // locations[`${player}`] = playerNewLocation;
        }
      };

      // moves % 2 === 1 ? playerMoves("player1") : playerMoves("player2");
      switch (playerNum) {
        case 2:
          switch (moves % 2) {
            case 1:
              playerMoves("player1");
              break;
            case 0:
              playerMoves("player2");
              break;
          }
          break;
        case 3:
          switch (moves % 3) {
            case 1:
              playerMoves("player1");
              break;
            case 2:
              playerMoves("player2");
              break;
            case 0:
              playerMoves("player3");
              break;
          }
          break;
        case 4:
          switch (moves % 4) {
            case 1:
              playerMoves("player1");
              break;
            case 2:
              playerMoves("player2");
              break;
            case 3:
              playerMoves("player3");
              break;
            case 4:
              playerMoves("player4");
              break;
          }
      }
    }, 1500);
  };

  // need to add keydown event listner: press the enter or space key to roll the dice;
};

// Weiguang Yang player test code

// $("#player1").appendTo("#div5");
// $("#player2").appendTo("#div6");
