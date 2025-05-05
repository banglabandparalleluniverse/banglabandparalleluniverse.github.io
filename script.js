document.addEventListener('DOMContentLoaded', () => {

    // --- AOS Initialization ---
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = navMenu.querySelectorAll('a'); // Get all links in the menu

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle Aria Expanded State
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            // Optional: Change icon on toggle
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }

    // --- Update Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // --- Optional: Simple Contact Form Handler Placeholder ---
    // --- Contact Form - Mailto Redirect ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // --- !! IMPORTANT: Replace with your actual receiving email address !! ---
            const recipientEmail = 'banglabandinparalleluniverse@gmail.com';
            // --- !! IMPORTANT: Replace with your actual receiving email address !! ---

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const bandNameInput = document.getElementById('band_name');
            const messageInput = document.getElementById('message');

            // Get form values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const bandName = bandNameInput.value.trim();
            const message = messageInput.value.trim();

            // Basic validation (optional but recommended)
            if (!name || !email || !message) {
                alert('Please fill in Name, Email, and Message fields.');
                return; // Stop if required fields are empty
            }

            // Construct the subject line
            let subject = `Enquiry from ${name}`;
            if (bandName) {
                subject += ` (${bandName})`;
            }

            // Construct the email body
            let body = `Hello BBPU,\n\nI wanted to contact you for an enquiry.\n\n`;            
            if (bandName) {
                body += `Band Name: ${bandName}\n`;
            }
            body += `\nMessage:\n${message}\n\n`;
            body += `Best regards,\n${name}`;
            body += `Email: ${email}\n`;

            // Encode subject and body for the mailto link
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);

            // Create the mailto link
            const mailtoLink = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;

            // Redirect the user to their email client
            // Using location.href might be blocked by some pop-up blockers in certain scenarios,
            // but it's the standard way. window.open(mailtoLink) is another option but more prone to blocking.
            window.location.href = mailtoLink;

            // Optional: You could display a message before redirecting,
            // but the redirect happens very quickly.
            // alert('Opening your email client to send the message...');

            // Optional: Clear the form after attempting redirect (might not always be desired)
            // contactForm.reset();
        });
    }

    // --- Optional: Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main section[id]');
    const navLi = document.querySelectorAll('header nav ul.nav-menu li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
             // Adjust offset based on fixed header height (e.g., 70px + a little buffer)
            if (pageYOffset >= (sectionTop - 80)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
        // Special case for top of page (highlight Home)
         if (pageYOffset < sections[0].offsetTop - 80) {
            navLi.forEach(a => a.classList.remove('active'));
            document.querySelector('header nav ul.nav-menu li a[href="#hero"]').classList.add('active');
         }
    });


});