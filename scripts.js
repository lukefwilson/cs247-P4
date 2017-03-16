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
var currentChapterBeingEdited = -1;

var editChapter = function(id) {
  if (id == -1) {
    return;   //dummy case
  }

  // edit the chapter with ID specified
  // step 1: set global variable
  currentChapterBeingEdited = id;

  // step 2: go to edit page
  document.location.hash = '#editing-chapter';

  // step 3: load content to input boxes in edit page
  $('#editing-chapt-title').val(myUser.stories[id].title);
  $('#editing-chapt').val(myUser.stories[id].content);
}

var updateChapter = function() {
  if (currentChapterBeingEdited == -1) {
    return;   //dummy case
  }
  myUser.stories[currentChapterBeingEdited].title = $('#editing-chapt-title').val();
  myUser.stories[currentChapterBeingEdited].content = $('#editing-chapt').val();

  currentChapterBeingEdited = -1; // reset
}


// basic angular controller just to bind the global myUser object to everything
// general template: id, name, age, diagnosisDate, stage, bio, married, kids, location, img, messages, cardBio
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  function updateVariables() {
    $scope.id = myUser.id;
    $scope.fullName = myUser.fullName;
    $scope.firstName = myUser.firstName;
    $scope.lastName = myUser.lastName;
    $scope.age = myUser.age;
    $scope.diagnosisDate = myUser.diagnosisDate;
    $scope.stage = myUser.stage;
    $scope.bio = myUser.bio;
    $scope.married = myUser.married;
    $scope.kids = myUser.kids;
    $scope.location = myUser.location;
  }
  $scope.dob = "1975-04-04";
  $scope.updateVariables = updateVariables;
  updateVariables();

  $scope.populateEditPage = function() {
    console.log("populating info..");
    // re-populate the input fields and stuff on the edit page
    $('#edit_name_input').val($scope.fullName);
    $('#edit_age_input').val($scope.dob);
    $('#edit-profile-bio').val($scope.bio);
    $('#edit_diagnosisDate_input').val($scope.diagnosisDate);
  }

  $scope.editPersonalInfo = function () {
    // editing user info
    myUser.fullName = $('#edit_name_input').val();
    myUser.firstName = myUser.fullName.split(' ')[0];
    myUser.lastName = myUser.fullName.split(' ')[1];

    myUser.age = Math.floor((Date.now() - new Date($('#edit_age_input').val()))/(1000*3600*24*365));

    myUser.married = $('#edit-profile-married:checked').val() == "on";
    myUser.kids = $('#edit-profile-children:checked').val() == "on";

    myUser.bio = $('#edit-profile-bio').val();

    myUser.stage = $scope.stage;

    updateVariables();
  }

  $scope.setStage = function(stage) {
    $scope.stage = stage;
  }

  $scope.setProfileVariables = function() {
    console.log("setting user variables to $scope");

    // adding user info for the first time (and defaults)
    // simply update the values of myUser if they have been changed
    if ($('#name_input').val() != "") {
      myUser.fullName = $('#name_input').val();
      myUser.firstName = myUser.fullName.split(' ')[0];
      myUser.lastName = myUser.fullName.split(' ')[1];
    }
    if ($('#age_input').val() != "") {
      $scope.dob = $('#age_input').val();
      myUser.age = Math.floor((Date.now() - new Date($('#age_input').val()))/(1000*3600*24*365));
    }
    // the myUser.img is set by clicking on preview itself
    if ($('#user_location').val() != "") {
      myUser.location = $('#user_location').val();
    }
    // set from the checkboxes
    myUser.married = $('#profile-married:checked').val() == "on";
    myUser.kids = $('#profile-children:checked').val() == "on";

    // get stage from $scope 
    myUser.stage = $scope.stage;

    myUser.diagnosisDate = $('#diagnosisDate_input').val();
    if ($('#my-profile-bio').val() != "") {
      myUser.bio = $('#my-profile-bio').val();
    }

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

var myUser = new User(0, 'Samantha Stanford', 35, "2016-12", 1, 'I love to be spontaneous with my family. We travel the world and enjoy life to the fullest.', false, false, 'Stanford, CA', 'img/my-photo.png', [],'');
var chp1 = new Story('A Feeling of Getting Breast Cancer', "Because of my mom's breast cancer history, I was concerned about developing the same disease. So I have annual routine mammograms starting 5 years ago. However recently I have underwent a lot of stress. I had felt lumps in my breasts. Sooner or later, I would develop breast cancer I think.", 'September 2, 2016');
var chp2 = new Story('Mammogram Appointment', "My doctor encouraged me to wait to see if I actually developed cancer, but my husband told me seriously last night that he thought I had a lump in my breast. I told him that I had been feeling lumps for a while, but he said it felt larger. “I think you need a mammogram,” he told me. I was due for my annual mammogram, so I made the appointment right away.", 'September 20, 2016');
var chp3 = new Story('The Results of the Test', "BThe results came by mail this morning. No change had been observed, but the report also stated that I had dense breast tissue, which can sometimes make cancer difficult to see.", 'September 27, 2016');
var chp4 = new Story('Breast Began Bleeding...', "I can't fall asleep right now ... My right breast started bleeding! I just called my doctor. Hopefully she will refer me to some breast surgeon near my home tomorrow.", 'October 3, 2016');
var chp5 = new Story('Still Waiting ...?', "The surgeon did an ultrasound yesterday. We saw two areas in my breast that looked suspicious for cancer. I wanted to have the surgery but like my previous physician, the surgeon told me to wait. She wanted to do a biopsy to confirm that the masses were malignant. She said there was time, that the tumors were not going to grow that fast.", 'October 5, 2016');
var chp6 = new Story('Finally, Surgery', "I had a biopsy six weeks ago, and she confirmed that I had breast cancer one week later. She wanted me to have an MRI before going ahead with any surgical procedure. I was certain there was cancer in at least one lymph node but she was not, and an MRI would reveal any other areas of concern. After a series of confirmation, finally she agreed to recommend that I have a bilateral mastectomy. I waited for another four weeks to have the surgery.", 'December 1, 2016');
var chp7 = new Story('Should I Travel for Treatment?', "My friend recommended me a breast cancer center, but I didn’t call right away that day. The location is far away from my home. I have three children, one of whom has cerebral palsy and needs constant care, and I didn’t see how I could logistically travel for treatment. So what was the point in calling?", 'December 3, 2016');

myUser.stories = [chp7, chp6, chp5, chp4, chp3, chp2, chp1];

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
      if ($('#firstchapt-title').val() == '' && $('#firstchapt').val() == '') {
        return;
      }
      newStory = new Story($('#firstchapt-title').val(), $('#firstchapt').val(), 'March 17, 2017');
      myUser.stories = [newStory];
  } else {
      if ($('#chapt-title').val() == '' && $('#chapt').val() == '') {
       return;
      }
      newStory = new Story($('#chapt-title').val(), $('#chapt').val(), 'March 17, 2017');
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

    var renderMyStoryPage = function (myUser) {
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
    renderMyStoryPage(myUser);    // call it on page load - updates will happen by and by

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
            renderMyStoryPage(myUser);
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
        } else if (pageName == 'editing-chapter') {
            $('#footer-menu').hide();
            $('#footer-save').show();
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
        $('.bottom-nav-item').removeClass('nav-selected');
        if (userProfile) {
          $('#local-stories-nav').addClass('nav-selected');
        } else {
          $('#' + pageName + '-nav').addClass('nav-selected');
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
