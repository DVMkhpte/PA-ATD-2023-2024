import tkinter as tk
from tkinter import ttk
import json
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt
import os

class AdminDashboard:
    def __init__(self, root):
        self.root = root
        self.root.title("Tableau de Bord Analytique - Admin")

        self.load_tickets()
        self.create_widgets()

    def load_tickets(self):
        try:
            with open("tickets.json", "r") as file:
                self.ticket_list = json.load(file)
        except FileNotFoundError:
            self.ticket_list = []

    def create_widgets(self):
        self.main_frame = tk.Frame(self.root)
        self.main_frame.pack(padx=20, pady=20)

        # Option pour filtrer les tickets par statut
        self.status_filter_var = tk.StringVar()
        self.status_filter_var.set("Tous les statuts")
        self.status_filter = ttk.Combobox(self.main_frame, textvariable=self.status_filter_var, values=["Tous les statuts", "En Attente", "En Cours", "Terminé"], state="readonly")
        self.status_filter.pack(pady=5)

        # Bouton pour filtrer les tickets
        self.filter_button = tk.Button(self.main_frame, text="Filtrer", command=self.filter_tickets)
        self.filter_button.pack(pady=5)

        # Zone de texte pour afficher les tickets filtrés
        self.results_text = tk.Text(self.main_frame, bg="white", fg="#333333", wrap="word")
        self.results_text.pack(pady=10, fill="both", expand=True)

        # Créer une frame pour les graphiques
        self.graph_frame = tk.Frame(self.main_frame)
        self.graph_frame.pack(pady=10)

        # Graphique en barre pour les tickets par statut
        self.plot_tickets_bar_chart().get_tk_widget().grid(row=0, column=0)

        # Graphique en barre pour les tickets par priorité
        self.plot_tickets_priority_chart().get_tk_widget().grid(row=0, column=1)

        # Bouton pour rediriger vers admin.py
        self.admin_button = tk.Button(self.main_frame, text="Accéder à l'interface Admin", command=self.open_admin_interface)
        self.admin_button.pack(pady=10)

    def filter_tickets(self):
        selected_status = self.status_filter_var.get()
        if selected_status == "Tous les statuts":
            filtered_tickets = self.ticket_list
        else:
            filtered_tickets = [ticket for ticket in self.ticket_list if ticket.get("Statut") == selected_status]
        self.display_tickets(filtered_tickets)

    def display_tickets(self, tickets):
        self.results_text.delete("1.0", tk.END)
        for ticket in tickets:
            self.results_text.insert(tk.END, f"Client: {ticket.get('Client', '')}, Problème: {ticket.get('Problème', '')}, Statut: {ticket.get('Statut', '')}\n")

    def plot_tickets_bar_chart(self):
        # Compter le nombre de tickets pour chaque statut
        status_counts = {"En Attente": 0, "En Cours": 0, "Terminé": 0}
        for ticket in self.ticket_list:
            status = ticket.get("Statut")
            if status in status_counts:
                status_counts[status] += 1

        # Créer le graphique en barre
        fig, ax = plt.subplots()
        ax.bar(status_counts.keys(), status_counts.values(), color=['green', 'blue', 'orange'])
        ax.set_xlabel('Statut')
        ax.set_ylabel('Nombre de Tickets')
        ax.set_title('Tickets par Statut')

        # Retourner le graphique pour pouvoir l'ajouter à la grille
        return FigureCanvasTkAgg(fig, master=self.graph_frame)

    def plot_tickets_priority_chart(self):
        # Compter le nombre de tickets pour chaque priorité
        priority_counts = {"Faible": 0, "Normal": 0, "Élevée": 0, "Urgente": 0}
        for ticket in self.ticket_list:
            priority = ticket.get("Priorité")
            if priority in priority_counts:
                priority_counts[priority] += 1

        # Créer le graphique en barre
        fig, ax = plt.subplots()
        ax.bar(priority_counts.keys(), priority_counts.values(), color=['red', 'blue', 'green', 'orange'])
        ax.set_xlabel('Priorité')
        ax.set_ylabel('Nombre de Tickets')
        ax.set_title('Tickets par Priorité')

        # Retourner le graphique pour pouvoir l'ajouter à la grille
        return FigureCanvasTkAgg(fig, master=self.graph_frame)

    def open_admin_interface(self):
        os.system("python admin.py")

if __name__ == "__main__":
    root = tk.Tk()
    app = AdminDashboard(root)
    root.mainloop()
