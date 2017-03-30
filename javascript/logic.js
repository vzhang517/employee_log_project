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
  
    name = $("#employeeName").val().trim();
    role = $("#role").val().trim();
    // using moment to grab start date user submitted in order to be able to calculate months worked
    start = moment($("#startDate").val().trim(), "DD/MM/YY").format("X");
    console.log("start" + start);
    //using .diff to subtract start date from current date, we want the result in months, turn result to an integer
    
    rate = parseInt($("#monthlyRate").val().trim());
  
   console.log(start)

    database.ref().push({
        name: name,
        role: role,
        start: start,
        rate: rate,  
        dateAdded: firebase.database.ServerValue.TIMESTAMP
});
  });


database.ref().on("child_added", function(Snapshot) {
    var start= Snapshot.val().start;
  
  // function(){
    monthsWorked= moment().diff(moment.unix(start, "X"), "months");
    totalBilled= monthsWorked* Snapshot.val().rate;
    
    var newDate=moment.unix(start).format("MM/DD/YY");

  


$("#rows").append("<tr><td>" + Snapshot.val().name + "</td><td>" + Snapshot.val().role + "</td><td>" +  newDate + "</td><td>" + monthsWorked  +"</td><td>" +  Snapshot.val().rate + "</td><td>" + totalBilled  +"</td></tr>");
});
