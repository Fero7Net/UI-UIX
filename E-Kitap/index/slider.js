// JAVASCRIPT: Slider kontrolü
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById("slider");
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");

    if (slider && prevBtn && nextBtn) {
        let index = 0;

        function showSlide(i) {
            const slides = document.querySelectorAll(".slide");
            if (slides.length === 0) return;

            if (i >= slides.length) {
                index = 0;
            } 
            else if (i < 0) {
                index = slides.length - 1;
            } 
            else {
                index = i;
            }
            
            slider.style.transform = `translateX(${-index * 100}%)`;
        }

        nextBtn.addEventListener("click", () => { 
            showSlide(index + 1);
        });
        
        prevBtn.addEventListener("click", () => { 
            showSlide(index - 1);
        });

        setInterval(() => { 
            showSlide(index + 1); 
        }, 6000);
    }
});