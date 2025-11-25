// JAVASCRIPT: Slider kontrolü
document.addEventListener('DOMContentLoaded', () => {

    // Slider ana container ve butonları seç
    const slider = document.getElementById("slider");
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");

    // Tüm elemanlar mevcutsa slider çalışsın
    if (slider && prevBtn && nextBtn) {

        let index = 0; // Mevcut slide indexi

        // Slide gösterme fonksiyonu
        function showSlide(i) {
            const slides = document.querySelectorAll(".slide"); // Tüm slidelar
            if (slides.length === 0) return; // Slide yoksa dur

            // Index sınırlarını kontrol et
            if (i >= slides.length) {
                index = 0; // Son slide sonrası başa dön
            } 
            else if (i < 0) {
                index = slides.length - 1; // İlk slide öncesi sona dön
            } 
            else {
                index = i; // Normal index
            }
            
            // Slider'ı kaydırarak ilgili slide'ı göster
            slider.style.transform = `translateX(${-index * 100}%)`;
        }

        // İleri butonu tıklandığında sonraki slide
        nextBtn.addEventListener("click", () => { 
            showSlide(index + 1);
        });
        
        // Geri butonu tıklandığında önceki slide
        prevBtn.addEventListener("click", () => { 
            showSlide(index - 1);
        });

        // Otomatik geçiş: 6 saniyede bir slide değiştir
        setInterval(() => { 
            showSlide(index + 1); 
        }, 6000);
    }
});
