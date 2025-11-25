// Kullanıcı listesini sunucudan çeken fonksiyon
async function loadUsers() {
    try {
        // PHP dosyasından kullanıcı verilerini al
        const res = await fetch('kullanicilar.php');
        const data = await res.json();

        // İşlem başarısızsa uyarı ver
        if (!data.success) {
            alert(data.message);
            return;
        }

        // Tablo gövdesini seç ve önceki verileri temizle
        const tbody = document.querySelector('.user-table tbody');
        tbody.innerHTML = '';

        // Her kullanıcı için tablo satırı oluştur
        data.users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="AD">${user.adi}</td>
                <td data-label="SOYAD">${user.soyadi}</td>
                <td data-label="E-POSTA">${user.email}</td>
                <td data-label="ŞİFRE (GÜVENSİZ)">••••••••</td>
                <td data-label="İŞLEMLER">
                    <a href="../kullaniciduzenle/kullaniciduzenle.html?email=${encodeURIComponent(user.email)}" class="btn-action edit">Düzenle</a>
                    <a href="#" class="btn-action delete" onclick="deleteUser('${user.email}')">Sil</a>
                </td>
            `;
            tbody.appendChild(tr); // Satırı tabloya ekle
        });

    } catch (err) {
        // Veri çekme sırasında hata olursa uyarı ver
        alert('Kullanıcılar yüklenemedi!');
        console.error(err);
    }
}

// Kullanıcı silme fonksiyonu
function deleteUser(email) {
    // Silme işlemi için kullanıcıdan onay al
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;

    // Silme isteğini PHP dosyasına gönder
    fetch('kullanicilar.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(res => res.json()) // Yanıtı JSON olarak al
    .then(data => {
        alert(data.message); // Sunucudan gelen mesajı göster
        if(data.success) loadUsers(); // Başarılıysa listeyi yenile
    })
    .catch(err => alert('Sunucu hatası!')); // Hata durumunda uyarı ver
}

// Sayfa yüklendiğinde kullanıcı listesini getir
document.addEventListener('DOMContentLoaded', loadUsers);
