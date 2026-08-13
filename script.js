* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #fffaf2;
  color: #222;
  line-height: 1.6;
}

/* =========================
   HEADER
========================= */

header {
  position: sticky;
  top: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px 6%;

  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);

  border-bottom: 1px solid #eee;

  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.06);
}

header b {
  font-size: 21px;
  color: #e86b00;
  white-space: nowrap;
}

nav {
  display: flex;
  gap: 25px;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  transition: 0.2s;
}

nav a:hover {
  color: #e86b00;
}

.cart {
  text-decoration: none;
  color: white;
  background: #e86b00;

  padding: 9px 15px;
  border-radius: 25px;

  font-weight: bold;

  transition: 0.2s;
}

.cart:hover {
  background: #c95400;
  transform: translateY(-2px);
}

#cartCount {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 22px;
  height: 22px;

  margin-left: 4px;

  background: white;
  color: #e86b00;

  border-radius: 50%;

  font-size: 12px;
}

/* =========================
   HERO
========================= */

.hero {
  min-height: 570px;

  padding: 80px 7%;

  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 50px;

  background:
    radial-gradient(circle at 80% 20%, #fff0c7 0, transparent 35%),
    linear-gradient(135deg, #fff8e8, #fffdf8);
}

.hero small,
section > small {
  display: inline-block;

  color: #e86b00;

  font-weight: bold;
  letter-spacing: 1.5px;

  margin-bottom: 10px;
}

.hero h1 {
  font-size: clamp(38px, 5vw, 65px);
  line-height: 1.15;

  margin-bottom: 20px;
}

.hero h1 strong {
  color: #e86b00;
}

.hero p {
  max-width: 620px;

  font-size: 18px;
  color: #666;

  margin-bottom: 30px;
}

.btn {
  display: inline-block;

  padding: 13px 23px;

  background: #e86b00;
  color: white;

  text-decoration: none;

  border-radius: 30px;

  font-weight: bold;

  box-shadow: 0 8px 20px rgba(232, 107, 0, 0.25);

  transition: 0.25s;
}

.btn:hover {
  transform: translateY(-3px);
  background: #c95400;
}

/* Hero artwork */

.heroart {
  min-height: 350px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 35px;

  background:
    radial-gradient(circle, #fff5b5, #ffce3a 45%, #ff9d00);

  box-shadow:
    0 25px 60px rgba(225, 130, 0, 0.25);

  font-size: 100px;

  transform: rotate(2deg);
}

.heroart b {
  margin-top: 10px;

  font-size: 30px;
  color: #6d3500;

  letter-spacing: 3px;
}

.heroart small {
  color: #6d3500;
  margin-top: 5px;
}

/* =========================
   PRODUCTS
========================= */

#products,
.why,
.order {
  padding: 80px 7%;
}

#products h2,
.why h2,
.order h2 {
  font-size: 38px;
  margin-bottom: 35px;
}

.grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 25px;

  margin-top: 25px;
}

article {
  overflow: hidden;

  background: white;

  border-radius: 22px;

  border: 1px solid #eee;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.07);

  transition: 0.25s;
}

article:hover {
  transform: translateY(-7px);

  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.12);
}

.pic {
  min-height: 230px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 80px;

  background:
    linear-gradient(135deg, #fff1b8, #ffe083);
}

.body {
  padding: 25px;
}

.body label {
  display: inline-block;

  padding: 5px 10px;

  border-radius: 20px;

  background: #fff0d8;

  color: #d85d00;

  font-size: 11px;

  font-weight: bold;
}

.body h3 {
  margin-top: 10px;

  font-size: 23px;
}

.body p {
  color: #777;

  margin: 8px 0 15px;
}

.body button,
button {
  border: none;

  padding: 12px 20px;

  border-radius: 25px;

  background: #e86b00;

  color: white;

  font-size: 15px;

  font-weight: bold;

  cursor: pointer;

  transition: 0.2s;
}

.body button:hover,
button:hover {
  background: #c95400;

  transform: translateY(-2px);
}

.more-products {
  margin-top: 25px;
}

/* =========================
   WHY US
========================= */

.why {
  text-align: center;

  background: #fff3dc;
}

.features {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;

  margin-top: 30px;
}

.features div {
  padding: 28px 15px;

  background: white;

  border-radius: 18px;

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.06);

  font-size: 30px;

  display: flex;
  flex-direction: column;
  gap: 8px;
}

.features b {
  font-size: 16px;
  color: #333;
}

/* =========================
   ORDER SECTION
========================= */

.order {
  display: grid;

  grid-template-columns: 0.8fr 1.2fr;

  gap: 60px;

  align-items: start;

  background: #fff;
}

.order > div:first-child {
  position: sticky;
  top: 110px;
}

.order form {
  padding: 30px;

  background: #fffaf2;

  border: 1px solid #eee;

  border-radius: 25px;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.08);
}

.orderid {
  margin-bottom: 15px;

  padding: 10px 14px;

  background: #e8f5e9;

  color: #237a32;

  border-radius: 10px;

  font-weight: bold;
}

#cart {
  padding: 15px;

  margin-bottom: 18px;

  background: white;

  border-radius: 12px;

  border: 1px solid #eee;
}

.cart-item {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 10px 0;

  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item button {
  padding: 5px 8px;

  margin-left: 10px;

  background: transparent;

  color: #d33;

  font-size: 13px;
}

.order input,
.order textarea {
  width: 100%;

  padding: 14px;

  margin-bottom: 14px;

  border: 1px solid #ddd;

  border-radius: 12px;

  outline: none;

  font-size: 15px;

  background: white;

  transition: 0.2s;
}

.order input:focus,
.order textarea:focus {
  border-color: #e86b00;

  box-shadow:
    0 0 0 3px rgba(232, 107, 0, 0.1);
}

.order textarea {
  min-height: 110px;

  resize: vertical;
}

.row {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 12px;
}

.total {
  padding: 18px;

  margin: 8px 0 15px;

  border-radius: 13px;

  background: #fff0d8;

  color: #7a4000;

  font-size: 18px;
}

.total b {
  float: right;

  color: #e86b00;

  font-size: 22px;
}

.full {
  width: 100%;

  padding: 15px;

  border-radius: 13px;

  background: #25d366;

  font-size: 16px;

  box-shadow:
    0 8px 20px rgba(37, 211, 102, 0.2);
}

.full:hover {
  background: #1aaa50;
}

/* =========================
   FOOTER
========================= */

footer {
  padding: 45px 7%;

  text-align: center;

  background: #171717;

  color: white;
}

footer b {
  font-size: 22px;

  color: #ffb52e;
}

footer p {
  color: #bbb;

  margin: 6px 0;
}

footer a {
  color: #25d366;

  text-decoration: none;

  font-weight: bold;
}

footer small {
  display: block;

  margin-top: 20px;

  color: #888;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 800px) {

  header {
    padding: 13px 5%;

    flex-wrap: wrap;

    gap: 12px;
  }

  header b {
    font-size: 17px;
  }

  nav {
    order: 3;

    width: 100%;

    justify-content: center;

    gap: 18px;
  }

  nav a {
    font-size: 14px;
  }

  .cart {
    font-size: 13px;

    padding: 7px 11px;
  }

  .hero {
    min-height: auto;

    padding: 55px 6%;

    grid-template-columns: 1fr;

    text-align: center;
  }

  .hero p {
    font-size: 16px;
  }

  .heroart {
    min-height: 260px;

    font-size: 75px;
  }

  .heroart b {
    font-size: 24px;
  }

  #products,
  .why,
  .order {
    padding: 55px 6%;
  }

  #products h2,
  .why h2,
  .order h2 {
    font-size: 30px;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .features {
    grid-template-columns:
      repeat(2, 1fr);
  }

  .order {
    grid-template-columns: 1fr;

    gap: 30px;
  }

  .order > div:first-child {
    position: static;
  }

}


/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 480px) {

  .hero h1 {
    font-size: 36px;
  }

  .features {
    grid-template-columns: 1fr 1fr;

    gap: 12px;
  }

  .features div {
    padding: 20px 8px;

    font-size: 24px;
  }

  .features b {
    font-size: 13px;
  }

  .body {
    padding: 20px;
  }

  .body h3 {
    font-size: 20px;
  }

  .row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .order form {
    padding: 20px;
  }

}
