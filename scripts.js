$( document ).ready(function() {

    var changeToPage = function(pageName) {
        if (pageName[0] === '#') pageName = pageName.substr(1); // remove leading #

        // Show correct screen
        $('.screen').hide();
        $('#' + pageName + '-screen').show();

        // Select correct nav item
        $('.bottom-nav-item').removeClass('selected');
        $('#' + pageName + '-nav').addClass('selected');

        // Change top title
        $('.top-nav-item.title').html( pageName.replace('-', ' ') )
    }

    changeToPage('local-stories'); // start on local-stories screen

    // Handle Page Changes (anchor link clicks)
    $(window).bind( 'hashchange', function(e) {
        changeToPage(document.location.hash);
    });
});
