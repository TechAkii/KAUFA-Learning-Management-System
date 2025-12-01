// ============================================
// SLIDER FUNCTIONALITY
// ============================================

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Function to show specific slide
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    currentSlide = (n + totalSlides) % totalSlides;
    
    slides[currentSlide].classList.add('active');
}

// Function to change slide (called by arrow buttons)
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-advance slider every 5 seconds
let autoSlide = setInterval(() => {
    changeSlide(1);
}, 5000);

// Pause auto-slide on hover
const sliderSection = document.getElementById('home');
if (sliderSection) {
    sliderSection.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    sliderSection.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsBox = document.getElementById('resultsBox');

// Sample search data - you can expand this
const searchData = [
    { title: 'Computer Science', url: 'course.html#computer-science' },
    { title: 'Medical Science', url: 'course.html#medical-science' },
    { title: 'Nano Technology', url: 'course.html#nano-technology' },
    { title: 'AI/ML Engineering', url: 'course.html#ai-ml' },
    { title: 'Applied Science', url: 'course.html#applied-science' },
    { title: 'Management Studies', url: 'course.html#management' },
    { title: 'Social Science', url: 'course.html#social-science' },
    { title: 'Technology', url: 'course.html#technology' },
    { title: 'Agriculture', url: 'course.html#agriculture' },
    { title: 'Medical & Allied Science', url: 'course.html#medical-allied' },
    { title: 'About KAUFA', url: '#about' },
    { title: 'Contact Us', url: '#contact-section' },
    { title: 'Blog', url: 'blog.html' },
    { title: 'Student Registration', url: 'STDregister.html' },
    { title: 'Teacher Registration', url: 'TeacherRegister.html' },
    { title: 'Login', url: 'login.html' }
];

// Search function
function performSearch(query) {
    if (!query.trim()) {
        resultsBox.style.display = 'none';
        return;
    }

    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
        resultsBox.innerHTML = '';
        results.forEach(result => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.textContent = result.title;
            div.onclick = () => {
                window.location.href = result.url;
            };
            resultsBox.appendChild(div);
        });
        resultsBox.style.display = 'block';
    } else {
        resultsBox.innerHTML = '<div class="result-item">No results found</div>';
        resultsBox.style.display = 'block';
    }
}

// Search on input
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    // Search on button click
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsBox.contains(e.target) && !searchBtn.contains(e.target)) {
        resultsBox.style.display = 'none';
    }
});

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty hrefs
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        nav.style.backgroundColor = '#fff';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// FORM VALIDATION (for newsletter)
// ============================================

const newsletterForm = document.querySelector('.input-box');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="text"]');
        const email = emailInput.value.trim();
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
            
            // Here you would normally send the email to your backend
            // Example: sendToBackend(email);
        } else {
            alert('Please enter a valid email address');
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE (if you add hamburger menu)
// ============================================

// Uncomment and use this when you add mobile menu
/*
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}
*/

// ============================================
// ANIMATION ON SCROLL (Optional Enhancement)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('.stat-box, .research-grid, .course-image-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.top h2');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) {
    statsObserver.observe(statsRow);
}

// ============================================
// DROPDOWN MENU ACCESSIBILITY
// ============================================

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    // Click to toggle on mobile
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
        }
    });
});

// ============================================
// PREVENT EMPTY LINK CLICKS
// ============================================

document.querySelectorAll('a[href=""]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.warn('This link has no destination yet');
    });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🎓 Welcome to KAUFA University! ', 'background: #0eb02c; color: white; font-size: 20px; padding: 10px;');
console.log('%cWebsite is fully loaded and ready!', 'color: #0eb02c; font-size: 14px;');
