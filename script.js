(()=>{
  const addStudentBtn = document.getElementById('btn__add-student');
  const tBody = document.getElementById('table__body');
  const formUser = document.getElementById('form__users');
  const error = document.createElement('p');
  const sortName = document.getElementById('name__student-btn');
  const sortFaculty = document.getElementById('faculty__student-dtn');
  const sortDateBirthday = document.getElementById('datebirthday__student-btn');
  const sortYear = document.getElementById('years__study-btn');
  const filterName = document.getElementById('filter__byname');
  const filterFaculty = document.getElementById('filter__fuculty');
  const filterYear = document.getElementById('filter__year-start');
  const filterYearEnd = document.getElementById('filter__year-end');


  let flagSortName = true;
  let flagSortFaculty = true;
  let flagSortBirthday = true;
  let flagSortYear = true;
  error.classList.add('error__mas');
  const nowDate = new Date();
  let listStudent = [];
  let listSortStudent = [];
  let listFilterStudent = [];
  let errorMessge = '';
  function addStudent() {
    const name = document.getElementById("field__name-input").value.trim();
    const secondName = document.getElementById("field__secondname-input").value.trim();
    const patronymic = document.getElementById("field__patronymic-input").value.trim();
    const dateBird = document.getElementById("field__birthday-input").valueAsDate;
    const yearStart = document.getElementById("field__startlern-input").value.trim();
    const faculty = document.getElementById("field__faculty-input").value.trim();

    let student = {
      name,
      secondName,
      patronymic,
      dateBird,
      yearStart,
      faculty
    }

    validation(student);
    paintTable(listStudent);
  }

  function deleteTable() {
    tBody.innerHTML = '';
  }

  function validation(student) {
    if(student.name === ''){
      errorMessge += "Не указано имя студента<br>";
    }
    if(student.secondName === '') {
      errorMessge += "Не указана фамилия студента<br>";
    }
    if(student.patronymic === ''){
      errorMessge += "Не указано отчество студента<br>";
    }
    if(student.dateBird === null){
      errorMessge += "Не указана дата рождения студента<br>";
    }
    if(student.yearStart === '') {
      errorMessge += "Не указано начало обучения студента<br>";
    }
    if(student.faculty === '') {
      errorMessge += "Не указано название факультета студента<br>";
    }

    const yearBird = student.dateBird === null ? '' :student.dateBird.getFullYear();
    const yearStartLearn = +student.yearStart;
    if(yearBird >= nowDate.getFullYear() || yearBird < 1900){
      errorMessge += "Дата рождения должна быть в диапазоне от 1900 года по текущий год<br>";
    }

    if(yearStartLearn > nowDate.getFullYear() || yearStartLearn < 2000) {
      errorMessge += "Дата начала обучения должна быть в диапазоне от 2000 года по текущий год<br>";
    }


    if(errorMessge!== '') {
      error.innerHTML = errorMessge;
      formUser.append(error);
      errorMessge = '';
      return;
    }
    else {
      error.remove();
    }
    document.getElementById("field__name-input").value = '';
    document.getElementById("field__secondname-input").value = '';
    document.getElementById("field__patronymic-input").value = '';
    document.getElementById("field__birthday-input").value = '';
    document.getElementById("field__startlern-input").value = '';
    document.getElementById("field__faculty-input").value = '';
    listStudent.push(student);
  }

  function paintTable(listStudent) {
    deleteTable();
    for(const student in listStudent){
      let row = document.createElement('tr');
      let id = document.createElement('th');
      let colFIOTemp = document.createElement('td');
      let facultyTemp = document.createElement('td');
      let dateBirdTemp = document.createElement('td');
      let yearStartTemp = document.createElement('td');

      id.textContent = +student + 1;
      colFIOTemp.textContent = listStudent[student].secondName +' '+ listStudent[student].name +' '+ listStudent[student].patronymic;
      facultyTemp.textContent = listStudent[student].faculty
      dateBirdTemp.textContent = `${listStudent[student].dateBird.getDate()}.${listStudent[student].dateBird.getUTCMonth() + 1}.${listStudent[student].dateBird.getUTCFullYear()} (${getAge(listStudent[student].dateBird)})`;
      yearStartTemp.textContent = `${listStudent[student].yearStart} - ${+listStudent[student].yearStart + 4} (${getStatusLearn(listStudent[student].yearStart)})`;

      row.append(id);
      row.append(colFIOTemp);
      row.append(facultyTemp);
      row.append(dateBirdTemp);
      row.append(yearStartTemp);
      tBody.append(row);
    }
  }

  function getAge(date) {
    let age = nowDate.getFullYear() - date.getFullYear();
    const month = nowDate.getMonth() - date.getMonth();
    const day = nowDate.getDate() - date.getDate();
    if((month === 0 && day < 0) || month < 0){
      age--;
    }
    return age;
  }

  function getStatusLearn(date) {
    const month = nowDate.getMonth() - 8;
    let curs = nowDate.getFullYear() - date;

    if(month < 0 && curs <= 4){
      return curs
    }
    return 'Закончил';
  }

  function sortByName() {
    listSortStudent = [...listStudent];
    if(flagSortName){
      listSortStudent.sort((a,b)=>
      (a.secondName+' '+ a.name+' '+ a.patronymic > b.secondName+' '+ b.name+' '+ b.patronymic) ?
      1 : (b.secondName+' '+ b.name+' '+ b.patronymic > a.secondName+' '+ a.name+' '+ a.patronymic) ?
      -1 : 0);
      flagSortName = false;
    }
    else {
      listSortStudent.sort((a,b)=>
      (a.secondName+' '+ a.name+' '+ a.patronymic < b.secondName+' '+ b.name+' '+ b.patronymic) ?
      1 : (b.secondName+' '+ b.name+' '+ b.patronymic < a.secondName+' '+ a.name+' '+ a.patronymic) ?
      -1 : 0);
      flagSortName = true;
    }
    paintTable(listSortStudent)
  }

  function sortByFaculty() {
    listSortStudent = [...listStudent];
    if(flagSortFaculty){
      listSortStudent.sort((a,b)=>
      (a.faculty > b.faculty) ?
      1 : (b.faculty> a.faculty) ?
      -1 : 0);
      flagSortFaculty = false;
    }
    else {
      listSortStudent.sort((a,b)=>
      (a.faculty < b.faculty) ?
      1 : (b.faculty < a.faculty) ?
      -1 : 0);
      flagSortFaculty = true;
    }
    paintTable(listSortStudent)
  }

  function sortByYearStart() {
    listSortStudent = [...listStudent];
    if(flagSortYear) {
      listSortStudent.sort((a,b)=>
      (a.yearStart > b.yearStart) ?
      1 : (b.yearStart> a.yearStart) ?
      -1 : 0);
      flagSortYear = false;
    }
    else {
      listSortStudent.sort((a,b)=>
      (a.yearStart < b.yearStart) ?
      1 : (b.yearStart < a.yearStart) ?
      -1 : 0);
      flagSortYear = true;
    }
    paintTable(listSortStudent)
  }

  function sortByDateBirthday() {
    listSortStudent = [...listStudent];
    if(flagSortBirthday){
      listSortStudent.sort((a,b)=>
      (a.dateBird.toJSON() > b.dateBird.toJSON()) ?
      1 : (b.dateBird.toJSON() > a.dateBird.toJSON()) ?
      -1 : 0);
      flagSortBirthday = false;
    }
    else {
      listSortStudent.sort((a,b)=>
      (a.dateBird.toJSON() < b.dateBird.toJSON()) ?
      1 : (b.dateBird.toJSON() < a.dateBird.toJSON()) ?
      -1 : 0);
      flagSortBirthday = true;
    }
    paintTable(listSortStudent)
  }

  function fulterByName() {
    listFilterStudent = listStudent.filter(item => (item.secondName +' '+item.name +' '+ item.patronymic).includes(filterName.value))
    paintTable(listFilterStudent);
  }

  function filterByFaculty() {
    listFilterStudent = listStudent.filter(item => item.faculty.includes(filterFaculty.value))
    paintTable(listFilterStudent);
  }

  function filterByYear() {
    listFilterStudent = listStudent.filter(item => item.yearStart == filterYear.value)
    paintTable(listFilterStudent);
  }

  function filterByYearEnd() {
    listFilterStudent = listStudent.filter(item => +item.yearStart + 4 == filterYearEnd.value)
    paintTable(listFilterStudent);
  }

  document.addEventListener('DOMContentLoaded',()=>{

    sortName.addEventListener('click',sortByName);
    sortFaculty.addEventListener('click', sortByFaculty)
    sortYear.addEventListener('click', sortByYearStart)
    sortDateBirthday.addEventListener('click', sortByDateBirthday)
    addStudentBtn.addEventListener('click', addStudent);
    filterName.addEventListener('input',fulterByName)
    filterFaculty.addEventListener('input',filterByFaculty)
    filterYear.addEventListener('input',filterByYear)
    filterYearEnd.addEventListener('input',filterByYearEnd)
  })
})();
