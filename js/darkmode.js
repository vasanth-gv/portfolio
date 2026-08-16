/* ============================================
   DARK / LIGHT MODE TOGGLE
   ============================================ */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

// Load saved theme from localStorage (default: dark)
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    updateThemeIcon(newTheme);
});

// Change icon based on theme
function updateThemeIcon(theme) {
    if (theme === "dark") {
        themeIcon.className = "fas fa-sun";
        themeToggle.title = "Switch to Light Mode";
    } else {
        themeIcon.className = "fas fa-moon";
        themeToggle.title = "Switch to Dark Mode";
    }
}
