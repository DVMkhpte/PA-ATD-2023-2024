import tkinter as tk
import re
from PIL import Image, ImageTk
from admin import AdminTicketingApp
from user import TicketingApp

class LoginPage:
    def __init__(self, root):
        self.root = root
        self.root.title("Connexion - App Ticketing Au Temps Donné")
        self.root.geometry("600x500")

        # Couleurs
        bg_color = "#f0f0f0"
        button_color = "#007bff"
        button_text_color = "white"

        # Style pour les boutons
        button_style = {
            "bg": button_color,
            "fg": button_text_color,
            "font": ("Arial", 12),
            "relief": "flat",
            "activebackground": "#0056b3",
            "activeforeground": "white",
            "padx": 20,
            "pady": 5,
            "width": 15
        }

        # Frame principale
        main_frame = tk.Frame(root, bg=bg_color)
        main_frame.pack(expand=True, fill=tk.BOTH)

        # Centrer le cadre verticalement et horizontalement
        self.root.update_idletasks()
        window_width = self.root.winfo_width()
        window_height = self.root.winfo_height()
        x = (self.root.winfo_screenwidth() // 2) - (window_width // 2)
        y = (self.root.winfo_screenheight() // 2) - (window_height // 2)
        self.root.geometry(f"+{x}+{y}")

        image_path = "../PA2/img/logo.png"
        original_image = Image.open(image_path)
        resized_image = original_image.resize((200, 200))
        self.logo_image = ImageTk.PhotoImage(resized_image)
        logo_label = tk.Label(main_frame, image=self.logo_image, bg=bg_color)
        logo_label.pack(pady=20)

        # Labels et champs de saisie pour le login et le mot de passe
        tk.Label(main_frame, text="Adresse email:", bg=bg_color).pack()
        self.email_entry = tk.Entry(main_frame, bg="white")
        self.email_entry.pack(pady=5)
        tk.Label(main_frame, text="Mot de passe:", bg=bg_color).pack()
        self.password_entry = tk.Entry(main_frame, show="*", bg="white")
        self.password_entry.pack(pady=5)

        # Bouton de connexion
        login_button = tk.Button(main_frame, text="Se connecter", command=self.login, **button_style)
        login_button.pack(pady=10)

    def login(self):
        email = self.email_entry.get().strip()
        password = self.password_entry.get().strip() 

        if not email or not password:
            tk.messagebox.showerror("Erreur de connexion", "Veuillez remplir tous les champs.")
            return

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            tk.messagebox.showerror("Erreur de connexion", "Veuillez saisir une adresse email valide.")
            return

        if len(password) < 8:
            tk.messagebox.showerror("Erreur de connexion", "Le mot de passe doit contenir au moins 8 caractères.")
            return

        login_data = {
        "email": email,
        "password": password
        }

        role_data = {
            "token": "62|ZJ6BNqHBLbB6NgpTOCalsdu7KDP1p4c2cgZn3E7e",
            "role": "admin",
            "id": 3
        }
        role = role_data["role"]

        # Redirection en fonction du rôle
        if role == "admin":
            self.root.destroy()
            root = tk.Tk()
            admin_app = AdminTicketingApp(root)
            root.mainloop()
        elif role == "beneficiaire" or role == "benevole":
            self.root.destroy()
            root = tk.Tk()
            admin_app = TicketingApp(root)
            root.mainloop()
        else:
            tk.messagebox.showerror("Erreur de connexion", "Identifiants incorrects")


if __name__ == "__main__":
    root = tk.Tk()
    login_page = LoginPage(root)
    root.mainloop()
