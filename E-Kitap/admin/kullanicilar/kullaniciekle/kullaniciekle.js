document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const ad = document.getElementById("ad").value.trim();
        const soyad = document.getElementById("soyad").value.trim();
        const email = document.getElementById("eposta").value.trim();
        const sifre = document.getElementById("sifre").value;

        if (!ad || !soyad || !email || !sifre) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        const payload = { ad, soyad, email, sifre };

        try {
            const response = await fetch("kullaniciekle.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                form.reset(); // Formu temizle
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Hata:", error);
            alert("Bir hata oluştu!");
        }
    });
});
