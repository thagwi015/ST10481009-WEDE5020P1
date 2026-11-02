document.addEventListener("DOMContentLoaded", function () {
    const pictures = document.querySelectorAll("main img");

    const lightbox = document.createElement("div");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Enlarged picture");

    lightbox.style.cssText =
        "display:none; position:fixed; inset:0; z-index:9999;" +
        "background:rgba(0,0,0,0.9); align-items:center;" +
        "justify-content:center; padding:20px;";

    const largePicture = document.createElement("img");
    largePicture.style.cssText =
        "max-width:90%; max-height:85vh; object-fit:contain;";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.setAttribute("aria-label", "Close enlarged picture");
    closeButton.style.cssText =
        "position:absolute; top:20px; right:20px; padding:10px 16px;" +
        "cursor:pointer;";

    lightbox.appendChild(largePicture);
    lightbox.appendChild(closeButton);
    document.body.appendChild(lightbox);

    pictures.forEach(function (picture) {
        picture.style.cursor = "zoom-in";

        picture.addEventListener("click", function () {
            largePicture.src = picture.src;
            largePicture.alt = picture.alt;
            lightbox.style.display = "flex";
            closeButton.focus();
        });
    });

    function closeLightbox() {
        lightbox.style.display = "none";
        largePicture.src = "";
    }

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
    const currentPage = window.location.pathname.toLowerCase();

    if (currentPage.endsWith("services.html")) {
        const services = [
            {
                name: "AI Vehicle Diagnostics",
                description: "Checks for engine, electrical and vehicle-system faults."
            },
            {
                name: "Engine Repairs",
                description: "Engine inspections and repair work."
            },
            {
                name: "Electric Vehicle Maintenance",
                description: "Routine maintenance for electric and hybrid vehicles."
            },
            {
                name: "Brake and Suspension Repairs",
                description: "Brake, suspension and vehicle-safety checks."
            },
            {
                name: "Battery Testing and Replacement",
                description: "Battery health checks and replacement advice."
            },
            {
                name: "Fleet Maintenance",
                description: "Routine servicing for business vehicles."
            },
            {
                name: "General Vehicle Service",
                description: "Routine servicing, inspections and maintenance."
            }
        ];

        const searchSection = document.createElement("section");
        const heading = document.createElement("h2");
        heading.textContent = "Search Our Services";

        const searchBox = document.createElement("input");
        searchBox.type = "search";
        searchBox.placeholder = "Type a service name...";
        searchBox.setAttribute("aria-label", "Search services");
        searchBox.style.width = "100%";
        searchBox.style.padding = "12px";

        const resultCount = document.createElement("p");
        resultCount.setAttribute("aria-live", "polite");

        const results = document.createElement("div");

        searchSection.appendChild(heading);
        searchSection.appendChild(searchBox);
        searchSection.appendChild(resultCount);
        searchSection.appendChild(results);

        const mainContent = document.querySelector("main");
        mainContent.insertBefore(searchSection, mainContent.firstChild);

        function showServices(searchText) {
            results.replaceChildren();

            const matches = services.filter(function (service) {
                return service.name.toLowerCase().includes(searchText.toLowerCase());
            });

            resultCount.textContent =
                matches.length + " service(s) found";

            matches.forEach(function (service) {
                const card = document.createElement("article");
                const name = document.createElement("h3");
                const description = document.createElement("p");

                name.textContent = service.name;
                description.textContent = service.description;

                card.appendChild(name);
                card.appendChild(description);
                results.appendChild(card);
            });
        }

        searchBox.addEventListener("input", function () {
            showServices(searchBox.value.trim());
        });

        showServices("");
            const sortButton = document.createElement("button");
        sortButton.type = "button";
        sortButton.textContent = "Sort services A–Z";
        sortButton.style.padding = "10px";
        sortButton.style.margin = "10px 0";
        sortButton.style.cursor = "pointer";

        searchSection.insertBefore(sortButton, resultCount);

        sortButton.addEventListener("click", function () {
            const cards = Array.from(results.children);

            cards.sort(function (firstCard, secondCard) {
                const firstName = firstCard.querySelector("h3").textContent;
                const secondName = secondCard.querySelector("h3").textContent;

                return firstName.localeCompare(secondName);
            });

            cards.forEach(function (card) {
                results.appendChild(card);
            });
        });
    }
    if (document.querySelector("#fullname")) {
        const contactForm = document.querySelector("main form");

        if (contactForm) {
            const nameField = contactForm.querySelector("#fullname");
            const emailField = contactForm.querySelector("#email");
            const phoneField = contactForm.querySelector("#phone");
            const subjectField = contactForm.querySelector("#subject");
            const messageField = contactForm.querySelector("#message");

            nameField.required = true;
            nameField.minLength = 2;
            emailField.required = true;
            subjectField.required = true;
            messageField.required = true;
            messageField.minLength = 10;

            const feedback = document.createElement("p");
            feedback.setAttribute("role", "status");
            contactForm.appendChild(feedback);

            contactForm.addEventListener("submit", function (event) {
                event.preventDefault();

                if (!contactForm.checkValidity()) {
                    contactForm.reportValidity();
                    feedback.textContent =
                        "Please complete the required fields correctly.";
                    return;
                }

                const emailSubject =
                    encodeURIComponent(subjectField.value.trim());

                const emailMessage = [
                    "Name: " + nameField.value.trim(),
                    "Email: " + emailField.value.trim(),
                    "Phone: " + phoneField.value.trim(),
                    "Message type: " + subjectField.value.trim(),
                    "",
                    "Message: " + messageField.value.trim()
                ].join("\n");

                feedback.textContent =
                    "Your email app should open. Review the message and press Send.";

                window.location.href =
                    "mailto:info@thagwismechanic.co.za?subject=" +
                    emailSubject +
                    "&body=" +
                    encodeURIComponent(emailMessage);
            });
        }
    }
    const enquiryForm = document.querySelector("#enquiryForm");

    if (enquiryForm) {
        const serviceField = enquiryForm.querySelector("#service");
        const messageField = enquiryForm.querySelector("#message");
        const dateField = enquiryForm.querySelector("#date");

        serviceField.required = true;
        messageField.required = true;
        messageField.minLength = 10;

        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        dateField.min = today.toISOString().slice(0, 10);

        const result = document.createElement("p");
        result.setAttribute("role", "status");
        result.setAttribute("aria-live", "polite");
        result.style.padding = "15px";
        result.style.marginTop = "15px";
        result.style.backgroundColor = "#e8f4fb";
        result.style.color = "#142b3a";
result.style.border = "2px solid #1478d4";
result.style.fontWeight = "bold";
        enquiryForm.appendChild(result);

        const priceRanges = {
            "AI Vehicle Diagnostics": "R550–R1,200",
            "Engine Repairs": "R1,800–R12,000",
            "Electric Vehicle Maintenance": "R1,200–R5,000",
            "Brake and Suspension Repairs": "R950–R6,000",
            "Battery Testing and Replacement": "R850–R4,500",
            "Fleet Maintenance": "R900–R8,000 per vehicle",
            "General Vehicle Service": "R950–R6,000"
        };

        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                result.textContent =
                    "Please complete the required fields correctly.";
                return;
            }

            const formData = new FormData(enquiryForm);
            const selectedService = formData.get("service");
            const estimate = priceRanges[selectedService];

            result.textContent =
                "Thank you, " + formData.get("firstname") +
                ". The indicative estimate for " + selectedService +
                " is " + estimate +
                ". This is not a final quote. Staff must confirm the cost " +
                "and appointment availability.";
        });
    }
const mapElement = document.querySelector("#branchMap");

if (mapElement && typeof L !== "undefined") {
  const map = L.map("branchMap").setView([-25.93, 28.14], 8);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([-25.75, 28.23])
    .addTo(map)
    .bindPopup("<strong>Pretoria branch</strong><br>Approximate area");

  L.marker([-26.10, 28.05])
    .addTo(map)
    .bindPopup("<strong>Johannesburg branch</strong><br>Approximate area");
}
});
