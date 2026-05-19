document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => scrollObserver.observe(element));
});

// Inizializzazione Effetto 3D (Vanilla Tilt)
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".page-transition-overlay");
    
    // 1. Dissolvenza in entrata all'avvio della pagina
    if (overlay) {
        setTimeout(() => {
            overlay.style.opacity = "0";
        }, 100);
    }

    // 2. Gestione dei link per la transizione in uscita
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        // Evita il blocco se il link apre una nuova scheda o è un'ancora (#)
        if (link.hostname === window.location.hostname && !link.getAttribute("href").startsWith("#")) {
            link.addEventListener("click", (e) => {
                e.preventDefault(); // Ferma il caricamento istantaneo
                const targetUrl = link.href;

                if (overlay) {
                    overlay.classList.add("is-exiting");
                    
                    // Attendi la fine dell'animazione CSS (500ms) prima di cambiare pagina
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 500);
                } else {
                    window.location.href = targetUrl;
                }
            });
        }
    });

    // 3. Animazioni al caricamento (Intersection Observer)
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => scrollObserver.observe(element));

// 4. Gestione del Tema (Chiaro/Scuro) - ULTIMO TENTATIVO COMPLETO
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem("theme");

        // Configurazione iniziale all'avvio
        if (savedTheme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme"); // Forza il buio di default
        }

        themeToggleBtn.addEventListener("click", () => {
            // Se la pagina è in modalità chiara, rimuoviamo tutto e torna notte
            if (document.documentElement.getAttribute("data-theme") === "light") {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "dark");
            } else {
                // Altrimenti attiviamo la modalità chiara
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
            }
        });
    }

    // 5. Inizializzazione Effetto 3D (Vanilla Tilt)
    if (typeof VanillaTilt !== "undefined" && document.querySelectorAll(".card").length > 0) {
        VanillaTilt.init(document.querySelectorAll(".card"), {
            max: 7,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
    }
    // 5. GESTIONE SLIDER IMMAGINI (CAROSELLO INTERATTIVO)
    const track = document.querySelector(".slider-track");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const slides = document.querySelectorAll(".slide");

    if (track && nextBtn && prevBtn && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            const amountToMove = -(currentIndex * (100 / totalSlides));
            track.style.transform = `translateX(${amountToMove}%)`;
        }

        nextBtn.addEventListener("click", () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; 
            }
            updateSlider();
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalSlides - 1; 
            }
            updateSlider();
        });
    }
});