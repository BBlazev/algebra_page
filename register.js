document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // spriječava osvježavanje stranice pri submitu forme

    // Podaci iz forme
    const formData = new URLSearchParams();
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);

    // Slanje POST zahtjeva
    fetch('https://www.fulek.com/data/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Greška prilikom registracije');
        }
        return response.json();
    })
    .then(data => {
        console.log('Uspješna registracija:', data);
        alert("Uspjesna registracija!")
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Greška:', error);
    });  
});
