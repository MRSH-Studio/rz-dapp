document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".spa-page");
    const navItems = document.querySelectorAll(".nav-menu li");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetPage = item.getAttribute("data-page");
            pages.forEach(page => page.classList.remove("active"));
            document.getElementById(targetPage).classList.add("active");
        });
    });

    // Hamburger toggle
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            hamburger.setAttribute("aria-expanded", isOpen);
        });
    }

    // Load token logos & repeat for infinite scroll
    fetch("data/tokens.json")
        .then(res => res.json())
        .then(tokens => {
            const sliderTrack = document.getElementById("tokenSlider");
            const logos = [];

            // ایجاد عناصر لوگو
            tokens.forEach(token => {
                const img = document.createElement("img");
                img.src = token.logo;
                img.alt = token.symbol;
                img.classList.add("token-logo");
                logos.push(img);
            });

            // محاسبه عرض کل و تکرار برای اسکرول روان
            let totalWidth = 0;
            const screenWidth = window.innerWidth;
            while (totalWidth < screenWidth * 2.2) {
                logos.forEach(img => {
                    const clone = img.cloneNode(true);
                    sliderTrack.appendChild(clone);
                    totalWidth += img.width || 150;
                });
            }
        })
        .catch(err => console.error("Error loading tokens:", err));

    document.getElementById("connectWalletBtn").addEventListener("click", () => {
        alert("Web3Modal integration will be added here.");
    });
});
