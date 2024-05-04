import tkinter as tk
from tkinter import ttk
import sqlite3

class ChatGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Chat")
        self.root.geometry("600x600")  # Nouvelle taille de fenêtre
        self.root.configure(bg="#f0f0f0")
        
        # Connexion à la base de données
        self.conn = sqlite3.connect("C:/Users/Asus/OneDrive/Bureau/ESGI-COURS/2e-Année/S2/PA/PA-ATD-2023-2024/ticketing/messages.db")
        self.c = self.conn.cursor()
        
        # Cadre principal
        self.main_frame = ttk.Frame(self.root, padding=10)
        self.main_frame.pack(fill="both", expand=True)
        
        # Zone de messages
        self.messages = tk.Text(self.main_frame, wrap='word', height=15, bg="#FFFFFF", fg="#333333", font=("Arial", 12), state='disabled')
        self.messages.pack(fill="both", expand=True, padx=10, pady=10)

        
        # Entrée utilisateur
        self.user_entry = ttk.Entry(self.main_frame, width=40, font=("Arial", 12))
        self.user_entry.pack(side="left", padx=10, pady=(0, 10), fill="x", expand=True)
        self.user_entry.bind("<Return>", self.send_message)
        
        # Bouton d'envoi
        self.send_button = ttk.Button(self.main_frame, text="Send", command=self.send_message)
        self.send_button.pack(side="right", padx=10, pady=(0, 10))

    def send_message(self, event=None):
        user_message = self.user_entry.get()
        if user_message.strip():  # Vérifier si le message n'est pas vide
            self.user_entry.delete(0, tk.END)
            self.display_message("User: " + user_message)
            self.save_message("User", user_message)
        
    def display_message(self, message):
        self.messages.config(state='normal')
        self.messages.insert(tk.END, message + "\n")
        self.messages.config(state='disabled')
        self.messages.see(tk.END)
        
    def create_table(self):
        self.c.execute('''CREATE TABLE IF NOT EXISTS messages
                        (id INTEGER PRIMARY KEY,
                        sender TEXT,
                        message TEXT)''')
        self.conn.commit()
        
    def save_message(self, sender, message):
        self.c.execute("INSERT INTO messages (sender, message) VALUES (?, ?)", (sender, message))
        self.conn.commit()

if __name__ == "__main__":
    root = tk.Tk()
    app = ChatGUI(root)
    root.mainloop()
