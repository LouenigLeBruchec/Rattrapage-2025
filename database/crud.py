import sqlite3
from database.db import get_connection


#Compte

def is_identifiant_unique(identifiant: str, cursor):
    cursor.execute("SELECT * FROM Compte where identifiant = ?", (identifiant,))
    rows = cursor.fetchall()
    return len([dict(row) for row in rows]) <= 0

def create_compte(identifiant: str, motDePasse: str, nom: str, prenom: str, admin: bool = False):
    conn = get_connection()
    cursor = conn.cursor()
    if not is_identifiant_unique(identifiant, cursor):
        return -1
    cursor.execute("""
        INSERT INTO Compte (identifiant, motDePasse, nom, prenom, admin)
        VALUES (?, ?, ?, ?, ?)
    """, (identifiant, motDePasse, nom, prenom, int(admin)))
    conn.commit()
    compte_id = cursor.lastrowid
    conn.close()
    return compte_id


def get_compte(compte_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Compte WHERE idCompte = ?", (compte_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def get_comptes():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Compte")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def update_compte(compte_id: int, motDePasse: str, nom: str, prenom: str, admin: bool):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE Compte
        SET motDePasse = ?, nom = ?, prenom = ?, admin = ?
        WHERE idCompte = ?
    """, (motDePasse, nom, prenom, int(admin), compte_id))
    conn.commit()
    updated = cursor.rowcount
    conn.close()
    return updated > 0


def delete_compte(compte_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Compte WHERE idCompte = ?", (compte_id,))
    conn.commit()
    deleted = cursor.rowcount
    conn.close()
    return deleted > 0


#Job

def create_job(poste: str, description: str, idCompte: int = None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Job (poste, description, idCompte)
        VALUES (?, ?, ?)
    """, (poste, description, idCompte))
    conn.commit()
    job_id = cursor.lastrowid
    conn.close()
    return job_id


def get_job(job_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Job WHERE idJob = ?", (job_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def get_jobs():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Job")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def update_job(job_id: int, poste: str, description: str, idCompte: int = None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE Job
        SET poste = ?, description = ?, idCompte = ?
        WHERE idJob = ?
    """, (poste, description, idCompte, job_id))
    conn.commit()
    updated = cursor.rowcount
    conn.close()
    return updated > 0


def delete_job(job_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Job WHERE idJob = ?", (job_id,))
    conn.commit()
    deleted = cursor.rowcount
    conn.close()
    return deleted > 0
