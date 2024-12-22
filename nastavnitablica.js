document.addEventListener('DOMContentLoaded', function() {
    const search = document.querySelector('#searchInput'); 
    const table_body = document.querySelector('tbody');

    const courseData = [
        { courseName: '' },
        
    ];

    // Function to filter courses based on search input
    function filterCourses(searchText) {
        table_body.innerHTML = ''; 

        courseData.forEach((course) => {
            const courseName = course.courseName.toLowerCase();
            if (courseName.includes(searchText.toLowerCase())) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.textContent = course.courseName;
                row.appendChild(cell);
                table_body.appendChild(row);
            }
        });
    }

    // Event listener for search input changes
    search.addEventListener('input', function () {
        filterCourses(this.value);
    });

    // Initial display of courses
    filterCourses('');
});
