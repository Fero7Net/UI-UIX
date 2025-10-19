document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const ad = document.getElementById("ad").value.trim();
    const soyad = document.getElementById("soyad").value.trim();
    const email = document.getElementById("email").value.trim();
    const sifre = document.getElementById("sifre").value.trim();
    const sifreTekrar = document.getElementById("sifre-tekrar").value.trim();
    const messageEl = document.getElementById("message");