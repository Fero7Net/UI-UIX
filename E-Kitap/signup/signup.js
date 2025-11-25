// Form gönderilme olayını dinle
document.getElementById("signupForm").addEventListener("submit", async (e) => {

    // Formun otomatik sayfa yenilemesini engelle
    e.preventDefault();

    // Form alanlarındaki değerleri al ve trim() ile boşlukları temizle
    const ad = document.getElementById("ad").value.trim();
    const soyad = document.getElementById("soyad").value.trim();
    const email = document.getElementById("email").value.trim();
    const sifre = document.getElementById("sifre").value.trim();
    const sifreTekrar = document.getElementById("sifre-tekrar").value.trim();
    const messageEl = document.getElementById("message"); // Kullanıcıya gösterilecek mesaj alanı

    // Zorunlu alan kontrolü
    if (!ad || !soyad || !email || !sifre || !sifreTekrar) {
        messageEl.style.color = "red";
        messageEl.textContent = "Lütfen tüm alanları doldurun.";
        return;
    }

    // Şifre eşleşme kontrolü
    if (sifre !== sifreTekrar) {
        messageEl.style.color = "red";
        messageEl.textContent = "Şifreler eşleşmiyor!";
        return;
    }

    // Kayıt verisini sunucuya gönderme işlemi
    try {
        // signup.php'ye POST isteği gönder
        const response = await fetch("signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // JSON formatında veri gönderilir
            body: JSON.stringify({ ad, soyad, email, sifre }) // Veriyi JSON olarak ilet
        });

        // PHP tarafından dönen JSON yanıtı çöz
        const result = await response.json();

        // Kayıt başarılıysa
        if (result.success) {
            messageEl.style.color = "green";
            messageEl.textContent = result.message; // Başarı mesajı
            document.getElementById("signupForm").reset(); // Formu temizle
        } else {
            // Başarısız yanıt durumunda
            messageEl.style.color = "red";
            messageEl.textContent = result.message;
        }
    } catch (error) {
        // İnternet veya sunucu hatası
        messageEl.style.color = "red";
        messageEl.textContent = "Sunucu hatası veya bağlantı sorunu.";
    }
});

// === BOŞLUK ENGEL MEKANİZMASI ===
// Bu alanlara boşluk girilmesi engellenir
["ad", "soyad", "sifre", "sifre-tekrar"].forEach((id) => {
    
    const input = document.getElementById(id);

    // Klavyeden boşluk tuşu basılmasını önle
    input.addEventListener("keydown", (e) => {
        if (e.key === " ") e.preventDefault();
    });
    
    // Yapıştırma veya farklı girişlerde boşlukları otomatik sil
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\s+/g, ""); // Tüm boşlukları kaldır
    });
});
