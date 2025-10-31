// DOSYA ADI: Test/signup/signup.js
// AÇIKLAMA: Kayıt (Signup) formunun JavaScript kodları

// Form gönderilme olayını dinle
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    // Formun sayfayı yenilemesini engelle (AJAX için)
    e.preventDefault();

    // Tüm input alanlarından veriyi al ve başındaki/sonundaki boşlukları temizle (.trim())
    const ad = document.getElementById("ad").value.trim(); // İsim alanından değer al
    const soyad = document.getElementById("soyad").value.trim(); // Soyisim alanından değer al
    const email = document.getElementById("email").value.trim(); // Email alanından değer al
    const sifre = document.getElementById("sifre").value.trim(); // Şifre alanından değer al
    const sifreTekrar = document.getElementById("sifre-tekrar").value.trim(); // Şifre tekrar alanından değer al
    const messageEl = document.getElementById("message"); // Hata/başarı mesajlarının gösterileceği yer

    // Tüm alanların dolu olup olmadığını kontrol et
    if (!ad || !soyad || !email || !sifre || !sifreTekrar) {
        messageEl.style.color = "red"; // Kırmızı renk
        messageEl.textContent = "Lütfen tüm alanları doldurun."; // Hata mesajı
        return; // Fonksiyondan çık, devam etme
    }

    // Şifrelerin birbiriyle eşleşip eşleşmediğini kontrol et
    if (sifre !== sifreTekrar) {
        messageEl.style.color = "red"; // Kırmızı renk
        messageEl.textContent = "Şifreler eşleşmiyor!"; // Hata mesajı
        return; // Fonksiyondan çık, devam etme
    }

    // Veritabanına kayıt gönderme işlemi
    try {
        // signup.php dosyasına POST isteği gönder
        const response = await fetch("signup.php", {
            method: "POST", // HTTP POST metodu
            headers: { "Content-Type": "application/json" }, // JSON formatında veri gönder
            body: JSON.stringify({ ad, soyad, email, sifre }) // Veriyi JSON'a çevir ve gönder
        });

        // PHP'den dönen JSON sonucunu al
        const result = await response.json();

        // Kayıt başarılı ise
        if (result.success) {
            messageEl.style.color = "green"; // Yeşil renk
            messageEl.textContent = result.message; // Başarı mesajını göster
            document.getElementById("signupForm").reset(); // Formu temizle
        } else {
            // Kayıt başarısız ise (örn: email zaten kayıtlı)
            messageEl.style.color = "red"; // Kırmızı renk
            messageEl.textContent = result.message; // Hata mesajını göster
        }
    } catch (error) {
        // Ağ hatası veya sunucu yanıt vermedi ise
        messageEl.style.color = "red"; // Kırmızı renk
        messageEl.textContent = "Sunucu hatası veya bağlantı sorunu."; // Genel hata mesajı
    }
});

// === BOŞLUK ENGEL MEKANİZMASI ===
// Ad, Soyad, Şifre ve Şifre Tekrar alanlarına boşluk girilmesini engelle
["ad", "soyad", "sifre", "sifre-tekrar"].forEach((id) => {
    // Her bir alanı seç
    const input = document.getElementById(id);
    
    // Klavyeden tuşa basıldığında dinle
    input.addEventListener("keydown", (e) => {
        if (e.key === " ") e.preventDefault(); // Eğer basılan tuş "boşluk" ise işlemi engelle
    });
    
    // Input alanına veri girildiğinde veya yapıştırma yapıldığında dinle
    input.addEventListener("input", () => {
        // Metindeki tüm boşlukları (\s+) bul ve sil (değiştir: "" = boş)
        input.value = input.value.replace(/\s+/g, ""); 
    });
});
