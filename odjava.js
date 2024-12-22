function odjava() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authToken');
        
        alert('Uspješno ste se odjavili.');
        window.location.reload();

    } else {
        alert('Niste prijavljeni.');
    }
}
