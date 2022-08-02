//Use AJAX to load once HTML page is loaded 
$(document).ready(function () {
    //Create a drop down menu when mouse hovers over the item
    //Hide all the below classes
    $(".craftDegrees , .royalArch, .crypticCouncil, .royalArkMariners, .ancientAccepted").hide();
    
    //function to make the relevant class visible
    function show() {
        const divID = $(this).attr('data-panelId');
        $('.' + divID).show('2000').addClass(show)
    };
    //function to hide the relevant class
    function hide() {
        const divID = $(this).attr('data-panelId');
        $('.' + divID).hide('2000')
    };
    //When the mouse enter, the relevant class becomes visible in a drop down - when the mouse leaves it is hidden again
    $(".menuItems").on('mouseenter', show).on('mouseleave', hide);
});