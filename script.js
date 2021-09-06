const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);

var tabContent = new Array();

function addRowToTable() {
  var table = document.getElementById("myTable");
  
  var f =
    '<input type="button" value="Delete Row" onclick="confirmAction();DeleteRowFunction();">';

  if (
    document.getElementById("fname").value.length != 0 &&
    document.getElementById("lname").value.length != 0 &&
    document.getElementById("email").value.length != 0 &&
    validateEmail(document.getElementById("email").value) &&
    document.getElementById("birthday").value.length != 0 
  ) {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    tabContent.push({
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      gender: document.getElementById("gender").value,
      birthday: document.getElementById("birthday").value,
      photo: document.getElementById("file-id").value
    });

    localStorage.setItem("localData", JSON.stringify(tabContent));

    cell1.innerHTML = document.getElementById("fname").value;
    cell2.innerHTML = document.getElementById("lname").value;
    cell3.innerHTML = document.getElementById("email").value;
    cell4.innerHTML = document.getElementById("gender").value;
    var d = document.getElementById("birthday").value;
    var c = moment(d).format("dddd Do MMMM, YYYY");
    cell5.innerHTML = c;    
    cell7.innerHTML = f;
    if (document.getElementById("file-id").files[0] != null)
    {
      var filename = document.getElementById("file-id").files[0].name;
      cell6.innerHTML = `<img src= "${filename}" width="50" height="60">`;
      previewFile();
    }

  } else {
    if (document.getElementById("fname").value.length == 0) {
      alert("Please enter the First Name.");
      return false;
    }
    if (document.getElementById("lname").value.length == 0) {
      alert("Please enter the Last Name.");
      return false;
    }
    if (document.getElementById("email").value.length == 0 || validateEmail(document.getElementById("email").value) == false) {
      alert("Please enter a valid Email.");
      return false;
    }
    if (document.getElementById("birthday").value == "") {
      alert("Please enter the Birthday.");
      return false;
    }
  }
}

function validateEmail(email) 
{
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function DeleteRowFunction() {
  var td = event.target.parentNode;
  var tr = td.parentNode; // the row to be removed
  tr.parentNode.removeChild(tr);
}

function sortNames() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function previewFile() {
  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function confirmAction() {
  return confirm('Are you sure you want to delete this item?');
}