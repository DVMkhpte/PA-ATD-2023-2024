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
                top: 10%;
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
<button onclick="test()">Afficher Popup</button>

<script src="../javaScript/function_api.js"></script>
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

    function test(){
        localStorage.setItem('id',"3")
        localStorage.setItem('token',"g3DPoiovRAPRqXyX5vZTJ9bYXmAlNI59gmBn2EG8")
        console.log(GetAllActivityForPlanning())
    }
</script>
</body>
</html>
