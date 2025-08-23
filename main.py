from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import database.crud as crud, database.db as db

db.init_db()

app = FastAPI(title="JobBoard2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/jobs")
def get_jobs():
    return crud.get_jobs()

@app.get("/jobs/{job_id}")
def get_job(job_id: int):
    job = crud.get_job(job_id)
    if not job:
        return None
    return job

@app.post("/jobs")
def create_job(poste: str, description: str, idCompte: int = None):
    job_id = crud.create_job(poste, description, idCompte)
    return job_id

@app.put("/jobs/{job_id}")
def update_job(job_id: int, poste: str, description: str, idCompte: int = None):
    updated = crud.update_job(job_id, poste, description, idCompte)
    return updated

@app.delete("/jobs/{job_id}")
def delete_job(job_id: int):
    deleted = crud.delete_job(job_id)
    return deleted

@app.get("/comptes")
def get_comptes():
    return crud.get_comptes()

@app.get("/comptes/{compte_id}")
def get_compte(compte_id: int):
    compte = crud.get_compte(compte_id)
    if not compte:
        return None
    return compte

@app.post("/comptes")
def create_compte(identifiant: str, motDePasse: str, nom: str, prenom: str, admin: bool = False):
    compte_id = crud.create_compte(identifiant, motDePasse, nom, prenom, admin)
    return compte_id

@app.put("/comptes/{compte_id}")
def update_compte(compte_id: int, motDePasse: str, nom: str, prenom: str, admin: bool):
    updated = crud.update_compte(compte_id, motDePasse, nom, prenom, admin)
    return updated

@app.delete("/comptes/{compte_id}")
def delete_compte(compte_id: int):
    deleted = crud.delete_compte(compte_id)
    return deleted

@app.get("/me")
def get_me(idCompte):
    if idCompte == "null":
        return 0
    compte = crud.get_compte(idCompte)
    if not compte:
        return 0

    return 2 if compte["admin"] else 1