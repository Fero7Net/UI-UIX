document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageEl = document.getElementById("message");

    if (!email || !password) {
        messageEl.style.color = "red";
        messageEl.textContent = "Lütfen tüm alanları doldurun.";
        return;
    }
