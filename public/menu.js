const toggleHamburger = () => {
    document.getElementById("nav-items").classList.toggle("hide");
};

window.onload = () => {
    document.getElementById("hamburger").onclick = toggleHamburger;
};

/*popup from w3 school
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
*/


const getMenuItems = async () => {
    const url = "menu.json";
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

const showMenuItems = async () => {
    const items = await getMenuItems();
    const allSections = document.getElementById("menu-items");
  
    items.forEach((item) => {
      const itemSection = document.createElement("section");
      allSections.append(itemSection);
  
      itemSection.classList.add("item");
  
      const h3 = document.createElement("h3");
      h3.innerHTML = item.name;
      itemSection.append(h3);
  
      const img = document.createElement("img");
      img.src = `images/${item.img_name}`;
      img.alt = item.name;
      itemSection.append(img);
  
      const toasted = document.createElement("p");
      toasted.innerHTML = `Toasted: ${item.toasted}`;
      itemSection.append(toasted);
  
      const catering = document.createElement("p");
      catering.innerHTML = `Catering: ${item.catering}`;
      itemSection.append(catering);
  
      const ingredients = document.createElement("ul");
      item.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredients.append(li);
      });
      itemSection.append(ingredients);
    });
  };
  
  showMenuItems();