// GANTI NOMOR WHATSAPP ADMIN DI SINI
const adminNumber = "6281225694523";

// DATA PRODUK (bisa kamu tambah sendiri)
const products = [
  { id: 1, name: "E-book customer care", price: 20000, image: "images/p1.jpg" },
  { id: 2, name: "Kaos Polos", price: 40000, image: "images/p2.jpg" },
  { id: 3, name: "E-book Menjadi customer service yang baik", price: 25000, image: "images/p3.jpg" }
];

let cart = [];

// LOAD PRODUK KE HALAMAN
function loadProducts() {
  const list = document.getElementById("product-list");
  products.forEach(p => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>Rp ${p.price.toLocaleString()}</p>
        <button onclick="addToCart(${p.id})">Tambah</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const exist = cart.find(c => c.id === id);
  
  if (exist) {
    exist.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.length;

  let html = "";
  let total = 0;

  cart.forEach(item => {
    const sub = item.price * item.qty;
    total += sub;

    html += `
      <div>
        <strong>${item.name}</strong><br>
        Rp ${item.price.toLocaleString()} x ${item.qty}  
        <br><br>
      </div>
    `;
  });

  document.getElementById("cart-items").innerHTML = html;
  document.getElementById("cart-total").textContent =
    "Rp " + total.toLocaleString();
}

// SHOW/HIDE CART SIDEBAR
document.getElementById("cart-btn").onclick = () => {
  document.getElementById("cart-sidebar").classList.toggle("active");
};

// CHECKOUT VIA WHATSAPP
document.getElementById("checkout").onclick = () => {
  if (cart.length === 0) return alert("Keranjang kosong!");

  let message = "Halo! Saya ingin memesan:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const sub = item.qty * item.price;
    total += sub;
    message += `• ${item.name} x ${item.qty} = Rp ${sub.toLocaleString()}%0A`;
  });

  message += `%0ATotal: Rp ${total.toLocaleString()}%0A`;
  message += "%0AAlamat saya: ";

  window.open(
    `https://wa.me/${adminNumber}?text=${message}`,
    "_blank"
  );
};

loadProducts();
