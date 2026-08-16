/* ============================================
   TYPING ANIMATION - Hero Section
   ============================================ */

const typedEl = document.getElementById("typed");

const words = [
    "DevOps & Cloud Enthusiast",
    "Java Developer",
    "Python Developer",
    "Cloud & Automation",
    "Passionate Coder"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        // Deleting characters
        typedEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Typing characters
        typedEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    // Word finished typing → pause then delete
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 1800;
        isDeleting = true;
    }
    // Word finished deleting → move to next word
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
}

// Start typing when page loads
document.addEventListener("DOMContentLoaded", type);

