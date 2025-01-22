document.addEventListener("DOMContentLoaded", function () {
    // Récupération des éléments du formulaire
    const form = document.getElementById("transactionForm");
    const transactionDate = document.getElementById("transactionDate");
    const transactionNumber = document.getElementById("transactionNumber");
    const transactionType = document.getElementById("transactionType");
    const transactionAmount = document.getElementById("transactionAmount");

    // Fonction pour afficher un message d'erreur
    function showError(input, message) {
      const errorElement = document.createElement("div");
      errorElement.classList.add("text-red-500", "text-sm", "mt-1");
      errorElement.textContent = message;
      input.classList.add("border-red-500"); // Ajoute une bordure rouge en cas d'erreur
      input.parentElement.appendChild(errorElement);
    }

    // Fonction pour réinitialiser les erreurs
    function resetErrors() {
      const errorElements = document.querySelectorAll(".text-red-500");
      errorElements.forEach(function (element) {
        element.remove();
      });
      const inputs = document.querySelectorAll("input, select");
      inputs.forEach(function (input) {
        input.classList.remove("border-red-500");
      });
    }

    // Validation du formulaire avant soumission
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Empêche la soumission du formulaire

      // Réinitialise les erreurs
      resetErrors();

      let isValid = true;

      // Vérification de la date
      if (!transactionDate.value) {
        showError(transactionDate, "La date est obligatoire.");
        isValid = false;
      }

      // Vérification du numéro de la transaction
      if (!transactionNumber.value) {
        showError(transactionNumber, "Le numéro de la transaction est obligatoire.");
        isValid = false;
      }

      // Vérification du type de transaction
      if (!transactionType.value) {
        showError(transactionType, "Le type de transaction est obligatoire.");
        isValid = false;
      }

      // Vérification du montant
      if (!transactionAmount.value || transactionAmount.value <= 0) {
        showError(transactionAmount, "Le montant doit être un nombre positif.");
        isValid = false;
      }

      // Si tout est valide, on soumet le formulaire (peut être envoyé à un serveur)
      if (isValid) {
        alert("Transaction ajoutée avec succès!");
        form.reset(); // Réinitialise le formulaire
        document.getElementById("transactionPopup").classList.add("hidden"); // Ferme le popup
      }
    });

    // Fermeture du popup sans soumettre
    document.getElementById("closeModal").addEventListener("click", function () {
      document.getElementById("transactionPopup").classList.add("hidden");
    });
  });