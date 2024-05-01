import tkinter as tk
from tkinter import ttk
import sqlite3
import subprocess

class AdminTicketingApp:
    def __init__(self, root):
        self.root = root
        self.ticket_list = []  # Ajout de l'initialisation de ticket_list
        self.root.title("Panneau d'administration - Gestion des tickets")
        self.main_frame = tk.Frame(self.root, bg="#f0f0f0")
        self.main_frame.pack(padx=20, pady=20)

        # Connexion à BDD
        self.conn = sqlite3.connect("ticketing.db")
        self.c = self.conn.cursor()

        # Augmentation de la hauteur de la Listbox
        self.results_listbox = tk.Listbox(self.main_frame, bg="white", fg="#333333", width=150)
        self.results_listbox.pack(pady=15, fill="both", expand=True)


        self.status_var = tk.StringVar()
        self.status_var.set("En cours")  # Statut par défaut
        self.status_label = tk.Label(self.main_frame, text="Statut:", bg="#f0f0f0")
        self.status_label.pack(pady=5)
        self.status_dropdown = ttk.Combobox(self.main_frame, textvariable=self.status_var, values=["En cours", "A traiter", "Terminé"], state="readonly")
        self.status_dropdown.pack(pady=5)

        self.update_status_button = tk.Button(self.main_frame, text="Mettre à jour le statut", command=self.update_status, bg="#4CAF50", fg="white")
        self.update_status_button.pack(pady=5)

        self.load_tickets()  # Charger les tickets depuis la base de données
        self.populate_tickets_listbox()

        # Bouton pour afficher les tickets
        self.show_tickets_button = tk.Button(self.main_frame, text="Afficher les tickets", command=self.show_tickets, bg="#225B7C", fg="white")
        self.show_tickets_button.pack(pady=5)

        # Bouton pour afficher le tableau dynamique
        self.show_dynamic_table_button = tk.Button(self.main_frame, text="Afficher le tableau dynamique", command=self.run_test, bg="#225B7C", fg="white")
        self.show_dynamic_table_button.pack(pady=5)

        # Bouton pour se déconnecter
        self.logout_button = tk.Button(self.main_frame, text="Déconnexion", command=self.logout, bg="#f44336", fg="white")
        self.logout_button.pack(pady=10)

    def load_tickets(self):
        try:
            # Execute SQL query to fetch tickets from the database
            self.c.execute("SELECT * FROM tickets")
            self.ticket_list = self.c.fetchall()  # Fetch all tickets from the database
        except sqlite3.Error as e:
            print("Error fetching tickets:", e)
            self.ticket_list = []
        
    def populate_tickets_listbox(self):
        self.results_listbox.delete(0, tk.END)  # Supprimer tous les éléments actuels de la Listbox
        for ticket in self.ticket_list:
            ticket_info = f"Client: {ticket[1]}, Problème: {ticket[2]}, Priorité: {ticket[3]}, Statut: {ticket[4]}"
            self.results_listbox.insert(tk.END, ticket_info)

    def update_status(self):
        selected_index = self.results_listbox.curselection()
        if selected_index:
            selected_index = selected_index[0]
            if 0 <= selected_index < len(self.ticket_list):
                new_status = self.status_var.get()
                ticket_id = self.ticket_list[selected_index][0]  # ID du ticket dans la première colonne
                # Exécuter une mise à jour dans la base de données
                self.c.execute("UPDATE tickets SET status = ? WHERE id = ?", (new_status, ticket_id))
                self.conn.commit()  # Valider la mise à jour dans la base de données
                # Recharger les tickets depuis la base de données et mettre à jour l'affichage
                self.load_tickets()
                self.populate_tickets_listbox()
            else:
                self.results_listbox.insert(tk.END, "Aucun ticket sélectionné. Veuillez sélectionner un ticket dans la liste.\n")
        else:
            self.results_listbox.insert(tk.END, "Aucun ticket sélectionné. Veuillez sélectionner un ticket dans la liste.\n")

    def show_tickets(self):
        # Afficher les tickets dans la console pour le moment
        for ticket in self.ticket_list:
            print(ticket)

    def logout(self):
        self.root.destroy()

    def run_test(self):
        subprocess.Popen(["python", "dashboard_admin.py"])

if __name__ == "__main__":
    root = tk.Tk()
    app = AdminTicketingApp(root)
    root.mainloop()
