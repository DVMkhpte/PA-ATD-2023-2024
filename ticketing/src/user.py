import tkinter as tk
from tkinter import ttk, messagebox
import mysql.connector
import os
import subprocess

class CustomDialog(tk.Toplevel):
    def __init__(self, parent, title, message):
        super().__init__(parent)
        self.title(title)
        self.geometry("300x150")

        label = tk.Label(self, text=message)
        label.pack(pady=10)

        button_frame = tk.Frame(self)
        button_frame.pack(pady=10)

        modify_button = tk.Button(button_frame, text="Modifier", command=self.modify)
        modify_button.pack(side=tk.LEFT, padx=10)

        delete_button = tk.Button(button_frame, text="Supprimer", command=self.delete)
        delete_button.pack(side=tk.RIGHT, padx=10)

        self.result = None

    def modify(self):
        self.result = "modify"
        self.destroy()

    def delete(self):
        self.result = "delete"
        self.destroy()

class TicketingApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Application de Ticketing")

        self.conn = mysql.connector.connect(
            host = "api.autempsdonne.com",
            user="root",
            password="exemplepwd",
            database="tickets"
        )
        self.c = self.conn.cursor()

        self.bg_color = "#f0f0f0"
        self.main_color = "#005bac"
        self.text_color = "#333333"

        #self.logo_image = tk.PhotoImage(file="../img/logo.png")
        #self.logo_image = self.logo_image.subsample(2, 2)

        self.main_frame = tk.Frame(self.root, bg=self.bg_color)
        self.main_frame.pack(padx=20, pady=20)

        #self.logo_label = tk.Label(self.main_frame, image=self.logo_image, bg=self.bg_color)
        #self.logo_label.pack()

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

        # Établir une connexion à la base de données
        self.conn = mysql.connector.connect(
            host = "api.autempsdonne.com",
            user="root",
            password="exemplepwd",
            database="tickets"
        )
        self.c = self.conn.cursor()

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

        # Bouton de chat
        self.chat_button = tk.Button(self.create_ticket_frame, text="Ouvrir un Chat", command=self.run_chat, bg=self.main_color, fg="white")
        self.chat_button.grid(row=3, columnspan=2, pady=10)

        # Bouton pour soumettre le ticket
        submit_button = tk.Button(self.create_ticket_frame, text="Soumettre", command=self.submit_ticket, bg=self.main_color, fg="white", activebackground=self.main_color, activeforeground="white")
        submit_button.grid(row=4, columnspan=2, pady=10)

        # Bouton de déconnexion
        self.logout_button = tk.Button(self.create_ticket_frame, text="Déconnexion", command=self.logout, bg="#f44336", fg="white")
        self.logout_button.grid(row=5, columnspan=2, pady=10)

    def setup_history_tab(self):
        # Cadre pour afficher l'historique des tickets
        self.history_frame.grid_rowconfigure(0, weight=1)
        self.history_frame.grid_columnconfigure(0, weight=1)

        # Zone de texte pour afficher l'historique des tickets
        self.history_text = tk.Text(self.history_frame, bg="white", fg=self.text_color, wrap="word")
        self.history_text.grid(row=0, column=0, padx=10, pady=10, sticky="nsew")

        # Scrollbar pour la zone de texte
        scrollbar = tk.Scrollbar(self.history_frame, orient="vertical", command=self.history_text.yview)
        scrollbar.grid(row=0, column=1, sticky="ns")
        self.history_text.config(yscrollcommand=scrollbar.set)

        # Désactiver la saisie directe dans la zone de texte
        self.history_text.bind("<KeyPress>", lambda e: "break")

        # Afficher les tickets existants dans l'historique
        self.update_history()

    def handle_ticket_double_click(self, ticket_number):
        custom_dialog = CustomDialog(self.root, "Action sur le ticket", f"Que voulez-vous faire avec le ticket {ticket_number} ?")
        self.root.wait_window(custom_dialog)
        choice = custom_dialog.result
        if choice == 'modify':
            self.edit_ticket(ticket_number)
        elif choice == 'delete':
            self.delete_ticket(ticket_number)


    def edit_ticket(self, ticket_number):
        # Récupérer les détails du ticket depuis la base de données
        self.c.execute("SELECT * FROM tickets WHERE id=%s", (ticket_number,))
        ticket = self.c.fetchone()
        if ticket:
            # Créer une nouvelle fenêtre de dialogue pour la modification du ticket
            edit_window = tk.Toplevel(self.root)
            edit_window.title("Modifier le ticket")

            # Entrées pour modifier les détails du ticket
            tk.Label(edit_window, text="Nom du client:", bg=self.bg_color, fg=self.text_color).grid(row=0, column=0, sticky="w", padx=10, pady=5)
            new_client_name_entry = tk.Entry(edit_window)
            new_client_name_entry.insert(0, ticket[1])
            new_client_name_entry.grid(row=0, column=1, padx=10, pady=5)

            tk.Label(edit_window, text="Description du problème:", bg=self.bg_color, fg=self.text_color).grid(row=1, column=0, sticky="w", padx=10, pady=5)
            new_problem_description_entry = tk.Entry(edit_window)
            new_problem_description_entry.insert(0, ticket[2])
            new_problem_description_entry.grid(row=1, column=1, padx=10, pady=5)

            tk.Label(edit_window, text="Priorité:", bg=self.bg_color, fg=self.text_color).grid(row=2, column=0, sticky="w", padx=10, pady=5)
            new_priority_var = tk.StringVar(value=ticket[3])
            new_priority_menu = ttk.Combobox(edit_window, textvariable=new_priority_var, values=["Faible", "Normal", "Élevée", "Urgente"], state="readonly")
            new_priority_menu.grid(row=2, column=1, padx=10, pady=5)

            # Bouton pour valider la modification du ticket
            submit_button = tk.Button(edit_window, text="Enregistrer", command=lambda: self.save_edited_ticket(ticket_number, new_client_name_entry.get(), new_problem_description_entry.get(), new_priority_var.get()), bg=self.main_color, fg="white")
            submit_button.grid(row=3, columnspan=2, pady=10)

    def save_edited_ticket(self, ticket_number, new_client_name, new_problem_description, new_priority):
        # Mettre à jour le ticket dans la base de données
        self.c.execute("UPDATE tickets SET client=%s, problem=%s, priority=%s WHERE id=%s", (new_client_name, new_problem_description, new_priority, ticket_number))
        self.conn.commit()  # Commit changes to the database
        messagebox.showinfo("Confirmation", f"Les modifications pour le ticket {ticket_number} ont été enregistrées avec succès.")

    def delete_ticket(self, ticket_number):
        # Supprimer le ticket correspondant de la base de données
        self.c.execute("DELETE FROM tickets WHERE id=%s", (ticket_number,))
        self.conn.commit()  # Commit changes to the database
        messagebox.showinfo("Confirmation", f"Le ticket {ticket_number} a été supprimé avec succès.")

    def update_history(self):
        # Effacer le contenu actuel de l'historique
        self.history_text.delete("1.0", tk.END)

        # Récupérer les tickets depuis la base de données
        self.c.execute("SELECT * FROM tickets")
        tickets = self.c.fetchall()

        # Ajouter les tickets existants à l'historique
        for ticket in tickets:
            ticket_number = ticket[0]
            tag_name = f"ticket_{ticket_number}"
            self.history_text.insert(tk.END, f"Ticket {ticket_number}:\n", tag_name)
            self.history_text.insert(tk.END, f"Client: {ticket[1]}\n")
            self.history_text.insert(tk.END, f"Problème: {ticket[2]}\n")
            self.history_text.insert(tk.END, f"Priorité: {ticket[3]}\n\n")
            self.history_text.insert(tk.END, f"Statut du ticket: {ticket[4]}\n\n\n")
            
            # Ajouter un événement de double clic à chaque ticket
            self.history_text.tag_configure(tag_name, foreground="blue", underline=1)
            self.history_text.tag_bind(tag_name, "<Double-1>", lambda event, ticket_number=ticket_number: self.handle_ticket_double_click(ticket_number))

    def submit_ticket(self):
        client_name = self.client_name_entry.get()
        problem_description = self.problem_description_entry.get()
        priority = self.priority_var.get()

        if client_name == '' or problem_description == '':
            messagebox.showerror("Erreur", "Veuillez remplir tous les champs.")
            return

        self.c.execute("INSERT INTO tickets (client, problem, priority, status) VALUES (%s, %s, %s, %s)",
                       (client_name, problem_description, priority, "Non défini"))
        self.conn.commit()

        messagebox.showinfo("Confirmation", "Ticket soumis avec succès.")

        # Effacer les entrées après soumission
        self.client_name_entry.delete(0, tk.END)
        self.problem_description_entry.delete(0, tk.END)
        self.priority_var.set("Normal")

        self.update_history()

    def __del__(self):
        self.conn.close()

    def logout(self):
        # Fermer la fenêtre principale pour déconnecter l'utilisateur
        self.root.destroy()

    def run_chat(self):
        subprocess.Popen(["python", "../chatbot/client.py"])

if __name__ == "__main__":
    root = tk.Tk()
    app = TicketingApp(root)
    root.mainloop()
