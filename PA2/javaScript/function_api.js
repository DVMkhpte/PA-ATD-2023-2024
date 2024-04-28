async function requestApi(formData, method, link) {

    let headers = {
        'Content-Type': 'application/json',
    };


    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const response = await fetch('http://localhost:8000/api' + link, {
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

    const response = await fetch('http://localhost:8000/api' + link, {
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

async function GetAllActivityForPlanning(){
    try {

        const userId = localStorage.getItem("3")
        localStorage.setItem('token',"MAo0cn7dXINoeeQ2kELdukJSX0XLqFAX3keHkpvl")

        const participationsE = await requestApiNoBody('GET', `/user/${userId}/participationsE`);
        const participationsF = await requestApiNoBody('GET', `/user/${userId}/participationsF`);
        const participationsA = await requestApiNoBody('GET', `/user/${userId}/participationsA`);


        return {
            participationsE,
            participationsF,
            participationsA
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des participations de l\'utilisateur :', error);
        throw error;
    }
}

