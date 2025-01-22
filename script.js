const transactionsTable = document.getElementById('transactionsTable');
const userPhoto = document.getElementById('userPhoto');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const changeUserButton = document.getElementById('changeUser');

let users = [];
let currentUserIndex = 0;

// Charger les données depuis un fichier JSON
const userFromLocalStorage = localStorage.getItem("user");
if (userFromLocalStorage) {
  users = JSON.parse(userFromLocalStorage);
}else{
  fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    users = data;
    saveUserToLocalstorage();
    if (users.length > 0) {
      displayUserInfo(users[currentUserIndex]);
      displayTransactions(users[currentUserIndex].transactions);
    }
  })
  .catch((error) => console.error('Erreur lors du chargement des données JSON:', error));
}

function saveUserToLocalstorage() {
  const userJson = JSON.stringify(users);
  localStorage.setItem("user", userJson);
}

function displayUserInfo(user) {
  userPhoto.src = user.photo;
  userName.textContent = `${user.prenom} ${user.nom}`;
  userEmail.textContent = user.email;
  userPhone.textContent = user.telephone;
}

function displayTransactions(transactions) {
  transactionsTable.innerHTML = '';
  transactions.forEach((transaction) => {
    const row = document.createElement('tr');
    row.classList.add('border-b', 'hover:bg-gray-100');
    row.innerHTML = `
      <td class="px-4 py-2">${transaction.date}</td>
      <td class="px-4 py-2">${transaction.numero}</td>
      <td class="px-4 py-2">${transaction.type}</td>
      <td class="px-4 py-2">${transaction.montant} FCFA</td>
    `;
    transactionsTable.appendChild(row);
  });
}

changeUserButton.addEventListener('click', () => {
  if (users.length > 0) {
    currentUserIndex = (currentUserIndex + 1) % users.length;
    displayUserInfo(users[currentUserIndex]);
    displayTransactions(users[currentUserIndex].transactions);
  }
});

 function closeTransactionPopup() {
  document.getElementById("transactionPopup").classList.add("hidden");
  }

  function openTransactionPopup() {
  document.getElementById("transactionPopup").classList.remove("hidden");
  }
  const afficherPopupTransaction = document.getElementById("addTransactionButton");
  afficherPopupTransaction.addEventListener('click', ()=> openTransactionPopup());
  const fermerPopupTransaction = document.getElementById("closeModal");
  fermerPopupTransaction.addEventListener('click', ()=> closeTransactionPopup());



//   controle de saisie 

