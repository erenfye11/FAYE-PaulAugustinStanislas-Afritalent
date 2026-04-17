const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    let update = () => {
        let target = +counter.getAttribute("data-target");
        let count = +counter.innerText;

        let increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(update, 20);
        } else {
            counter.innerText = target;
        }
    };
    update();
});
document.getElementById("filter")?.addEventListener("change", function() {
    let value = this.value;
    let cards = document.querySelectorAll(".freelancer");

    cards.forEach(card => {
        if (value === "all" || card.dataset.category === value) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});document.getElementById("contactForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (!email.includes("@")) {
        alert("Email invalide");
        return;
    }

    if (message.length < 20) {
        alert("Message trop court");
        return;
    }

    alert("Message envoyé !");
});
document.addEventListener('DOMContentLoaded', () => {
    // === 1. GESTION DU DARK MODE (COMMIT 6) ===
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;

    // Vérifier la préférence sauvegardée
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if(themeBtn) themeBtn.querySelector('i').classList.replace('bi-moon', 'bi-sun');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Changer l'icône
            const icon = themeBtn.querySelector('i');
            if (isDark) {
                icon.classList.replace('bi-moon', 'bi-sun');
            } else {
                icon.classList.replace('bi-sun', 'bi-moon');
            }
        });
    }

    // === 2. TES COMPTEURS ANIMÉS (Repris de ton code) ===
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const update = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(update, 20);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });

    // === 3. TON FILTRAGE (Adapté à tes boutons) ===
    const filterButtons = document.querySelectorAll(".filtre-btn");
    const cards = document.querySelectorAll(".carte-freelance");

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Gérer l'état actif des boutons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filtre');

            cards.forEach(card => {
                if (filterValue === "tous" || card.getAttribute('data-categorie') === filterValue) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});