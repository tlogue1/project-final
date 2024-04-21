
const getBagels= async () => {
    try {
        return (await fetch("api/bagels/")).json();
    } catch(error) {
        console.log(error);
    }
};

const showBagels = async () => {
    let bagels = await getBagels();
    let bagelsDiv = document.getElementById("bagels-list");
    bagelsDiv.innerHTML = "";
    bagels.forEach((bagel) => {
      const bagelDiv = document.createElement("div");
      bagelDiv.classList.add("bagel");
      bagelsDiv.append(bagelDiv);
  
      const nameDiv = document.createElement("div");
      nameDiv.classList.add("bagel-name");
      nameDiv.textContent = bagel.name;
      bagelDiv.append(nameDiv);
  
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("bagel-img");
  
      const img = document.createElement("img");
      img.src = bagel.img;
      imgDiv.append(img);
      bagelDiv.append(imgDiv);
  
      img.onclick = (e) => {
        e.preventDefault();
        displayDetails(bagel);
      };
    });
  };
/*

const showBagels = async () => {
    let bagels = await getBagels();
    let bagelsDiv = document.getElementById("bagels-list");
    bagelsDiv.innerHTML = "";
    bagels.forEach((bagel) => {
        const section = document.createElement("section");
        section.classList.add("bagel");
        bagelsDiv.append(section);

        const a = document.createElement("a");
        a.href = "#";
        section.append(a);
        
    
        const img = document.createElement("img");
        img.src = bagel.img;
        a.append(img);
    
        a.onclick = (e) => {
          e.preventDefault();
          displayDetails(bagel);
        };
      });
    };
*/

const displayDetails = (bagel) => {
    openDialog("bagel-details");
    const bagelDetails = document.getElementById("bagel-details");
    bagelDetails.innerHTML = "";
    bagelDetails.classList.remove("hidden");

    const bagelInner = document.createElement("div");
    bagelInner.classList.add("bagel-inner");

    const img = document.createElement("img");
    img.src = bagel.img;
    bagelInner.appendChild(img);

    const details = document.createElement("div");
    details.classList.add("details");
    
    const h3 = document.createElement("h3");
    h3.innerHTML = bagel.name;
    details.appendChild(h3);

    const p = document.createElement("p");
    p.innerHTML = bagel.description;
    details.appendChild(p);

    const ul = document.createElement("ul");
    bagel.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.innerHTML = ingredient;
        ul.appendChild(li);
    });
    details.appendChild(ul);

    const deletebutton = document.createElement("a");
        deletebutton.innerHTML = "	&#9249;";
        details.appendChild(deletebutton);
        deletebutton.id = "delete-button";
      
        const editButton = document.createElement("a");
        editButton.innerHTML = "&#9998; ";
        details.appendChild(editButton);
        editButton.id = "edit-button";

        bagelInner.appendChild(img);
        bagelInner.appendChild(details);
        bagelDetails.append(bagelInner);

        editButton.onclick = showBagelForm;
        deletebutton.onclick = deleteItem.bind(this, bagel);
        
    fillEditForm(bagel);
};

const fillEditForm = (bagel) => {
    const form = document.getElementById("bagel-form");
    form._id.value = bagel._id;
    form.name.value = bagel.name;
    form.description.value = bagel.description;
    document.getElementById("img-prev").src = bagel.img;

    fillIngredients(bagel.ingredients);
};

const fillIngredients = (ingredients) => {
    const section = document.getElementById("ingredients-boxes");
    ingredients.forEach((ingredient) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = ingredient;
        section.append(input);
    });
};

const addEditBagel = async (e) => {
    e.preventDefault();
    const form = document.getElementById("bagel-form");
    const formData = new FormData(form);
    let response;
    formData.append("ingredients", getIngredients());

    console.log(...formData);

    if(form._id.value.trim() == "") {
        console.log("in post");
        response = await fetch("/api/bagels", {
            method: "POST",
            body: formData,
        });
    } else {
        console.log("in put");
        response = await fetch(`/api/bagels/${form._id.value}`, {
            method:"PUT",
            body:formData,
        });
    }

    if(response.status != 200) {
        console.log("Error adding or editing bagel");
    }

    await response.json();
    resetForm();
    document.getElementById("dialog").style.display = "none";
    showBagels();
};

const getIngredients = () => {
    const inputs = document.querySelectorAll("#ingredients-boxes input");
    let ingredients = [];

    inputs.forEach((input) => {
        ingredients.push(input.value);
    });
    return ingredients;
};

const resetForm = () => {
    const form = document.getElementById("bagel-form");
    form.reset();
    form._id.value = "";
    document.getElementById("ingredients-boxes").innerHTML = "";
    document.getElementById("img-prev").src = "";
};

const showBagelForm = (e) => {
    openDialog("bagel-form");
    console.log(e.target);
    if(e.target.getAttribute("id") != "edit-button") {
        resetForm();
    }
};

const deleteItem = async(bagel) => {
    let response = await fetch(`/api/bagels/${bagel._id}`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json;charset=utf-8",
    },
  });

    if(response.status != 200) {
        console.log("error deleting");
        return;
    }

    let result = await response.json();
    resetForm();
    showBagels();
    document.getElementById("dialog").style.display = "none";
};

const addIngredient = (e) => {
    e.preventDefault();
    const section = document.getElementById("ingredients-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
};

const openDialog = (id) => {
    document.getElementById("dialog").style.display = "block";
    document.querySelectorAll("#dialog-details > *").forEach((item) => {
        item.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
};

showBagels();
document.getElementById("bagel-form").onsubmit = addEditBagel;
document.getElementById("add-button").onclick = showBagelForm;
document.getElementById("add-ingredients").onclick = addIngredient;


document.getElementById("img").onchange = (e) => {
    if(!e.target.files.length) {
        document.getElementById("img-prev").src = "";
        return;
    }
    document.getElementById("img-prev").src = URL.createObjectURL(e.target.files.item(0));
};


const toggleHamburger = () => {
    document.getElementById("nav-items").classList.toggle("hide");
};

window.onload = () => {
    document.getElementById("hamburger").onclick = toggleHamburger;
    showBagels();
};
