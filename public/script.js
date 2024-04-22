const toggleHamburger = () => {
    document.getElementById("nav-items").classList.toggle("hide");
};





window.onload = () => {
    document.getElementById("hamburger").onclick = toggleHamburger;
};


var modal = document.getElementById("myModal");
var button = document.getElementById("location-button");
var span = document.getElementsByClassName("close")[0];
button.onclick = function() {
    modal.style.display = "block";
  }
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  const submitButton = document.querySelector("#submit-button");


submitButton.addEventListener("click", () => {
  modal.style.display = "none";
  console.log("submitted");
});


