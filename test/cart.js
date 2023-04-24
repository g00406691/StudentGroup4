// Create an array to store the items in the shopping cart
var cartItems = [];

// Create a function to add an item to the cart
function addToCart(itemName, itemPrice) {
  // Check if the item is already in the cart
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === itemName) {
      cartItems[i].quantity++;
      return;
    }
  }

  // If the item is not in the cart, add it
  cartItems.push({
    name: itemName,
    price: itemPrice,
    quantity: 1
  });
}

// Create a function to remove an item from the cart
function removeFromCart(itemName) {
  // Find the item in the cart and remove it
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === itemName) {
      cartItems.splice(i, 1);
      return;
    }
  }
}

// Create a function to calculate the total price of the items in the cart
function calculateTotalPrice() {
  var totalPrice = 0;
  for (var i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price * cartItems[i].quantity;
  }
  return totalPrice;
}

// Create a function to display the cart contents
function displayCart() {
  // Find the cart element
  var cartElement = document.getElementById('cart');

  // Clear the cart element
  cartElement.innerHTML = '';

  // Create a table to display the cart items
  var table = document.createElement('table');
  table.classList.add('table');

  // Add a header row to the table
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

  // Add a row for each item in the cart
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

  // Add a row for the total price
  var totalPriceRow = document.createElement('tr');
  var totalPriceLabelCell = document.createElement('td');
  totalPriceLabelCell.innerHTML = 'Total Price:';
  totalPriceRow.appendChild(totalPriceLabelCell);
  var totalPriceCell = document.createElement('td');
  totalPriceCell.setAttribute('colspan', '2');
  totalPriceCell.innerHTML = '$' + calculateTotalPrice().toFixed(2);
  totalPriceRow.appendChild(totalPriceCell);
  table.appendChild(totalPriceRow);

  // Add the table to the cart element
  cartElement.appendChild(table);
}

// Create a function to place the order
function placeOrder() {
	  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var cardNumber = document.getElementById('cardNumber').value;
  var expirationMonth = document.getElementById('expirationMonth').value;
  var expirationYear = document.getElementById('expirationYear').value;
  var cvv = document.getElementById('cvv').value;
  var cardHolderName = document.getElementById('cardHolderName').value;

  // Validate the login information and card details
  if (email === '' || password === '') {
    alert('Please enter your email and password to login.');
    return;
  }
  if (cardNumber === '' || expirationMonth === '' || expirationYear === '' || cvv === '' || cardHolderName === '') {
    alert('Please enter your card details to place the order.');
    return;
  }

  // Create an object to represent the order
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

  // Send the order to the server
  // This is where you would typically use AJAX to send the order to the server
  // For this example, we'll just display a message with the order details
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

  // Clear the cart and display an empty cart
  cartItems = [];
  displayCart();
}
