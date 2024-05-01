import tkinter as tk
from user import TicketingApp
from admin import AdminTicketingApp

class LoginPage:
    def __init__(self, root):
        self.root = root
        self.root.title("Page de connexion - App Ticketing Au Temps Donné")
        self.root.geometry("400x300")

        # Chargement du logo
        self.logo_image = tk.PhotoImage(file="../PA2/img/logo.png")
        self.logo_image = self.logo_image.subsample(2, 2)
        self.logo_label = tk.Label(root, image=self.logo_image)
        self.logo_label.pack(pady=10)

        # Styles de boutons
        self.button_style = {
            "bg": "#007bff",
            "fg": "white",
            "font": ("Arial", 12),
            "relief": "flat",
            "activebackground": "#0056b3",
            "activeforeground": "white",
            "padx": 20,
            "pady": 5,
            "width": 15
        }

        # Boutons pour différents utilisateurs
        self.admin_button = tk.Button(root, text="Administrateur", command=self.login_admin, **self.button_style)
        self.admin_button.pack(pady=5)
        self.beneficiaire_button = tk.Button(root, text="Bénéficiaire", command=self.login_beneficiaire, **self.button_style)
        self.beneficiaire_button.pack(pady=5)
        self.benevole_button = tk.Button(root, text="Bénévole", command=self.login_benevole, **self.button_style)
        self.benevole_button.pack(pady=5)

    def login_admin(self):
        self.root.destroy()  # Fermer la fenêtre de connexion admin
        root = tk.Tk()
        admin_app = AdminTicketingApp(root)
        root.mainloop()

    def login_beneficiaire(self):
        self.root.destroy()  # Fermer la fenêtre de connexion beneficiaire
        root = tk.Tk()
        user_app = TicketingApp(root)
        root.mainloop()

    def login_benevole(self):
        self.root.destroy()  # Fermer la fenêtre de connexion benevole
        root = tk.Tk()
        user_app = TicketingApp(root)
        root.mainloop()

if __name__ == "__main__":
    root = tk.Tk()
    login_page = LoginPage(root)
    root.mainloop()
