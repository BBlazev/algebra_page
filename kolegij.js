function fetchCurriculumList() {
    fetch('https://www.fulek.com/data/api/supit/curriculumlist/hr')
        .then(response => {
            if (!response.ok) {
                throw new Error('Greška pri dohvaćanju popisa kolegija');
            }
            return response.json();
        })
        .then(curriculumList => {
            const searchContainer = document.getElementById('searchContainer');
            curriculumList.forEach(curriculum => {
                const option = document.createElement('option');
                option.value = curriculum.id;
                option.textContent = curriculum.nazivKolegija;
                searchContainer.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Greška pri dohvaćanju popisa kolegija:', error);
        });
}
