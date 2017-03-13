$( document ).ready(function() {

    var renderConversationsIndex = function() {
      var source   = $("#conversations-index-template").html();
      var conversationPreviewTemplate = Handlebars.compile(source);
      var $screen = $('#conversations-index');
      $screen.html('');


      for (var i = 0; i < db.users.length; i++) {
        var user = db.users[i];

        if (user.messages.length > 0) {
          var html = conversationPreviewTemplate({user: user, lastMessage: user.messages[user.messages.length-1]});
          $screen.append(html);
        }
      }
    }

    var renderConversationWithUser = function(user) {
        var $screen = $('#messages-index');
        $screen.html('');
        $('#send-message-input').val('');

        var source   = $("#message-template").html();
        var messageTemplate = Handlebars.compile(source);

        if (user.messages.length == 0) {
          $('#empty-messages-text').html('Reach out to ' + user.firstName + '. What grabbed you about her story? Schedule a lunch date!');
          $('#empty-messages-text').show();
        } else {
          $('#empty-messages-text').hide();
          for (var i = 0; i < user.messages.length; i++) {
            var text = user.messages[i];
            var html = messageTemplate({message: text, sentFromMe: i % 2 == 0})
            $screen.append(html);
          }
        }
    }

    var currentPage;

    var changeToPage = function(pageName) {
        if (pageName[0] === '#') pageName = pageName.substr(1); // remove leading #

        currentPage = pageName;
        // Show correct screen by getting name from the url
        $('.screen').hide();
        $('#' + pageName + '-screen').show();

        // special: If this is My Story, show edit mode
        if (pageName == 'my-story') {
            $('#edit-button-top').show();
        } else {
            $('#edit-button-top').hide();
        }

        // if this is edit then show the save button
        if (pageName == 'editing-my-profile') {
            $('#footer-menu').hide();
            $('#footer-save').show();
        } else {
            $('#footer-menu').show();
            $('#footer-save').hide();
        }

        if (pageName == 'conversations') {
          renderConversationsIndex();
        }

        if (pageName.indexOf('conversation-with') >= 0) {
          $('#conversations-back').show();
          $('#footer-menu').hide();
          $('#direct-conversation-screen').show();

          var user = db.getUserByFirstName(pageName.substr(18));
          renderConversationWithUser(user);
        } else {
          $('#conversations-back').hide();
          $('#footer-menu').show();
        }

        // Select correct nav item
        $('.bottom-nav-item').removeClass('selected');
        $('#' + pageName + '-nav').addClass('selected');

        // Change top title
        $('.top-nav-item.title').html( pageName.replace(/-/g, ' ') )
    }

    changeToPage('local-stories'); // start on local-stories screen
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


    var sendMessage = function() {
        if ($('#send-message-input').val() == '') {
          return;
        }

        var user = db.getUserByFirstName(currentPage.substr(18));

        user.messages.push($('#send-message-input').val());

        renderConversationWithUser(user);
    }

    $('#send-message-input').keyup(function(e){
        if(e.keyCode == 13) { // enter key
          sendMessage()
        }
    });
    $('#send-message-button').click(function(e) {
      sendMessage();
    })
});
