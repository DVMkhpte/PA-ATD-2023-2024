<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Logins</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
      />
  </head>
  <body>
    <div class="background"></div>
    <div class="card">
      <img class="logo" src="../img/logo.png" />
      <h2>Bienvenue</h2>
      <form method="post" class="form" id="loginForm">
        <input type="email" id="email" placeholder="Email" />
        <input type="password" id="password" placeholder="Mot de passe" />
        <button>Se connecter</button>
      </form>
        <footer>
            Pas de compte? Creer-en un
            <a href="createAccount.php">ici</a>
        </footer>
    </div>
  </body>
</html>

<script>
document.getElementById('loginForm').addEventListener('submit', async function(event) {
event.preventDefault();

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const formData = {
email: email,
password: password
};

    const response = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });

if (response.ok) { 
const data = await response.json();
console.log('Réponse de l\'API :', data);

} else {
throw new Error('Erreur lors de la requête à l\'API');
}})
</script>

<style>

    * {
        box-sizing: border-box;
    }

    body {
        display: grid;
        place-items: center;
        gap: 50px;
        margin: 0;
        height: 100vh;
        padding: 0 32px;
        background: #eff9ff;
        font-family: "Euclid Circular A", "Poppins";
    }

    @media (width >= 500px) {
        body {
            padding: 0;
        }
    }

    a{
        text-decoration: none;
        color: #225B7C;
    }

    a:hover {
        color: inherit;
    }

    .background {
        position: fixed;
        top: -50vmin;
        left: -50vmin;
        width: 100vmin;
        height: 100vmin;
        border-radius: 47% 53% 61% 39% / 45% 51% 49% 55%;
        background: #59CD97;
    }

    .background::after {
        content: "";
        position: inherit;
        right: -50vmin;
        bottom: -55vmin;
        width: inherit;
        height: inherit;
        border-radius: inherit;
        background: #83ee99;
    }

    .card {
        overflow: hidden;
        position: relative;
        z-index: 3;
        width: 94%;
        margin: 0 20px;
        padding: 170px 30px 54px;
        border-radius: 24px;
        background: #ffffff;
        text-align: center;
        box-shadow: 0 100px 100px rgb(0 0 0 / 10%);
    }

    .card::before {
        content: "";
        position: absolute;
        top: -880px;
        left: 50%;
        translate: -50% 0;
        width: 1000px;
        height: 1000px;
        border-radius: 50%;
        background: #225B7C;
    }

    @media (width >= 500px) {
        .card {
            margin: 0;
            width: 360px;
        }
    }

    .card .logo {
        position: absolute;
        top: 10px;
        left: 50%;
        translate: -50% 0;
        width: 100px;
        height: 100px;
    }

    .card > h2 {
        font-size: 22px;
        font-weight: 400;
        margin: 0 0 38px;
        color: rgb(0 0 0 / 38%);
    }

    .form {
        margin: 0 0 44px;
        display: grid;
        gap: 12px;
    }

    .form :is(input, button) {
        width: 100%;
        height: 56px;
        border-radius: 28px;
        font-size: 16px;
        font-family: inherit;
    }

    .form > input {
        border: 0;
        padding: 0 24px;
        color: #222222;
        background: #ededed;
    }

    .form > input::placeholder {
        color: rgb(0 0 0 / 28%);
    }

    .form > button {
        border: 0;
        color: #f9f9f9;
        background: #225B7C;
        display: grid;
        place-items: center;
        font-weight: 500;
        cursor: pointer;
    }

    .card > footer {
        color: #a1a1a1;
    }

    .card > footer > a {
        color: #216ce7;
    }

</style>
