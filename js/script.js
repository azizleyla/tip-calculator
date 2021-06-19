const select = document.getElementById('input-service');
const inputBill = document.getElementById('input-bill');
const inputUsers = document.getElementById('input-users');
const form = document.getElementById('tip-form');
const tipResults = document.getElementById('tip-amount');
const totalResults = document.getElementById('total-amount');
const personAmountResults = document.getElementById('person-amount');
const resultsContainer = document.querySelector('.results')

const services = [{
  value: 1,
  title: "great - 20%"
}, {
  value: 2,
  title: "good - 10%"
}, {
  value: 3,
  title: "bad - 2%"
}]


services.forEach(service => {
  const option = document.createElement('option');
  option.textContent = service.title;
  option.value = service.value;
  select.appendChild(option)
})


let percentage = ""
form.addEventListener('submit', addBill);

function addBill(e) {
  e.preventDefault();
  if (inputBill.value === "" || inputUsers.value === "" || select.value === '0') {
    displayMessage()
  } else {
    let billAmount = Number(inputBill.value);
    let numUsers = Number(inputUsers.value)
    let selectedService = select.value;
    //loader
    const loader = document.querySelector('.loader');
    loader.classList.add('showItem');
    
    const results = calculateBill(billAmount, numUsers, selectedService)

    localStorage.setItem('results', JSON.stringify(results));
    setTimeout(() => {
      loader.classList.remove('showItem')
      tipResults.textContent = results[0].toFixed(2);
      totalResults.textContent = results[1].toFixed(2);
      personAmountResults.textContent = results[2].toFixed(2);
      resultsContainer.classList.add('showItem');
    }, 3000)
    setTimeout(() => {
      setDefault();
      resultsContainer.classList.remove('showItem');
    }, 10000);
  }
}


function calculateBill(billAmount, numUsers, selectedService) {
  if (select.value == 1) {
    percentage = 0.2;
  } else if (select.value == 2) {
    percentage = 0.1
  } else if (select.value == 3) {
    percentage = 0.02;
  }
  const tipAmount = Number(billAmount) * percentage;
  const totalAmount = tipAmount + Number(billAmount);
  const eachPerson = totalAmount / numUsers
  return [tipAmount, totalAmount, eachPerson];
}


function displayMessage() {
  const feedback = document.querySelector('.feedback');
  feedback.innerHTML = ""
  if (inputBill.value === "") {
    feedback.classList.add('showItem', 'alert-danger');
    feedback.innerHTML += `<p>Bill amount cannot be blank</p>`;
  }
  if (inputUsers.value === "") {
    feedback.classList.add('showItem', 'alert-danger');
    feedback.innerHTML += `<p>Number of users must be greater than zero</p>`;
  }
  if (select.value === '0') {
    feedback.classList.add('showItem', 'alert-danger');
    feedback.innerHTML += `<p>You must select a Service</p>`;
  }
  setTimeout(() => {
    feedback.classList.remove('showItem', 'alert-danger');
  }, 5000)
}


function setDefault() {
  inputBill.value = "";
  inputUsers.value = "";
  select.value = 0;
}