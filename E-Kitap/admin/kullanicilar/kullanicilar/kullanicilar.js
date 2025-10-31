async function loadUsers() {
    try {
        const res = await fetch('kullanicilar.php');
        const data = await res.json();

        if (!data.success) {
            alert(data.message);
            return;
        }

        const tbody = document.querySelector('.user-table tbody');
        tbody.innerHTML = '';

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
            tbody.appendChild(tr);
        });

    } catch (err) {
        alert('Kullanıcılar yüklenemedi!');
        console.error(err);
    }
}

function deleteUser(email) {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;

    fetch('kullanicilar.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if(data.success) loadUsers();
    })
    .catch(err => alert('Sunucu hatası!'));
}

// Sayfa yüklendiğinde kullanıcıları çek
document.addEventListener('DOMContentLoaded', loadUsers);
