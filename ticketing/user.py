import tkinter as tk
from tkinter import ttk, messagebox
import json

class TicketingApp:
    def __init__(self, root, ticket_list):
        self.root = root
        self.ticket_list = ticket_list
        self.root.title("Application de Ticketing")

        self.bg_color = "#f0f0f0"
        self.main_color = "#005bac"
        self.text_color = "#333333"

        self.logo_image = tk.PhotoImage(file="../PA2/img/logo.png")
        self.logo_image = self.logo_image.subsample(2, 2)

        self.main_frame = tk.Frame(self.root, bg=self.bg_color)
        self.main_frame.pack(padx=20, pady=20)

        self.logo_label = tk.Label(self.main_frame, image=self.logo_image, bg=self.bg_color)
        self.logo_label.pack()

        self.title_label = tk.Label(self.main_frame, text="Bienvenue dans notre application de Ticketing", font=("Helvetica", 16), bg=self.bg_color, fg=self.main_color)
        self.title_label.pack(pady=10)

        self.dashboard_notebook = ttk.Notebook(self.main_frame)
        self.dashboard_notebook.pack(pady=10)

        # Onglet "Créer un ticket"
        self.create_ticket_frame = tk.Frame(self.dashboard_notebook, bg=self.bg_color)
        self.dashboard_notebook.add(self.create_ticket_frame, text="Créer un ticket")
        self.setup_create_ticket_tab()

        # Onglet "Historique des tickets"
        self.history_frame = tk.Frame(self.dashboard_notebook, bg=self.bg_color)
        self.dashboard_notebook.add(self.history_frame, text="Historique des tickets")
        self.setup_history_tab()

        # Charger les tickets à partir du fichier JSON
        self.load_tickets()

    def setup_create_ticket_tab(self):
        # Cadre pour créer un ticket
        self.create_ticket_frame.grid_rowconfigure(0, weight=1)
        self.create_ticket_frame.grid_columnconfigure(0, weight=1)

        # Entrées pour les détails du ticket
        tk.Label(self.create_ticket_frame, text="Nom du client:", bg=self.bg_color, fg=self.text_color).grid(row=0, column=0, sticky="w", padx=10, pady=5)
        self.client_name_entry = tk.Entry(self.create_ticket_frame)
        self.client_name_entry.grid(row=0, column=1, padx=10, pady=5)

        tk.Label(self.create_ticket_frame, text="Description du problème:", bg=self.bg_color, fg=self.text_color).grid(row=1, column=0, sticky="w", padx=10, pady=5)
        self.problem_description_entry = tk.Entry(self.create_ticket_frame)
        self.problem_description_entry.grid(row=1, column=1, padx=10, pady=5)

        # Menu déroulant pour la priorité
        tk.Label(self.create_ticket_frame, text="Priorité:", bg=self.bg_color, fg=self.text_color).grid(row=2, column=0, sticky="w", padx=10, pady=5)
        self.priority_var = tk.StringVar()
        self.priority_var.set("Normal")
        self.priority_menu = ttk.Combobox(self.create_ticket_frame, textvariable=self.priority_var, values=["Faible", "Normal", "Élevée", "Urgente"], state="readonly")
        self.priority_menu.grid(row=2, column=1, padx=10, pady=5)

        # Bouton pour soumettre le ticket
        submit_button = tk.Button(self.create_ticket_frame, text="Soumettre", command=self.submit_ticket, bg=self.main_color, fg="white", activebackground=self.main_color, activeforeground="white")
        submit_button.grid(row=3, columnspan=2, pady=10)

        # Bouton de déconnexion
        self.logout_button = tk.Button(self.create_ticket_frame, text="Déconnexion", command=self.logout, bg="#f44336", fg="white")
        self.logout_button.grid(row=4, columnspan=2, pady=10)

    def setup_history_tab(self):
        # Cadre pour afficher l'historique des tickets
        self.history_frame.grid_rowconfigure(0, weight=1)
        self.history_frame.grid_columnconfigure(0, weight=1)

        # Zone de texte pour afficher l'historique des tickets
        self.history_text = tk.Text(self.history_frame, bg="white", fg=self.text_color, wrap="word")
        self.history_text.grid(row=0, column=0, padx=10, pady=10, sticky="nsew")

        # Afficher les tickets existants dans l'historique
        self.update_history()

    def submit_ticket(self):
        client_name = self.client_name_entry.get()
        problem_description = self.problem_description_entry.get()
        priority = self.priority_var.get()

        if client_name == '' or problem_description == '':
            messagebox.showerror("Erreur", "Veuillez remplir tous les champs.")
            return

        self.ticket_list.append({"Client": client_name, "Problème": problem_description, "Priorité": priority, "Statut": "Non défini"})
        messagebox.showinfo("Confirmation", "Ticket soumis avec succès.")

        # Effacer les entrées après soumission
        self.client_name_entry.delete(0, tk.END)
        self.problem_description_entry.delete(0, tk.END)
        self.priority_var.set("Normal")

        # Mettre à jour l'historique après soumission du ticket
        self.update_history()
        self.save_tickets()
    
    def save_tickets(self):
        with open("tickets.json", "w") as file:
            json.dump(self.ticket_list, file)

    def load_tickets(self):
        try:
            with open("tickets.json", "r") as file:
                self.ticket_list = json.load(file)
        except FileNotFoundError:
            # Créer un nouveau fichier s'il n'existe pas
            self.ticket_list = []

    def update_history(self):
        # Effacer le contenu actuel de l'historique
        self.history_text.delete("1.0", tk.END)

        # Ajouter les tickets existants à l'historique
        for i, ticket in enumerate(self.ticket_list, start=1):
            self.history_text.insert(tk.END, f"Ticket {i}:\n")
            self.history_text.insert(tk.END, f"Client: {ticket['Client']}\n")
            self.history_text.insert(tk.END, f"Problème: {ticket['Problème']}\n")
            self.history_text.insert(tk.END, f"Priorité: {ticket['Priorité']}\n")
            self.history_text.insert(tk.END, f"Statut: {ticket['Statut']}\n\n")

    def logout(self):
        # Fermer la fenêtre principale pour déconnecter l'utilisateur
        self.root.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    tickets = []
    app = TicketingApp(root, tickets)
    app.load_tickets()  # Charger les tickets à partir du fichier JSON
    root.mainloop()
