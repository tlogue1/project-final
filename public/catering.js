const toggleHamburger = () => {
    document.getElementById("nav-items").classList.toggle("hide");
};

window.onload = () => {
    document.getElementById("hamburger").onclick = toggleHamburger;
};


const getCateringOptions = async () => {
    const url = "catering.json";
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

const showCateringOptions = async () => {
    const options = await getCateringOptions();
    const allSections = document.getElementById("catering-options");

    options.forEach((option) => {
      const optionSection = document.createElement("section");
      allSections.append(optionSection);
  
      optionSection.classList.add("item");
  
      const h3 = document.createElement("h3");
      h3.innerHTML = option.name;
      optionSection.append(h3);
  
      const img = document.createElement("img");
      img.src = `images/${option.img_name}`;
      img.alt = item.name;
      optionSection.append(img);
  
      const pickup = document.createElement("p");
      pickup.innerHTML = `Pickup: ${option.pickup}`;
      optionSection.append(toasted);
  
      const delivery = document.createElement("p");
      delivery.innerHTML = `Delivery: ${option.delivery}`;
      optionSection.append(delivery);
  
      const ingredients = document.createElement("ul");
      option.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredients.append(li);
      });
      optionSection.append(ingredients);
    });
  };

  showCateringOptions();