document.addEventListener("DOMContentLoaded", () => {
    /* ================================
       ELEMENT SELECTORS
    =================================*/
    const products = document.querySelectorAll(".product-item");
    const modal = document.getElementById("product-modal");
    const closeBtn = document.querySelector(".close-btn");
    const cartCount = document.querySelector(".cart-count");
    const searchInput = document.querySelector(".search-filter input");
    const categorySelect = document.querySelector(".search-filter select");

    let count = Number(localStorage.getItem("cartCount")) || 0;
    cartCount.textContent = count;

    /* ================================
       ADD TO CART ANIMATION
    =================================*/
    function animateCart() {
        cartCount.classList.add("cart-bounce");
        setTimeout(() => cartCount.classList.remove("cart-bounce"), 400);
    }

    /* ================================
       TOAST MESSAGE (MINI NOTIFICATION)
    =================================*/
    function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 100);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    /* ================================
       PRODUCT CLICK → OPEN MODAL
    =================================*/
    products.forEach(product => {
        product.addEventListener("click", () => {
            document.getElementById("modal-img").src = product.querySelector("img").src;
            document.getElementById("modal-title").textContent = product.querySelector("h3").textContent;
            document.getElementById("modal-price").textContent = product.querySelector(".price").textContent;
            document.getElementById("modal-description").textContent = product.dataset.description;
            modal.style.display = "flex";
        });

        /* Add to Cart button inside product */
        product.querySelector(".cart-btn").addEventListener("click", (e) => {
            e.stopPropagation();  
            count++;
            cartCount.textContent = count;
            localStorage.setItem("cartCount", count);
            animateCart();
            showToast("✔ Added to cart!");
        });
    });

    /* ================================
       CLOSE MODAL
    =================================*/
    closeBtn.addEventListener("click", () => modal.style.display = "none");

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    /* Add to cart from modal */
    modal.querySelector(".cart-btn").addEventListener("click", () => {
        count++;
        cartCount.textContent = count;
        localStorage.setItem("cartCount", count);
        modal.style.display = "none";
        animateCart();
        showToast("✔ Item added from preview!");
    });

    /* ================================
       PRODUCT SEARCH FILTER
    =================================*/
    searchInput.addEventListener("input", () => {
        const text = searchInput.value.toLowerCase();

        products.forEach(product => {
            const name = product.querySelector("h3").textContent.toLowerCase();
            product.style.display = name.includes(text) ? "block" : "none";
        });
    });

    /* ================================
       CATEGORY FILTER
       (requires adding a data-category in HTML)
    =================================*/
    categorySelect.addEventListener("change", () => {
        const selected = categorySelect.value;

        products.forEach(product => {
            const cat = product.dataset.category || "all";
            if (selected === "all" || selected === cat) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });

});
