var addexpbutton = document.getElementById("addexpbutton")
var currentrow=null
var amountinput = document.getElementById("amount")
var expenses=JSON.parse(localStorage.getItem("expenses")) || []

amountinput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        addexpbutton.click()
    }
})
function savedata(){
    localStorage.setItem("expenses",JSON.stringify(expenses))
}
function displayitems(){
    var exptable=document.getElementById("exptable")
    exptable.innerHTML = `
    <tr>
        <th>Date</th>
        <th>Type of expense</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Action</th>
    </tr>
    `;
     if (expenses.length == 0) {
  exptable.innerHTML+='<tr><td colspan="5" id="noexpdata">📋No Expenses till Now!</td></tr>'
  update()
  return
}

expenses.forEach(function (expense, index) {
        var row = document.createElement("tr");
        row.innerHTML =
            "<td>" + expense.date + "</td>" +
            "<td>" + expense.type + "</td>" +
            "<td>" + expense.description + "</td>" +
            "<td>" + expense.amount + "</td>" +
            "<td>" +
            "<button class='editbtn'>Edit</button>" +
            "<button class='deletebtn'>Delete</button>" +
            "</td>";
        
        row.querySelector(".editbtn").addEventListener("click", function () {
            editExpense(index);
            });
        
        row.querySelector(".deletebtn").addEventListener("click", function () {
                deleteExpense(index);
            });
        exptable.append(row);

    });
    update()
}

addexpbutton.addEventListener("click", function () {
    var typeofexpense = document.getElementById("typeofexpense").value
    var date = document.getElementById("date").value
    var description = document.getElementById("description").value
    var amount = document.getElementById("amount").value
    if(typeofexpense=="" || typeofexpense=="Select"){
    alert("Please fill the type of expense")
    return
}
if(date==""){
    alert("Please fill the date")
    return
}
if(description==""){
    alert("Please fill in the description")
    return
}
if(amount==""){
    alert("Please fill the amount")
    return
}

var expense={
    date:date,
    type:typeofexpense,
    description:description,
    amount:amount
}
 if (currentrow != null) {
        expenses[currentrow] = expense;
        currentrow = null;
        addexpbutton.textContent = "Add Item";
    }
    else {
        expenses.push(expense);
    }
savedata()
displayitems()
document.getElementById("typeofexpense").value = "Select"
document.getElementById("date").value = ""
document.getElementById("description").value = ""
document.getElementById("amount").value = ""
document.getElementById("typeofexpense").focus()
})
function deleteExpense(index){
    expenses.splice(index,1)
    savedata()
    displayitems()
}
   
function editExpense(index){

    var expense = expenses[index];

    document.getElementById("typeofexpense").value = expense.type;
    document.getElementById("date").value = expense.date;
    document.getElementById("description").value = expense.description;
    document.getElementById("amount").value = expense.amount;

    currentrow = index;
    addexpbutton.textContent = "Update";
}


function update() {
    var creditcardtot = 0;
    var gpaytot = 0;
    var netbankingtot = 0;
    var cashtot = 0;
    expenses.forEach(function (expense) {
        if (expense.type == "Credit Card") {
            creditcardtot += Number(expense.amount);
        }
        else if (expense.type == "Gpay") {
            gpaytot += Number(expense.amount);
        }
        else if (expense.type == "Netbanking") {
            netbankingtot += Number(expense.amount);
        }
        else if (expense.type == "Cash") {
            cashtot += Number(expense.amount);
        }
    });
    var total = creditcardtot +gpaytot +netbankingtot +cashtot;
    document.getElementById("creditcardtot").textContent ="₹" + creditcardtot;
    document.getElementById("gpaytot").textContent ="₹" + gpaytot;
    document.getElementById("netbankingtot").textContent = "₹" + netbankingtot;
    document.getElementById("cashtot").textContent ="₹" + cashtot;
    document.getElementById("total").textContent = "₹" + total;
}


var exportbtn = document.getElementById("export")

exportbtn.addEventListener("click", function () {

    var csv = ""

    function addCategory(category) {

        csv += category + "\n";
        csv += "Date,Description,Amount\n";

        expenses.forEach(function (expense) {

            if (expense.type == category) {

                csv += expense.date + ",";
                csv += expense.description + ",";
                csv += expense.amount + "\n";

            }

        });

        csv += "\n";

    }

        

    

    addCategory("Credit Card")
    addCategory("Gpay")
    addCategory("Netbanking")
    addCategory("Cash")

    var blob = new Blob([csv], { type: "text/csv" })

    var link = document.createElement("a")

    link.href = URL.createObjectURL(blob)

    link.download = "House_Expenses.csv"

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

})
displayitems()
var darkmode=document.querySelector(".dark")
var darkbtn=document.getElementById("darkmode")
darkbtn.addEventListener("click",function(){

    document.body.classList.toggle("dark")

 if(document.body.classList.contains("dark")){
        darkbtn.textContent="☀️ "
    }
    else{
        darkbtn.textContent="🌙"
    }
})
