  // Create variables to select items in the HTML document
  const savedItemsEl = document.querySelector(".cart-items");
  const subtotalEl = document.querySelector(".subtotal");
  //Set totalItems variable to 0 - to be used outside the function
  let totalItems = 0;

  // Set the variable cart - for all the items that is saved for later or create a blank array if nothing is saved.
  let cart = JSON.parse(localStorage.getItem("savedArticles")) || [];
  //Run the updateCart function
  updateCart();

  //Function to update the article cart
  function updateCart() {
    //Run the render cartItems function to show the new updated list of items
    renderCartItems();
    //Run the renderSubtotal function to calculate the number of items saved
    renderSubtotal();

    // Set the local storage after an item is removed from the Article cart with the new items that is remaining.
    localStorage.setItem("savedArticles", JSON.stringify(cart));
  };

  //Calculate and render the total number of articles
  function renderSubtotal() {
    //Set totalItems to 0 and then add for each item
    totalItems = 0;
    cart.forEach((item) => {
      totalItems += item.numberOfUnits;
    });
    //Change the inner HTML with the new total articles saved
    subtotalEl.innerHTML = `Total Articles Saved:  ${totalItems}`;
  };

  //Function to render all the articles that are saved in the cart
  function renderCartItems() {
    // Clear the inner HTML element where all the saved items are to be displayed
    savedItemsEl.innerHTML = "";
    //For each item int he array the below div gets created 
    cart.forEach((item) => {
      savedItemsEl.innerHTML += `
        <div class="cart-item">
            <span>
                <img src="${item.imgSrc}" alt="${item.name}" class="imageSaved">
                <h4>${item.name}</h4>
            </span>

            <span class="removeArticle" onclick="removeItemFromCart(${item.id})">
                <span class="number"> Remove Item: </span>           
            </span>
        </div><br/>
      `;
    });
  };
  //Alert function - placed in a function because we want to use the setTimeout function
  function alertNumberOfArticles() {
    alert(`You have ${totalItems} articles saved for later`)
  }

  // Function to remove an article from the display cart
  function removeItemFromCart(id) {
    //Saved article cart to be updated with all of the articles except the one which ID is selected to be removed
    cart = cart.filter((item) => item.id !== id);
    //Set timeout function for update cart less than 900 before page gets reloaded but enough time for the animation to slide up and down
    setTimeout(updateCart, 850);
    //Alert at 851 the number of articles - less than 900 before page gets reloaded
    setTimeout(alertNumberOfArticles, 851);
  };

  //Use AJAX 
  $(document).ready(function () {
    //Make the saved articles visible on click
    $('#showArticles').on('click', function () {
      savedItemsEl.style.visibility = "visible";
    });
    //Hide the saved articles on click
    $('#hideArticles').on('click', function () {
      savedItemsEl.style.visibility = "hidden";
    });
    //Function to reload the page - to be used in set timeout function
    function reloadDocument() {
      document.location.reload();
    };
    //When remove button is clicked, change color and reload page after 900 ms
    $('.removeArticle').on('click', function () {
      $(this).css("background-color", "orange").slideUp(425).slideDown(425);
      setTimeout(reloadDocument, 900);
    });
  });