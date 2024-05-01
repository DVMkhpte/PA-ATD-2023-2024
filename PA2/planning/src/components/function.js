async function getAllActivityForPlanning() {
    try {
        const user = localStorage.getItem('id')
        console.log(userId)

        const participationsE = await requestApiNoBody("GET", `/user/${userId}/evenement`);
        const participationsF = await requestApiNoBody("GET", `/user/${userId}/formation`);
        const participationsA = await requestApiNoBody("GET", `/user/${userId}/activite`);

        return {
            participationsE,
            participationsF,
            participationsA
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des participations de l'utilisateur :", error);
        throw error;
    }
}

async function requestApiNoBody(method, link) {
    try {
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
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        throw error;
    }
}

export { getAllActivityForPlanning };