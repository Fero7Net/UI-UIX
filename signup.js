document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const ad = document.getElementById("ad").value.trim();
    const soyad = document.getElementById("soyad").value.trim();
    const email = document.getElementById("email").value.trim();
    const sifre = document.getElementById("sifre").value.trim();
    const sifreTekrar = document.getElementById("sifre-tekrar").value.trim();
    const messageEl = document.getElementById("message");

     if (!ad || !soyad || !email || !sifre || !sifreTekrar) {
        messageEl.style.color = "red";
        messageEl.textContent = "Lütfen tüm alanları doldurun.";
        return;
    }

    if (sifre !== sifreTekrar) {
        messageEl.style.color = "red";
        messageEl.textContent = "Şifreler eşleşmiyor!";
        return;
    }

    try {
        const response = await fetch("signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ad, soyad, email, sifre })
        });

        const result = await response.json();

        if (result.success) {
            messageEl.style.color = "green";
            messageEl.textContent = result.message;
            document.getElementById("signupForm").reset();
        } else {
            messageEl.style.color = "red";
            messageEl.textContent = result.message;
        }
    } catch (error) {
        messageEl.style.color = "red";
        messageEl.textContent = "Sunucu hatası veya bağlantı sorunu.";
    }
});