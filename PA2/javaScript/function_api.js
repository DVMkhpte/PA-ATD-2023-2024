

async function requestApi(formData, method, link){
    const response = await fetch('http://localhost:8000/api/'+ link, {
        method: method,
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const data = await response.json();
        return data

    } else {
        throw new Error('Erreur lors de la requête à l\'API');
    }

}