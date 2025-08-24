const URL = "http://127.0.0.1:8000";
let jobs = null;
let monJob = null;

async function loadCompte() {
    try {
        
        const response = await fetch(`${URL}/comptes/${localStorage.getItem("idCompte")}`);
        if (!response.ok) throw new Error("Erreur de chargement");
        const compte = await response.json();

        const compteDiv = document.getElementById("compte");
        compteDiv.innerHTML = `<h3>${compte.identifiant}</h3>
            <p>${compte.prenom} ${compte.nom}</p>
        `;

    } catch (err) {
        console.error(err);
        document.getElementById("compte").innerHTML = "<p>Erreur de chargement.</p>";
    }
}

async function loadJob() {
    try {
        
        const response = await fetch(`${URL}/myjob/${localStorage.getItem("idCompte")}`);
        if (!response.ok) throw new Error("Erreur de chargement");
        monJob = await response.json();

        if (monJob === null) {
            document.getElementById("job").innerHTML = "<p>vide</p>";
            return;
        }

        const compteDiv = document.getElementById("job");
        compteDiv.innerHTML = `<h3>${monJob.poste}</h3>
                <p>${monJob.description}</p>
                <button onclick="removeJob()">Démissionner</button>
        `;

    } catch (err) {
        console.error(err);
        document.getElementById("job").innerHTML = "<p>Erreur de chargement.</p>";
    }
}

async function loadJobs() {
    try {
        
        const response = await fetch(`${URL}/jobs`);
        if (!response.ok) throw new Error("Erreur de chargement");
        jobs = await response.json();

        const jobsList = document.getElementById("jobList");
        jobsList.innerHTML = "";

        if (jobs.length === 0) {
            jobsList.innerHTML = "<p>Aucun job disponible.</p>"
            return;
        }

        for(let i = 0; i < jobs.length; i++) {
            if (jobs[i].idCompte != localStorage.getItem("idCompte")) {
                const div = document.createElement("div");
                div.className = "job-card";
                div.innerHTML = `
                    <h3>${jobs[i].poste}</h3>
                    <p>${jobs[i].description}</p>
                    <button onclick="selectJob(${i})">Postuler</button>
                `;
                jobsList.appendChild(div);
            };
        };

    } catch (err) {
        console.error(err);
        document.getElementById("jobList").innerHTML = "<p>Erreur de chargement.</p>";
    }
}

async function selectJob(jobIndex) {
    try {
        job = jobs[jobIndex];

        const response = await fetch(`${URL}/jobs/${job.idJob}?job_id=${job.idJob}&poste=${job.poste}&description=${job.description}&idCompte=${localStorage.getItem("idCompte")}`, {
            method: "PUT",
        });

        if (!response.ok) {
            return;
        }

        if (monJob !== null){
            removeJob();
        }
            
        loadJob();

    } catch (err) {
        console.error(err);
    }
}

async function removeJob() {
    try {
        const response = await fetch(`${URL}/jobs/${monJob.idJob}?job_id=${monJob.idJob}&poste=${monJob.poste}&description=${monJob.description}`, {
            method: "PUT",
        });

        if (!response.ok) {
            return;
        }

        loadJob();
    } catch (err) {
        console.error(err);
    }
}

function login() {
    localStorage.setItem("idCompte", null);
    window.location.href = "acceuil.html";
}

document.addEventListener("DOMContentLoaded", loadJob);
document.addEventListener("DOMContentLoaded", loadJobs);
document.addEventListener("DOMContentLoaded", loadCompte);
