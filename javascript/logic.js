   var config = {
    apiKey: "AIzaSyBEI69G5O1qcTJ5-HWbUNSO5Da1b3Kwcqk",
    authDomain: "employee-log-project.firebaseapp.com",
    databaseURL: "https://employee-log-project.firebaseio.com",
    storageBucket: "employee-log-project.appspot.com",
    messagingSenderId: "595982056233"
  };
  firebase.initializeApp(config);

  var database= firebase.database();

  var name = "";
var role = "";
var start = "";
var rate = 0;
var monthsWorked = 0;
var totalBilled = 0;
var currentDate = moment().format('MM/DD/YY');


$("#submit").on("click", function(event){
  event.preventDefault();
  // adding user input into an array called row
  var row = [
    name = $("#employeeName").val().trim(),
    role = $("#role").val().trim(),
    // using moment to grab start date user submitted in order to be able to calculate months worked
    start = moment($("#startDate").val().trim()).format('MM/DD/YY'),
    //using .diff to subtract start date from current date, we want the result in months, turn result to an integer
    
    rate = parseInt($("#monthlyRate").val().trim()),
   
  ]
   

    database.ref().push({
        name: name,
        role: role,
        start: start,
        rate: rate,  
        dateAdded: firebase.database.ServerValue.TIMESTAMP
});
  });


database.ref().on("child_added", function(Snapshot) {
  // var totalBilled="";
  // var monthsWorked=0;
  
  // function(){
    monthsWorked= parseInt(moment().diff(moment(Snapshot.val().start), 'months'));
    totalBilled= monthsWorked* Snapshot.val().rate;
    console.log(monthsWorked)
    console.log(totalBilled);

  


$("#rows").append("<tr><td>" + Snapshot.val().name + "</td><td>" + Snapshot.val().role + "</td><td>" +  Snapshot.val().start + "</td><td>" + monthsWorked  +"</td><td>" +  Snapshot.val().rate + "</td><td>" + totalBilled  +"</td></tr>");
});
