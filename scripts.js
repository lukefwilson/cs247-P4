$( document ).ready(function() {

    var changeToPage = function(pageName) {
        if (pageName[0] === '#') pageName = pageName.substr(1); // remove leading #

        // Show correct screen by getting name from the url
        $('.screen').hide();
        $('#' + pageName + '-screen').show();

        // special: If this is My Story, show edit mode
        if (pageName == 'my-story') {
            $('#edit-button-top').show();
        } else {
            $('#edit-button-top').hide();
        }

        // Change top title
        $('.top-nav-item.title').html( pageName.replace(/-/g, ' ') )

        // if this is edit then show the save button
        if (pageName == 'editing-my-profile') {
            $('#footer-save').show();
            $('#footer-menu').hide();
            $('#footer-signup').hide();
        } else  if (pageName.substring(0, 7) == 'welcome') {
            $('.top-nav-item.title').html("Welcome!");
            $('#footer-save').hide();
            $('#footer-menu').hide();
            $('#footer-signup').show();
        } else {
            $('#footer-menu').show();
            $('#footer-save').hide();
            $('#footer-signup').hide();
        }

        // Select correct nav item
        $('.bottom-nav-item').removeClass('selected');
        $('#' + pageName + '-nav').addClass('selected');
    }

    // start on welcome screen
    changeToPage('welcome');
    document.location.hash = "#welcome";    
    $('.start-conver').toggle();  // hide ALL the start conversation buttons

    // Toggle collapse local story content
    $('.read-more').click(function() {
        // un-collapse the div with content
        $($(this).parent().parent().parent().children()[2]).collapse('show');

        // hide this button and show the Start-a-conversation button
        $(this).parent().hide();
        $($(this).parent().parent().children()[4]).toggle();
    });

    // Handle Page Changes (anchor link clicks)
    $(window).bind( 'hashchange', function(e) {
        changeToPage(document.location.hash);
    });
});
