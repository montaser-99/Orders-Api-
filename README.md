# 🛒 Orders API Project

This is my first back-end project using Node.js and MongoDB. It includes basic authentication and CRUD operations for users, categories, products, and orders. It also features image upload and email notifications.

---

## ⚙️ Technologies Used

- Node.js + Express
- MongoDB + Mongoose
- Express-session (for authentication)
- Multer (for image upload)
- Nodemailer (for email notifications)
- Postman (for API testing)

---

## 📁 Project Structure

├── Models/
│ ├── User.model.js
│ ├── Product.model.js
│ ├── Category.model.js
│ └── Order.model.js
├── Controllers/
│ ├── userController.js
│ ├── productController.js
│ ├── categoryController.js
│ └── orderController.js
├── Middlewares/
│ ├── auth.js
│ ├── email.js
│ ├── imageUpload.js
│ └── orderemail.js
├── Services/
│ └── validation.js
├── Routes/
├── Public/
├── Upload/images/
├── Utils/
│ └── apiError.js (optional)
├── .env
├── server.js
└── README.md


---

## ✅ Features

### 👤 User
- Register
- Login
- Change password
- Send reset code to email

### 🗂️ Category
- Create category
- Delete category

### 📦 Product
- Create product (linked to category)
- Get all products

### 🧾 Order
- Create order with multiple products
- Get all orders (Admin)
- Get order by ID
- Delete order
- Update order (status or full update)
- Send email notification on creation/update

---

## 🧪 Postman Collection

You can test all endpoints using Postman. Here's how:

1. Open Postman
2. Import the collection:
   - If you exported your own `.json` file: click *Import* → select the file
   - If you're using the public link: just paste the shared link and import

---

## 📌 Notes

- All endpoints using sessions for user authentication
- Images are uploaded using Multer to `/upload/images`
- Order update automatically recalculates the total price
- Nodemailer sends email when an order is created or updated

---

## 🙋‍♂️ Author

**Mahmoud Sheref Montaser**  
[GitHub Profile](https://github.com/montaser-99)

