document.addEventListener("DOMContentLoaded", function () {
    const becomeAuthorButton = document.querySelector('nav a[href="openBecomeAuthor"]');
    const libraryPassButton = document.querySelector('nav a[href="openLibraryPass"]');
    const helpSectionButton = document.querySelector('nav a[href="openHelpSection"]');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mainNav = document.getElementById('main-nav');
    const bookElements = document.querySelectorAll('.book');
    
    // New Discover Accordion
    const discoverButton = document.getElementById('discover-button');
    const discoverAccordion = document.getElementById('discover-accordion');

    // Discover Accordion Toggle
    discoverButton.addEventListener('click', function() {
        discoverAccordion.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Mobile Menu Toggle
    mobileMenuIcon.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuIcon.classList.toggle('active');
    });

    // Book Details Popup
    bookElements.forEach(book => {
        book.addEventListener('click', function() {
            const title = this.getAttribute('data-book-title');
            const description = this.getAttribute('data-book-description');
            const author = this.getAttribute('data-book-author');
            const year = this.getAttribute('data-book-year');
            const imageUrl = this.querySelector('img').src;

            Swal.fire({
                title: title,
                html: `
                    <div class="book-details">
                        <img src="${imageUrl}" alt="${title}" class="book-image">
                        <p><strong>Author:</strong> ${author}</p>
                        <p><strong>Year:</strong> ${year}</p>
                        <p>${description}</p>
                    </div>
                `,
                showCloseButton: true,
                showConfirmButton: false,
                width: '600px'
            });
        });
    });

    // "Become an Author" form popup
    becomeAuthorButton.addEventListener("click", function (event) {
        event.preventDefault();
        Swal.fire({
            title: "Become an Author Today",
            html: `
                <form id="authorForm">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" class="swal2-input" placeholder="Enter your name" required>
                    
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" class="swal2-input" placeholder="Enter your email" required>
                    
                    <label for="bio">Short Bio:</label>
                    <textarea id="bio" name="bio" class="swal2-textarea" placeholder="Write a short bio" required></textarea>
                    
                    <label for="genres">Preferred Genres:</label>
                    <input type="text" id="genres" name="genres" class="swal2-input" placeholder="E.g., Fantasy, Fiction">
                </form>
            `,
            confirmButtonText: "Submit",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            focusConfirm: false,
            preConfirm: () => {
                const form = document.getElementById("authorForm");
                const formData = {
                    name: form.name.value,
                    email: form.email.value,
                    bio: form.bio.value,
                    genres: form.genres.value,
                };

                if (!formData.name || !formData.email || !formData.bio) {
                    Swal.showValidationMessage("Please fill in all required fields.");
                    return false;
                }

                return formData; // Return form data to handle it
            },
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Form Data Submitted:", result.value);
                Swal.fire("Success", "Your details have been submitted!", "success");
            }
        });
    });

    // "Library Pass" form popup for registering a Membership ID
    libraryPassButton.addEventListener("click", function (event) {
        event.preventDefault();
        Swal.fire({
            title: "Register for a Library Membership",
            html: `
                <form id="libraryMembershipForm">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" class="swal2-input" placeholder="Enter your name" required>
                    
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" class="swal2-input" placeholder="Enter your email" required>
                    
                    <label for="preferredSection">Preferred Section:</label>
                    <input type="text" id="preferredSection" name="preferredSection" class="swal2-input" placeholder="E.g., Fiction, Science">
                </form>
            `,
            confirmButtonText: "Register",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            focusConfirm: false,
            preConfirm: () => {
                const form = document.getElementById("libraryMembershipForm");
                const formData = {
                    name: form.name.value,
                    email: form.email.value,
                    preferredSection: form.preferredSection.value,
                };

                if (!formData.name || !formData.email) {
                    Swal.showValidationMessage("Please fill in all required fields.");
                    return false;
                }

                // Generate a Membership ID
                const membershipID = `LIB-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
                formData.membershipID = membershipID;

                return formData; // Return form data including the Membership ID
            },
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Library Membership Data Submitted:", result.value);
                Swal.fire(
                    "Membership Registered!",
                    `Your Membership ID is: <b>${result.value.membershipID}</b>`,
                    "success"
                );
            }
        });
    });

    // "Help Section" popup
    helpSectionButton.addEventListener("click", function (event) {
        event.preventDefault();
        Swal.fire({
            title: "Need Help?",
            html: `
                <form id="helpForm">
                    <label for="membershipID">Membership ID:</label>
                    <input type="text" id="membershipID" name="membershipID" class="swal2-input" placeholder="Enter your Membership ID" required>
                    
                    <label for="problem">Describe the Problem:</label>
                    <textarea id="problem" name="problem" class="swal2-textarea" placeholder="Provide details about the issue" required></textarea>
                    
                    <div class="help-guide">
                        <p><strong>Help Guide:</strong></p>
                        <p>1. Ensure your Membership ID is valid.</p>
                        <p>2. Provide a clear and detailed description of the problem.</p>
                        <p>3. For urgent issues, contact support at <a href="mailto:support@library.com">support@library.com</a>.</p>
                    </div>
                </form>
            `,
            confirmButtonText: "Submit",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            focusConfirm: false,
            preConfirm: () => {
                const form = document.getElementById("helpForm");
                const formData = {
                    membershipID: form.membershipID.value,
                    problem: form.problem.value,
                };

                if (!formData.membershipID || !formData.problem) {
                    Swal.showValidationMessage("Please fill in all required fields.");
                    return false;
                }

                return formData; // Return the form data
            },
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Help Request Submitted:", result.value);
                Swal.fire(
                    "Request Submitted!",
                    "Your help request has been submitted successfully. We will get back to you soon.",
                    "success"
                );
            }
        });
    });
});