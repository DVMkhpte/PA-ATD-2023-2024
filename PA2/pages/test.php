<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Popup Test</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
        rel="stylesheet"
    />
    <style>
        .popup {
            position: fixed;
            top: 85%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #225B7C;
            padding: 20px;
            border: 2px solid white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            color: whitesmoke;
            font-family: "Euclid Circular A", "Poppins";
        }
    </style>
</head>
<body>
<button onclick="showAlert()">Afficher Popup</button>

<script>
    function showAlert() {
        const message = "Ceci est un message de test pour la popup !";

        const popup = document.createElement('div');
        popup.textContent = message;
        popup.classList.add('popup');

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 3000);
    }
</script>
</body>
</html>
