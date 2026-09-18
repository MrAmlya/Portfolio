
window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Setup and start animation!
    var typed = new Typed('#element', {
        strings: ['Developer!', 'Analyst!'],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
    });

    const toggleButtons = document.querySelectorAll('.toggle-btn');
    console.log(toggleButtons);
    const projects = document.querySelectorAll('.project');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectType = button.getAttribute('data-type');
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projects.forEach(project => {
                project.classList.remove('active');
                if (projectType === 'all' || project.classList.contains(projectType)) {
                    project.classList.add('active');
                }
            });
        });
    });

    const cardTitles = document.querySelectorAll('.card-title');
    cardTitles.forEach(title => {
        title.addEventListener('click', () => {
            title.parentElement.parentElement.classList.toggle('open');
        });
    });

});

// // Setup and start animation! 
// document.addEventListener('DOMContentLoaded', function() {
//     var typed = new Typed('#element', {
//         strings: ['Developer!', 'Analyst!'],
//         typeSpeed: 50,
//         backSpeed: 50,
//         loop: true
//     });
// });


function encodeFormData(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

function submitForm() {
    const form = document.getElementById("contactForm");
    const statusEl = document.getElementById("formStatus");
    const formData = new FormData(form);

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }

    statusEl.textContent = "Sending...";

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(jsonData),
    })
        .then(() => {
            statusEl.textContent = "Thanks! Your message has been sent.";
            form.reset();
        })
        .catch((error) => {
            statusEl.textContent = "Something went wrong. Please try again or email me directly.";
            console.error("Form submission error:", error);
        });
}