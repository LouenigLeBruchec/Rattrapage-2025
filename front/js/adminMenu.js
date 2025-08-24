const URL = "http://127.0.0.1:8000";

function jobs() {
    window.location.href = "adminJobs.html";
}

function comptes() {
    window.location.href = "adminComptes.html";
}

function login() {
    localStorage.setItem("idCompte", null);
    window.location.href = "acceuil.html";
}