const rupiah = value => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(value);

const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const productItems = [...document.querySelectorAll(".product-item")];
const emptyState = document.querySelector("#emptyState");

function filterProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  let visible = 0;
  productItems.forEach(item => {
    const matchesName = item.dataset.name.includes(keyword);
    const matchesCategory = category === "all" || item.dataset.category === category;
    const show = matchesName && matchesCategory;
    item.classList.toggle("d-none", !show);
    if (show) visible++;
  });
  emptyState.classList.toggle("d-none", visible !== 0);
}
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

const cart = [];
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const toast = bootstrap.Toast.getOrCreateInstance(document.querySelector("#noticeToast"));

function renderCart() {
  cartCount.textContent = cart.length;
  cartItems.replaceChildren();
  if (!cart.length) {
    const empty = document.createElement("li");
    empty.className = "list-group-item text-secondary";
    empty.textContent = "Keranjang masih kosong.";
    cartItems.append(empty);
  }
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    const name = document.createElement("span");
    name.textContent = item.name;
    const price = document.createElement("strong");
    price.textContent = rupiah(item.price);
    li.append(name, price);
    cartItems.append(li);
  });
  cartTotal.textContent = rupiah(total);
}
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    cart.push({ name: button.dataset.product, price: Number(button.dataset.price) });
    renderCart();
    document.querySelector("#toastMessage").textContent = `${button.dataset.product} ditambahkan ke keranjang.`;
    toast.show();
  });
});

document.querySelector("#checkoutBtn").addEventListener("click", () => {
  document.querySelector("#toastMessage").textContent = cart.length
    ? `Ringkasan dibuat untuk ${cart.length} produk dengan total ${cartTotal.textContent}.`
    : "Tambahkan produk terlebih dahulu.";
  toast.show();
});

document.querySelector("#themeToggle").addEventListener("click", event => {
  const root = document.documentElement;
  const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-bs-theme", next);
  event.currentTarget.textContent = next === "dark" ? "Mode terang" : "Mode gelap";
});

const contactForm = document.querySelector("#contactForm");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  event.stopPropagation();
  contactForm.classList.add("was-validated");
  if (contactForm.checkValidity()) {
    document.querySelector("#formSuccess").classList.remove("d-none");
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  } else {
    document.querySelector("#formSuccess").classList.add("d-none");
  }
});
renderCart();


// Inisialisasi komponen Bootstrap yang membutuhkan JavaScript.
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));

const loadingButton = document.querySelector("#loadingButton");
loadingButton.addEventListener("click", () => {
  const spinner = document.querySelector("#loadingSpinner");
  spinner.classList.remove("d-none");
  loadingButton.disabled = true;
  window.setTimeout(() => {
    spinner.classList.add("d-none");
    loadingButton.disabled = false;
    document.querySelector("#toastMessage").textContent = "Simulasi proses selesai.";
    toast.show();
  }, 900);
});

const interestRange = document.querySelector("#interestRange");
interestRange.addEventListener("input", () => {
  document.querySelector("#rangeValue").textContent = interestRange.value;
});
