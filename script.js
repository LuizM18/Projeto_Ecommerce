document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart");
  let cart = [];

  
  // Carregar produtos
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>R$${product.price.toFixed(2)}</p>
          <button onclick='addToCart(${JSON.stringify(product)})'>Adicionar ao Carrinho</button>
        `;
        productList.appendChild(card);
      });
    });

  // Adicionar ao carrinho
  window.addToCart = function(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCart();
  };

  // Atualizar carrinho
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} x${item.qty} - R$${(item.price * item.qty).toFixed(2)}`;
      cartItems.appendChild(li);
      total += item.price * item.qty;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = `🛒 Carrinho (${cart.length})`;
  }
});
