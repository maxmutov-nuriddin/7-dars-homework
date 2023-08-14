let groupsFilter = document.querySelector(".position-filter");
let marriedFilter = document.querySelector(".married-filter");
let salaryFilter = document.querySelector(".salary-filter");
let groupsSelect = document.querySelector(".position-select");
let typePosition = document.querySelector(".typePosition-select");
let studentForm = document.querySelector(".student-form");
let saveBtn = document.querySelector(".save-btn");
let studentModal = document.querySelector("#studentModal");
let studentsTableBody = document.querySelector(".students-table tbody");
let openModalBtn = document.querySelector(".open-modal-btn");
let studentSearch = document.querySelector(".student-search");
let monySalary = document.getElementById('salary')
let married = document.getElementById('isMarried')
groupsFilter.innerHTML = `<option value="all">All</option>`;
marriedFilter.innerHTML = `<option value="all">All</option>`;
salaryFilter.innerHTML = `<option value="all">All</option>`;

TypePosition.map((tp) => {
  groupsFilter.innerHTML += `<option value="${tp}">${tp}</option>`;
  typePosition.innerHTML += `<option value="${tp}">${tp}</option>`;
});

isMarrieds.map((im) => {
  marriedFilter.innerHTML += `<option value="${im}">${im ? "Married" : "Not married"}</option>`;
});

salaries.map((s) => {
  salaryFilter.innerHTML += `<option value="${s}">${s}</option>`
});

positions.map((p) => {
  groupsSelect.innerHTML += `<option value="${p}">${p}</option>`
})

let studentsJson = localStorage.getItem("students");

let students = JSON.parse(studentsJson) || [];

let selected = null;

let search = "";

let levelPosition = "all";
// console.log(levelPosition);
let yourSalary = "all";


studentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let elements = this.elements;

  let allDataPersons = {
    firstName: elements.firstName.value,
    lastName: elements.lastName.value,
    address: elements.address.value,
    birthDay: elements.birthDay.value,
    workPosition: groupsSelect.value,
    levelPosition: typePosition.value,
    yourSalary: monySalary.value,
    marriedS: married.checked,
  }
  // console.log(allDataPersons.marriedS);

  if (this.checkValidity()) {
    bootstrap.Modal.getInstance(studentModal).hide();
    if (selected == null) {
      students.push(allDataPersons);
    } else {
      students[selected] = allDataPersons;
    }
    localStorage.setItem("students", JSON.stringify(students));
    getStudents();
  } else {
    this.classList.add("was-validated");
  }
  // console.log(students);
});
function getStudentRow({
  firstName,
  lastName,
  address,
  birthDay,
  workPosition,
  levelPosition,
  yourSalary,
  marriedS
}, i) {
  return `
      <tr>
        <th scope="row">${i + 1}</th>
        <td scope="col">${firstName}</td>
        <td scope="col">${lastName}</td>
        <td scope="col">${address}</td>
        <td scope="col">${birthDay}</td>
        <td scope="col">${workPosition}</td>
        <td scope="col">${levelPosition}</td>
        <td scope="col">${yourSalary}</td>
        <td scope="col">${marriedS ? "Married" : "not married"}</td>
        <td scope="col" class="text-end">
          <button onClick="editStudent(${i})" class="btn btn-primary mr-3" data-bs-toggle="modal" data-bs-target="#studentModal">Edit</button>
          <button class="btn btn-danger" onClick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>
    `;
}

function getStudents() {
  let results = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(search) ||
      student.lastName.toLowerCase().includes(search)
  );

  if (levelPosition !== "all") {
    results = results.filter((student) => student.levelPosition === levelPosition);
    console.log(results);
  }

  if (married !== "all") {
    const isMarried = married === "true";
    results = results.filter((student) => {
      // console.log(student.marriedS);
      if (isMarried) {
        // console.log(student.marriedS);
        return student.marriedS === true;
      } else {
        // console.log(student.marriedS);
        return student.marriedS === false || !student.marriedS;
      }
    });
  }

  let selectedSalary = salaryFilter.value;
  if (selectedSalary === "up") {
    results.sort((a, b) => a.yourSalary - b.yourSalary);
  } else if (selectedSalary === "down") {
    results.sort((a, b) => b.yourSalary - a.yourSalary);
  }


  studentsTableBody.innerHTML = "";

  if (results.length === 0) {
    studentsTableBody.innerHTML = "No personal information available";
  } else {
    results.map((student, i) => {
      studentsTableBody.innerHTML += getStudentRow(student, i);
    });
  }
}

getStudents();

function editStudent(i) {
  selected = i;
  saveBtn.textContent = "Save student";

  let {
    firstName,
    lastName,
    address,
    birthDay,
    workPosition,
    levelPosition,
    yourSalary,
    marriedS
  } = students[i];
  let elements = studentForm.elements;
  elements.firstName.value = firstName;
  elements.lastName.value = lastName;
  elements.address.value = address;
  elements.birthDay.value = birthDay;
  groupsSelect.value = workPosition;
  typePosition.value = levelPosition;
  monySalary.value = yourSalary;
  married.checked = marriedS;
}

openModalBtn.addEventListener("click", () => {
  selected = null;
  saveBtn.textContent = "Add person";

  let elements = studentForm.elements;
  elements.firstName.value = "";
  elements.lastName.value = "";
  elements.address.value = "";
  elements.birthDay.value = "";
  groupsSelect.value = "ReactJs Developer";
  typePosition.value = "junior";
  monySalary.value = "";
  married.checked = false;
});

function deleteStudent(i) {
  let isDelete = confirm("Do you want to delete this person ?");
  if (isDelete) {
    students.splice(i, 1);
    localStorage.setItem("students", JSON.stringify(students));
    getStudents();
  }
}

studentSearch.addEventListener("keyup", function () {
  search = this.value.trim().toLowerCase();
  getStudents();
});

groupsFilter.addEventListener("change", function () {
  levelPosition = this.value;
  getStudents();
  console.log(levelPosition);
});

marriedFilter.addEventListener("change", function () {
  married = this.value;
  getStudents();
});

salaryFilter.addEventListener("change", function () {
  selectedSalary = this.value;
  getStudents();
});