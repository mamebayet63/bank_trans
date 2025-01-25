


document.addEventListener("DOMContentLoaded", () => {
  const addTransactionButton = document.getElementById("addTransactionButton");
  const closeModal = document.getElementById("closeModal");
  const transactionsTable = document.getElementById('transactionsTable');
  const userPhoto = document.getElementById('userPhoto');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userPhone = document.getElementById('userPhone');
  const userMontant = document.getElementById('userMontant');
  const changeUserButton = document.getElementById('changeUser');
  const form = document.getElementById("transactionForm");
  const addUserButton = document.getElementById("addUserButton"); // Bouton pour ajouter un utilisateur
  const userForm = document.getElementById("userForm"); // Formulaire pour ajouter un utilisateur

  let users = [];
  let currentUserIndex = 0;
  

  // Charger les données depuis le localStorage ou un fichier JSON
  const userFromLocalStorage = localStorage.getItem("user");
  if (userFromLocalStorage) {
    users = JSON.parse(userFromLocalStorage);
    if (users.length > 0) {
      displayUserInfo(users[currentUserIndex]);
      displayTransactions(users[currentUserIndex].transactions);
    }
  } else {
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
    userMontant.textContent = `${user.montant} FCFA`;
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

  

  addUserButton.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut
    resetErrors(); // Réinitialise les messages d'erreur existants
  
    const prenom = document.getElementById("prenom");
    const nom = userForm.elements["userNameInput"];
    const email = userForm.elements["userEmailInput"];
    const telephone = userForm.elements["userPhoneInput"];
    const montant = userForm.elements["userAmountInput"];
  
    let isValide = true;
  
    // Validation du prénom
    if (!prenom.value.trim()) {
      showError(prenom, "Le prénom est obligatoire.");
      isValide = false;
    }
  
    // Validation du nom
    if (!nom.value.trim()) {
      showError(nom, "Le nom est obligatoire.");
      isValide = false;
    }
  
    // Validation de l'email
    if (!email.value.trim()) {
      showError(email, "L'email est obligatoire.");
      isValide = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      showError(email, "L'email n'est pas valide.");
      isValide = false;
    }
  
    // Validation du téléphone
  if (!telephone.value.trim()) {
    showError(telephone, "Le numéro de téléphone est obligatoire.");
    isValide = false;
  } else if (!/^(77|78|76|75|70)\d{7}$/.test(telephone.value)) {
    showError(telephone, "Le numéro de téléphone doit comporter 9 chiffres et commencer par 77, 78, 76, 75 ou 70.");
    isValide = false;
  } else {
    clearError(telephone); // Suppression du message d'erreur si valide
  }

  
    // Validation du montant
    if (!montant.value.trim()) {
      showError(montant, "Le montant initial est obligatoire.");
      isValide = false;
    } else if (isNaN(montant.value) || parseFloat(montant.value) < 5000) {
      showError(montant, "Le montant doit être supperieur à 5000 .");
      isValide = false;
    }
  
    if (isValide) {
      const newUser = {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
        telephone: telephone.value,
        photo: "default.jpg", // Photo par défaut si non fournie
        montant: parseFloat(montant.value),
        transactions: []
      };
  
      users.push(newUser);
      saveUserToLocalstorage();
  
      // Réinitialiser le formulaire après un ajout réussi
      userForm.reset();
  
      // Mettre à jour l'affichage si nécessaire
      if (users.length === 1) {
        currentUserIndex = 0;
        displayUserInfo(users[currentUserIndex]);
        displayTransactions(users[currentUserIndex].transactions);
      }
  
      // alert("Nouvel utilisateur ajouté avec succès !");
      userPopup.classList.add('hidden'); // Fermer le popup uniquement si tout est valide
    } else {
      // alert("Veuillez corriger les erreurs dans le formulaire.");
      // Le formulaire reste ouvert automatiquement
    }
  });
  
  

  // Validation et soumission du formulaire de transaction
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Récupération des éléments du formulaire
    const transactionDate = document.getElementById("transactionDate");
    const transactionNumber = document.getElementById("transactionNumber");
    const transactionType = document.getElementById("transactionType");
    const transactionAmount = document.getElementById("transactionAmount");
  
    // Réinitialisation des erreurs
    resetErrors();
  
    let isValid = true;
  
    if (!transactionDate.value) {
      showError(transactionDate, "La date est obligatoire.");
      isValid = false;
    }
    if (!transactionNumber.value) {
      showError(transactionNumber, "Le numéro de la transaction est obligatoire.");
      isValid = false;
    }
    if (!transactionType.value) {
      showError(transactionType, "Le type de transaction est obligatoire.");
      isValid = false;
    }
    if (!transactionAmount.value || transactionAmount.value <= 0) {
      showError(transactionAmount, "Le montant doit être un nombre positif.");
      isValid = false;
    }
  
    if (isValid) {
      const amount = parseFloat(transactionAmount.value); // Conversion en nombre
      const currentBalance = users[currentUserIndex].montant;
  
      // Vérification pour les retraits ou transferts
      if ((transactionType.value === "retrait" || transactionType.value === "transfert") && amount > currentBalance) {
        showError(transactionAmount, "Le montant à retirer dépasse le solde disponible.");
        return; // Empêche la soumission si la condition n'est pas remplie
      }
  
      const newTransaction = {
        id: users[currentUserIndex].transactions.length + 1,
        date: transactionDate.value,
        numero: transactionNumber.value,
        type: transactionType.value,
        montant: transactionType.value === "retrait" || transactionType.value === "transfert" ? -amount : amount,
      };
  
      // Mise à jour du solde et des transactions
      users[currentUserIndex].montant += newTransaction.montant;
      users[currentUserIndex].transactions.push(newTransaction);
  
      saveUserToLocalstorage();
      displayUserInfo(users[currentUserIndex]); // Met à jour les infos utilisateur
      displayTransactions(users[currentUserIndex].transactions);
  
      form.reset();
      closeTransactionPopup();
    }
  });
  

  function showError(input, message) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("text-red-500", "text-sm", "mt-1");
    errorElement.textContent = message;
    input.classList.add("border-red-500");
    input.parentElement.appendChild(errorElement);
  }

  function resetErrors() {
    const errorElements = document.querySelectorAll(".text-red-500");
    errorElements.forEach((element) => element.remove());
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => input.classList.remove("border-red-500"));
  }

  function closeTransactionPopup() {
    document.getElementById("transactionPopup").classList.add("hidden");
  }

  function openTransactionPopup() {
    document.getElementById("transactionPopup").classList.remove("hidden");
  }

  addTransactionButton.addEventListener('click', () => openTransactionPopup());
  closeModal.addEventListener('click', () => closeTransactionPopup());
});


document.addEventListener('DOMContentLoaded', () => {
  const userPopup = document.getElementById('userPopup');
  const SaveUser = document.getElementById('SaveUser');
  const closeUserModal = document.getElementById('closeUserModal');
  const userForm = document.getElementById('userForm');

  // Ouvrir le formulaire
  SaveUser.addEventListener('click', () => {
    userPopup.classList.remove('hidden');
  });

  // Fermer le formulaire
  closeUserModal.addEventListener('click', () => {
    userPopup.classList.add('hidden');
    
  });

  
});