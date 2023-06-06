var modal = document.getElementById("instructions-modal");

var span = document.getElementsByClassName("close")[0];

var img = document.getElementById("instructions-button");

img.addEventListener("click", function () {
  modal.style.display = "block";
});

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

nextBtn.addEventListener("click", function () {
  modal.style.display = "none";
});
