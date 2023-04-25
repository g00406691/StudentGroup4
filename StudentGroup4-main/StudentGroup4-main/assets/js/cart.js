
var cartItems = [];


function addToCart(itemName, itemPrice) {

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === itemName) {
      cartItems[i].quantity++;
      return;
    }
  }

 
  cartItems.push({
    name: itemName,
    price: itemPrice,
    quantity: 1
  });
}


function removeFromCart(itemName) {
  
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === itemName) {
      cartItems.splice(i, 1);
      return;
    }
  }
}

function calculateTotalPrice() {
  var totalPrice = 0;
  for (var i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price * cartItems[i].quantity;
  }
  return totalPrice;
}


function displayCart() {
  var cartElement = document.getElementById('cart');

  
  cartElement.innerHTML = '';

  var table = document.createElement('table');
  table.classList.add('table');

  var headerRow = document.createElement('tr');
  var itemNameHeader = document.createElement('th');
  itemNameHeader.innerHTML = 'Item Name';
  headerRow.appendChild(itemNameHeader);
  var itemQuantityHeader = document.createElement('th');
  itemQuantityHeader.innerHTML = 'Quantity';
  headerRow.appendChild(itemQuantityHeader);
  var itemPriceHeader = document.createElement('th');
  itemPriceHeader.innerHTML = 'Price';
  headerRow.appendChild(itemPriceHeader);
  table.appendChild(headerRow);

  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var row = document.createElement('tr');
    var itemNameCell = document.createElement('td');
    itemNameCell.innerHTML = item.name;
    row.appendChild(itemNameCell);
    var itemQuantityCell = document.createElement('td');
    itemQuantityCell.innerHTML = item.quantity;
    row.appendChild(itemQuantityCell);
    var itemPriceCell = document.createElement('td');
    itemPriceCell.innerHTML = '$' + item.price.toFixed(2);
    row.appendChild(itemPriceCell);
    table.appendChild(row);
  }

  var totalPriceRow = document.createElement('tr');
  var totalPriceLabelCell = document.createElement('td');
  totalPriceLabelCell.innerHTML = 'Total Price:';
  totalPriceRow.appendChild(totalPriceLabelCell);
  var totalPriceCell = document.createElement('td');
  totalPriceCell.setAttribute('colspan', '2');
  totalPriceCell.innerHTML = '$' + calculateTotalPrice().toFixed(2);
  totalPriceRow.appendChild(totalPriceCell);
  table.appendChild(totalPriceRow);

  cartElement.appendChild(table);
}

function placeOrder() {
	  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var cardNumber = document.getElementById('cardNumber').value;
  var expirationMonth = document.getElementById('expirationMonth').value;
  var expirationYear = document.getElementById('expirationYear').value;
  var cvv = document.getElementById('cvv').value;
  var cardHolderName = document.getElementById('cardHolderName').value;

  if (email === '' || password === '') {
    alert('Please enter your email and password to login.');
    return;
  }
  if (cardNumber === '' || expirationMonth === '' || expirationYear === '' || cvv === '' || cardHolderName === '') {
    alert('Please enter your card details to place the order.');
    return;
  }

  var order = {
    email: email,
    cartItems: cartItems,
    totalPrice: calculateTotalPrice(),
    cardNumber: cardNumber,
    expirationMonth: expirationMonth,
    expirationYear: expirationYear,
    cvv: cvv,
    cardHolderName: cardHolderName
  };

  var message = 'Thank you for your order!\n\n' +
    'Email: ' + order.email + '\n\n' +
    'Items:\n';
  for (var i = 0; i < order.cartItems.length; i++) {
    var item = order.cartItems[i];
    message += item.name + ' (x' + item.quantity + ') - $' + item.price.toFixed(2) + '\n';
  }
  message += '\nTotal Price: $' + order.totalPrice.toFixed(2) + '\n\n' +
    'Card Number: ' + order.cardNumber + '\n' +
    'Expiration Date: ' + order.expirationMonth + '/' + order.expirationYear + '\n' +
    'CVV: ' + order.cvv + '\n' +
    'Card Holder Name: ' + order.cardHolderName + '\n';
  alert(message);

  cartItems = [];
  displayCart();
}
