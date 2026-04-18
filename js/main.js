// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {

    // ===== ANNÉE DYNAMIQUE =====
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== DARK MODE =====
    const btnDark = document.getElementById('btn-dark');
    if (btnDark) {
        btnDark.addEventListener('click', function() {
            document.body.classList.toggle('dark');
            if (document.body.classList.contains('dark')) {
                btnDark.textContent = '☀️';
            } else {
                btnDark.textContent = '🌙';
            }
        });
    }

    // ===== NAVBAR DYNAMIQUE AU SCROLL =====
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#1e40af';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.boxShadow = '';
        }

        // Bouton retour en haut
        const btnTop = document.getElementById('btn-top');
        if (btnTop) {
            if (window.scrollY > 300) {
                btnTop.style.display = 'block';
            } else {
                btnTop.style.display = 'none';
            }
        }
    });

    // ===== BOUTON RETOUR EN HAUT =====
    const btnTop = document.getElementById('btn-top');
    if (btnTop) {
        btnTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== ANIMATIONS FADE-IN =====
    const fadeEls = document.querySelectorAll('.fade-in');
    const observerFade = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    fadeEls.forEach(function(el) {
        observerFade.observe(el);
    });

    // ===== COMPTEURS ANIMÉS =====
    const compteurs = document.querySelectorAll('.counter');
    const observerCompteur = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const step = Math.ceil(target / 100);
                const timer = setInterval(function() {
                    count += step;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = count.toLocaleString();
                }, 20);
                observerCompteur.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    compteurs.forEach(function(c) {
        observerCompteur.observe(c);
    });

    // ===== FILTRAGE FREELANCES =====
    const btnsFiltres = document.querySelectorAll('.filtre-btn');
    if (btnsFiltres.length > 0) {
        btnsFiltres.forEach(function(btn) {
            btn.addEventListener('click', function() {
                btnsFiltres.forEach(b => {
                    b.classList.remove('active', 'btn-primary');
                    b.classList.add('btn-outline-primary');
                });
                this.classList.add('active', 'btn-primary');
                this.classList.remove('btn-outline-primary');

                const filtre = this.getAttribute('data-filtre');
                const cartes = document.querySelectorAll('.carte-freelance');
                cartes.forEach(function(carte) {
                    if (filtre === 'tous' || carte.getAttribute('data-categorie') === filtre) {
                        carte.style.display = 'block';
                    } else {
                        carte.style.display = 'none';
                    }
                });
            });
        });
    }
    // ===== VALIDATION FORMULAIRE =====
const form = document.getElementById('formulaire-contact');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valide = true;

        // Prénom
        const prenom = document.getElementById('firstName').value.trim();
        const errPrenom = document.getElementById('erreur-prenom');
        if (prenom === '') {
            errPrenom.textContent = '⚠️ Le prénom est obligatoire.';
            document.getElementById('firstName').classList.add('is-invalid');
            valide = false;
        } else {
            errPrenom.textContent = '';
            document.getElementById('firstName').classList.remove('is-invalid');
            document.getElementById('firstName').classList.add('is-valid');
        }

        // Nom
        const nom = document.getElementById('lastName').value.trim();
        const errNom = document.getElementById('erreur-nom');
        if (nom === '') {
            errNom.textContent = '⚠️ Le nom est obligatoire.';
            document.getElementById('lastName').classList.add('is-invalid');
            valide = false;
        } else {
            errNom.textContent = '';
            document.getElementById('lastName').classList.remove('is-invalid');
            document.getElementById('lastName').classList.add('is-valid');
        }

        // Email
        const email = document.getElementById('email').value.trim();
        const errEmail = document.getElementById('erreur-email');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            errEmail.textContent = '⚠️ L\'email est obligatoire.';
            document.getElementById('email').classList.add('is-invalid');
            valide = false;
        } else if (!regexEmail.test(email)) {
            errEmail.textContent = '⚠️ Format email invalide.';
            document.getElementById('email').classList.add('is-invalid');
            valide = false;
        } else {
            errEmail.textContent = '';
            document.getElementById('email').classList.remove('is-invalid');
            document.getElementById('email').classList.add('is-valid');
        }

        // Message
        const message = document.getElementById('message').value.trim();
        const errMessage = document.getElementById('erreur-message');
        if (message.length < 20) {
            errMessage.textContent = '⚠️ Le message doit contenir au moins 20 caractères.';
            document.getElementById('message').classList.add('is-invalid');
            valide = false;
        } else {
            errMessage.textContent = '';
            document.getElementById('message').classList.remove('is-invalid');
            document.getElementById('message').classList.add('is-valid');
        }

        // Succès
        if (valide) {
            document.getElementById('succes-message').classList.remove('d-none');
            form.reset();
            // Supprimer les classes is-valid
            form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        }
    });
}

}); // fin DOMContentLoaded