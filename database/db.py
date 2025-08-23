import sqlite3

DATABASE_NAME = "jobboard2.db"


def get_connection():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Compte (
            idCompte INTEGER PRIMARY KEY AUTOINCREMENT,
            identifiant TEXT UNIQUE not NULL,
            motDePasse TEXT not NULL,
            nom TEXT,
            prenom TEXT,
            admin BOOLEAN NOT NULL DEFAULT 0
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Job (
            idJob INTEGER PRIMARY KEY AUTOINCREMENT,
            poste TEXT NOT NULL,
            description TEXT,
            idCompte INTEGER,
            FOREIGN KEY(idCompte) REFERENCES Compte(idCompte)
        )
    """)

    conn.commit()
    conn.close()
