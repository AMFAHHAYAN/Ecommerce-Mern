export const generateOrderTemplate = ({ customerName, orderNumber, products, total }) => {
  if (!Array.isArray(products)) {
    products = [];
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f7;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 700px;
          margin: auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          background-color: #4CAF50;
          color: #ffffff;
          padding: 30px;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .order-details {
          margin: 20px 0;
          font-size: 16px;
          line-height: 1.6;
        }
        .order-summary {
          margin: 20px 0;
          padding: 25px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .order-summary h2 {
          margin-top: 0;
          font-size: 22px;
          color: #333333;
        }
        .product-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .product-table th, .product-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #dddddd;
        }
        .product-table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .product-table td {
          color: #555555;
        }
        .product-item:last-child {
          border-bottom: none;
        }
        .total {
          text-align: right;
          font-size: 18px;
          font-weight: bold;
          margin-top: 15px;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #777777;
          margin-top: 25px;
        }
        .btn {
          display: inline-block;
          padding: 12px 25px;
          background-color: #4CAF50;
          color: #ffffff;
          border-radius: 5px;
          text-decoration: none;
          margin-top: 30px;
          font-weight: bold;
        }
        .btn:hover {
          background-color: #45a049;
        }
        .highlight {
          color: #4CAF50;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Order, ${customerName}!</h1>
        </div>
        <p>Hello ${customerName},</p>
        <p>We are excited to let you know that we have received your order. Your order details are below. If you have any questions, feel free to reach out to us!</p>

        <div class="order-summary">
          <h2>Order Summary</h2>
          <p><strong>Order Number:</strong> ${orderNumber}</p>

          <!-- Product Table -->
          ${products.length > 0 ? `
            <table class="product-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(product => `
                  <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>₹${product.price}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : `<p>No products available in the order.</p>`}

          <div class="total">
            <strong>Total:</strong> ₹${total}
          </div>
        </div>

        <p class="footer">
          If you need help with your order, please email us at <span class="highlight">demo@gmail.com</span>. Thank you for shopping with us!
        </p>

        <a href="http://www.google.com" class="btn">Visit Our Store</a>
      </div>
    </body>
    </html>
  `;
};
