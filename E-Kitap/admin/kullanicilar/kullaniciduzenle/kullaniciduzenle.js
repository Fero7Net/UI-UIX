// Sayfa tamamen yüklendiğinde çalışır
document.addEventListener("DOMContentLoaded", () => {

    // Form elemanını seç
    const form = document.querySelector("form");

    // Form gönderildiğinde çalışır
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Sayfanın yenilenmesini engelle

        // Form alanlarındaki değerleri al ve gereksiz boşlukları temizle
        const ad = document.getElementById("ad").value.trim();
        const soyad = document.getElementById("soyad").value.trim();
        const email = document.getElementById("email").value.trim();
        const sifre = document.getElementById("sifre").value;

        // Zorunlu alan boşsa uyarı ver
        if (!ad || !soyad || !email) {
            alert("Ad, soyad ve e-posta alanları boş bırakılamaz!");
            return;
        }

        // Sunucuya gönderilecek veri
        const payload = { ad, soyad, email, sifre };

        try {
            // Verileri JSON formatında PHP dosyasına gönder
            const response = await fetch("kullaniciduzenle.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            // Sunucudan gelen cevabı JSON olarak al
            const data = await response.json();

            // İşlem başarılıysa mesaj göster ve kullanıcılar sayfasına yönlendir
            if (data.success) {
                alert(data.message);
                window.location.href = "../kullanicilar/kullanicilar.html";
            } else {
                // İşlem başarısızsa hata mesajını göster
                alert(data.message);
            }
        } catch (error) {
            // Bağlantı veya işleme ait hata yakalama
            console.error("Hata:", error);
            alert("Bir hata oluştu!");
        }
    });
});
