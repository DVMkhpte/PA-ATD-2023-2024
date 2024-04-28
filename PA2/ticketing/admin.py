import tkinter as tk
from tkinter import ttk, messagebox
from user import TicketingApp

class AdminTicketingApp:
    def __init__(self, root, ticket_list):
        self.root = root
        self.ticket_list = ticket_list
        self.root.title("Panneau d'administration - Gestion des tickets")

        # Cadre principal
        self.main_frame = tk.Frame(self.root, bg="#f0f0f0")
        self.main_frame.pack(padx=20, pady=20)

        # Titre
        self.title_label = tk.Label(self.main_frame, text="Panneau d'administration - Gestion des tickets", font=("Helvetica", 16), bg="#f0f0f0")
        self.title_label.pack(pady=10)

        # Menu déroulant pour les options de gestion
        self.management_options_var = tk.StringVar()
        self.management_options = ttk.Combobox(self.main_frame, textvariable=self.management_options_var, values=["Tous les tickets", "Historique des tickets", "Tickets par utilisateur", "Tickets par jour", "Tickets par mois", "Tickets par heure"], state="readonly")
        self.management_options.pack(pady=5)

        # Bouton pour afficher les résultats
        self.show_results_button = tk.Button(self.main_frame, text="Afficher les résultats", command=self.show_results)
        self.show_results_button.pack(pady=5)

        # Zone de texte pour afficher les résultats
        self.results_text = tk.Text(self.main_frame, bg="white", fg="#333333", wrap="word")
        self.results_text.pack(pady=10, fill="both", expand=True)

        # Bouton de déconnexion
        self.logout_button = tk.Button(self.main_frame, text="Déconnexion", command=self.logout)
        self.logout_button.pack(side="bottom", pady=10)

    def show_results(self):
        selected_option = self.management_options_var.get()
        if selected_option == "Tous les tickets":
            self.results_text.delete("1.0", tk.END)
            self.results_text.insert(tk.END, "Voici la liste de tous les tickets :\n")
            for ticket in self.ticket_list:
                self.results_text.insert(tk.END, f"Client: {ticket['Client']}, Problème: {ticket['Problème']}, Priorité: {ticket['Priorité']}\n")

    def logout(self):
        # Fermer la fenêtre principale pour déconnecter l'administrateur
        self.root.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = AdminTicketingApp(root)
    root.mainloop()
