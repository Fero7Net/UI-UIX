// Sayfa tamamen yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {

    // Profil menüsü elemanları
    const userMenu = document.querySelector('.user-menu');
    const userBtn = document.querySelector('.user-btn');

    // Profil menüsü aç/kapat kontrolü
    if (userBtn && userMenu) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();                 // Tıklama olayının üst elemanlara gitmesini engeller
            userMenu.classList.toggle('active'); // Menü görünür/gizli duruma geçer
        });
    }

    // Herhangi bir yere tıklanınca menüleri kapat
    document.addEventListener('click', (e) => {
        // Profil menüsü dışına tıklanmışsa menüyü kapat
        if (userMenu && !userMenu.contains(e.target)) {
            userMenu.classList.remove('active');
        }
        
        // Tüm dropdown menüleri kontrol et
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => {
            const dropdown = menu.closest('.dropdown');
            
            // Tıklanan alan mevcut dropdown içinde değilse menüyü kapat
            if (dropdown && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Dropdown tıklama kontrolü
    document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
        dropdownLink.addEventListener('click', function(e) {
            e.preventDefault(); // Linkin yönlendirme yapmasını engeller
            const dropdown = this.closest('.dropdown');

            // Aynı anda sadece bir dropdown açık kalsın
            document.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });

            dropdown.classList.toggle('active'); // Aç/kapat
        });
    });

    // Ürün adet kontrol butonlarını aktif hale getir
    document.querySelectorAll('.anasayfa-adet-kontrol').forEach(quantityControl);
    document.querySelectorAll('.urun-adet-kontrol').forEach(quantityControl);

    // Sepete ekle butonlarını aktif hale getir
    document.querySelectorAll('.anasayfa-sepete-ekle-btn').forEach(addToCartButton);
    document.querySelectorAll('.urun-sepete-ekle-btn').forEach(addToCartButton);

});


// *** Adet kontrol fonksiyonu ***
function quantityControl(kontrol) {
    const azaltBtn = kontrol.querySelector('.anasayfa-adet-azalt, .urun-adet-azalt');
    const arttirBtn = kontrol.querySelector('.anasayfa-adet-arttir, .urun-adet-arttir');
    const adetInput = kontrol.querySelector('.anasayfa-kitap-adet, .urun-adet-input');

    // Elemanlar yoksa uyarı ver ve işleme devam etme
    if (!azaltBtn || !arttirBtn || !adetInput) {
        console.warn("Adet kontrol elemanları bulunamadı:", kontrol);
        return;
    }

    const minAdet = parseInt(adetInput.min, 10); // Minimum adet
    const maxAdet = parseInt(adetInput.max, 10); // Maksimum adet

    // Adet azalt butonu
    azaltBtn.addEventListener('click', () => {
        let currentValue = parseInt(adetInput.value, 10);
        if (currentValue > minAdet) {
            adetInput.value = currentValue - 1;
        }
    });

    // Adet arttır butonu
    arttirBtn.addEventListener('click', () => {
        let currentValue = parseInt(adetInput.value, 10);
        if (currentValue < maxAdet) {
            adetInput.value = currentValue + 1;
        }
    });
}


// *** Sepete ekleme işlemi ***
function addToCartButton(button) {
    button.addEventListener('click', function() {

        // Ürün kartını bul
        const productCard = button.closest('.anasayfa-kitap-kart, .urun-kitap-kart');
        if (!productCard) {
            console.warn("Ürün kartı bulunamadı");
            return;
        }

        // Ürün ID'sini al
        const urunId = productCard.getAttribute('data-urun-id');
        if (!urunId) {
            console.warn("Ürün ID bulunamadı");
            return;
        }

        // Adet giriş alanı (adet yoksa varsayılan 1)
        const quantityInput = productCard.querySelector('.anasayfa-kitap-adet, .urun-adet-input');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

        // PHP'ye JSON POST isteği gönder
        fetch('/sepet_guncelle.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // JSON formatı
            },
            body: JSON.stringify({
                action: 'add',     // İşlem türü: ekle
                urunId: parseInt(urunId),
                quantity: quantity // Adet
            })
        })
        .then(response => response.json()) // JSON formatında cevap
        .then(data => {
            if (data.success) {
                showNotification('Ürün sepete eklendi!', 'success');
                updateCartCount(); // Sepet ikonundaki sayı güncellenir
            } else {
                showNotification('Hata: ' + data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Bir hata oluştu', 'error');
        });
    });
}


// *** Ekranın sağ üstünde bildirim gösterme ***
function showNotification(message, type = 'info') {

    // Aynı anda 1 bildirim gösterilsin, varsa kaldır
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Stil ayarları (inline)
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    // Bildirim renkleri
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
    } else {
        notification.style.backgroundColor = '#2196F3';
    }

    // Animasyon tanımı
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // 3 saniye sonra kaybolma animasyonu
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}


// *** Sepet sayacı güncelleme ***
function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');

    cartCounts.forEach(countElement => {
        const currentCount = parseInt(countElement.textContent) || 0;
        countElement.textContent = currentCount + 1; // Ürün sayısını +1 artır
    });
}
