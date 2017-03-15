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

// basic angular controller just to bind the global myUser object to everything
// general template: id, name, age, diagnosisDate, stage, bio, married, kids, location, img, messages, cardBio
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  function updateVariables() {
    $scope.id = myUser.id;
    $scope.fullName = myUser.fullName;
    $scope.firstName = myUser.fullName.split(' ')[0];
    $scope.lastName = myUser.fullName.split(' ')[1];
    $scope.age = myUser.age;
    $scope.diagnosisDate = myUser.diagnosisDate;
    $scope.stage = myUser.stage;
    $scope.bio = myUser.bio;
    $scope.married = myUser.married;
    $scope.kids = myUser.kids;
    $scope.location = myUser.location;
  }
  updateVariables();

  $scope.editPersonalInfo = function () {
    // editing user info
    myUser.fullName = $('#edit-profile-name').val();

    updateVariables();
  }

  $scope.addPersonalInfo = function() {
    // adding user info for the first time (and defaults)

    updateVariables();
  }
});

// if conditional handlebars
// ref: http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

var defaultStory = new Story('Story Title', 'Some great content');
var myUser = new User(0, 'Your Name', 34, '12/2013', 2, 'I love to be spontaneous with my family. We travel the world and enjoy life to the fullest.', true, 2, 'Stanford, CA', 'my-photo.png', [],'');
myUser.stories.push(defaultStory);

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

function appendChapterToStory(fromSignUp) {
  // append the current object to the array of myStoriesData
  // if (myStoriesData.length == 0) {
  //   // This is the first chapter - get it from the first edit message thing
  //   myStoriesData.push({
  //     "title" : $('#firstchapt-title').val(),
  //     "content" : $('#firstchapt').val(),
  //     "tags" : $.extend({}, currentTags)    // make deepcopy - otherwise it'll copy by reference
  //   });
  // } else {
  //   // This is a normal story - get it from the edit-story view
  //   myStoriesData.push({
  //     "title" : $('#chapt-title').val(),
  //     "content" : $('#chapt').val(),
  //     "tags" : $.extend({}, currentTags)
  //   });
  // }

  var newStory;
  if (fromSignUp) {
      newStory = new Story($('#firstchapt-title').val(), $('#firstchapt').val());
      myUser.stories[0] = newStory;
  } else {
      newStory = new Story($('#chapt-title').val(), $('#chapt').val());
      myUser.stories = [newStory].concat(myUser.stories);
  }

  $('#chapt-title').val("");
  $('#chapt').val("");
}

var marital; var kid; var stage;

function finishCreatingProfile() {
  myUser.fullName = $('#name_input').val() || myUser.fullName;
  myUser.age = $('#age_input').val() || myUser.age;
  myUser.bio = $('#bio_input').val() || myUser.bio;
  myUser.diagnosisDate = $('#diagnose_input').val() || myUser.diagnosisDate;
  // these vars were set on click...
  myUser.married = marital;
  myUser.kids = kid;
  myUser.stage = stage;
}

$( document ).ready(function() {
    // set the "my story" fields the same as those in the welcome screen
    $('.share-chapter a').click(function(e){
      appendChapterToStory();
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

    var renderMyStoryPage = function () {
      var source   = $("#my-profile-template").html();
      var myStoryTemplate = Handlebars.compile(source);
      var $screen = $('#my-profile-rendered');
      $screen.html('');

      var html = myStoryTemplate({user: myUser});
      $screen.append(html);

      // for (var i = myUser.stories.length-1 ; i >= 0; i--) {
      //   var story = myUser.stories[i];

      //   var html = myStoryTemplate(story);
      //   $screen.append(html);
      // }
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

    var renderLocalStoriesPage = function() {
      var source   = $("#local-story-card-template").html();
      var localStoryCardTemplate = Handlebars.compile(source);
      var $screen = $('#local-stories-rendered');
      $screen.html('');

      for (var i = 0; i < db.users.length; i++) {
        var user = db.users[i];

        var html = localStoryCardTemplate({user: user});
        $screen.append(html);
      }
    }

    var renderProfileForUser = function(user) {
      var source   = $("#profile-template").html();
      var profileTemplate = Handlebars.compile(source);
      var $screen = $('#profile-rendered');
      $screen.html('');

      var html = profileTemplate({user: user});
      $screen.append(html);
    }

    var currentPage = 'local-stories';
    var previousPages = ['local-stories'];

    var changeToPage = function(pageName, wasBack = false) {
        // scroll to top
        window.scrollTo(0, 0);

        if (document.location.hash.substring(document.location.hash.length - 1) == 1 ) {
          // if this is the first page in a sequence, grey out the <PREV button
          if (document.location.hash == '#welcome1') {
            $("#footer-back-button").addClass("greyed-out");
          } else {
            $("#footer-back-button").html("&#8592;");
          }
        }

        if (pageName[0] === '#') pageName = pageName.substr(1); // remove leading #

        if (!wasBack) {
            previousPages.push(currentPage);
        }
        currentPage = pageName;
        // Show correct screen by getting name from the url
        $('.screen').hide();


        // Change top title
        $('.top-nav-item.title').html( pageName.replace(/-/g, ' ') )

        // check if showing user profile page or other
        userProfile = db.getUserByFirstName(pageName);
        if (userProfile) {
          renderProfileForUser(userProfile);
          $('#profile-screen').show();
          $('.top-nav-item.title').html(userProfile.firstName + "'s Story");
        } else {
          $('#' + pageName + '-screen').show();
        }

        // special: If this is My Story, show edit mode
        if (pageName == 'my-story') {
            $('#edit-button-top').show();
            renderMyStoryPage();
        } else {
            $('#edit-button-top').hide();
        }


        // if this is edit then show the save button
        if (pageName == 'editing-my-profile') {
            $('#footer-save').show();
            $('#footer-menu').hide();
            $('#footer-signup').hide();
        } else  if (pageName.substring(0, 7) == 'welcome') {
            if (pageName.substring(0, 7) == 'welcome') {
              $('.top-nav-item.title').html("Welcome!");
            } else {
              $('.top-nav-item.title').html("Write a New Chapter");
            }
            $('#footer-save').hide();
            $('#footer-menu').hide();
            $('#footer-signup').show();
        } else if (pageName.substring(0, 12) == 'edit-chapter') {
            $('.top-nav-item.title').html("Write a New Chapter");
            $('#footer-menu').hide();
            $('#footer-save').hide();
            $('#footer-signup').hide();
        } else if (pageName.indexOf('conversation-with') >= 0) {
            $('#footer-menu').hide();
            $('#footer-save').hide();
            $('#footer-signup').hide();
        } else {
            $('#footer-menu').show();
            $('#footer-save').hide();
            $('#footer-signup').hide();
        }

        if (pageName == 'conversations') {
          renderConversationsIndex();
        }

        if (pageName =='local-stories') {
          renderLocalStoriesPage();
        }

        if (pageName.indexOf('conversation-with') >= 0) {
          $('#direct-conversation-screen').show();

          var user = db.getUserByFirstName(pageName.substr(18));
          renderConversationWithUser(user);
        }

        // handle back button
        if (userProfile || pageName.indexOf('conversation-with') >= 0 || pageName == 'edit-chapter1') {
           $('#back').show();
         } else {
           $('#back').hide();
         }

        // Select correct nav item
        $('.bottom-nav-item').removeClass('selected');
        if (userProfile) {
          $('#local-stories-nav').addClass('selected');
        } else {
          $('#' + pageName + '-nav').addClass('selected');
        }
    }

    /*=========== start on whatever page is in hash =========*/
    if (document.location.hash.length < 1) {
      document.location.hash = 'welcome1';
    } else {
      changeToPage(document.location.hash);
    }


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
        if (document.location.hash.length > 1) {
          changeToPage(document.location.hash);
        }
    });

    $('#back').click(function(e) {
      changeToPage(previousPages.pop(), true);
      document.location.hash = '#';
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
