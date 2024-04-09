async function requestApi(formData, method, link) {
    const response = await fetch('http://localhost:8000/api' + link, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    console.log(response)
    if (response.ok) {
        const data = await response.json();
        if(data){
            return data
        }
    }
}

async function requestApiNoBody(method, link) {
    const response = await fetch('http://localhost:8000/api' + link, {
        redirect: 'manual',
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la récupération des données : ' + response.status);
    }
}

async function stockToken(data){
    const token = data.token
    localStorage.setItem('token', token);
}

function showAlert(message) {
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.classList.add('popup');
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.remove();
    }, 3000);
}
