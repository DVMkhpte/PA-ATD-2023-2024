import tkinter as tk
import re
import requests
import json
#from PIL import Image, ImageTk
from admin import AdminTicketingApp
from user import TicketingApp
from tkinter import messagebox

class LoginPage:
    def __init__(self, root):
        self.root = root
        self.root.title("Connexion - App Ticketing Au Temps Donné")
        self.root.geometry("600x500")

        self.bg_color = "#f0f0f0"
        self.button_color = "#007bff"
        self.button_text_color = "white"

        self.button_style = {
            "bg": self.button_color,
            "fg": self.button_text_color,
            "font": ("Arial", 12),
            "relief": "flat",
            "activebackground": "#0056b3",
            "activeforeground": "white",
            "padx": 20,
            "pady": 5,
            "width": 15
        }

        self.main_frame = tk.Frame(root, bg=self.bg_color)
        self.main_frame.pack(expand=True, fill=tk.BOTH)

        self.root.update_idletasks()
        window_width = self.root.winfo_width()
        window_height = self.root.winfo_height()
        x = (self.root.winfo_screenwidth() // 2) - (window_width // 2)
        y = (self.root.winfo_screenheight() // 2) - (window_height // 2)
        self.root.geometry(f"+{x}+{y}")

        #image_path = "../img/logo.png"
        #original_image = Image.open(image_path)
        #resized_image = original_image.resize((200, 200))
        #self.logo_image = ImageTk.PhotoImage(resized_image)
        #logo_label = tk.Label(self.main_frame, image=self.logo_image, bg=self.bg_color)
        #logo_label.pack(pady=20)

        tk.Label(self.main_frame, text="Adresse email:", bg=self.bg_color).pack()
        self.email_entry = tk.Entry(self.main_frame, bg="white")
        self.email_entry.pack(pady=5)
        tk.Label(self.main_frame, text="Mot de passe:", bg=self.bg_color).pack()
        self.password_entry = tk.Entry(self.main_frame, show="*", bg="white")
        self.password_entry.pack(pady=5)

        login_button = tk.Button(self.main_frame, text="Se connecter", command=self.login, **self.button_style)
        login_button.pack(pady=10)

    

    def login(self):
        email = self.email_entry.get().strip()
        password = self.password_entry.get().strip()

        form_data = {
            "email": email,
            "password": password
        }
        form_json = json.dumps(form_data)

        print("Données du formulaire (JSON) :", form_json)

        try:
            response = requests.post("http://api.autempsdonne.com/api/user/login", json=form_data)

            print(response)

            if response.status_code == 200:
                user_data = response.json()
                self.redirect_based_on_role(user_data)
            else:
                messagebox.showerror("Erreur de connexion", "Identifiants incorrects")
        except Exception as e:
            messagebox.showerror("Erreur de connexion", f"Une erreur s'est produite : {e}")




    def redirect_based_on_role(self, user_data):
        role = user_data.get("role")
        if role == "admin":
            self.root.destroy()
            root = tk.Tk()
            admin_app = AdminTicketingApp(root)
            root.mainloop()
        elif role == "beneficiaire" or role == "benevole":
            self.root.destroy()
            root = tk.Tk()
            user_app = TicketingApp(root)
            root.mainloop()
        else:
            messagebox.showerror("Erreur de connexion", "Rôle utilisateur non valide")


if __name__ == "__main__":
    root = tk.Tk()
    login_page = LoginPage(root)
    root.mainloop()
