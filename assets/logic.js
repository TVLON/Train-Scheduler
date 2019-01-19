var config = {
	apiKey: "AIzaSyDeTT_SzNuJtG1FFIBkVj71hD79KPDNnvA",
    authDomain: "train-scheduler-c56ff.firebaseapp.com",
    databaseURL: "https://train-scheduler-c56ff.firebaseio.com",
    projectId: "train-scheduler-c56ff",
    storageBucket: "train-scheduler-c56ff.appspot.com",
    messagingSenderId: "1078119347193"
};
firebase.initializeApp(config);

var database = firebase.database();

var nameOfTrain = "";
var destination = "";
var firsttime = "";
var frequency = "";

$("#addatrain").on("click", function(event){
event.preventDefault();

nameOfTrain = $("#train-input").val().trim();
destination = $("#destination-input").val().trim();
firsttime = $("#firsttrain-input").val().trim();
frequency = $("#frequency-input").val().trim();

$("#train-input").val("");
$("#destination-input").val("");
$("#firsttrain-input").val("");
$("#frequency-input").val("");


database.ref().push({
	nameOfTrain: nameOfTrain,
	destination: destination,
	firsttime: firsttime,
	frequency: frequency
});	
console.log("hit")
});

$(document).ready(function() {
var now = moment();
$("#displayNow").text(now.format("lll"));

});

database.ref().on("child_added", function(childSnapshot) {

nameOfTrain = childSnapshot.val().nameOfTrain;

destination = childSnapshot.val().destination;

firsttime = childSnapshot.val().firsttime;

frequency = childSnapshot.val().frequency;


var firsttimeMoment = moment(firsttime, "HH:mm");	

var currenttime = moment();


var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');

var minuteRemainder = minuteArrival % frequency;

var awayTrain = frequency - minuteRemainder;


var nextArrival = currenttime.add(awayTrain, 'minutes');
var arrivaltime = nextArrival.format("HH:mm");

$("#AddTrain").append("<tr><td>" + nameOfTrain + "</td><td>" + destination
 + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

});