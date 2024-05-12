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

class AdminTicketingApp:
    def __init__(self, root):
        self.root = root
        self.ticket_list = []  
        self.root.title("Panneau d'administration - Gestion des tickets")
        self.main_frame = tk.Frame(self.root, bg="#f0f0f0")
        self.main_frame.pack(padx=20, pady=20)

        self.conn = mysql.connector.connect(
            host="api.autempsdonne.com",
            user="root",
            password="exemplepwd",
            database="tickets"
        )
        self.c = self.conn.cursor()

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

        self.chat_button = tk.Button(self.main_frame, text="Ouvrir un Chat", command=self.run_chat, bg="#225B7C", fg="white")
        self.chat_button.pack(pady=10)

        self.show_dynamic_table_button = tk.Button(self.main_frame, text="Afficher le tableau dynamique", command=self.run_test, bg="#225B7C", fg="white")
        self.show_dynamic_table_button.pack(pady=5)

        self.logout_button = tk.Button(self.main_frame, text="Déconnexion", command=self.logout, bg="#f44336", fg="white")
        self.logout_button.pack(pady=10)

        # Lier la fonction handle_ticket_double_click au double clic sur un élément de la liste
        self.results_listbox.bind("<Double-1>", self.handle_ticket_double_click)

    def load_tickets(self):
        try:
            self.c.execute("SELECT * FROM tickets")
            self.ticket_list = self.c.fetchall()  
        except mysql.connector.Error as e:
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
                self.c.execute("UPDATE tickets SET status = %s WHERE id = %s", (new_status, ticket_id))
                self.conn.commit()  
                self.load_tickets()
                self.populate_tickets_listbox()
            else:
                self.results_listbox.insert(tk.END, "Aucun ticket sélectionné. Veuillez sélectionner un ticket dans la liste.\n")
        else:
            self.results_listbox.insert(tk.END, "Aucun ticket sélectionné. Veuillez sélectionner un ticket dans la liste.\n")

    def logout(self):
        self.root.destroy()

    def run_test(self):
        subprocess.Popen(["python", "../db/dashboard_admin.py"])

    def run_chat(self):
        subprocess.Popen(["python", "../chatbot/chat_admin.py"])

    def handle_ticket_double_click(self, event):
        # Obtenir l'index de l'élément sélectionné dans la liste
        index = self.results_listbox.curselection()
        if index:
            index = index[0]
            ticket_number = self.ticket_list[index][0]
            custom_dialog = CustomDialog(self.root, "Action sur le ticket", f"Que voulez-vous faire avec le ticket {ticket_number} ?")
            self.root.wait_window(custom_dialog)
            choice = custom_dialog.result
            if choice == 'modify':
                self.edit_ticket(ticket_number)
            elif choice == 'delete':
                self.delete_ticket(ticket_number)

    def edit_ticket(self, ticket_number):
        self.c.execute("SELECT * FROM tickets WHERE id=%s", (ticket_number,))
        ticket = self.c.fetchone()
        if ticket:
            edit_window = tk.Toplevel(self.root)
            edit_window.title("Modifier le ticket")

            new_client_name_entry = tk.Entry(edit_window)
            new_client_name_entry.insert(0, ticket[1])
            new_client_name_entry.grid(row=0, column=1, padx=10, pady=5)

            new_problem_description_entry = tk.Entry(edit_window)
            new_problem_description_entry.insert(0, ticket[2])
            new_problem_description_entry.grid(row=1, column=1, padx=10, pady=5)

            new_priority_var = tk.StringVar(value=ticket[3])
            new_priority_menu = ttk.Combobox(edit_window, textvariable=new_priority_var, values=["Faible", "Normal", "Élevée", "Urgente"], state="readonly")
            new_priority_menu.grid(row=2, column=1, padx=10, pady=5)

            submit_button = tk.Button(edit_window, text="Enregistrer", command=lambda: self.save_edited_ticket(ticket_number, new_client_name_entry.get(), new_problem_description_entry.get(), new_priority_var.get()), bg="#005bac", fg="white")
            submit_button.grid(row=3, columnspan=2, pady=10)

    def save_edited_ticket(self, ticket_number, new_client_name, new_problem_description, new_priority):
        self.c.execute("UPDATE tickets SET client=%s, problem=%s, priority=%s WHERE id=%s", (new_client_name, new_problem_description, new_priority, ticket_number))
        self.conn.commit()
        messagebox.showinfo("Confirmation", f"Les modifications pour le ticket {ticket_number} ont été enregistrées avec succès.")

    def delete_ticket(self, ticket_number):
        self.c.execute("DELETE FROM tickets WHERE id=%s", (ticket_number,))
        self.conn.commit()
        messagebox.showinfo("Confirmation", f"Le ticket {ticket_number} a été supprimé avec succès.")

    def update_history(self):
        self.history_text.delete("1.0", tk.END)

        self.c.execute("SELECT * FROM tickets")
        tickets = self.c.fetchall()

        for ticket in tickets:
            ticket_number = ticket[0]
            tag_name = f"ticket_{ticket_number}"
            self.history_text.insert(tk.END, f"Ticket {ticket_number}:\n", tag_name)
            self.history_text.insert(tk.END, f"Client: {ticket[1]}\n")
            self.history_text.insert(tk.END, f"Problème: {ticket[2]}\n")
            self.history_text.insert(tk.END, f"Priorité: {ticket[3]}\n\n")
            self.history_text.insert(tk.END, f"Statut du ticket: {ticket[4]}\n\n\n")
            
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

        self.client_name_entry.delete(0, tk.END)
        self.problem_description_entry.delete(0, tk.END)
        self.priority_var.set("Normal")

        self.update_history()

if __name__ == "__main__":
    root = tk.Tk()
    app = AdminTicketingApp(root)
    root.mainloop()
