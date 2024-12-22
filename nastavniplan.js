document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        const nastavniPlan = document.getElementById('nastavniPlanItem');
        nastavniPlan.style.display = 'block';

        const searchInput = document.getElementById('searchInput');
        const autocomplete = document.getElementById('autocomplete');
        let courseData = []; // Store course data for autocomplete

        getNastavniPlan();

        // Dohvacanje kolegija s API
        function getNastavniPlan() {
            fetch("https://www.fulek.com/data/api/supit/curriculum-list/hr", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    courseData = result.data; //store course data for autocomplete
                    showNastavniPlan(courseData);
                })
                .catch((error) => console.error(error));
        }

        function showNastavniPlan(data) {
            const nastavniPlanTable = document.querySelector("#nastavniPlan");
            data.forEach((course) => {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.textContent = course.kolegij;
                cell.addEventListener('click', () => getKolegijDetails(course.id));
                row.appendChild(cell);
                nastavniPlanTable.appendChild(row);
            });
        }

        function getKolegijDetails(id) {
            fetch("https://www.fulek.com/data/api/supit/get-curriculum/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
                .then((response) => response.json())
                .then((result) => displayKolegijDetails(result.data))
                .catch((error) => console.error(error));
        }

        function displayKolegijDetails(details) {
            const courseDetailsSection = document.getElementById('courseDetails');
            // HTML to display course details
            const detailsHTML = `
                <h2>${details.kolegij}</h2>
                <p>ECTS: ${details.ects}</p>
                <p>Sati: ${details.sati}</p>
                <p>Predavanja: ${details.predavanja}</p>
                
            `;
            // innerHTML of the course details section
            courseDetailsSection.innerHTML = detailsHTML;
        }

        // autocomplete
        searchInput.addEventListener('input', updateAutocomplete);

        function updateAutocomplete() {
            const query = searchInput.value.toLowerCase();
            if (query === '') {
                displayAutocomplete(courseData); // show all courses when search bar is empty
            } else {
                const suggestions = courseData.filter(course =>
                    course.kolegij.toLowerCase().includes(query)
                );
                displayAutocomplete(suggestions);
            }
        }
        
        function displayAutocomplete(suggestions) {
            const fragment = document.createDocumentFragment();
            suggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = suggestion.kolegij;
                suggestionItem.classList.add('autocomplete-item');
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = suggestion.kolegij;
                    autocomplete.innerHTML = ''; // clear autocomplete suggestions -- ne radi
                    getKolegijDetails(suggestion.id); //fetch and display details
                });
                fragment.appendChild(suggestionItem);
            });
            autocomplete.innerHTML = ''; // clear autocomplete suggestions
            autocomplete.appendChild(fragment);
        }
}});
