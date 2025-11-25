// Sayfa tamamen yüklendiğinde çalışır
document.addEventListener("DOMContentLoaded", () => {

    // Form elemanını seç
    const form = document.querySelector("form");

    // Form gönderildiğinde çalışır
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Sayfanın yenilenmesini engelle

        // Form alanlarını al ve boşlukları temizle
        const ad = document.getElementById("ad").value.trim();
        const soyad = document.getElementById("soyad").value.trim();
        const email = document.getElementById("eposta").value.trim();
        const sifre = document.getElementById("sifre").value;

        // Tüm alanların dolu olup olmadığını kontrol et
        if (!ad || !soyad || !email || !sifre) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        // Sunucuya gönderilecek veri paketi
        const payload = { ad, soyad, email, sifre };

        try {
            // Verileri JSON olarak PHP dosyasına gönder
            const response = await fetch("kullaniciekle.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            // Sunucudan gelen yanıtı JSON olarak al
            const data = await response.json();

            // Başarılıysa uyarı göster ve formu temizle
            if (data.success) {
                alert(data.message);
                form.reset(); // Formu temizle
            } else {
                // Başarısız işlem mesajı
                alert(data.message);
            }
        } catch (error) {
            // Herhangi bir hata oluşursa yakalanır
            console.error("Hata:", error);
            alert("Bir hata oluştu!");
        }
    });
});
