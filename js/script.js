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

function toggleModal() {
  modal.classList.toggle("show-modal");
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);

function AppendTable(employee) {
  if (employee.picture != null) {
    tableContent = `<tr employee-id=${employee.employeeId}>
    <td>${employee.lastName}</td>
    <td>${employee.firstName}</td>
    <td>${employee.email}</td>
    <td>${employee.gender}</td>
    <td>${employee.birthDate}</td>
<<<<<<< HEAD:js/script.js
    <td><img src="../${employee.picture.name}" width="50" height="60" class="picture"></td>
=======
    <td><img src="${employee.picture}" width="50" height="60" class="picture"></td>
>>>>>>> 5f1453d4b1f4f22008fedc06eee850408bfc507b:script.js
    <td class="delete"> <input type="button" value="Delete Row"></td>
    </tr>`
    console.log(employee);
    document.getElementById("myTable").innerHTML += tableContent;
  } else {
    tableContent = `<tr employee-id=${employee.employeeId}>
    <td>${employee.lastName}</td>
    <td>${employee.firstName}</td>
    <td>${employee.email}</td>
    <td>${employee.gender}</td>
    <td>${employee.birthDate}</td>
    <td></td>
    <td class="delete"> <input type="button" value="Delete Row"></td>
    </tr>`
    console.log(employee);
    document.getElementById("myTable").innerHTML += tableContent;
  }
}

function AddEmployee() {
  lastName = document.getElementById("lname").value;
  firstName = document.getElementById("fname").value;
  email = document.getElementById("email").value;
  gender = document.getElementById("gender").value;
  birthDate = document.getElementById("birthday").value;
  picture = document.getElementById("file-id").files[0];

  validateForm = validate(lastName, firstName, email, gender, birthDate);

  if(validateForm) {
      employeeId = JSON.parse(localStorage.getItem('employeeNextId'));
      allEmployees =  JSON.parse(localStorage.getItem('employees'));
  
      newEmployee = new Employee(employeeId++, lastName, firstName, email, gender, birthDate, picture);
      allEmployees.push(newEmployee);
  
      localStorage.setItem('employeeNextId', JSON.stringify(employeeId));
      localStorage.setItem('employees', JSON.stringify(allEmployees));
  
      AppendTable(newEmployee);
      setDelete();
      clearModal();
  }
}

function Employee(employeeId, lastName, firstName, email, gender, birthDate, picture) {
  this.employeeId = employeeId;
  this.lastName = lastName;
  this.firstName = firstName;
  this.email = email;
  this.birthDate = moment(birthDate).format('D MMMM, YYYY');
  this.gender = gender;
  this.picture= picture;
}

function validate(lastName, firstName, email, sex, birthDate) {

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

      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g;
      if (!regex.test(email)) {
          alert('Email is invalid.');
          return false;
      }
  }

  if (sex == null || sex == "") {
      alert('Gender must be selected.');
      return false;
  }

  if (birthDate == null || birthDate == "") {
      alert('You must enter your birthdate.');
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
      rowToBeDeleted = htmlDeleteElement.target.closest("tr");
      employeeToDeleteId = rowToBeDeleted.getAttribute("employee-id");

      rowToBeDeleted.remove();

      allEmployees = JSON.parse(localStorage.getItem('employees'));
      allEmployees = allEmployees.filter(e => e.employeeId != employeeToDeleteId);

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