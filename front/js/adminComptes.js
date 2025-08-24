const URL = "http://127.0.0.1:8000";

async function loadJobs() {
    try {
        
        const response = await fetch(`${URL}/jobs`);
        if (!response.ok) throw new Error("Erreur de chargement");
        const jobs = await response.json();

        const jobsList = document.getElementById("jobList");
        jobsList.innerHTML = "";

        if (jobs.length === 0) {
            jobsList.innerHTML = "<p>Aucun job disponible.</p>"
            return;
        }

        jobs.forEach(job => {
            const div = document.createElement("div");
            div.className = "job-card";
            div.innerHTML = `
                <h3>${job.poste}</h3>
                <p>${job.description}</p>
            `;
            jobsList.appendChild(div);
        });

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

document.addEventListener("DOMContentLoaded", loadCompte);
document.addEventListener("DOMContentLoaded", loadJobs);
