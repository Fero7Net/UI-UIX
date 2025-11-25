// JAVASCRIPT: AÇIKLAMA: Login formunu dinler, PHP'ye gönderir ve sonucu işler.

// Sayfa yüklendiğinde login formuna submit olayı eklenir
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    
    // Formun sayfa yenilemesini engelle
    e.preventDefault();

    // Form alanlarındaki değerleri al
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageEl = document.getElementById("message"); // Mesajın gösterileceği alan

    // Zorunlu alan kontrolü
    if (!email || !password) {
        messageEl.style.color = "red";
        messageEl.textContent = "Lütfen tüm alanları doldurun.";
        return;
    }

    // Response değişkeni dışarıda tanımlanır
    let response; 
    
    try {
        // login.php'ye POST isteği gönder
        response = await fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }) // Veri JSON formatında gönderilir
        });

        // Yanıtın JSON olup olmadığını kontrol et
        const contentType = response.headers.get("content-type");

        // Yanıt geçersiz veya JSON değilse hata
        if (!response.ok || !contentType || !contentType.includes("application/json")) {
            let errorText = await response.text(); // Hata mesajını ham olarak al
            throw new Error(errorText || "Sunucudan geçerli bir yanıt alınamadı.");
        }

        // JSON yanıtını işle
        const result = await response.json();

        // Giriş başarılıysa
        if (result.success) {
            messageEl.style.color = "green";
            messageEl.textContent = "Giriş başarılı, yönlendiriliyor...";

            // PHP'nin gönderdiği yönlendirmeyi uygula
            if (result.redirect) {
                window.location.href = result.redirect;
            } else {
                // Yedek yönlendirme
                window.location.href = "/index.php";
            }

        // Login başarısızsa
        } else {
            messageEl.style.color = "red";
            messageEl.textContent = result.message;
        }

    } catch (err) {
        // Ağ hataları, PHP hataları burada yakalanır
        messageEl.style.color = "red";
        messageEl.textContent = "Hata: " + err.message;

        // Hatanın geliştirici konsoluna yazılması
        console.error("Login Hatası:", err);
    }
});

// Boşluk engelleme kodu
// email ve password alanlarına boşluk girilmesini engeller
["email", "password"].forEach((id) => {
    const input = document.getElementById(id);

    // Klavye ile boşluk girilmeye çalışıldığında engelle
    input.addEventListener("keydown", (e) => {
        if (e.key === " ") e.preventDefault();
    });

    // Yapıştırma vb. durumlarda boşlukları otomatik temizle
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\s+/g, "");
    });
});
