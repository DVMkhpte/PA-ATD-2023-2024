import sqlite3

class TicketingApp:
    def __init__(self, root):
        # Initialisation de l'interface utilisateur

        # Connexion à la base de données
        self.conn = sqlite3.connect("ticketing.db")
        self.cursor = self.conn.cursor()

        # Créer la table des tickets si elle n'existe pas déjà
        self.create_ticket_table()

    def create_ticket_table(self):
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS tickets (
                id INTEGER PRIMARY KEY,
                client TEXT NOT NULL,
                problem TEXT NOT NULL,
                priority TEXT NOT NULL,
                status TEXT NOT NULL
            )
        """)
        self.conn.commit()

    def submit_ticket(self):
        client_name = self.client_name_entry.get()
        problem_description = self.problem_description_entry.get()
        priority = self.priority_var.get()

        if client_name == '' or problem_description == '':
            messagebox.showerror("Erreur", "Veuillez remplir tous les champs.")
            return

        # Insérer le nouveau ticket dans la base de données
        self.cursor.execute("INSERT INTO tickets (client, problem, priority, status) VALUES (?, ?, ?, ?)",
                            (client_name, problem_description, priority, "Non défini"))
        self.conn.commit()

        messagebox.showinfo("Confirmation", "Ticket soumis avec succès.")
        
        # Effacer les entrées après soumission
        self.client_name_entry.delete(0, tk.END)
        self.problem_description_entry.delete(0, tk.END)
        self.priority_var.set("Normal")
