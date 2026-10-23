let supabaseUrl = "https://ftppufyicfooxfbbkmow.supabase.co";

let supabaseKey = "ضعي_هنا_PUBLISHABLE_KEY";

let supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);




let currentLanguage = "ar";
let cart = [];
let selectedCategory = "all";

let products = [
    {
        id: 1,
        nameAr: "فستان وردي أنيق",
        nameEn: "Elegant Pink Dress",
        category: "dresses",
        price: 650,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
        descriptionAr: "فستان أنيق لإطلالة مميزة",
        descriptionEn: "An elegant dress for a special look"
    },
    {
        id: 2,
        nameAr: "بلوزة بيضاء",
        nameEn: "White Blouse",
        category: "tops",
        price: 450,
        image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=600&q=80",
        descriptionAr: "تصميم بسيط يناسب إطلالاتك",
        descriptionEn: "A simple design for your everyday looks"
    },
    {
        id: 3,
        nameAr: "بنطلون واسع",
        nameEn: "Wide Leg Trousers",
        category: "pants",
        price: 550,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
        descriptionAr: "راحة وأناقة في قطعة واحدة",
        descriptionEn: "Comfort and elegance in one piece"
    },
    {
        id: 4,
        nameAr: "حقيبة أنيقة",
        nameEn: "Elegant Handbag",
        category: "accessories",
        price: 700,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        descriptionAr: "حقيبة تكمل إطلالتك",
        descriptionEn: "A bag to complete your look"
    },
    {
        id: 5,
        nameAr: "فستان أبيض",
        nameEn: "White Dress",
        category: "dresses",
        price: 750,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80",
        descriptionAr: "إطلالة ناعمة ومميزة",
        descriptionEn: "A soft and elegant look"
    },
    {
        id: 6,
        nameAr: "بلوزة كاجوال",
        nameEn: "Casual Top",
        category: "tops",
        price: 350,
        image: "https://images.unsplash.com/photo-1564257577-6a6b7f5b8d5e?auto=format&fit=crop&w=600&q=80",
        descriptionAr: "قطعة عملية لكل يوم",
        descriptionEn: "An everyday essential"
    }
];




let productGrid = document.getElementById("productGrid");
let emptyMessage = document.getElementById("emptyMessage");
let cartCount = document.getElementById("cartCount");
let languageBtn = document.getElementById("languageBtn");
let cartBtn = document.getElementById("cartBtn");
let menuBtn = document.getElementById("menuBtn");
let navigation = document.getElementById("navigation");




function displayProducts() {

    let filteredProducts = products.filter(function(product) {
        return selectedCategory === "all" ||
               product.category === selectedCategory;
    });

    productGrid.innerHTML = "";

    if (filteredProducts.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    filteredProducts.forEach(function(product) {

        let productName = currentLanguage === "ar"
            ? product.nameAr
            : product.nameEn;

        let productDescription = currentLanguage === "ar"
            ? product.descriptionAr
            : product.descriptionEn;

        let buttonText = currentLanguage === "ar"
            ? "أضيفي إلى السلة ♡"
            : "Add to Cart ♡";

        let currency = currentLanguage === "ar"
            ? "جنيه"
            : "EGP";

        let productCard = document.createElement("article");

        productCard.className = "product-card";

        let image = document.createElement("img");

        image.className = "product-image";
        image.src = product.image;
        image.alt = productName;
        image.loading = "lazy";

        image.onerror = function() {
            this.style.display = "none";
        };

        let productInfo = document.createElement("div");

        productInfo.className = "product-info";

        let name = document.createElement("h3");

        name.className = "product-name";
        name.textContent = productName;

        let description = document.createElement("p");

        description.className = "product-description";
        description.textContent = productDescription;

        let price = document.createElement("p");

        price.className = "product-price";
        price.textContent = product.price + " " + currency;

        let addButton = document.createElement("button");

        addButton.className = "add-cart-btn";
        addButton.textContent = buttonText;

        addButton.addEventListener("click", function() {
            addToCart(product.id);
        });

        productInfo.appendChild(name);
        productInfo.appendChild(description);
        productInfo.appendChild(price);
        productInfo.appendChild(addButton);

        productCard.appendChild(image);
        productCard.appendChild(productInfo);

        productGrid.appendChild(productCard);
    });
}




function addToCart(productId) {

    let existingItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    updateCartCount();

    let message = currentLanguage === "ar"
        ? "تمت إضافة المنتج إلى السلة ♡"
        : "Product added to your cart ♡";

    alert(message);
}



function updateCartCount() {

    let totalItems = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
}




cartBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert(
            currentLanguage === "ar"
            ? "سلة المشتريات فارغة حاليًا ♡"
            : "Your shopping cart is empty ♡"
        );

        return;
    }

    let cartMessage = currentLanguage === "ar"
        ? "محتويات سلة المشتريات:\n\n"
        : "Your shopping cart:\n\n";

    let totalPrice = 0;

    cart.forEach(function(item) {

        let product = products.find(function(product) {
            return product.id === item.id;
        });

        if (product) {

            let productName = currentLanguage === "ar"
                ? product.nameAr
                : product.nameEn;

            cartMessage += productName;
            cartMessage += " × " + item.quantity;
            cartMessage += " = ";
            cartMessage += product.price * item.quantity;
            cartMessage += currentLanguage === "ar"
                ? " جنيه\n"
                : " EGP\n";

            totalPrice += product.price * item.quantity;
        }
    });

    cartMessage += "\n";

    cartMessage += currentLanguage === "ar"
        ? "الإجمالي: " + totalPrice + " جنيه"
        : "Total: " + totalPrice + " EGP";

    alert(cartMessage);
});




languageBtn.addEventListener("click", function() {

    if (currentLanguage === "ar") {
        currentLanguage = "en";
    } else {
        currentLanguage = "ar";
    }

    document.documentElement.lang = currentLanguage;

    document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-ar][data-en]")
        .forEach(function(element) {

            element.textContent =
                currentLanguage === "ar"
                ? element.dataset.ar
                : element.dataset.en;
        });

    languageBtn.textContent =
        currentLanguage === "ar" ? "EN" : "AR";

    displayProducts();

    navigation.classList.remove("open");

    menuBtn.setAttribute(
        "aria-label",
        currentLanguage === "ar" ? "فتح القائمة" : "Open menu"
    );
});




menuBtn.addEventListener("click", function() {

    navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function() {
        navigation.classList.remove("open");
    });
});




document.querySelectorAll(".category-card")
    .forEach(function(button) {

        button.addEventListener("click", function() {

            selectedCategory = button.dataset.category;

            displayProducts();

            document.getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });
        });
    });


document.getElementById("year").textContent =
    new Date().getFullYear();


displayProducts();

updateCartCount();


async function loadProductsFromDatabase() {
    let { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .eq("is_active", true);

    if (error) {
        console.error("خطأ في تحميل المنتجات:", error.message);
        return;
    }

    console.log("المنتجات الموجودة في قاعدة البيانات:", data);
}

loadProductsFromDatabase();