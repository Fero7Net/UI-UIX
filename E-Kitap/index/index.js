// JAVASCRIPT: Slider

// Slider ana konteynerini seç
const slider = document.getElementById('slider');

// Tüm slide öğelerini seç
const slides = document.querySelectorAll('.slide');

// İleri ve geri butonlarını seç
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// Mevcut slide indexi
let currentIndex = 0;

// Belirtilen slide'ı gösteren fonksiyon
function showSlide(index) {
    // Son slide sonrası başa dön
    if (index >= slides.length) currentIndex = 0;
    // İlk slide öncesi sona dön
    else if (index < 0) currentIndex = slides.length - 1;
    // Normal index
    else currentIndex = index;
    
    // Slider'ı kaydırarak ilgili slide'ı göster
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// İleri butonuna basıldığında bir sonraki slide'a geç
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

// Geri butonuna basıldığında bir önceki slide'a dön
prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));

// Otomatik olarak 5 saniyede bir slide değiştir
setInterval(() => showSlide(currentIndex + 1), 5000);
