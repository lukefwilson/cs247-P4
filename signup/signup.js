var name; var age; var filename;
var marital; var kid;
var stage; var diagnose;
var firstchTitle; var firstch;
function gofamily(){
	name = document.getElementById('name_input').value;
	age = document.getElementById('age_input').value;
	filename = document.getElementById('file-upload').value;
	window.location = "family.html" ;
}

function gobackfamily(){
	window.location = "signup.html" ;
}

function gomedical(){
	window.location = "medical.html" ;
}

function gobackmedical(){
	window.location = "family.html" ;
}

function gowrite(){
	stage = document.getElementById('stage_input').value;
	diagnose = document.getElementById('diagnose_input').value;
	window.location = "write.html" ;
}

function gobackwrite(){
	window.location = "medical.html" ;
}

function gotag(){
	firstchTitle = document.getElementById('firstchapt-title').value;
	firstch = document.getElementById('firstchapt').value;
	// window.location = "tag.html" ;
}

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