const URL = "http://127.0.0.1:8000";

let jobs = null;
let comptes = null;

async function deleteJob(i) {
    try {
        const response = await fetch(`${URL}/jobs/${jobs[i].idJob}?job_id=${jobs[i].idJob}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erreur de la suppression");

        window.location.href = "adminJobs.html";
        
    } catch (err) {
        console.error(err);
    }
}

async function loadJobs() {
    try {
        
        let response = await fetch(`${URL}/jobs`);
        if (!response.ok) throw new Error("Erreur de chargement");
        jobs = await response.json();

        response = await fetch(`${URL}/comptes`);
        if (!response.ok) throw new Error("Erreur de chargement");
        comptes = await response.json();

        const jobsList = document.getElementById("jobList");
        jobsList.innerHTML = "";

        if (jobs.length === 0) {
            jobsList.innerHTML = "<p>Aucun job disponible.</p>"
            return;
        }

        for (let j = 0; j < jobs.length; j++) {
            const div = document.createElement("div");
            div.className = "job-card";
            div.innerHTML = `<h3>${jobs[j].poste}</h3>
                <p>${jobs[j].description}</p>
            `;

            for(let i = 0; i < comptes.length; i++) {
                if (jobs[j].idCompte == comptes[i].idCompte) {
                    div.innerHTML += `<h4>Employé : ${comptes[i].identifiant}</h4>`;
                };
            };

            div.innerHTML += `<button onclick="updateJob(${j})">Modifier</button>
            <div class="job-card" id="updateJobCard${j}" style="display:none;">
                <form id="updateJobForm${j}">
                    <label for="poste">Poste :</label>
                    <input type="text" id="posteUpdate${j}" name="poste" value="${jobs[j].poste}" required>

                    <label for="description">Description :</label>
                    <textarea id="descriptionUpdate${j}" name="description" rows="4" cols="50">${jobs[j].description}</textarea>

                    <button type="submit">Modifier le job</button>
                </form>
                <h2 id="errorMessage" style="color:red;"></h2>
            </div>
            <button onclick="deleteJob(${j})">Supprimer</button>`;
                
            jobsList.appendChild(div);

            document.getElementById(`updateJobForm${j}`).addEventListener("submit", async (e) => {
                e.preventDefault();

                const poste = document.getElementById(`posteUpdate${j}`).value;
                const description = document.getElementById(`descriptionUpdate${j}`).value;

                try {
                    const response = await fetch(`${URL}/jobs/${jobs[j].idJob}?job_id=${jobs[j].idJob}&poste=${poste}&description=${description}`, {
                        method: "PUT",
                    });
                    if (!response.ok) throw new Error("Erreur lors de la modification");
                    const data = await response.json();

                    if (!data){
                        errorMessage.textContent = "Erreur lors de la modification";
                        return;
                    }

                    window.location.href = "adminJobs.html";
                    
                } catch (err) {
                    console.error(err);
                }
            });
        }

    } catch (err) {
        console.error(err);
        document.getElementById("jobs-list").innerHTML = "<p>Erreur de chargement.</p>";
    }
}

function login() {
    localStorage.setItem("idCompte", null);
    window.location.href = "acceuil.html";
}

function back() {
    window.location.href = "adminMenu.html";
}

function createJob() {
    const card = document.getElementById("createJobCard");
    if (card.style.display === "block") {
        card.style.display = "none";
        return;
    } else {
        card.style.display = "block";
    }
}

function updateJob(i) {
    const card = document.getElementById(`updateJobCard${i}`);
    if (card.style.display === "block") {
        card.style.display = "none";
        return;
    } else {
        card.style.display = "block";
    }
}

document.getElementById("createJobForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const poste = document.getElementById("posteCreate").value;
    const description = document.getElementById("descriptionCreate").value;

    try {
        const response = await fetch(`${URL}/jobs?poste=${poste}&description=${description}`, {
            method: "POST",
        });
        if (!response.ok) throw new Error("Erreur lors de la création");
        const data = await response.json();

        if (!data){
            errorMessage.textContent = "Erreur lors de la création";
            return;
        }

        window.location.href = "adminJobs.html";
        
    } catch (err) {
        console.error(err);
    }
});

document.addEventListener("DOMContentLoaded", loadJobs());
