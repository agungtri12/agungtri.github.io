// script.js

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');

    // Animate the toggle button
    const toggleButton = document.getElementById('menuToggle');
    toggleButton.classList.toggle('active'); // Add active class for button animation

    // Optional: Change the icon on toggle
    toggleButton.innerHTML = toggleButton.classList.contains('active') ? '✖' : '☰'; // Change icon based on active state
}

document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const skillsSection = document.querySelector('.skills-section');
    const projectsSection = document.querySelector('.projects-section');

    function animateOnScroll() {
        const windowHeight = window.innerHeight;

        // Check if the hero section is in view
        if (heroContent.getBoundingClientRect().top < windowHeight - 50) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }

        // Check if the skills section is in view
        if (skillsSection.getBoundingClientRect().top < windowHeight - 50) {
            skillsSection.classList.add('visible'); // Add the visible class
            skillsSection.classList.remove('hidden'); // Remove hidden class for animation
            
            // Ensure individual skills also get animated
            const skills = skillsSection.querySelectorAll('.skill');
            skills.forEach((skill, index) => {
                skill.style.opacity = '1'; // Set opacity to fully visible
                skill.style.transform = 'translateY(0)'; // Slide into place
                skill.style.transitionDelay = `${index * 0.1}s`; // Add a delay for each skill
            });
        } else {
            // Reset for leaving the viewport
            skillsSection.classList.remove('visible');
            skillsSection.classList.add('hidden');

            const skills = skillsSection.querySelectorAll('.skill');
            skills.forEach(skill => {
                skill.style.opacity = '0'; // Hide skill
                skill.style.transform = 'translateY(20px)'; // Slide out
            });
        }

        // Check if the projects section is in view
        const sectionTop = projectsSection.getBoundingClientRect().top;
        const sectionBottom = projectsSection.getBoundingClientRect().bottom;

        if (sectionTop < windowHeight && sectionBottom >= 0) {
            projectsSection.classList.add('visible');
            projectsSection.classList.remove('hidden');
        } else {
            projectsSection.classList.remove('visible');
            projectsSection.classList.add('hidden');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial call to check on load
    animateOnScroll();
});
document.addEventListener("DOMContentLoaded", function() {
    const educationItems = document.querySelectorAll('.education-item');

    // Function to check if an element is in the viewport
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const handleScroll = () => {
        educationItems.forEach((item) => {
            if (isElementInViewport(item)) {
                item.classList.remove('hidden'); // Show the item
            } else {
                item.classList.add('hidden'); // Hide the item
            }
        });
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});
// Data for professions with multiple categories
const professions = [
    { name: 'Creative 1', image: 'path/to/creative1.jpg', categories: ['creative', 'arts'] },
    { name: 'Creative 2', image: 'path/to/creative2.jpg', categories: ['creative'] },
    { name: 'Arts 1', image: 'path/to/arts1.jpg', categories: ['arts'] },
    { name: 'Arts 2', image: 'path/to/arts2.jpg', categories: ['arts', 'design'] },
    { name: 'Design 1', image: 'path/to/design1.jpg', categories: ['design'] },
    { name: 'Branding 1', image: 'path/to/branding1.jpg', categories: ['branding', 'creative'] },
    // Add more items as needed
];

// Function to render profession items
function renderProfessions(filteredProfessions) {
    const wrapper = document.getElementById('profession-wrapper');
    wrapper.innerHTML = ''; // Clear previous content

    // If no professions are filtered, render a message
    if (filteredProfessions.length === 0) {
        wrapper.innerHTML = '<p>Tidak ada profesi yang cocok.</p>';
        return;
    }

    filteredProfessions.forEach(profession => {
        const professionItem = document.createElement('div');
        professionItem.className = 'profession-item'; // Base class
        professionItem.dataset.value = profession.categories.join(','); // Store categories in data attribute
        
        // Combine categories and name in HTML
        professionItem.innerHTML = `
            <img src="${profession.image}" alt="${profession.name}">
            <div class="info">
                <div class="categories">${profession.categories.join(', ')}</div>
                <p class="name">${profession.name}</p>
            </div>
        `;
        wrapper.appendChild(professionItem);
    });
}

// Function to filter and load profession items
function filterProfession(selectedValue) {
    const options = document.querySelectorAll('.profession-option');
    options.forEach(option => {
        option.classList.remove('active'); // Remove active class from all options
        if (option.getAttribute('data-value') === selectedValue) {
            option.classList.add('active'); // Add active class to selected option
        }
    });

    // Load filtered items based on selected value
    loadProfessionItems(selectedValue);
}

function loadProfessionItems(value) {
    const professionWrapper = document.getElementById('profession-wrapper');
    const professionItems = document.querySelectorAll('.profession-item');

    // Clear the wrapper and add exit animations to current items
    professionItems.forEach(item => {
        item.classList.add('exit'); // Start exit animation
        item.addEventListener('animationend', function() {
            professionWrapper.removeChild(item); // Remove item from DOM after animation
        });
    });

    // Wait until all items are removed before rendering new ones
    setTimeout(() => {
        let filteredProfessions;

        if (value === 'all') {
            filteredProfessions = professions; // Show all professions
        } else {
            // Filter based on selected value
            filteredProfessions = professions.filter(profession =>
                profession.categories.includes(value)
            );
        }

        // Render filtered profession items
        renderProfessions(filteredProfessions);
    }, 500); // Duration of the exit animation
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const defaultFilterValue = 'all';
    loadProfessionItems(defaultFilterValue); // Load all items initially
    filterProfession(defaultFilterValue); // Set the active filter option
});
document.addEventListener('DOMContentLoaded', () => {
    const programmingSection = document.querySelector('#programming');

    const options = {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                programmingSection.classList.add('visible');
                programmingSection.classList.remove('hidden');
            } else {
                programmingSection.classList.add('hidden');
                programmingSection.classList.remove('visible');
            }
        });
    }, options);

    observer.observe(programmingSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const newsItems = document.querySelectorAll('.news-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('fade-out');
                entry.target.style.opacity = 1; // Ensure the item is visible
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.classList.add('fade-out');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the item is visible
    });

    newsItems.forEach(item => {
        observer.observe(item); // Observe each news item
    });
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// Function to handle scroll event
function handleScroll() {
    const contactSection = document.querySelector('.contact-section');
    const scrollPosition = window.scrollY;

    // Check if the contact section is in the viewport
    if (isInViewport(contactSection)) {
        contactSection.classList.remove('out'); // Remove fade-out class when in view
    } else {
        contactSection.classList.add('out'); // Add fade-out class when out of view
    }

    // Add a class for a scroll effect
    if (scrollPosition > 100) { // Change 100 to the number of pixels you want
        document.body.classList.add('scrolled'); // Add a class when scrolled down
    } else {
        document.body.classList.remove('scrolled'); // Remove class when at the top
    }
}

// Event listener for scrolling
window.addEventListener('scroll', handleScroll);
