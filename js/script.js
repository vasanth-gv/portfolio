/* ============================================
   MAIN SCRIPT - Navbar, Scroll, Form, Toast
   ============================================ */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    // Navbar shrink on scroll
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    updateActiveLink();
    handleScrollTop();
});

// ===== HAMBURGER MENU (Mobile) =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            if (navLink) navLink.classList.add("active");
        }
    });
}

// ===== SCROLL REVEAL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    ".skill-card, .project-card, .cert-card, .about-content, .stat"
).forEach(el => {
    el.classList.add("fade-in");
    observer.observe(el);
});

// ===== SCROLL TO TOP BUTTON =====
function handleScrollTop() {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
}

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        showToast("⚠️ Please fill in all fields!", "error");
        return;
    }

    if (!validateEmail(email)) {
        showToast("⚠️ Please enter a valid email!", "error");
        return;
    }

    // Show loading state
    const btn = contactForm.querySelector("button[type='submit']");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Simulate sending (replace with EmailJS / backend later)
    setTimeout(() => {
        contactForm.reset();
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        showToast("✅ Message sent successfully! I'll get back to you soon.", "success");
    }, 2000);
});

// ===== EMAIL VALIDATION =====
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = "success") {
    // Remove existing toast
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: ${type === "success"
            ? "linear-gradient(135deg, #43e97b, #38f9d7)"
            : "linear-gradient(135deg, #ff6584, #ff4444)"};
        color: white;
        padding: 14px 28px;
        border-radius: 30px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        transition: all 0.4s ease;
        max-width: 90%;
        text-align: center;
    `;

    document.body.appendChild(toast);

    // Slide in
    setTimeout(() => {
        toast.style.transform = "translateX(-50%) translateY(0)";
    }, 50);

    // Slide out & remove
    setTimeout(() => {
        toast.style.transform = "translateX(-50%) translateY(80px)";
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ===== STAGGER ANIMATION DELAYS =====
function staggerAnimation() {
    const groups = [".skill-card", ".project-card", ".cert-card"];

    groups.forEach(selector => {
        document.querySelectorAll(selector).forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

staggerAnimation();

// ===== CONSOLE BRANDING =====
console.log(
    "%c S. GURU VASANTH - Portfolio ",
    "background: linear-gradient(135deg, #6c63ff, #ff6584); color: white; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 5px;"
);
console.log(
    "%c Built with HTML, CSS & JavaScript ",
    "color: #6c63ff; font-size: 12px;"
);