================================================================================
E-KİTAP E-TİCARET PROJESİ - README
================================================================================

PROJE HAKKINDA
--------------------------------------------------------------------------------
Bu proje, SQLite veritabanı ve PHP backend teknolojisi kullanılarak geliştirilmiş
basit bir demo e-kitap satış sitesidir. Proje, modern web teknolojileri ile
e-ticaret temel işlevlerini gösteren, eğitim ve demo amaçlı bir uygulamadır.

PROJE ÖZELLİKLERİ
--------------------------------------------------------------------------------

1. KULLANICI YÖNETİMİ
   - Kullanıcı kaydı (Kayıt Ol) ve giriş sistemi (Giriş Yap)
   - Oturum yönetimi (Session Management)
   - Şifre güvenliği (Password Hashing - BCRYPT)
   - Admin ve normal kullanıcı yetki sistemi
   - Kullanıcı profil sayfası

2. ÜRÜN YÖNETİMİ
   - Ürün listeleme (kategorilere göre)
   - Ürün arama/filtreleme
   - Popüler ürünler ve son eklenenler bölümleri
   - Ürün resim yükleme ve görüntüleme

3. KATEGORİ YÖNETİMİ
   - Kategori listeleme
   - Kategoriye göre ürün filtreleme
   - Dinamik navigasyon menüsü

4. SEPET İŞLEMLERİ
   - Sepete ürün ekleme
   - Sepet içeriğini görüntüleme
   - Ürün miktarını artırma/azaltma
   - Sepetten ürün silme
   - Sepet toplam tutar hesaplama
   - Sipariş tamamlama

5. ADMIN PANELİ
   - Admin yetkisi kontrolü
   - Kullanıcı yönetimi (Ekleme, Düzenleme, Silme)
   - Ürün yönetimi (Ekleme, Düzenleme, Silme)
   - Kategori yönetimi (Ekleme, Silme)
   - Dashboard (Yönetim ana sayfası)

TEKNİK ÖZELLİKLER
--------------------------------------------------------------------------------

VERİTABANI (SQLite)
   - SQLite veritabanı kullanılmıştır (db/data.db)
   - 4 ana tablo:
     * Kategoriler: Kitap kategorileri
     * Kullanici: Kullanıcı bilgileri ve yetkileri
     * Urun: Ürün (kitap) bilgileri, fiyat, yazar, kategori
     * Sepet: Kullanıcı sepet içeriği
   - Foreign key ilişkileri ile veri bütünlüğü sağlanmıştır
   - ON DELETE CASCADE ve ON UPDATE CASCADE kullanılmıştır

BACKEND (PHP)
   - PHP 7.x+ uyumlu
   - PDO (PHP Data Objects) ile veritabanı işlemleri
   - Session yönetimi ile kullanıcı oturum kontrolü
   - Password hashing (BCRYPT) ile güvenli şifre saklama
   - RESTful API benzeri JSON endpoint'ler
   - Admin yetkisi kontrolü
   - Güvenlik: SQL Injection koruması (Prepared Statements)
   - Güvenlik: XSS koruması (htmlspecialchars)

FRONTEND
   - Vanilla JavaScript (jQuery yok)
   - Fetch API ile AJAX istekleri
   - Responsive tasarım (Mobil uyumlu)
   - Modern CSS (Flexbox, Grid)
   - Font Awesome ikonları
   - Dinamik içerik yükleme

KURULUM VE ÇALIŞTIRMA
--------------------------------------------------------------------------------

1. GEREKSİNİMLER:
   - PHP 7.4 veya üzeri
   - SQLite3 desteği (genellikle PHP ile birlikte gelir)
   - Web sunucusu (Apache, Nginx) veya PHP built-in server

2. KURULUM:
   a) Projeyi web sunucu dizinine kopyalayın
   b) db/data.db dosyasının yazılabilir olduğundan emin olun
      (Linux/Mac: chmod 666 db/data.db)
   c) kitaplar/ klasörünün yazılabilir olduğundan emin olun
      (Ürün resimleri buraya yüklenir)

3. İLK KULLANICI OLUŞTURMA:
   - Signup sayfasından normal kullanıcı oluşturun
   - Admin yetkisi vermek için yetkiduzenleme.php script'ini kullanın:
     php yetkiduzenleme.php email@example.com
   - VEYA veritabanında direkt olarak yetkiyi 'admin' yapın

4. ÇALIŞTIRMA:
   Apache/Nginx kullanıyorsanız:
   - Proje otomatik çalışır (örn: http://localhost/e-ticaret/)
   
   PHP built-in server kullanıyorsanız:
   - Terminalde proje dizinine gidin
   - php -S localhost:8000 komutunu çalıştırın
   - Tarayıcıda http://localhost:8000 adresine gidin

GÜVENLİK NOTLARI
--------------------------------------------------------------------------------

⚠️ BU PROJE DEMO/EĞİTİM AMAÇLIDIR ⚠️

Gerçek bir e-ticaret sitesi için aşağıdaki iyileştirmeler yapılmalıdır:

1. Güvenlik:
   - HTTPS kullanımı zorunludur
   - CSRF token koruması eklenmelidir
   - Rate limiting uygulanmalıdır
   - Dosya yükleme güvenliği artırılmalıdır
   - SQL Injection koruması mevcut ama ek kontroller eklenebilir

2. Veritabanı:
   - Production için MySQL/PostgreSQL gibi güçlü veritabanları kullanılmalıdır
   - Veritabanı yedekleme stratejisi oluşturulmalıdır
   - Connection pooling kullanılmalıdır

3. Performans:
   - Cache mekanizması eklenmelidir
   - Resim optimizasyonu yapılmalıdır
   - CDN kullanımı değerlendirilmelidir

4. Özellikler:
   - Ödeme entegrasyonu (iyzico, PayTR, vb.)
   - E-posta bildirimleri
   - Sipariş takibi
   - Kullanıcı yorumları ve değerlendirmeleri
   - Favori ürünler listesi

LİSANS VE KULLANIM
--------------------------------------------------------------------------------

Bu proje eğitim ve demo amaçlıdır. Kendi projelerinizde kullanabilirsiniz.
Ticari kullanım için güvenlik ve özellik iyileştirmeleri yapılması önerilir.
Proje ön izlemesi için Adobe Xd formatında onizleme klasörüne göz atınız.


Son Güncelleme: 2025

================================================================================
İYİ KULLANIMLAR!
================================================================================

