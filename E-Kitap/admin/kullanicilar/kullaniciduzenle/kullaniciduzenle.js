document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const ad = document.getElementById("ad").value.trim();
        const soyad = document.getElementById("soyad").value.trim();
        const email = document.getElementById("email").value.trim();
        const sifre = document.getElementById("sifre").value;

        if (!ad || !soyad || !email) {
            alert("Ad, soyad ve e-posta alanları boş bırakılamaz!");
            return;
        }

        const payload = { ad, soyad, email, sifre };

        try {
            const response = await fetch("kullaniciduzenle.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                window.location.href = "../kullanicilar/kullanicilar.html";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Hata:", error);
            alert("Bir hata oluştu!");
        }
    });
});
