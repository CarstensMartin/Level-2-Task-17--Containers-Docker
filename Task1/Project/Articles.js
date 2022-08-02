  // Declare variables where elements are selected
  const ArticleEl = document.querySelector(".products");
  const savedItemsEl = document.querySelector(".cart-items");
  const subtotalEl = document.querySelector(".subtotal");
  const totalArticlesEl = document.querySelector(".total-items-in-cart");

  //Create the function to see if the web page has run before.
  function codeHasRun() {
    //Check if the local storage "products" is NOT created.
    if (localStorage.getItem("products") === null) {
      //If not created, set the local storage with products.
      localStorage.setItem("products", JSON.stringify(products));
      //If products already exist
    } else {
      //Extract the information from local storage and allocate to the variable products
      products = JSON.parse(localStorage.getItem("products"));
    }
  };
  //Run the function to see if the web page has run before.
  codeHasRun();


  // function to render all of the Articles
  function showArticles() {
    //Use the forEach function to create a div for each of the elements in the array
    products.forEach((product) => {
      //Add to the inner HTML of the ".products"/ArticleEL
      ArticleEl.innerHTML += `
        <div class="item">
          <div class="item-container">
            <div class="item-img">
              <img src="${product.imgSrc}" alt="${product.name}" class="imageSaved">
            </div>
            <div class="desc">
              <h2>${product.name}</h2>
              <p>Total likes: ${product.numberOfLikes}</p>
              <p>${product.description}</p>
            </div>
            <span class="add-to-cart" onclick="addToCart(${product.id})">
              <img src="./icons/bag-plus.png" alt="Save For Later" class="saveIcon">
            </span>
            <span class="likeArticle" >
              <img src="./icons/heart.png" alt="Like this Article" class="likeIcon" class="likeIcon" id="${product.id}">
            </span>
          </div>
        </div>
      `;
    });
  };
  //Run the function to render all of the Articles
  showArticles();

  // Set the cart variable with the savedArticles array in Local storage if it already exist or if it does not exist - create an empty array
  let cart = JSON.parse(localStorage.getItem("savedArticles")) || [];
  //Update cart/Saved items with the total Articles saved.
  updateCart();

  // Add articles to the array if it does not already exist. 
  function addToCart(id) {
    // Check if article already exist in Articles cart, if yes then use the add function.
    if (cart.some((item) => item.id === id)) {
      changeNumberOfUnits("plus", id);
      //If the article does not exist yet - create a new object in the array.
    } else {
      const item = products.find((product) => product.id === id);
      //Update the array and add the numberOfUnits property
      cart.push({
        ...item,
        numberOfUnits: 1,
      });
    };
    updateCart();
  };
  // update the cart of articles function
  function updateCart() {
    //Update the total articles that are saved for later
    renderSubtotal();
    //Save the articles cart to local storage
    localStorage.setItem("savedArticles", JSON.stringify(cart));
  };

  // Calculate the total items saved in the Saved for Later
  function renderSubtotal() {
    //Set totalItems to 0
    let totalItems = 0;
    //Add the total of the numberOfUnits to get how many articles are saved
    cart.forEach((item) => {
      totalItems += item.numberOfUnits;
    });
    //Update the inner HTML with how many items are saved
    subtotalEl.innerHTML = `Total Articles Saved:  ${totalItems}`;
    totalArticlesEl.innerHTML = totalItems;
    //Alert the user how many articles the user have saved
    alert(`You have ${totalItems} articles saved for later`)
  };
  // change number of units for an item
  function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
      //increase number of units or decrease number of units. In this case with Articles we limit it to 1
      if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
          numberOfUnits--;
        } else if (action === "plus" && numberOfUnits < 1) {
          numberOfUnits++;
        }
      }
      //Update the number of units to the specific object in the array
      return {
        ...item,
        numberOfUnits,
      };
    });
    //Run the update cart function
    updateCart();
  };

  //Reload of page function, to be used with timeout function
  function reloadDocument() {
    document.location.reload();
  };


//Use AJAX 
  $(document).ready(function () {

    //When clicking on like - start this function
    $('.likeIcon').on('click', function () {
      //Creat a variable for the item that was clicked
      let likeIconClicked = $(this);
      //Get the id attribute that was clicked and save in a variable
      let inputId = $(this).attr('id');
      //Function to animate the like icon to move left right and back to the starting position
      function animateLike() {
        $(likeIconClicked).animate({
          'margin-left': '-500px'
        }, 1000).animate({
          'margin-left': '500px'
        }, 1000).animate({
          'margin-left': '0px'
        }, 1000);
      };
      //Runt the like button animate function
      animateLike();
      //Set the variable with the current array from local storage for products
      let productLikes = JSON.parse(localStorage.getItem("products"));
      //Get the current number of likes from the productLikes array
      let valueLike = Number(productLikes[inputId].numberOfLikes);
      //Set a new variable with the current like +1
      let newLikeValue = valueLike + 1;
      //update the number of likes for the specific article - using its ID with the added 1
      products[inputId].numberOfLikes = newLikeValue;
      //Set the local storage with the new updated value
      localStorage.setItem("products", JSON.stringify(products));
      //Reload the page after 3000 ms because the animation function will run 3000ms
      setTimeout(reloadDocument, 3000);
    });

  });