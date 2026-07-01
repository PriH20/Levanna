let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const whatsappBtn = document.getElementById("whatsappBtn");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const searchInput = document.getElementById("searchInput");

function addToCart(name, price) {
  const product = cart.find(item => item.name === name);

  if (product) {
    product.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
  cartPanel.classList.add("show");

  if (typeof gtag === "function") {
    gtag("event", "agregar_carrito", {
      producto: name,
      precio: price
    });
  }
}

function updateCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p><strong>${item.name}</strong></p>
        <p>$${item.price} x ${item.quantity}</p>
        <button onclick="decreaseItem(${index})">-</button>
        <button onclick="increaseItem(${index})">+</button>
        <button onclick="removeItem(${index})">Quitar</button>
      </div>
    `;
  });

  cartTotal.textContent = "Total: $" + total;
  cartCount.textContent = count;
}

function increaseItem(index) {
  cart[index].quantity++;
  updateCart();
}

function decreaseItem(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

cartBtn.addEventListener("click", () => {
  cartPanel.classList.toggle("show");
});

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});

whatsappBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  let message = "Hola, quiero hacer este pedido de Levanna:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `- ${item.name} x${item.quantity} = $${subtotal}%0A`;
  });

  message += `%0ATotal: $${total}`;

  if (typeof gtag === "function") {
    gtag("event", "pedido_whatsapp", { total });
  }

  window.open(`https://wa.me/524776358516?text=${message}`, "_blank");
});

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(text) ? "block" : "none";
    });

    if (typeof gtag === "function" && text.length > 1) {
      gtag("event", "buscar_producto", { texto: text });
    }
  });
}