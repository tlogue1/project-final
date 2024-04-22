const toggleHamburger = () => {
    document.getElementById("nav-items").classList.toggle("hide");
};

window.onload = () => {
    document.getElementById("hamburger").onclick = toggleHamburger;
};

var modal = document.getElementById("myModal");
var button = document.getElementById("contact-button");
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
const showEmail = async(e) => {
    e.preventDefault();

    const result = document.getElementById("result");
    let response = await getEmail();

    if(response.status == 200){
        result.innerHTML = "Email successfully sent";
    } else {
        result.innerHTML = "Sorry, your email was not sent";
    }

};

const getEmail = async() => {
    const form = document.getElementById("contact-form");
    const formData = new FormData(form);
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);
    const result = document.getElementById("result");
    result.innerHTML = "Please wait.....";

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:json
        });

        return response;
    } catch(error) {
        console.log(error);
        result.innerHTML = "Sorry, your email couldn't be sent";
    }
};

document.getElementById("contact-form").onsubmit = showEmail;