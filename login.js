document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = {
        username: username,
        password: password
    };

    fetch('https://www.fulek.com/data/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Greška prilikom prijave');
        }
        return response.json();
    })
    .then(loginResponse => {
        if (loginResponse.statusCode === 404) {
            console.error('Korisnik nije pronađen:', loginResponse.errorMessages);
            alert("Neuspješna prijava - korisnik nije pronađen");
        } else {
            const token = loginResponse.data.token;
            localStorage.setItem('authToken', token);
            localStorage.setItem('isLoggedIn', true);
            console.log('Uspješna prijava:', loginResponse);
            alert("Uspješna prijava!");
            window.location.href = "Pocetna.html";
            
        }
    })
    .catch(error => {
        console.error('Greška pri prijavi:', error);
        alert("Neuspješna prijava - došlo je do greške");
    });
});
