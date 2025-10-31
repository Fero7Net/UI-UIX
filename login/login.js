// JAVASCRIPT: DOSYA ADI: Test/login/login.js (YAZIM HATASI DÜZELTİLMİŞ TAM HALİ)
// JAVASCRIPT: AÇIKLAMA: Login formunu dinler, PHP'ye gönderir ve sonucu daha iyi işler.

// JAVASCRIPT: Sayfa yüklendiğinde, 'loginForm' ID'li forma bir 'submit' olayı dinleyicisi ekle.
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    
    // JAVASCRIPT: Formun varsayılan "submit" davranışını (sayfa yenileme) engelle.
    e.preventDefault();

    // Alanlardaki verileri al ve trim() ile baş/sondaki boşlukları temizle.
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageEl = document.getElementById("message"); // Hata mesajlarını göstereceğimiz <p> etiketi.

    // Alanların boş olup olmadığını kontrol et.
    if (!email || !password) {
        messageEl.style.color = "red";
        messageEl.textContent = "Lütfen tüm alanları doldurun.";
        return; // Fonksiyonu burada durdur.
    }

    // Hata yakalamak için 'response' değişkenini 'try' bloğunun dışında tanımlıyoruz.
    let response; 
    
    try {
        // fetch API'si ile login.php dosyasına POST isteği gönder.
        response = await fetch("login.php", {
            method: "POST",
            // Gönderdiğimiz verinin JSON formatında olduğunu belirtiyoruz.
            headers: { "Content-Type": "application/json" },
            // JavaScript objesini JSON metnine (string) dönüştürüyoruz.
            body: JSON.stringify({ email, password })
        });

        // Yanıtın JSON olup olmadığını kontrol et.
        const contentType = response.headers.get("content-type");
        
        // Eğer yanıt 'ok' (HTTP 200-299 arası) değilse VEYA JSON değilse (örn: PHP syntax hatası aldıysak).
        if (!response.ok || !contentType || !contentType.includes("application/json")) {
            
            // PHP'den gelen ham hatayı metin olarak al (örn: "Parse error in ... on line 10").
            let errorText = await response.text();
            
            // Bu hatayı fırlat, 'catch' bloğu yakalayacak.
            throw new Error(errorText || "Sunucudan geçerli bir yanıt alınamadı.");
        }

        // Yanıt 'ok' (200) ve JSON ise, JSON verisini objeye çevir.
        const result = await response.json();

        // {success: true} ise (login.php'den bu yanıt geldiyse):
        if (result.success) {
            messageEl.style.color = "green";
            messageEl.textContent = "Giriş başarılı, yönlendiriliyor..."; // Kullanıcıya bilgi ver.

            if (result.redirect) {
                // PHP'nin dediği yere git (örn: /index.php veya /admin/adminindex.php).
                window.location.href = result.redirect; 
            } else {
                // PHP 'redirect' göndermezse, yedek (fallback) olarak ana sayfaya git.
                window.location.href = "/index.php"; 
            }
        
        // {success: false} ise (örn: şifre hatalı, e-posta bulunamadı):
        } else {
            messageEl.style.color = "red";
            messageEl.textContent = result.message; // "Şifre hatalı" vb.
        }

    } catch (err) {
        // Bu 'catch' bloğu şunları yakalar:
        // 1. fetch() hatası (örn: ağ bağlantısı koptu, sunucu kapalı).
        // 2. 'throw new Error(...)' ile yukarıda fırlattığımız hatalar (örn: PHP syntax hatası).
        
        messageEl.style.color = "red";
        
        // --- ÖNCEKİ HATANIN DÜZELTİLDİĞİ YER ---
        // ÖNCEKİ: messageEl.textContent = "Hata: "un " + err.message;
        // YENİ:
        messageEl.textContent = "Hata: " + err.message;
        // --- DÜZELTME SONU ---
        
        // Hatayı ayrıca konsola yazdır (geliştirici için).
        console.error("Login Hatası:", err);
    }
});

// Boşluk engelleme kodu (Bu kısım aynı kaldı)
// "email" ve "password" ID'li inputlara boşluk girilmesini engeller.
["email", "password"].forEach((id) => {
    const input = document.getElementById(id);
    // Tuşa basıldığında (keydown)
    input.addEventListener("keydown", (e) => {
        if (e.key === " ") e.preventDefault(); // eğer tuş 'boşluk' ise, engelle.
    });
    // Input'a veri girildiğinde (örn: yapıştırma)
    input.addEventListener("input", () => {
        // içindeki tüm boşlukları (\s+) sil.
        input.value = input.value.replace(/\s+/g, ""); 
    });
});