// ========================================
// MANGALMURTI LIGHTS
// WEBSITE + GOOGLE SHEET + WHATSAPP
// ========================================


// WhatsApp Number
const WHATSAPP_NUMBER = "918097942243";


// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwfoD8qYCEN27GalB1LLzgIMXEmxHR_Zke8uHuybggrt_Ihv34YYmy3YquEjkUyVjRR/exec";


// Cart
let cart = [];


// ========================================
// ORDER ID
// ========================================

function generateOrderId() {

  const now = new Date();

  const date =
    now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const random =
    Math.floor(1000 + Math.random() * 9000);

  return "ML" + date + random;
}


// ========================================
// BUY PRODUCT
// ========================================

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


// ========================================
// WHATSAPP ENQUIRY
// ========================================

function custom(productName) {

  const message =
`✨ *Mangalmurti Lights - Product Enquiry*

मला खालील product बद्दल माहिती हवी आहे:

📦 Product:
${productName}

कृपया price, availability आणि delivery बद्दल माहिती द्या.

धन्यवाद.`;

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

  const cartBox =
    document.getElementById("cart");

  const cartCount =
    document.getElementById("cartCount");

  const totalBox =
    document.getElementById("total");


  if (cart.length === 0) {

    cartBox.innerHTML =
      "Cart रिकामी आहे.";

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
            onclick="decreaseItem(${index})"
          >
            −
          </button>

          <button
            type="button"
            onclick="increaseItem(${index})"
          >
            +
          </button>

          <button
            type="button"
            onclick="removeItem(${index})"
          >
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


// ========================================
// INCREASE
// ========================================

function increaseItem(index) {

  cart[index].qty++;

  updateCart();
}


// ========================================
// DECREASE
// ========================================

function decreaseItem(index) {

  if (cart[index].qty > 1) {

    cart[index].qty--;

  } else {

    cart.splice(index, 1);

  }

  updateCart();
}


// ========================================
// REMOVE
// ========================================

function removeItem(index) {

  cart.splice(index, 1);

  updateCart();
}


// ========================================
// SEND ORDER TO GOOGLE SHEET
// ========================================

async function saveOrderToGoogleSheet(orderData) {

  try {

    await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",

        mode: "no-cors",

        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },

        body: JSON.stringify(orderData)
      }
    );

    return true;

  } catch (error) {

    console.error(
      "Google Sheet Error:",
      error
    );

    return false;
  }
}


// ========================================
// SUBMIT ORDER
// ========================================

async function submitOrder(event) {

  event.preventDefault();


  // Check cart

  if (cart.length === 0) {

    alert(
      "कृपया आधी Product select करा."
    );

    return;
  }


  // Customer details

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


  // Phone validation

  if (!/^[6-9][0-9]{9}$/.test(phone)) {

    alert(
      "कृपया योग्य 10 digit mobile number टाका."
    );

    return;
  }


  // Pincode validation

  if (!/^[0-9]{6}$/.test(pin)) {

    alert(
      "कृपया योग्य 6 digit pincode टाका."
    );

    return;
  }


  // Order ID

  const orderId =
    generateOrderId();


  document
    .getElementById("orderId")
    .innerText =
      "Order ID: " + orderId;


  // Total

  let total = 0;

  cart.forEach(item => {

    total +=
      item.price * item.qty;

  });


  // Product text

  let productText = "";

  let sheetProductText = "";

  let totalQty = 0;


  cart.forEach((item, index) => {

    totalQty += item.qty;


    const itemAmount =
      item.price * item.qty;


    productText +=
`📦 *Product ${index + 1}:*
${item.name}

💰 Price: ₹${item.price.toLocaleString("en-IN")}
🔢 Quantity: ${item.qty}
💵 Amount: ₹${itemAmount.toLocaleString("en-IN")}

`;


    sheetProductText +=
      `${item.name} × ${item.qty}`;

    if (index < cart.length - 1) {

      sheetProductText += " | ";

    }

  });


  // ========================================
  // DATA FOR GOOGLE SHEET
  // ========================================

  const orderData = {

    orderId: orderId,

    name: name,

    phone: phone,

    address: address,

    city: city,

    pin: pin,

    product: sheetProductText,

    qty: totalQty,

    amount: total

  };


  // ========================================
  // SAVE TO GOOGLE SHEET
  // ========================================

  saveOrderToGoogleSheet(orderData);


  // ========================================
  // WHATSAPP MESSAGE
  // ========================================

  const message =
`🛒 *NEW COD ORDER*

🏪 *Mangalmurti Lights*

🆔 *Order ID:*
${orderId}

━━━━━━━━━━━━━━

${productText}

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


  // Open WhatsApp

  window.open(
    whatsappURL,
    "_blank"
  );

}


// ========================================
// INITIALIZE
// ========================================

updateCart();
