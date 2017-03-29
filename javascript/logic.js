  var name = "";
  var role = "";
  var startDate = "";
  var rate = 0;
  var monthsWorked = 0;
  var totalBilled = 0;
  var currentDate = moment().format('L');
  
  $("#submit").on("click", function(event){
  	event.preventDefault();
  	var row = [
  		name = $("#employeeName").val().trim(),
  		role = $("#role").val().trim(),
  		startDate = $("#startDate").val().trim(),
  		monthsWorked = " ",
  		rate = $("#monthlyRate").val().trim(),
  		totalBilled =  " "
  	]

  	var newRow = $("<tr>");
    for(i=0;i<6;i++){
      	var data = $("<td>").text(row[i]);
      	newRow.append(data);
    }; 
    $("#rows").prepend(newRow);
  })