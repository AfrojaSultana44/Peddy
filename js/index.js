const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  if (buttons) {
    for (const btn of buttons) {
      btn.classList.remove("active");
    }
  }
};

let allPets = [];
const loadAllPets = () => { 
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden");
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        allPets = data?.pets ? data.pets : [];
        displayAllPets();
      }, 2000);
    })
    .catch((error) => {
      allPets = [];

      console.log(error);
    });
};

const displayAllPets = () => {
  const spinner = document.getElementById("spinner");
  spinner.classList.add("hidden");
  const petContainer = document.getElementById("pet-container");
  petContainer.innerHTML = "";
  if (allPets.length === 0) {
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `
  <div class="bg-[rgba(19,19,19,0.03)] flex flex-col justify-center items-center gap-5 pt-12 pb-5 rounded-3xl">
  <img src="./images/error.webp"/>
  <h4 class="text-center text-[rgb(19,19,19)] font-bold text-[32px]">No Information Available</h4>
  <p class="text-center w-5/6 text-[rgba(19,19,19,0.7)] font-normal text-[16px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
  </div>
  `;
  } else {
    petContainer.classList.add("grid");
  }
  allPets.forEach((item) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card card-compact p-3 border border-[rgba(19,19,19,0.1)] rounded-xl">
  <figure class="h-full md:h-[180px] rounded-lg">
    <img
    class="h-full w-full object-cover"
      src=${item.image || ""} 
      alt="pet" />
  </figure>
  <div class="pt-6">
    <h2 class="card-title text-xl font-bold text-[#131313] pb-2">${
      item.pet_name || "N/A"
    }</h2>
    <p class="flex justify-start items-center text-[rgba(19,19,19,0.7)] text-[16px] font-normal pb-2"><span><img src="./images/breed-icon.svg"/></span> <span class="ml-2">Breed: ${
      item.breed || "N/A"
    }</span></p>
    <p class="flex justify-start items-center text-[rgba(19,19,19,0.7)] text-[16px] font-normal pb-2"><span><img src="./images/birth-icon.svg"/></span> <span class="ml-2">Birth: ${
      item.date_of_birth || "N/A"
    }</span></p>
    <p class="flex justify-start items-center text-[rgba(19,19,19,0.7)] text-[16px] font-normal pb-2"><span><img src="./images/gender-icon.svg"/></span> <span class="ml-2">Gender: ${
      item.gender || "N/A"
    }</span></p>
    <p class="flex justify-start items-center text-[rgba(19,19,19,0.7)] text-[16px] font-normal pb-4 border-b"><span><img src="./images/doller-icon.svg"/></span> <span class="ml-2">Price: ${
      item.price || "N/A"
    }$</span></p>
    <div class="flex justify-between pt-4">
    <button onclick="likedImageHandler('${
      item.image
    }')" class="btn btn-sm bg-white border border-[rgba(14,122,129,0.15)] rounded-lg"><i class="fa-regular fa-thumbs-up text-xl"></i></button>
    <button id="adopt-btn-${item.petId}" onclick="adoptModalHandler('${
      item.petId
    }')" class="btn btn-sm bg-white border border-[rgba(14,122,129,0.15)] rounded-lg text-[rgb(14,122,129)] font-bold text-[18px]">Adopt</button>
    <button onclick="loadDetails(${
      item.petId
    })" class="btn btn-sm bg-white border border-[rgba(14,122,129,0.15)] rounded-lg text-[rgb(14,122,129)] font-bold text-[18px]">Details</button>
    </div>  
  </div>`;

    petContainer.appendChild(card);
  });
};

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadCategoryPets = (categoryName) => {
  removeActiveClass();

  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden");

  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  )
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${categoryName}`);
      activeBtn.classList.add("active");

      setTimeout(() => {
        allPets = data?.data ? data.data : [];
        displayAllPets();
      }, 2000);
    })
    .catch((error) => {
      allPets = [];
      console.log(error);
    });
};

const displayCategories = (data) => {
  const categoryContainer = document.getElementById("category-container");
  data.forEach((item) => {
    const btnContainer = document.createElement("div");

    btnContainer.innerHTML = `
    <button id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="btn btn-lg category-btn bg-white border border-[rgba(14,122,129,0.15)] rounded-2xl">
    <span><img class="h-[30px] w-[30px] md:h-[40px] md:w-[40px]" src=${item.category_icon}/></span>
    <span class="ml-[2px] md:ml-2 text-[#131313] font-semibold md:font-bold text-lg lg:text-2xl">${item.category}</span>
    </button>
    `;
    categoryContainer.appendChild(btnContainer);
  });
};

const loadDetails = (petId) => {
  fetch(` https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.petData))
    .catch((error) => console.log(error));
};

const displayDetails = (pet) => {
  const detailContainer = document.getElementById("detail-content");

  detailContainer.innerHTML = `
<img class="w-full h-full rounded-lg" src=${pet.image || ""}/>
<div class="pt-6 pb-4">
 <h2 class="card-title text-xl font-bold text-[#131313] pb-2">${
   pet.pet_name || "N/A"
 }</h2>
 <div class="grid grid-cols-2">
 <div>
    <p class="flex justify-start items-center text-[rgba(19,19,19,0.7)] text-[16px] font-normal pb-2">
    <span><img src="./images/breed-icon.svg"/></span> <span class="ml-2">Breed: ${
      pet.breed || "N/A"
    }</span></p>
    <p class="flex justify-start items-center text-[rgba(19,19,19,0.7)] text-[16px] font-normal pb-2">
    <span><img src="./images/birth-icon.svg"/></span> <span class="ml-2">Birth: ${
      pet.date_of_birth || "N/A"
    }</span></p>
    <p class="flex justify-start items-center text-[rgba(19,19,19,0.7)] text-[16px] font-normal pb-2">
    <span><img src="./images/gender-icon.svg"/></span> <span class="ml-2">Gender: ${
      pet.gender || "N/A"
    }</span></p>
    </div>
    <div>
   <p class="flex justify-start items-center text-[rgba(19,19,19,0.7)] text-[16px] font-normal pb-2">
    <span><img src="./images/gender-icon.svg"/></span> <span class="ml-2">Vaccinated status: ${
      pet.vaccinated_status || "N/A"
    }</span></p>
    <p class="flex justify-start items-center text-[rgba(19,19,19,0.7)] text-[16px] font-normal pb-4 border-b"><span><img src="./images/doller-icon.svg"/></span> <span class="ml-2">Price: ${
      pet.price || "N/A"
    }$</span></p>
    </div>
    </div>
 </div>
<div class="">
<h3 class="text-[16px] font-semibold text-[rgb(19,19,19)]">Details Information</h3>
<p class="pt-3 text-[rgba(19,19,19,0.7) font-normal text-[16px]">${
    pet.pet_details || "N/A"
  }</p>
</div>

`;

  document.getElementById("custom_modal").showModal();
};

const allImageUrl = [];
const likedImageHandler = (imageUrl) => {
  if (imageUrl) {
    allImageUrl.push(imageUrl);
  }
  const imgContainer = document.getElementById("liked-image");
  imgContainer.innerHTML = "";

  allImageUrl.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("w-full");
    div.classList.add("h-[180px]");
    div.classList.add("md:h-[124px]");


    div.innerHTML = `<img class="w-full h-full object-center object-cover rounded-lg" src=${item}/>`;

    imgContainer.appendChild(div);
  });
};

const sortingHandler = () => {
  allPets.sort((prev, next) => {
    return next.price - prev.price;
  });

  displayAllPets();
};

const adoptModalHandler = (petId) => {
  const targetedAdoptBtn = document.getElementById(`adopt-btn-${petId}`);
  targetedAdoptBtn.disabled = true;
  let counter = 3;
  const adoptModalContent = document.getElementById("adopt-content");

  const counterInterval = setInterval(() => {
    if (counter > 0) {
      adoptModalContent.innerHTML = `
        <div class="space-y-4 py-2">
        <div class="flex justify-center items-center">
        <img src="https://img.icons8.com/?size=80&id=ACi0kAlgSTlE&format=png"/>
        </div>
        <h2 class="text-center text-5xl font-bold">Congrates</h2>
        <p class="text-xl font-normal text-center">Adoption Process is Start For Your Pet</p>
        <p class="text-5xl font-bold text-center">${counter}</p>
        </div>
      `;
      counter_modal.showModal();

      counter = counter - 1;
    } else {
      counter_modal.close();
      targetedAdoptBtn.innerText = "Adopted";

      adoptModalContent.innerHTML = "";
      clearInterval(counterInterval);
    }
  }, 1000);
};

loadCategories();
loadAllPets();
