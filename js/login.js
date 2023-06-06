window.onload = function () {
  /*<div class="choose_avatar">
                        <div class="player1">
                            <label>
                                <img src="imgs/avatar1.png"></img>
*/
  let avatar_img1 = document.getElementById("img_avatar_player1");
  let avatar_img2 = document.getElementById("img_avatar_player2");

  var totalnum = 7;
  var num = 1;
  var avatarPlayer1 = "avatar1.png";
  var avatarPlayer2 = "avatar2.png";

  let buttonElement = document.querySelector(".go_button");
  avatar_img1.addEventListener("click", function () {
    num = (num % totalnum) + 1;
    avatar_img1.src = `imgs/avatar${num}.png`;
    avatarPlayer1 = `avatar${num}.png`;
  });
  num = 1;

  avatar_img2.addEventListener("click", function () {
    num = (num % totalnum) + 1;
    avatar_img2.src = `imgs/avatar${num}.png`;
    avatarPlayer2 = `avatar${num}.png`;
  });

  buttonElement.addEventListener("click", function (e) {
    e.preventDefault();

    let input1 = document.getElementById("player1_name").value;
    let input2 = document.getElementById("player2_name").value;
    var radios = document.getElementsByName("who_first");
    let who_first;
    console.log(input1);
    for (var radio of radios) {
      if (radio.checked) {
        who_first = radio.value;
        localStorage.setItem("starter", who_first);
      }
    }

    localStorage.setItem("player1Name", input1);
    localStorage.setItem("player2Name", input2);

    localStorage.setItem("avatarPlayer1", avatarPlayer1);
    localStorage.setItem("avatarPlayer2", avatarPlayer2);
    formElement = document.getElementById("test_form");
    formElement.submit();
  });

  let player1_inputElement = document.getElementById("player1_name");
  player1_inputElement.addEventListener("keydown", function () {
    document.querySelector("#who_first1_span").innerText = player1_name.value;
  });
  player1_inputElement.addEventListener("keyup", function () {
    document.querySelector("#who_first1_span").innerText = player1_name.value;
  });

  let player2_inputElement = document.getElementById("player2_name");
  player2_inputElement.addEventListener("keydown", function () {
    document.querySelector("#who_first2_span").innerText = player2_name.value;
  });
  player2_inputElement.addEventListener("keyup", function () {
    document.querySelector("#who_first2_span").innerText = player2_name.value;
  });
};

