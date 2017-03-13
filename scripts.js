var myProfile = {};
var myStoriesData = [];
var currentTags = {
  "chemo" : 0, 
  "medicine" : 0, 
  "hospital" : 0,
  "surgery" : 0, 
  "fam" : 0, 
  "ref" : 0,
};

function resetTags() {
  // reset all tags to 0
  for (tag in currentTags) {
    currentTags[tag] = 0;
    $(".firstchpt-tag-" + tag).css("border", deselectBorder);
  }

  // clear the text inputs in write chapter mode as well
  $('#chapt-title').val("");
  $('#chapt').val("");
}

function appendChapterToStory() {
  // append the current object to the array of myStoriesData
  if (myStoriesData.length == 0) {
    // This is the first chapter - get it from the first edit message thing
    myStoriesData.push({
      "title" : $('#firstchapt-title').val(),
      "content" : $('#firstchapt').val(),
      "tags" : $.extend({}, currentTags)    // make deepcopy - otherwise it'll copy by reference
    });
  } else {
    // This is a normal story - get it from the edit-story view
    myStoriesData.push({
      "title" : $('#chapt-title').val(),
      "content" : $('#chapt').val(),
      "tags" : $.extend({}, currentTags)
    });
  }
  

  // and then reset the tags
  resetTags();
}

$( document ).ready(function() {
    // set the "my story" fields the same as those in the welcome screen
    $('#name_input').change(function() {
      $('.profile-name').html($('#name_input').val());
      $('#edit-profile-name').val($('#name_input').val());
    });

    $('#bio_input').change(function() {
      $('#my-bio').html($('#bio_input').val());
    });

    $('#bio_input').change(function() {
      $('#my-bio').html($('#bio_input').val());
      $('.profile-bio').val($('#bio_input').val());
    });  

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
        // scroll to top
        window.scrollTo(0, 0);

        if (document.location.hash.substring(document.location.hash.length - 1) == 1 ) {
          // if this is the first page in a sequence, grey out the <PREV button
          $("#footer-back-button").addClass("greyed-out");
        } 

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

        // Change top title
        $('.top-nav-item.title').html( pageName.replace(/-/g, ' ') )

        // if this is edit then show the save button
        if (pageName == 'editing-my-profile') {
            $('#footer-save').show();
            $('#footer-menu').hide();
            $('#footer-signup').hide();
        } else  if (pageName.substring(0, 7) == 'welcome' || pageName.substring(0, 12) == 'edit-chapter') {
            if (pageName.substring(0, 7) == 'welcome') {
              $('.top-nav-item.title').html("Welcome!");
            } else {
              $('.top-nav-item.title').html("Write a New Chapter");
            }
            $('#footer-save').hide();
            $('#footer-menu').hide();
            $('#footer-signup').show();
        } else {
            $('#footer-menu').show();
            $('#footer-save').hide();
            $('#footer-signup').hide();
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
    }

    /*=========== start on welcome screen =========*/
    changeToPage('welcome1');
    document.location.hash = "#welcome1";   
    $('.start-conver').toggle();  // hide ALL the start conversation buttons

    /*=============================================*/

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

/*------sign up tab--------*/
var marital; var kid; var stage;
function single(){
	document.getElementById("marital-single").style.backgroundColor="#ff89a0";
	document.getElementById("marital-single").style.color="white";
	document.getElementById("marital-married").style.backgroundColor="white";
	document.getElementById("marital-married").style.color="#ff89a0";
	
	marital = 0;
}

function married(){
	document.getElementById("marital-married").style.backgroundColor="#ff89a0";
	document.getElementById("marital-married").style.color="white";
	document.getElementById("marital-single").style.backgroundColor="white";
	document.getElementById("marital-single").style.color="#ff89a0";
	marital = 1;
}

function haveKid(){
	document.getElementById("kid-yes").style.backgroundColor="#ff89a0";
	document.getElementById("kid-yes").style.color="white";
	document.getElementById("kid-no").style.backgroundColor="white";
	document.getElementById("kid-no").style.color="#ff89a0";
	kid = 1;
}

function noKid(){
	document.getElementById("kid-no").style.backgroundColor="#ff89a0";
	document.getElementById("kid-no").style.color="white";
	document.getElementById("kid-yes").style.backgroundColor="white";
	document.getElementById("kid-yes").style.color="#ff89a0";
	kid = 0;
}

var deselectBg = "white"; var selectBg = "#ff89a0";
var deselectTx = "#ff89a0"; var selectTx = "white";
function clearStageSelection(){
	document.getElementById("stage-one").style.backgroundColor=deselectBg;
	document.getElementById("stage-two").style.backgroundColor=deselectBg;
	document.getElementById("stage-three").style.backgroundColor=deselectBg;
	document.getElementById("stage-four").style.backgroundColor=deselectBg;
	document.getElementById("stage-one").style.color=deselectTx;
	document.getElementById("stage-two").style.color=deselectTx;
	document.getElementById("stage-three").style.color=deselectTx;
	document.getElementById("stage-four").style.color=deselectTx;
}

function stageOne(){
	clearStageSelection();
	document.getElementById("stage-one").style.backgroundColor=selectBg;
	document.getElementById("stage-one").style.color=selectTx;
	stage = 1;
}

function stageTwo(){
	clearStageSelection();
	document.getElementById("stage-two").style.backgroundColor=selectBg;
	document.getElementById("stage-two").style.color=selectTx;
	stage = 2;
}

function stageThree(){
	clearStageSelection();
	document.getElementById("stage-three").style.backgroundColor=selectBg;
	document.getElementById("stage-three").style.color=selectTx;
	stage = 3;
}

function stageFour(){
	clearStageSelection();
	document.getElementById("stage-four").style.backgroundColor=selectBg;
	document.getElementById("stage-four").style.color=selectTx;
	stage = 4;
}

/*---Tags---*/
// var chemo=0; var medicine=0; var hospital=0; var surgery=0; var fam=0; var ref=0;
var selectBorder="thin dashed #ff89a0";
var deselectBorder="none";
function chemoTag(){
  if (currentTags["chemo"] == 0){
    $(".firstchpt-tag-chemo").css("border", selectBorder);
    currentTags["chemo"] = 1;
  }
  else{
    $(".firstchpt-tag-chemo").css("border", deselectBorder);
    currentTags["chemo"] = 0;
  }
}

function medicineTag(){
  if (currentTags["medicine"] == 0){
    $(".firstchpt-tag-medicine").css("border", selectBorder);
    currentTags["medicine"] = 1;
  }
  else{
    $(".firstchpt-tag-medicine").css("border", deselectBorder);
    currentTags["medicine"] = 0;
  }
}

function hospitalTag(){
  if (currentTags["hospital"] == 0){
    $(".firstchpt-tag-hospital").css("border", selectBorder);
    currentTags["hospital"] = 1;
  }
  else{
    $(".firstchpt-tag-hospital").css("border", deselectBorder);
    currentTags["hospital"] = 0;
  }
}
function surgeryTag(){
  if (currentTags["surgery"] == 0){
    $(".firstchpt-tag-surgery").css("border", selectBorder);
    currentTags["surgery"] = 1;
  }
  else{
    $(".firstchpt-tag-surgery").css("border", deselectBorder);
    currentTags["surgery"] = 0;
  }
}
function famTag(){
  if (currentTags["fam"] == 0){
    $(".firstchpt-tag-fam").css("border", selectBorder);
    currentTags["fam"] = 1;
  }
  else{
    $(".firstchpt-tag-fam").css("border", deselectBorder);
    currentTags["fam"] = 0;
  }
}
function refTag(){
  if (currentTags["ref"] == 0){
    $(".firstchpt-tag-ref").css("border", selectBorder);
    currentTags["ref"] = 1;
  }
  else{
    $(".firstchpt-tag-ref").css("border", deselectBorder);
    currentTags["ref"] = 0;
  }
}