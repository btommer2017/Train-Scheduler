 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBq3VqIfo8m6XMD8VBLbrT8VltsvTfJziI",
 authDomain: "train-scheduler-e1b0b.firebaseapp.com",
 databaseURL: "https://train-scheduler-e1b0b.firebaseio.com",
 projectId: "train-scheduler-e1b0b",
 storageBucket: "train-scheduler-e1b0b.appspot.com",
 messagingSenderId: "700299089423"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding new train information
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

// Grabs user input
var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var firstTrainDepartTime = moment($("#firstDepart-input").val().trim(), "HH:mm").format("HH:mm");
var tFrequency = $("#frequency-input").val().trim();

// Creates local "temporary" object for holding train information
var newTrain = {
 name: trainName,
 destination: trainDestination,
 firstDepart: firstTrainDepartTime,
 frequency: tFrequency
};
console.log(newTrain);
// Logs everything to console
console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
console.log("everything logged to console");
console.log("name " + newTrain.name);
console.log("destination " + newTrain.destination);
console.log("first depart " + newTrain.firstDepart);
console.log("frequency " + newTrain.frequency);

database.ref().push(newTrain);
// Alert
alert("Train Information Successfully Added");

// Clears  text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#firstDepart-input").val("");
$("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
 
 console.log(childSnapshot.val() + " child snapshot");
 
 // Store everything into a variable.
 var trainName = childSnapshot.val().name;
 console.log("train name " + trainName);
 var trainDestination = childSnapshot.val().destination;
 console.log("destination " + trainDestination);
 var firstTrainDepartTime = childSnapshot.val().firstDepart;
 console.log("first depart " + firstTrainDepartTime);
 var tFrequency = childSnapshot.val().frequency;
 console.log("frequency " + tFrequency);
   
var randomDate = firstTrainDepartTime;
console.log ("variable randomDate = " + randomDate)
var randomFormat = "HH:mm";
var convertedDate = moment(randomDate, randomFormat);
console.log ("variable convertedDate = " + convertedDate)

// Push train data to the database
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTrainDepartTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);
// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);
// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log("tRemainder = " + tRemainder);
// Minutes Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
var nextTrainPretty =  moment(nextTrain).format("HH:mm");

$("#train-table > tbody").append("<tr><td>" + trainDestination + "</td><td>" + trainName + "</td><td>" +
 tFrequency + "</td><td>" + firstTrainDepartTime + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
  