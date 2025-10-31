// JAVASCRIPT: Genel JavaScript dosyası
document.addEventListener('DOMContentLoaded', () => {

    // Profil menü kontrolü
    const userMenu = document.querySelector('.user-menu');
    const userBtn = document.querySelector('.user-btn');

    if (userBtn && userMenu) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        });
    }

    // Menüyü kapat
    document.addEventListener('click', (e) => {
        if (userMenu && !userMenu.contains(e.target)) {
            userMenu.classList.remove('active');
        }
        
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => {
            const dropdown = menu.closest('.dropdown');
            if (dropdown && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Dropdown menüler
    document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
        dropdownLink.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            
            document.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            dropdown.classList.toggle('active');
        });
    });

    // Adet kontrol butonları
    document.querySelectorAll('.anasayfa-adet-kontrol').forEach(quantityControl);
    document.querySelectorAll('.urun-adet-kontrol').forEach(quantityControl);

    // Sepete ekle butonları
    document.querySelectorAll('.anasayfa-sepete-ekle-btn').forEach(addToCartButton);
    document.querySelectorAll('.urun-sepete-ekle-btn').forEach(addToCartButton);

});

// Adet kontrolü
function quantityControl(kontrol) {
    const azaltBtn = kontrol.querySelector('.anasayfa-adet-azalt, .urun-adet-azalt');
    const arttirBtn = kontrol.querySelector('.anasayfa-adet-arttir, .urun-adet-arttir');
    const adetInput = kontrol.querySelector('.anasayfa-kitap-adet, .urun-adet-input');

    if (!azaltBtn || !arttirBtn || !adetInput) {
        console.warn("Adet kontrol elemanları bulunamadı:", kontrol);
        return;
    }

    const minAdet = parseInt(adetInput.min, 10);
    const maxAdet = parseInt(adetInput.max, 10);

    azaltBtn.addEventListener('click', () => {
        let currentValue = parseInt(adetInput.value, 10);
        if (currentValue > minAdet) {
            adetInput.value = currentValue - 1;
        }
    });

    arttirBtn.addEventListener('click', () => {
        let currentValue = parseInt(adetInput.value, 10);
        if (currentValue < maxAdet) {
            adetInput.value = currentValue + 1;
        }
    });
}

// Sepete ekle
function addToCartButton(button) {
    button.addEventListener('click', function() {
        const productCard = button.closest('.anasayfa-kitap-kart, .urun-kitap-kart');
        if (!productCard) {
            console.warn("Ürün kartı bulunamadı");
            return;
        }

        const urunId = productCard.getAttribute('data-urun-id');
        if (!urunId) {
            console.warn("Ürün ID bulunamadı");
            return;
        }

        const quantityInput = productCard.querySelector('.anasayfa-kitap-adet, .urun-adet-input');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

        fetch('/sepet_guncelle.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add',
                urunId: parseInt(urunId),
                quantity: quantity
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('Ürün sepete eklendi!', 'success');
                updateCartCount();
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

// Bildirim göster
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
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

    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
    } else {
        notification.style.backgroundColor = '#2196F3';
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Sepet sayacı
function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(countElement => {
        const currentCount = parseInt(countElement.textContent) || 0;
        countElement.textContent = currentCount + 1;
    });
}