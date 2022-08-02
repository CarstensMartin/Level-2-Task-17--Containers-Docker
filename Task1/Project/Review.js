//Using AJAX to load functions
$(document).ready(function () {
    //Declare savedReviews array
    let savedReviews = [];

    //Check if there is already reviews saved in the local storage
    function codeHasRun() {
        //Check if the local storage savedReviews is NOT created.
        if (localStorage.getItem("savedReviews") === null) {
            //If not created, set the local storage with the empty array.
            localStorage.setItem("savedReviews", JSON.stringify(savedReviews));
            //If it already exist
        } else {
            //Extract the information from local storage and allocate to the variable savedReviews
            savedReviews = JSON.parse(localStorage.getItem("savedReviews"));
        }
    };
    //Run the function - to see if this page has loaded before
    codeHasRun();

    //function to render the reviews that is saved
    function showSaved() {
        //set variable and get the element where we want to display the review
        let savedLinks = document.getElementById("savedLinks");
        //Clear the inner HTML
        savedLinks.innerHTML = ''
        //Use the for loop to display all the reviews
        for (i = 0; i < savedReviews.length; i++) {
            let name = savedReviews[i].name;
            let review = savedReviews[i].review;
            //set the var with id position in order to be able to create the delete function 
            let id = i
            savedLinks.innerHTML +=
                `<div class="reviewDiv">
            <span><p><u>Name:</u><br/> ${name}</p> 
            <p><u>Review:</u><br/> ${review}</p> </span>
            <span><button class="deleteButton" id = ${id}> X </button></span>
            </div> <br/>`;
        };
    };
    //Run the function to render the items
    showSaved();

    //Declare key and position of value that are captured in which position 
    function reviews(name, review) {
        this.name = name;
        this.review = review;
    };

    //function to add a review
    function addReview() {
        //Get the value of of the element entered
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        //if the name field has content, able to save review
        if (input1.value.length > 0) {
            //Set the variable with the new captured information
            let review1 = new reviews(input1.value, input2.value)
            //Add to the saved array.
            savedReviews.push(review1);
            //Set the local storage with the new updated review added
            localStorage.setItem("savedReviews", JSON.stringify(savedReviews));
            //Clear the input capture fields
            input1.value = '';
            input2.value = '';
            //Alert how many reviews are saved
            alert('There is ' + (savedReviews.length) + ' new reviews.');
            //Reload the page to update variables, ajax clicks and render the new array of saved items
            document.location.reload();
        }
        //If the value of the name field is empty, then give an alert and no not save the review
        else {
            alert('Please enter a valid name');
        };
    };

    //On click of the add button - run the addReview function
    $('#addButton').on('click', function () {
        addReview();
    });

    //On key up - run the addReview function
    $('#input2').on("keyup", function (event) {
        if (event.key === "Enter")
            addReview();
    });

    //On click of the delete button - delete the review
    $('.deleteButton').on('click', function () {
        //Get the position of the array by the id that was allocated in the position of the for loop 
        let inputId = Number($(this).attr('id'));
        //Remove the item by using the splice method
        savedReviews.splice(inputId, 1);
        //Set the local storage with the new array
        localStorage.setItem("savedReviews", JSON.stringify(savedReviews));
        //Reload the page to render the new list of items that are excluding the item that was deleted and update arrays
        document.location.reload();
    });
});