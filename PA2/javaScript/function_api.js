

async function requestApi(formData, method, link) {
    const response = await fetch('http://localhost:8000/api' + link, {
        redirect: 'manual',
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(formData)

    });

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

        if(data){
            return data
        }
    }
}

async function stockToken(data){
    const token = data.token
    localStorage.setItem('token', token);
}
