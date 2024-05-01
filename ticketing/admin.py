import tkinter as tk
from tkinter import ttk
import subprocess
import json

class AdminTicketingApp:
    def __init__(self, root):
        self.root = root
        self.ticket_list = []
        self.load_tickets()
        self.root.title("Panneau d'administration - Gestion des tickets")

        self.main_frame = tk.Frame(self.root, bg="#f0f0f0")
        self.main_frame.pack(padx=20, pady=20)

        self.results_listbox = tk.Listbox(self.main_frame, selectmode=tk.SINGLE, bg="white", fg="#333333", width=100, height=20)
        self.results_listbox.pack(pady=10, fill="both", expand=True)

        def on_ticket_select(self, event):
    # Effacer le contenu actuel du menu déroulant des statuts
            self.status_dropdown.delete(0, tk.END)
            
            # Récupérer l'index du ticket sélectionné
            selected_index = self.results_listbox.curselection()
            
            if selected_index:  # Vérifier si un ticket est sélectionné
                selected_index = selected_index[0]  # Prendre le premier index si plusieurs sont sélectionnés
                if 0 <= selected_index < len(self.ticket_list):  # Vérifier que l'index est valide
                    ticket = self.ticket_list[selected_index]
                    
                    # Afficher le statut actuel du ticket dans le menu déroulant
                    current_status = ticket.get('Statut', 'Non défini')
                    self.status_dropdown.insert(tk.END, current_status)
                    
                    # Ajouter les autres options de statut dans le menu déroulant
                    for status in ["En cours", "A traiter", "Terminé"]:
                        if status != current_status:
                            self.status_dropdown.insert(tk.END, status)
                else:
                    print("Index du ticket sélectionné non valide.")
            else:
                print("Aucun ticket sélectionné.")

        self.results_listbox.bind("<<ListboxSelect>>", self.on_ticket_select)  # Lier la méthode on_ticket_select à la sélection d'un élément dans la Listbox

        self.status_var = tk.StringVar()
        self.status_var.set("En cours")  # Statut par défaut
        self.status_label = tk.Label(self.main_frame, text="Statut:", bg="#f0f0f0")
        self.status_label.pack(pady=5)
        self.status_dropdown = ttk.Combobox(self.main_frame, textvariable=self.status_var, values=["En cours", "A traiter", "Terminé"], state="readonly")
        self.status_dropdown.pack(pady=5)

        self.update_status_button = tk.Button(self.main_frame, text="Mettre à jour le statut", command=self.update_status, bg="#4CAF50", fg="white")
        self.update_status_button.pack(pady=5)


    def load_tickets(self):
        try:
            with open("tickets.json", "r") as file:
                self.ticket_list = json.load(file)
        except FileNotFoundError:
            self.ticket_list = []
        
        self.main_frame = tk.Frame(self.root, bg="#f0f0f0")
        self.main_frame.pack(padx=20, pady=20)
        
        self.title_label = tk.Label(self.main_frame, text="Panneau d'administration - Gestion des tickets", font=("Helvetica", 16), bg="#f0f0f0")
        self.title_label.pack(pady=10)
        
        self.management_options_var = tk.StringVar()
        self.management_options = ttk.Combobox(self.main_frame, textvariable=self.management_options_var, values=["Tous les tickets", "Tickets validés", "Tickets par utilisateur", "Tickets par jour", "Tickets par mois", "Tickets par heure"], state="readonly")
        self.management_options.pack(pady=5)
        
        self.show_results_button = tk.Button(self.main_frame, text="Afficher les résultats", command=self.show_results, bg="#225B7C", fg="white")
        self.show_results_button.pack(pady=5)

        # Bouton pour exécuter test.py
        self.run_test_button = tk.Button(self.main_frame, text="Affiche le tableau dynamique", command=self.run_test, bg="#225B7C", fg="white")
        self.run_test_button.pack(pady=5)

        self.logout_button = tk.Button(self.main_frame, text="Déconnexion", command=self.logout, bg="#f44336", fg="white")
        self.logout_button.pack(pady=10)

        # Création de la Listbox pour afficher les tickets
        self.results_listbox = tk.Listbox(self.main_frame, bg="white", fg="#333333")
        self.results_listbox.pack(pady=10, fill="both", expand=True)
        self.populate_tickets_listbox()

        # Ajout du menu déroulant pour les statuts
        self.status_var = tk.StringVar()
        self.status_var.set("En cours")  # Statut par défaut
        self.status_label = tk.Label(self.main_frame, text="Statut:", bg="#f0f0f0")
        self.status_label.pack(pady=5)
        self.status_dropdown = ttk.Combobox(self.main_frame, textvariable=self.status_var, values=["En cours", "A traiter", "Terminé"], state="readonly")
        self.status_dropdown.pack(pady=5)

        # Bouton pour mettre à jour le statut du ticket sélectionné
        self.update_status_button = tk.Button(self.main_frame, text="Mettre à jour le statut", command=self.update_status, bg="#225B7C", fg="white")
        self.update_status_button.pack(pady=5)

    def populate_tickets_listbox(self):
        for ticket in self.ticket_list:
            ticket_info = f"Client: {ticket['Client']}, Problème: {ticket['Problème']}, Priorité: {ticket['Priorité']}, Statut: {ticket.get('Statut', 'Non défini')}"
            self.results_listbox.insert(tk.END, ticket_info)

    def show_results(self):
        selected_option = self.management_options_var.get()
        if selected_option == "Tous les tickets":
            self.display_all_tickets()
        elif selected_option == "Tickets validés":
            self.display_validated_tickets()

    def display_all_tickets(self):
        self.results_listbox.delete(0, tk.END)
        for ticket in self.ticket_list:
            ticket_info = f"Client: {ticket['Client']}, Problème: {ticket['Problème']}, Priorité: {ticket['Priorité']}, Statut: {ticket.get('Statut', 'Non défini')}"
            self.results_listbox.insert(tk.END, ticket_info)

    def display_validated_tickets(self):
        self.results_listbox.delete(0, tk.END)
        validated_tickets = [ticket for ticket in self.ticket_list if ticket.get("validated")]
        for ticket in validated_tickets:
            ticket_info = f"Client: {ticket['Client']}, Problème: {ticket['Problème']}, Priorité: {ticket['Priorité']}, Statut: {ticket.get('Statut', 'Non défini')}"
            self.results_listbox.insert(tk.END, ticket_info)

    def update_status(self):
    # Obtenir l'index du ticket sélectionné dans la Listbox
        selected_index = self.results_listbox.curselection()
        if selected_index:  # Vérifier si un ticket est sélectionné
            selected_index = selected_index[0]  # Prendre le premier index si plusieurs sont sélectionnés
            if 0 <= selected_index < len(self.ticket_list):  # Vérifier que l'index est valide
                new_status = self.status_var.get()  # Obtenir le nouveau statut sélectionné
                self.ticket_list[selected_index]['Statut'] = new_status  # Mettre à jour le statut du ticket
                self.show_results()  # Rafraîchir l'affichage des tickets
                self.results_listbox.activate(selected_index)  # Activer le ticket sélectionné
                self.results_listbox.selection_set(selected_index)  # Sélectionner le ticket mis à jour dans la Listbox
            else:
                self.results_listbox.insert(tk.END, "Aucun ticket sélectionné. Veuillez sélectionner un ticket dans la liste.\n")
        else:
            self.results_listbox.insert(tk.END, "Aucun ticket sélectionné. Veuillez sélectionner un ticket dans la liste.\n")
        self.save_tickets()

    def save_tickets(self):
        with open("tickets.json", "w") as file:
            json.dump(self.ticket_list, file)

    def logout(self):
        self.root.destroy()

    def run_test(self):
        subprocess.Popen(["python", "dashboard_admin.py"])

if __name__ == "__main__":
    root = tk.Tk()
    app = AdminTicketingApp(root)
    root.mainloop()
