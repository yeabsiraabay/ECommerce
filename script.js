document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".product-item");
    const modal = document.getElementById("product-modal");
    const closeBtn = document.querySelector(".close-btn");
    const cartCount = document.querySelector(".cart-count");

    let count = 0;
    products.forEach(product => {
        product.addEventListener("click", () => {
            document.getElementById("modal-img").src = product.querySelector("img").src;
            document.getElementById("modal-title").textContent = product.querySelector("h3").textContent;
            document.getElementById("modal-price").textContent = product.querySelector(".price").textContent;
            document.getElementById("modal-description").textContent = product.dataset.description;
            modal.style.display = "flex";
        });
        product.querySelector(".cart-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            count++;
            cartCount.textContent = count;
        });
    });
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
    modal.querySelector(".cart-btn").addEventListener("click", () => {
        count++;
        cartCount.textContent = count;
        modal.style.display = "none";
    });
});
