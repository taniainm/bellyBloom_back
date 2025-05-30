const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const content = document.getElementById("content");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("full-width");
}); 