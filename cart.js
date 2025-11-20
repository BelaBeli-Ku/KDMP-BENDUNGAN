let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;

    let html = "";
    let total = 0;

    cart.forEach((item, i) => {
        html += `
            <div class="cart-item">
                ${item.name} - Rp ${item.price.toLocaleString()}
                <button onclick="removeItem(${i})">Hapus</button>
            </div>
        `;
        total += item.price;
    });

    document.getElementById("cart-items").innerHTML = html;
    document.getElementById("cart-total").innerText = "Rp " + total.toLocaleString();
}

function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
    updateCart();
}

function checkoutWA() {
    if (cart.length === 0) return alert("Keranjang kosong!");

    let pesan = "Halo, saya ingin memesan:%0A%0A";
    cart.forEach(item => {
        pesan += `- ${item.name}: Rp ${item.price.toLocaleString()}%0A`;
    });

    let total = cart.reduce((a, b) => a + b.price, 0);
    pesan += `%0ATotal: Rp ${total.toLocaleString()}`;

    const nomor = "6281234567890"; // Nomor WA koperasi
    window.open(`https://wa.me/${nomor}?text=${pesan}`, "_blank");
}

// jalankan update awal
updateCart();
