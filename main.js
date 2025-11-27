// ===========================
        // SLIDER FUNCTIONALITY
        // ===========================
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));

            if (index < 0) {
                currentSlide = slides.length - 1;
            } else if (index >= slides.length) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }

            slides[currentSlide].classList.add('active');
        }

        function changeSlide(direction) {
            showSlide(currentSlide + direction);
        }

        // Auto slide every 4 seconds
        setInterval(() => {
            changeSlide(1);
        }, 4000);

        // ===========================
        // SEARCH FUNCTIONALITY
        // ===========================
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const resultsBox = document.getElementById('resultsBox');

        // Sample search data
        const searchData = [
            'Applied Science',
            'Management Studies',
            'Social Science',
            'Technology',
            'Agriculture',
            'Medical & Allied Science',
            'About Us',
            'Blog',
            'Contact'
        ];

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            if (query.length === 0) {
                resultsBox.style.display = 'none';
                return;
            }

            const results = searchData.filter(item => 
                item.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                resultsBox.innerHTML = results.map(item => 
                    `<div class="result-item">${item}</div>`
                ).join('');
                resultsBox.style.display = 'block';
            } else {
                resultsBox.innerHTML = '<div class="result-item">No results found</div>';
                resultsBox.style.display = 'block';
            }
        });

        searchBtn.addEventListener('click', function() {
            const query = searchInput.value;
            if (query) {
                alert('Searching for: ' + query);
            }
        });

        // Close results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-box')) {
                resultsBox.style.display = 'none';
            }
        });

        // Handle result item clicks
        resultsBox.addEventListener('click', function(e) {
            if (e.target.classList.contains('result-item')) {
                searchInput.value = e.target.textContent;
                resultsBox.style.display = 'none';
            }
        });