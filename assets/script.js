document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const links = document.querySelector(".links");

    // Mobile navigation menu
    if (menu) {
        menu.addEventListener("click", () => {
            let opened = links.classList.toggle("open");

            menu.setAttribute("aria-expanded", String(opened));
        });
    }

    document.querySelectorAll("[data-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("[data-filter]").forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-pressed", "false");
            });

            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");

            document.querySelectorAll("[data-category]").forEach((card) => {
                card.hidden =
                    btn.dataset.filter !== "all" &&
                    card.dataset.category !== btn.dataset.filter;
            });
        });
    });

    const form = document.getElementById("enquiry");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = form.elements.name.value.trim();
            const email = form.elements.email.value.trim();
            const message = form.elements.message.value.trim();
            const consent = form.elements.consent.checked;

            const output = document.getElementById("form-status");

            if (
                name.length < 2 ||
                !/^\S+@\S+\.\S+$/.test(email) ||
                message.length < 15 ||
                !form.elements.topic.value ||
                !consent
            ) {
                output.className = "error";

                output.textContent =
                    "Please enter your name, a valid email, " +
                    "a message of at least 15 characters, " +
                    "and confirm the acknowledgement.";

                return;
            }

            output.className = "success";

            output.textContent =
                "Your details passed validation. " +
                "This is a demonstration form: " +
                "no message was sent or stored.";

            form.reset();
        });
    }
});