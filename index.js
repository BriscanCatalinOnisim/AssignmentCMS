import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {getFirestore, doc, setDoc, deleteDoc, getDocs, collection, query, where, orderBy} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";


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
var employeesTable = document.getElementById('myTable');

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

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

function ReadData() {

  querySnapshot.forEach(element => {
    employeeId++;
    var firstName = element.data()["firstname"];
    var lastName = element.data()["lastname"];
    var email = element.data()["email"];
    var gender = element.data()["gender"];
    var birthday = element.data()["birthday"];
    var date = moment(birthday).format('D MMMM, YYYY'); 
    
    validate(lastName,firstName, email,gender,date);
 
    var table=document.getElementById('myTable');
    var row=table.insertRow();
    row.className="bottom-row";
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    var cell5=row.insertCell(4);
    var cell7=row.insertCell(5);
    cell1.innerHTML=lastName;
    cell2.innerHTML=firstName;
    cell3.innerHTML=email;
    cell4.innerHTML=gender;
    cell5.innerHTML=date; 
    cell7.innerHTML='<input type="button" class="delete-button fa fa-remove" id="deleteButton" value="X">'
    var drop=document.getElementsByClassName("delete-button");
    var currentid=employeeId;
    drop[row.rowIndex-1].addEventListener("click", async function(){
      DeleteMember(row, currentid);
    });
    clearModal();
  
  }); 
}
ReadData();

function AddEmployeeInDatabase(lastname, firstname, email, gender, birthday) {
  var id = employeeId;
  setDoc(doc(membersRef, `${id}`),{
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
  employeeId++;
  var lastName = document.getElementById("lname").value;
  var firstName = document.getElementById("fname").value;
  var email = document.getElementById("email").value;
  var gender = document.getElementById("gender").value;
  var birthday = document.getElementById("birthday").value;
  var date = moment(birthday).format('D MMMM, YYYY');
  var validateForm = validate(lastName, firstName, email, gender, date);

  if(validateForm) {
    var table=document.getElementById('myTable');
    var row=table.insertRow();
    row.className="bottom-row";
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    var cell5=row.insertCell(4);
    var cell7=row.insertCell(5);
    cell1.innerHTML=lastName;
    cell2.innerHTML=firstName;
    cell3.innerHTML=email;
    cell4.innerHTML=gender;
    cell5.innerHTML=date; 
    cell7.innerHTML='<input type="button" class="delete-button fa fa-remove" id="deleteButton" value="X">'
    var drop=document.getElementsByClassName("delete-button");
    var currentid=employeeId;
    drop[row.rowIndex-1].addEventListener("click", async function(){
      DeleteMember(row, currentid);
    });

    AddEmployeeInDatabase(lastName, firstName, email, gender, birthday);
    clearModal();
  }
}

function AddEmployeeSort(employee) {
  var lastName = employee.lastName;
  var firstName = employee.firstName;
  var email = employee.email;
  var gender = employee.gender;
  var birthday = employee.birthday;
  var date = moment(birthday).format('D MMMM, YYYY');

  var table=document.getElementById('myTable');
  var row=table.insertRow();
  row.className="bottom-row";
  var cell1=row.insertCell(0);
  var cell2=row.insertCell(1);
  var cell3=row.insertCell(2);
  var cell4=row.insertCell(3);
  var cell5=row.insertCell(4);
  var cell7=row.insertCell(5);
  cell1.innerHTML=lastName;
  cell2.innerHTML=firstName;
  cell3.innerHTML=email;
  cell4.innerHTML=gender;
  cell5.innerHTML=date; 
  cell7.innerHTML='<input type="button" class="delete-button fa fa-remove" id="deleteButton" value="X">'
  var drop=document.getElementsByClassName("delete-button");
  drop[row.rowIndex-1].addEventListener("click", async function(){
    var currentid=employee.employeeId;
    DeleteMember(row, currentid);
  });
}

function DeleteMemberFromDatabase(currentid){
  deleteDoc(doc(db, "users", `${currentid}`));
}

function DeleteMember(row, currentid){
  if (confirmAction() == true)
  {
    var table=document.getElementById('myTable');
    var id=row.rowIndex;
    table.deleteRow(id);
    DeleteMemberFromDatabase(currentid);
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

const sort = document.querySelector(".sort");
sort.addEventListener("click", sortTable);

function removeDataFromViewTable(employeesTable) {
  for (var i = employeesTable.childNodes[1].childElementCount - 1; i > 0; i--) {
    console.log("fsdgfxcg");
    employeesTable.deleteRow(i);
  }
}

function Employee(employeeId, firstName, lastName, email, gender, birthday) {
  this.employeeId = employeeId;
  this.lastName = lastName;
  this.firstName = firstName;
  this.email = email;
  this.birthday = moment(birthday).format("D MMMM, YYYY");
  this.gender = gender;
}

function putData(querySnapshot) {
  removeDataFromViewTable(employeesTable);

  querySnapshot.forEach(element => {
      var employee = new Employee(
        element.data()["employeeId"],
        element.data()["firstname"],
        element.data()["lastname"],
        element.data()["email"],
        element.data()["gender"],
        element.data()["birthday"]
      ); 
      AddEmployeeSort(employee);
    });
}

async function sortTable() {
  var sortBy = document.getElementById("sortBy").value;
  var sortType = document.getElementById("sortType").value;
  console.log(sortBy);
  removeDataFromViewTable(employeesTable);
  if (sortBy == "name") {
    if (sortType == "asc") {
      const q = query(
        collection(db, "users"),
        orderBy("lastname", "asc")
      );
      const querySnapshot = await getDocs(q);
      document.getElementById("employeesTableBody").innerHTML = "";
      putData(querySnapshot);
    } else {
      const q = query(
        collection(db, "users"),
        orderBy("lastname", "desc")
      );
      const querySnapshot = await getDocs(q);
      document.getElementById("employeesTableBody").innerHTML = "";
      console.log(querySnapshot);
      putData(querySnapshot);
    }
  } else if (sortBy == "birthday") {
    if (sortType == "asc") {
      const q = query(
        collection(db, "users"),
        orderBy("birthday", "asc")
      );
      const querySnapshot = await getDocs(q);
      document.getElementById("employeesTableBody").innerHTML = "";
      putData(querySnapshot);
    } else {
      const q = query(
        collection(db, "users"),
        orderBy("birthday", "desc")
      );
      const querySnapshot = await getDocs(q);
      document.getElementById("employeesTableBody").innerHTML = "";
      putData(querySnapshot);
    }
  }
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