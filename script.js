const form = document.querySelector("form");
const Name = document.querySelector(".name");
const number = document.querySelector(".number");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const cvc = document.querySelector(".cvc");
const nameError = document.querySelector(".name-error");
const numberError = document.querySelector(".number-error");
const dateError = document.querySelector(".date-error");
const cvcError = document.querySelector(".cvc-error");
const formatError = "Wrong format, numbers only";
const blankError = "Can't be blank";
const cNumber = document.querySelector(".cNumber");
const cName = document.querySelector(".cName");
const cDate = document.querySelector(".cDate");
const cCvc = document.querySelector(".cCvc");
var err1 = true;
var err2 = true;
var err3 = true;
var err4 = true;

number.addEventListener("keyup", () => {
  number.value = number.value.replace(/(\w{4})(\w+)/g, '$1 $2')
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  

  if (Name.value === '' || Name.value == null){
    nameError.innerHTML = blankError;
    Name.classList.add("error");
    err1 = true;
  }
  else {
    nameError.innerHTML = '';
    Name.classList.remove("error");
    cName.value = Name.value;
    err1 = false;
  }


  if (number.value === '' || number.value == null){
    numberError.innerHTML = blankError;
    number.classList.add("error");
    err2 = true;
  }
  else if (isNaN(number.value.split(' ').join('')) || parseInt(number.value.split(' ').join('')) < 0) // regexp -> replace(/ /g, '') or (/\s+/g, '')
  {
    numberError.innerHTML = formatError;
    number.classList.add("error");
    err2 = true;
  }
  else {
    numberError.innerHTML = '';
    number.classList.remove("error");
    
    let num = parseInt(number.value.split(' ').join('')).toString();
    let len = num.length;
    let newNum = '0';
    if (len < 16){
      for (let i = 0; i < (16 - len - 1); i++) {
        newNum += '0'; 
      }
      newNum += num;
    }
    else {
      newNum = num;
    }
    newNum = newNum.match(/.{1,4}/g);
    newNum = newNum.join(' ');
    cNumber.value = newNum;
    err2 = false;
  }


  if (isNaN(month.value) || isNaN(year.value) || parseInt(month.value) < 0 || parseInt(year.value) < 0 || month.value === '' || month.value == null || year.value === '' || year.value == null){
    if (isNaN(month.value) || parseInt(month.value) < 0)
    {
      month.classList.add("error2");
      dateError.innerHTML = formatError;
      err3 = true;
    }
    else {
      month.classList.remove("error2");
      err3 = false;
    }
    if (isNaN(year.value || parseInt(year.value) < 0)){
      year.classList.add("error2");
      dateError.innerHTML = formatError;
      err3 = true;
    }
    else {
      year.classList.remove("error2");
      err3 = false;
    }

    if (month.value === '' || month.value == null){
      month.classList.add("error");
      dateError.innerHTML = blankError;
      err3 = true;
    }
    else {
      month.classList.remove("error");
      err3 = false;
    }
    if (year.value === '' || year.value == null)
    {
      year.classList.add("error");
      dateError.innerHTML = blankError;
      err3 = true;
    }
    else {
      year.classList.remove("error");
      err3 = false;
    }
  }
  else {
    dateError.innerHTML = '';
    month.classList.remove("error");
    year.classList.remove("error");
    month.classList.remove("error2");
    year.classList.remove("error2");
    let intMonth = parseInt(month.value);
    let intYear = parseInt(year.value);
    let monthNum;
    let yearNum;
    if (intMonth > 0 && intMonth < 10){
      monthNum = '0' + intMonth;
    }
    else {
      monthNum = intMonth;
    }
    if (intYear > 0 && intYear < 10){
      yearNum = '0' + intYear;
    }
    else {
      yearNum = intYear;
    }
    cDate.value = monthNum + '/' + yearNum;
    err3 = false;
  }


  if (cvc.value === '' || cvc.value == null){
    cvcError.innerHTML = blankError;
    cvc.classList.add("error");
    err4 = true;
  }
  else if (isNaN(cvc.value) || parseInt(cvc.value) < 0){
    cvcError.innerHTML = formatError;
    cvc.classList.add("error");
    err4 = true;
  }
  else {
    cvcError.innerHTML = '';
    cvc.classList.remove("error");
    cCvc.value = cvc.value;
    err4 = false;
  }


  if (!err1 && !err2 && !err3 && !err4){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'thank.html');
    xhr.onreadystatechange = () => {
      if ((xhr.status == 200) && (xhr.readyState == 4)){
        document.querySelector(".right").innerHTML = xhr.responseText;
      }
    }
    xhr.send();
  }
})