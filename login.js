// Giriş formu gönderildiğinde çalışır
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

    // Form alanlarından verileri al
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageEl = document.getElementById("message");

    // Boş alan kontrolü
    if (!email || !password) {
        messageEl.style.color = "red";
        messageEl.textContent = "Lütfen tüm alanları doldurun.";
        return;
    }

    try {
        // Sunucuya POST isteği gönder (JSON formatında)
        const response = await fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // JSON formatında yanıtı al
        const result = await response.json();

        // Giriş başarılıysa
        if (result.success) {
            messageEl.style.color = "green";
            messageEl.textContent = result.message;

            // Kullanıcı rolüne göre yönlendirme
            if (result.redirect) {
                window.location.href = result.redirect;
            } else {
                // Eğer yönlendirme bilgisi yoksa varsayılan sayfaya git
                window.location.href = "anasayfa.html";
            }

        } else {
            // Hatalı giriş mesajı
            messageEl.style.color = "red";
            messageEl.textContent = result.message;
        }
    } catch (err) {
        // Sunucu veya ağ hatası durumunda mesaj göster
        messageEl.style.color = "red";
        messageEl.textContent = "Sunucu hatası veya bağlantı sorunu.";
        console.error(err);
    }
});
