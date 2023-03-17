const myKey =
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NmYwMGY4MWI0MjAwMTM5YjJhZGEiLCJpYXQiOjE2NzkwNjA3MzYsImV4cCI6MTY4MDI3MDMzNn0.RVIDg6QND_rfTmcGfT2kShquIYWwT1mq-VDGKBW0wm8"
const myEndpoint = "https://striveschool-api.herokuapp.com/api/product/";
const rowReference = document.getElementById("bestSellers");

const createCards = (products) => {
  rowReference.innerHTML = ``;
  products.forEach((product, index) => {
    const newCol = document.createElement("div");
    newCol.setAttribute("class", "col-4 col-md-3 col-lg-2");
    newCol.setAttribute("id", index);

    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img-top");
    cardImg.innerHTML = `<img src=${product.imageUrl} alt='product image' class='prodImg'>`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `<div>
      <h3 class="card-title">${product.name}</h3>
      <h4 class="card-subtitle">${product.brand}</h4>
  </div>
  <div class="card-text">
      <p class='cardDescription'>${product.description}</p>
      <br>
      <hr>
      <p class='cardPrice'>${product.price}€</p>
  </div>
  <div>
      <a class="btn" href="${myEndpoint + product._id}">Details</a>
  </div>`;

    newCard.appendChild(cardImg);
    newCard.appendChild(cardBody);

    newCol.appendChild(newCard);
    rowReference.appendChild(newCol);
  });
};

const getProducts = async function () {
  try {
    let response = await fetch(myEndpoint, {
      method: "GET",
      headers: {
        Authorization: myKey,
      },
    });
    console.log(response);
    if (response.ok) {
      let respJson = await response.json();
      console.log(respJson);
      let products = Array.from(respJson);
      createCards(products);
      return products;
    } else {
      console.log("PROBLEM");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

getProducts();