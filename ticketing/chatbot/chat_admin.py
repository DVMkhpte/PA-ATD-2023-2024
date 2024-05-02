import tkinter as tk
from tkinter import ttk
import sqlite3

class ChatAdminGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Chat - Admin")
        self.root.geometry("500x400")
        self.root.configure(bg="#f0f0f0")

        # Connexion à la base de données
        self.conn = sqlite3.connect("messages.db")
        self.c = self.conn.cursor()
        self.create_table()

        # Zone de messages
        self.messages = tk.Text(self.root, wrap='word', height=15, bg="#FFFFFF", fg="#333333", font=("Arial", 12), state='disabled')
        self.messages.pack(fill="both", expand=True, padx=10, pady=10)

        # Entrée utilisateur
        self.user_entry = ttk.Entry(self.root, width=50)
        self.user_entry.pack(side="left", fill="both", expand=True, padx=(10, 5), pady=(0, 10))
        self.user_entry.bind("<Return>", self.send_message)

        # Bouton d'envoi
        self.send_button = ttk.Button(self.root, text="Send", command=self.send_message, style="Send.TButton")
        self.send_button.pack(side="right", padx=(0, 10), pady=(0, 10))

        self.style_widgets()

    def style_widgets(self):
        self.root.option_add('*TButton*foreground', '#FFFFFF')
        self.root.option_add('*TButton*background', '#007BFF')
        self.root.option_add('*TButton*font', ('Arial', 12))
        self.root.option_add('*TLabel*font', ('Arial', 12))

        self.root.option_add('*TButton.padding', 5)
        self.root.option_add('*TEntry.padding', 5)
        self.root.option_add('*TText.padding', 5)

        self.root.option_add('*TButton*relief', 'flat')

        self.root.style = ttk.Style()
        self.root.style.configure("Send.TButton", background="#007BFF", font=("Arial", 12), padding=5)

    def send_message(self, event=None):
        admin_message = self.user_entry.get()
        if admin_message.strip():  # Vérifier si le message n'est pas vide
            self.user_entry.delete(0, tk.END)
            self.display_message("Admin: " + admin_message)
            self.save_message("Admin", admin_message)

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
    app = ChatAdminGUI(root)
    root.mainloop()
