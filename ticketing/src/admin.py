import tkinter as tk
from tkinter import ttk
import sqlite3
import os
import subprocess

class AdminTicketingApp:
    def __init__(self, root):
        self.root = root
        self.ticket_list = []  
        self.root.title("Panneau d'administration - Gestion des tickets")
        self.main_frame = tk.Frame(self.root, bg="#f0f0f0")
        self.main_frame.pack(padx=20, pady=20)

        # Connexion à BDD
        self.conn = sqlite3.connect("../db/ticketing.db")
        self.c = self.conn.cursor()

        # Augmentation de la hauteur de la Listbox
        self.results_listbox = tk.Listbox(self.main_frame, bg="white", fg="#333333", width=150)
        self.results_listbox.pack(pady=15, fill="both", expand=True)

        self.status_var = tk.StringVar()
        self.status_var.set("En cours")  
        self.status_label = tk.Label(self.main_frame, text="Statut:", bg="#f0f0f0")
        self.status_label.pack(pady=5)
        self.status_dropdown = ttk.Combobox(self.main_frame, textvariable=self.status_var, values=["En cours", "A traiter", "Terminé"], state="readonly")
        self.status_dropdown.pack(pady=5)

        self.update_status_button = tk.Button(self.main_frame, text="Mettre à jour le statut", command=self.update_status, bg="#4CAF50", fg="white")
        self.update_status_button.pack(pady=5)

        self.load_tickets()  
        self.populate_tickets_listbox()

        # Bouton de chat
        self.chat_button = tk.Button(self.main_frame, text="Ouvrir un Chat", command=self.run_chat, bg="#225B7C", fg="white")
        self.chat_button.pack(pady=10)

        

        # Bouton pour afficher le tableau dynamique
        self.show_dynamic_table_button = tk.Button(self.main_frame, text="Afficher le tableau dynamique", command=self.run_test, bg="#225B7C", fg="white")
        self.show_dynamic_table_button.pack(pady=5)

        # Bouton pour se déconnecter
        self.logout_button = tk.Button(self.main_frame, text="Déconnexion", command=self.logout, bg="#f44336", fg="white")
        self.logout_button.pack(pady=10)

    def load_tickets(self):
        try:
            self.c.execute("SELECT * FROM tickets")
            self.ticket_list = self.c.fetchall()  
        except sqlite3.Error as e:
            print("Error fetching tickets:", e)
            self.ticket_list = []
        
    def populate_tickets_listbox(self):
        self.results_listbox.delete(0, tk.END)  
        for ticket in self.ticket_list:
            ticket_info = f"Client: {ticket[1]}, Problème: {ticket[2]}, Priorité: {ticket[3]}, Statut: {ticket[4]}"
            self.results_listbox.insert(tk.END, ticket_info)

    def update_status(self):
        selected_index = self.results_listbox.curselection()
        if selected_index:
            selected_index = selected_index[0]
            if 0 <= selected_index < len(self.ticket_list):
                new_status = self.status_var.get()
                ticket_id = self.ticket_list[selected_index][0]  
                self.c.execute("UPDATE tickets SET status = ? WHERE id = ?", (new_status, ticket_id))
                self.conn.commit()  
                self.load_tickets()
                self.populate_tickets_listbox()
            else:
                self.results_listbox.insert(tk.END, "Aucun ticket sélectionné. Veuillez sélectionner un ticket dans la liste.\n")
        else:
            self.results_listbox.insert(tk.END, "Aucun ticket sélectionné. Veuillez sélectionner un ticket dans la liste.\n")

    def show_tickets(self):
        for ticket in self.ticket_list:
            print(ticket)

    def logout(self):
        self.root.destroy()

    def run_test(self):
        subprocess.Popen(["python", "../db/dashboard_admin.py"])

    def run_chat(self):
        subprocess.Popen(["python", "../chatbot/chat_admin.py"])

if __name__ == "__main__":
    root = tk.Tk()
    app = AdminTicketingApp(root)
    root.mainloop()
