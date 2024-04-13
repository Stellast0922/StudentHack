document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const planets = document.querySelectorAll('.planet');

    function deactivatePlanets() {
        planets.forEach(planet => {
            planet.classList.remove('active');
            planet.style.display = 'none'; // Hide the planet
            planet.style.height = '0'; // Collapse the div
            planet.style.opacity = '0'; // Make it transparent
            planet.style.visibility = 'hidden'; // Make it invisible
        });
    }

    function activateNavItem(navItem) {
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        navItem.classList.add('active');
    }

    function animateText(element, callback) {
        const text = element.getAttribute('data-original-text') || element.textContent;
        element.setAttribute('data-original-text', text); // Store original text if not already stored
        const words = text.split(' ');
        element.innerHTML = '';
        words.forEach((word, index) => {
            let span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = 0;
            span.style.animation = 'fadeIn 0.3s forwards';
            span.style.animationDelay = `${0.1 * index}s`; // Adjust delay for faster animation start
            element.appendChild(span);
        });
        element.lastChild.onanimationend = () => {
            if (callback) {
                callback();
            }
        };
    }
    

    function animateDetails(details) {
        const detailItems = details.querySelectorAll('.detail');
        detailItems.forEach((detail, index) => {
            detail.style.opacity = 0;
            detail.style.transform = 'translateY(20px)';
            setTimeout(() => {
                detail.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                detail.style.opacity = 1;
                detail.style.transform = 'translateY(0)';
            }, 500 + (index * 200)); // Increase delay for each item
        });
    }

    deactivatePlanets();

    function activateDefaultPlanet(planetElement, navItem) {
        planetElement.classList.add('active');
        planetElement.style.display = 'flex'; // Set display to flex to show it
        planetElement.style.height = 'auto'; // Let it expand to fit content
        planetElement.style.opacity = '1'; // Make it fully visible
        planetElement.style.visibility = 'visible'; // Make it visible
        activateNavItem(navItem); // Highlight the nav item
    }

    navItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const planetName = item.getAttribute('data-planet');
            const selectedPlanet = document.querySelector(`#planet-${planetName}`);
            const description = selectedPlanet.querySelector('.planet-description');
            const details = selectedPlanet.querySelector('.planet-details');
    
            deactivatePlanets(); // Hide all planets
            activateNavItem(item); // Activate the clicked nav item
    
            // Set the display style to match the CSS for the active class
            selectedPlanet.style.display = 'flex'; 
            selectedPlanet.style.height = 'auto'; // Set height to auto
            selectedPlanet.style.opacity = '1';
            selectedPlanet.style.visibility = 'visible';
            selectedPlanet.classList.add('active'); // Add the active class
    
            // Animate the text and details for the selected planet
            if (description) {
                animateText(description, () => {
                    if (details) {
                        animateDetails(details);
                    }
                });
            }
        });
    });
    


    // Initial animation for the default planet
    const defaultPlanet = document.querySelector('#planet-Mercury');
    const defaultNavItem = document.querySelector('.nav-item[data-planet="Mercury"]');
    if (defaultPlanet && defaultNavItem) {
        activateDefaultPlanet(defaultPlanet, defaultNavItem);
        const description = defaultPlanet.querySelector('.planet-description');
        const details = defaultPlanet.querySelector('.planet-details');
        // Animate the text and details for the default planet
        if (description) {
            animateText(description, () => {
                if (details) {
                    animateDetails(details);
                }
            });
        }
    }
   
});

document.addEventListener("DOMContentLoaded", function() {
    // Get the current URL
    var currentUrl = window.location.href;

    // Get the "Planets" link element
    var planetsLink = document.getElementById("planets-link");

    // Check if the current URL matches the href attribute of the "Planets" link
    if (currentUrl.indexOf(planetsLink.getAttribute("href")) !== -1) {
        // Add the "active" class to the "Planets" link
        planetsLink.classList.add("active");
    }
});
