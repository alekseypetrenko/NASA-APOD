const resultsNav = document.getElementById("resultsNav");
const favouritesNav = document.getElementById("favouritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDOM() {
  resultsArray.forEach((result) => {
    // Card
    const card = document.createElement("div");
    card.classList.add("card");
    // Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full image";
    link.target = "_blank";
    // Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the day";
    image.loading = "lazy";
    image.classList.add("card-img-top");

    // Card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add to Favourites";
    // Card Text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // Footer
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // Date
    const date = document.createElement("strong");
    date.textContent = result.date;
    // Copyright
    const copyrightResult = result.copyright || "";
    const copyright = document.createElement("span");
    copyright.textContent = `${copyrightResult}`;

    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

// Get images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiURL);
    resultsArray = await response.json();
    updateDOM();
  } catch (error) {
    console.log(error);
  }
}

// getNasaPictures();
