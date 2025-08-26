const URL = "http://127.0.0.1:8000";

let jobs = null;
let comptes = null;

async function deleteCompte(i) {
    try {
        let response = null;
        for(let j = 0; j < jobs.length; j++) {
            if (jobs[j].idCompte == comptes[i].idCompte) {
                response = await fetch(`${URL}/jobs/${jobs[j].idJob}?job_id=${jobs[j].idJob}&poste=${jobs[j].poste}&description=${jobs[j].description}`, {
                    method: "PUT",
                });
                if (!response.ok) throw new Error("Erreur de la suppression");
            };
        };

        response = await fetch(`${URL}/comptes/${comptes[i].idCompte}?compte_id=${comptes[i].idCompte}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erreur de la suppression");

        window.location.href = "adminComptes.html";
        
    } catch (err) {
        console.error(err);
    }
}

async function loadComptes() {
    try {
        
        let response = await fetch(`${URL}/jobs`);
        if (!response.ok) throw new Error("Erreur du chargement");
        jobs = await response.json();

        response = await fetch(`${URL}/comptes`);
        if (!response.ok) throw new Error("Erreur du chargement");
        comptes = await response.json();

        const compteList = document.getElementById("jobList");
        compteList.innerHTML = "";

        if (comptes.length === 0) {
            compteList.innerHTML = "<p>Aucun comptes disponible.</p>"
            return;
        }

        for (let j = 0; j < comptes.length; j++) {
            const div = document.createElement("div");
            div.className = "job-card";
            div.innerHTML = `<h3>${comptes[j].identifiant}</h3>
                <p>${comptes[j].prenom} ${comptes[j].nom}</p>
            `;

            for(let i = 0; i < jobs.length; i++) {
                if (jobs[i].idCompte == comptes[j].idCompte) {
                    div.innerHTML += `<h4>Job : ${jobs[i].poste}</h4>`;
                };
            };

            if (comptes[j].admin) {
                div.innerHTML += "<h4>Role : administrateur</h4>";
            } else {
                div.innerHTML += "<h4>Role : utilisateur</h4>";
            }

            div.innerHTML += `<button onclick="updateCompte(${j})">Modifier</button>
            <div class="job-card" id="updateCompteCard${j}" style="display:none;">
                <form id="updateCompteForm${j}">
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="passwordUpdate${j}" name="password" value="${comptes[j].motDePasse}" required>

                    <label for="prenom">Prénom :</label>
                    <input type="text" id="prenomUpdate${j}" name="prenom" value="${comptes[j].prenom}" required>

                    <label for="nom">Nom :</label>
                    <input type="text" id="nomUpdate${j}" name="nom" value="${comptes[j].nom}" required>

                    <label for="admin">Admin </label>
                    <input type="checkbox" id="adminUpdate${j}" ${comptes[j].admin ? "checked" : ""} name="admin">

                    <button type="submit">Modifier le compte</button>
                </form>
                <h2 id="errorMessage" style="color:red;"></h2>
            </div>
            <button onclick="deleteCompte(${j})">Supprimer</button>`;
                
            compteList.appendChild(div);

            document.getElementById(`updateCompteForm${j}`).addEventListener("submit", async (e) => {
                e.preventDefault();

                const password = document.getElementById(`passwordUpdate${j}`).value;
                const prenom = document.getElementById(`prenomUpdate${j}`).value;
                const nom = document.getElementById(`nomUpdate${j}`).value;
                const admin = document.getElementById(`adminUpdate${j}`).checked;

                try {
                    const response = await fetch(`${URL}/comptes/${comptes[j].idCompte}?compte_id=${comptes[j].idCompte}&motDePasse=${password}&nom=${nom}&prenom=${prenom}&admin=${admin}`, {
                        method: "PUT",
                    });
                    if (!response.ok) throw new Error("Erreur lors de la modification");
                    const data = await response.json();

                    if (data < 0){
                        errorMessage.textContent = "Cette identifiant existe déjà.";
                        return;
                    }

                    window.location.href = "adminComptes.html";
                    
                } catch (err) {
                    console.error(err);
                }
            });
        }

    } catch (err) {
        console.error(err);
        document.getElementById("jobs-list").innerHTML = "<p>Erreur du chargement.</p>";
    }
}

function login() {
    localStorage.setItem("idCompte", null);
    window.location.href = "acceuil.html";
}

function back() {
    window.location.href = "adminMenu.html";
}

function createCompte() {
    const card = document.getElementById("createCompteCard");
    if (card.style.display === "block") {
        card.style.display = "none";
        return;
    } else {
        card.style.display = "block";
    }
}

function updateCompte(i) {
    const card = document.getElementById(`updateCompteCard${i}`);
    if (card.style.display === "block") {
        card.style.display = "none";
        return;
    } else {
        card.style.display = "block";
    }
}

document.getElementById("createCompteForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const identifiant = document.getElementById("identifiantCreate").value;
    const password = document.getElementById("passwordCreate").value;
    const prenom = document.getElementById("prenomCreate").value;
    const nom = document.getElementById("nomCreate").value;
    const admin = document.getElementById("adminCreate").checked;

    try {
        const response = await fetch(`${URL}/comptes?identifiant=${identifiant}&motDePasse=${password}&nom=${nom}&prenom=${prenom}&admin=${admin}`, {
            method: "POST",
        });
        if (!response.ok) throw new Error("Erreur lors de la création");
        const data = await response.json();

        if (data < 0){
            errorMessage.textContent = "Cette identifiant existe déjà.";
            return;
        }

        window.location.href = "adminComptes.html";
        
    } catch (err) {
        console.error(err);
    }
});

document.addEventListener("DOMContentLoaded", loadComptes());