from db import init_db
import crud

def run_tests():
    init_db()


    print("\n--- Test CRUD Compte ---")
    compte_id = crud.create_compte("test","1234","Dupont", "Jean", True)
    print("Compte créé :", crud.get_compte(compte_id))
    print (crud.create_compte("test","0","0", "0", False))
    print("duplicat :", crud.get_comptes())

    crud.update_compte(compte_id, "1234", "Durand", "Jean", False)
    print("Compte modifié :", crud.get_compte(compte_id))

    print("Tous les comptes :", crud.get_comptes())

    crud.delete_compte(compte_id)
    print("Compte supprimé :", crud.get_comptes())

    # -------------------
    # Test CRUD Job
    # -------------------
    print("\n--- Test CRUD Job ---")
    # Créer un compte d'abord (pour associer un job)
    compte_id = crud.create_compte("1","1","Martin", "Alice", False)

    job_id = crud.create_job("Développeur Python", "Créer une API FastAPI", None)
    print("Job créé :", crud.get_job(job_id))

    crud.update_job(job_id, "Développeur Fullstack", "React + FastAPI", compte_id)
    print("Job modifié :", crud.get_job(job_id))

    print("Tous les jobs :", crud.get_jobs())

    crud.delete_job(job_id)
    print("Job supprimé :", crud.get_jobs())

print("start tests")
if __name__ == "__main__":
    run_tests()
