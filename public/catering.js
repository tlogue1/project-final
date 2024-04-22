const toggleHamburger = () => {
    document.getElementById("nav-items").classList.toggle("hide");
};

window.onload = () => {
    document.getElementById("hamburger").onclick = toggleHamburger;
};
/*
const images = document.querySelectorAll("#dialog-details img");

images.forEach((image) => {
  image.addEventListener("click", (e) => {
    e.preventDefault();
    const name = image.previousElementSibling.textContent;
    const description = image.parentElement.nextElementSibling.textContent;
    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("dialog").style.display = "block";
  });
});



const modal = document.getElementById("catering-modal");
const modalText = document.getElementById("modal-text");
const links = document.querySelectorAll(".cater-two a");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const text = link.parentElement.querySelector("p").innerText;
    modalText.innerText = text;
    modal.style.display = "block";
  });
});

const closeModal = () => {
  modal.style.display = "none";
};

document.querySelector(".close").addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
*/
