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

    try {
        const response = await fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            messageEl.style.color = "green";
            messageEl.textContent = result.message;
            window.location.href = "anasayfa.html";
        } else {
            messageEl.style.color = "red";
            messageEl.textContent = result.message;
        }
    } catch (err) {
        messageEl.style.color = "red";
        messageEl.textContent = "Sunucu hatası veya bağlantı sorunu.";
    }
});
