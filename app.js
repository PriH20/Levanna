let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const whatsappBtn = document.getElementById("whatsappBtn");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

function addToCart(name, price) {
  const product = cart.find(item => item.name === name);
if (typeof gtag === "function") {
   gtag("event","agregar_carrito", {
     producto: name,
     precio: price
   });
   }

   
  if (product) {
    product.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
  cartPanel.classList.add("show");
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
        <p>${item.name}</p>
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

  const phone = "524776358516";
  const url = `https://wa.me/${phone}?text=${message}`;
if (typeof gtag === "function") {
   gtag("event","pedido_whatsapp",{
    total: total
    });
    }

  window.open(url, "_blank");
});
// Ocultar pantalla de carga
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }
});
const buscador =
document.getElementByld("searchIput");

if (buscador) {
  buscador.addEventListener("keyup",() =>{
    if (typeof gtag==="function"){
      gtag("event","buscar_producto",{
        texto: buscador.value
        });
      }
  });
}

window.addEventListener("scroll", () => {
  const porcentaje = Math.round(
       (window.scrollY /
      (document.body.scrollHeight -
      window.innerHeight)) * 100
      );
      
      if (porcentaje >= 90 && typeof gtag ===
        "function") {
          gtag("event","pagina_completa");
          }
        });