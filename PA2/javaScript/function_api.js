async function requestApi(formData, method, link) {

    let headers = {
        'Content-Type': 'application/json',
    };


    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const response = await fetch('http://api.autempsdonne.com/api' + link, {
        method: method,
        headers: headers,
        body: JSON.stringify(formData)
    });
    console.log(response)
    if (response.ok) {
        const textResponse = await response.text();
        let jsonResponse;
        if (textResponse.startsWith('1')) {
            const trimmedResponse = textResponse.substring(1);
            jsonResponse = JSON.parse(trimmedResponse);
        } else {
            jsonResponse = JSON.parse(textResponse);
        }
        if(jsonResponse){
            return jsonResponse
        }
    }
}

async function requestApiNoBody(method, link) {
    let headers = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const response = await fetch('http://api.autempsdonne.com/api' + link, {
        redirect: 'manual',
        method: method,
        headers: headers,
    });
    if (response.ok) {
        const textResponse = await response.text();
        let jsonResponse;
        if (textResponse.startsWith('1')) {
            const trimmedResponse = textResponse.substring(1);
            jsonResponse = JSON.parse(trimmedResponse);
        } else {
            jsonResponse = JSON.parse(textResponse);
        }
        return jsonResponse;
    } else {
        throw new Error('Erreur lors de la récupération des données : ' + response.status);
    }
}

async function stockData(data){
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('id', data.id);
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

function verifconnection(){
    token = localStorage.getItem('token')
    if(!token){
        window.location.href ='index.php'
    }
}



