// components.js

// Function to load navbar
function loadNavbar() {
    const navbarContainer = document.createElement('div');
    navbarContainer.id = 'navbar-container';

    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
            document.body.insertBefore(navbarContainer, document.body.firstChild);

            // Re-initialize any scripts if needed
            const scripts = navbarContainer.getElementsByTagName('script');
            for (let script of scripts) {
                const newScript = document.createElement('script');
                newScript.text = script.text;
                document.body.appendChild(newScript);
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

// Function to load footer
function loadFooter() {
    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer-container';

    // You'll need to create a footer.html file similar to navbar.html
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
            document.body.appendChild(footerContainer);

            // Re-initialize any scripts if needed
            const scripts = footerContainer.getElementsByTagName('script');
            for (let script of scripts) {
                const newScript = document.createElement('script');
                newScript.text = script.text;
                document.body.appendChild(newScript);
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
});