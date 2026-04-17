// ===== ANNÉE DYNAMIQUE =====
document.getElementById('year').textContent = new Date().getFullYear();

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

// ===== DARK MODE =====
const btnDark = document.getElementById('btn-dark');
if (btnDark) {
    // Appliquer le thème sauvegardé
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        btnDark.textContent = '☀️';
    }

    btnDark.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            btnDark.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            btnDark.textContent = '🌙';
        }
    });
}

// ===== ANIMATIONS FADE-IN AU SCROLL =====
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
            // Changer le bouton actif
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