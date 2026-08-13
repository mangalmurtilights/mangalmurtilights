const WHATSAPP_NUMBER = "918097942243";

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwfoD8qYCEN27GalB1LLzgIMXEmxHR_Zke8uHuybggrt_Ihv34YYmy3YquEjkUyVjRR/exec";

let cart = [];


// ===============================
// ORDER ID
// ===============================

function generateOrderId() {

  const d = new Date();

  const date =
    d.getFullYear().toString().slice(-2) +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");

  const random =
    Math.floor(1000 + Math.random() * 9000);

  return "ML" + date + random;
}


// ===============================
// BUY
// ===============================

function buy(productName, price) {

  const existing =
    cart.find(item => item.name === productName);

  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      name: productName,
      price: price,
      qty: 1
    });

  }

  updateCart();

  document
    .getElementById("order")
    .scrollIntoView({
      behavior: "smooth"
    });
}


// ===============================
// WHATSAPP ENQUIRY
// ===============================

function custom(productName) {

  const message =
`✨ *Mangalmurti Lights - Product Enquiry*

📦 Product:
${productName}

कृपया price, availability आणि delivery बद्दल माहिती द्या.`;

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}


// ===============================
// CART
// ===============================

function updateCart() {

  const cartBox =
    document.getElementById("cart");

  const cartCount =
    document.getElementById("cartCount");

  const totalBox =
    document.getElementById("total");

  if (cart.length === 0) {

    cartBox.innerHTML = "Cart रिकामी आहे.";
    cartCount.innerText = "0";
    totalBox.innerText = "₹0";

    return;
  }

  let total = 0;
  let html = "";

  cart.forEach((item, index) => {

    const itemTotal =
      item.price * item.qty;

    total += itemTotal;

    html += `
      <div class="cart-item">

        <div>
          <b>${item.name}</b>
          <br>
          ₹${item.price.toLocaleString("en-IN")}
          × ${item.qty}
        </div>

        <div>

          <button
            type="button"
            onclick="decreaseItem(${index})">
            −
          </button>

          <button
            type="button"
            onclick="increaseItem(${index})">
            +
          </button>

          <button
            type="button"
            onclick="removeItem(${index})">
            ❌
          </button>

        </div>

      </div>
    `;
  });

  cartBox.innerHTML = html;

  cartCount.innerText =
    cart.reduce(
      (sum, item) => sum + item.qty,
      0
    );

  totalBox.innerText =
    "₹" + total.toLocaleString("en-IN");
}


function increaseItem(index) {

  cart[index].qty++;

  updateCart();
}


function decreaseItem(index) {

  if (cart[index].qty > 1) {

    cart[index].qty--;

  } else {

    cart.splice(index, 1);
  }

  updateCart();
}


function removeItem(index) {

  cart.splice(index, 1);

  updateCart();
}


// ===============================
// SAVE TO GOOGLE SHEET
// ===============================

function saveOrderToGoogleSheet(data) {

  const form =
    document.createElement("form");

  form.method = "POST";

  form.action = GOOGLE_SCRIPT_URL;

  form.target = "googleSheetFrame";

  form.style.display = "none";


  Object.keys(data).forEach(key => {

    const input =
      document.createElement("input");

    input.type = "hidden";

    input.name = key;

    input.value = data[key];

    form.appendChild(input);
  });


  document.body.appendChild(form);

  form.submit();

  setTimeout(() => {

    form.remove();

  }, 3000);
}


// ===============================
// SUBMIT ORDER
// ===============================

function submitOrder(event) {

  event.preventDefault();


  if (cart.length === 0) {

    alert(
      "कृपया आधी Product select करा."
    );

    return;
  }


  const name =
    document
      .getElementById("name")
      .value
      .trim();


  const phone =
    document
      .getElementById("phone")
      .value
      .trim();


  const address =
    document
      .getElementById("address")
      .value
      .trim();


  const city =
    document
      .getElementById("city")
      .value
      .trim();


  const pin =
    document
      .getElementById("pin")
      .value
      .trim();


  if (!/^[6-9][0-9]{9}$/.test(phone)) {

    alert(
      "कृपया योग्य 10 digit mobile number टाका."
    );

    return;
  }


  if (!/^[0-9]{6}$/.test(pin)) {

    alert(
      "कृपया योग्य 6 digit pincode टाका."
    );

    return;
  }


  const orderId =
    generateOrderId();


  document
    .getElementById("orderId")
    .innerText =
      "Order ID: " + orderId;


  let total = 0;
  let totalQty = 0;

  let whatsappProducts = "";
  let sheetProducts = "";


  cart.forEach((item, index) => {

    const amount =
      item.price * item.qty;

    total += amount;

    totalQty += item.qty;


    whatsappProducts +=
`📦 *Product ${index + 1}:*
${item.name}

💰 Price: ₹${item.price.toLocaleString("en-IN")}
🔢 Quantity: ${item.qty}
💵 Amount: ₹${amount.toLocaleString("en-IN")}

`;


    sheetProducts +=
      item.name + " × " + item.qty;

    if (index < cart.length - 1) {

      sheetProducts += " | ";
    }

  });


  // ===============================
  // GOOGLE SHEET DATA
  // ===============================

  const orderData = {

    orderId: orderId,

    name: name,

    phone: phone,

    address: address,

    city: city,

    pin: pin,

    product: sheetProducts,

    qty: totalQty,

    amount: total

  };


  // SAVE TO GOOGLE SHEET

  saveOrderToGoogleSheet(orderData);


  // ===============================
  // WHATSAPP
  // ===============================

  const message =
`🛒 *NEW COD ORDER*

🏪 *Mangalmurti Lights*

🆔 Order ID:
${orderId}

━━━━━━━━━━━━━━

${whatsappProducts}

━━━━━━━━━━━━━━

💰 *TOTAL COD: ₹${total.toLocaleString("en-IN")}*

💳 Payment:
*CASH ON DELIVERY*

━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*

Name:
${name}

📱 Mobile:
${phone}

🏠 Address:
${address}

🏙️ City:
${city}

📮 Pincode:
${pin}

━━━━━━━━━━━━━━

🙏 Thank you for ordering from
*Mangalmurti Lights*`;


  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);


  window.open(
    whatsappURL,
    "_blank"
  );


  // Clear cart after order

  cart = [];

  updateCart();

}


// ===============================
// INITIALIZE
// ===============================

updateCart();
