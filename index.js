import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBNrTJHeSqL8sO6ovgQnK3ScDpAfanfP2s",
  authDomain: "cmsproject-a361d.firebaseapp.com",
  projectId: "cmsproject-a361d",
  storageBucket: "cmsproject-a361d.appspot.com",
  messagingSenderId: "49667853298",
  appId: "1:49667853298:web:b28dbba5e12aae6ae3396b",
  measurementId: "G-2V968GRRV8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const querySnapshot = await getDocs(collection(db, "users"));
const membersRef = collection(db, "users");

function WriteMember(){
  var i=0;
  querySnapshot.forEach(element => {
    console.log(element.data()["firstname"]);
    console.log(element.data()["lastname"]);
    console.log(element.data()["email"]);
    console.log(element.data()["gender"]);
    console.log(element.data()["birthday"]);
    console.log(element.data()["file-id"]);
  });
}

WriteMember();


window.onload = () =>{

  document.getElementById("add-employee-button").addEventListener("click", AddEmployee, false);

  currentEmployees = JSON.parse(localStorage.getItem('employees'));

  if (currentEmployees == undefined)
  {
      localStorage.setItem('employees', JSON.stringify([]));
      localStorage.setItem('employeeNextId', JSON.stringify(0));
  }
  else
  {
      currentEmployees.forEach(e => {
          AppendTable(e);
      });
  }

  setDelete();
}


const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
var employeeId = 0;
function toggleModal() {
  modal.classList.toggle("show-modal");
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);


function ReadData() {

  querySnapshot.forEach(element => {
    employeeId++;
    var firstName = element.data()["firstname"];
    var lastName = element.data()["lastname"];
    var email = element.data()["email"];
    var gender = element.data()["gender"];
    var birthday = moment(birthday).format('D MMMM, YYYY'); 
    var picture = element.data()["file-id"];
    
    validate(lastName,firstName, email,gender,birthday,picture);
 
    var table=document.getElementById('myTable');
    var row=table.insertRow();
    row.className="bottom-row";
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    var cell5=row.insertCell(4);
    var cell6=row.insertCell(5);
    var cell7=row.insertCell(6);
    cell1.innerHTML=lastName;
    cell2.innerHTML=firstName;
    cell3.innerHTML=email;
    cell4.innerHTML=gender;
    cell5.innerHTML=birthday; 
    if (picture != null) {
      cell6.innerHTML='<td><img src=' + picture.name + ' width="50" height="60" class="picture"></td>';
    }
    cell7.innerHTML='<td class="delete"> <input type="button" value="Delete Row"></td>';

    setDelete()
    clearModal();
  
  }); 
}
ReadData();

function AddEmployeeInDatabase(lastname, firstname, email, gender, birthday) {
  var id = employeeId++;
  setDoc(doc(membersRef),{
    firstname: lastname,
    lastname: firstname,
    email: email,
    gender: gender,
    birthday: moment(birthday).format('D MMMM, YYYY'),
    id: id
  });
}

document.getElementById("add-employee-button").addEventListener("click", async function(){
  AddEmployee();
});

function AddEmployee() {
  var lastName = document.getElementById("lname").value;
  var firstName = document.getElementById("fname").value;
  var email = document.getElementById("email").value;
  var gender = document.getElementById("gender").value;
  var birthday = document.getElementById("birthday").value;
  var picture = document.getElementById("file-id").files[0];

  var validateForm = validate(lastName, firstName, email, gender, birthday);

  if(validateForm) {
    var table=document.getElementById('myTable');
    var row=table.insertRow();
    row.className="bottom-row";
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    var cell5=row.insertCell(4);
    var cell6=row.insertCell(5);
    var cell7=row.insertCell(6);
    cell1.innerHTML=lastName;
    cell2.innerHTML=firstName;
    cell3.innerHTML=email;
    cell4.innerHTML=gender;
    cell5.innerHTML=birthday; 
    cell6.innerHTML='<td><img src= ' + picture.name + ' width="50" height="60" class="picture"></td>';
    cell7.innerHTML='<td class="delete"> <input type="button" value="Delete Row"></td>';

    AddEmployeeInDatabase(lastName, firstName, email, gender, birthday);
    setDelete();
    clearModal();
  }
}

function validate(lastName, firstName, email, sex, birthday) {

  if (lastName == null || lastName == "") {
      alert('Last name is required.');
      return false;
  }

  if (firstName == null || firstName == "") {
      alert('First name is required.');
      return false;
  }

  if (email == null || email == "") {
      alert('Email is required.');
      return false;
  } else {
      if (validateEmail(email) == false) {
          alert('Email is invalid.');
          return false;
      }
  }

  if (sex == null || sex == "") {
      alert('Gender must be selected.');
      return false;
  }

  if (birthday == null || birthday == "") {
      alert('You must enter your birthday.');
      return false;
  }
  return true;
}

function validateEmail(email) 
{
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

//Clear modal after adding new employee
function clearModal() {
  document.getElementById("lname").value = '';
  document.getElementById("fname").value = '';
  document.getElementById("email").value = '';
  document.getElementById("gender").value = '';
  document.getElementById("birthday").value = '';
  document.getElementById("file-id").value = '';
}

function setDelete() {
  document.querySelectorAll(".delete").forEach(e => {
      e.addEventListener("click", deleteEmployeeRow, false);
  });
}

//Delete employee function
function deleteEmployeeRow(htmlDeleteElement) {
  if (confirm('Are you sure to delete this employee ?')) {
      var rowToBeDeleted = htmlDeleteElement.target.closest("tr");
      var employeeToDeleteId = rowToBeDeleted.getAttribute("employee-id");

      rowToBeDeleted.remove();

      var allEmployees = JSON.parse(localStorage.getItem('employees'));
      var allEmployees = allEmployees.filter(e => e.employeeId != employeeToDeleteId);

      localStorage.setItem('employees', JSON.stringify(allEmployees));
  }
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