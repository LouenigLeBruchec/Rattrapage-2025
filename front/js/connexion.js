const URL = "http://127.0.0.1:8000"; 

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const identifiant = document.getElementById("identifiant").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${URL}/login?identifiant=${identifiant}&password=${password}`, {
            method: "POST",
        });

        if (!response.ok) {
             errorMessage.textContent = "Erreur : identifiant ou mot de passe incorrect.";
            return;
        }

        const data = await response.json();

        localStorage.setItem("idCompte", data);

        if (data == null) {
             errorMessage.textContent = "Erreur : identifiant ou mot de passe incorrect.";
            return
        } else {
            window.location.href = "acceuil.html";
        }

    } catch (err) {
        errorMessage.textContent = "Erreur lors de la connexion.";
    }
});

document.getElementById("compteForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const identifiant = document.getElementById("identifiant2").value;
    const password = document.getElementById("password2").value;
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;

    try {
        const response = await fetch(`${URL}/comptes?identifiant=${identifiant}&motDePasse=${password}&nom=${nom}&prenom=${prenom}&admin=0`, {
            method: "POST",
        });

        if (!response.ok) {
            errorMessage.textContent = "Erreur lors de la création du compte.";
            return;
        }
        const data = await response.json();

        if (data < 0){
            errorMessage.textContent = "Cette identifiant existe déjà.";
            return;
        }

        localStorage.setItem("idCompte", data);
        window.location.href = "acceuil.html";
        

    } catch (err) {
        errorMessage.textContent = "Erreur lors de la création du compte.";
    }
});

function back() {
    window.location.href = "acceuil.html";
}