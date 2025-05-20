# 🛍️ La tienda de Marina

This project is a simple web-based online store that allows users to search for products, add them to a shopping cart, and view a summary of their selected items. Products are fetched from the public [FakeStoreAPI](https://fakestoreapi.com/).

## 📁 Project Structure

```
/project-root
│
├── index.html          # Main HTML structure
├── main.css            # Custom CSS styles
├── js/
│   └── main.js         # JavaScript logic for rendering and functionality
└── README.md           # Project documentation
```

## 🚀 Features

- ✅ Display of products from an external API
- 🔍 Product search by name
- 🛒 Add and remove products from the cart
- 💾 Cart persistence using `localStorage`
- 📱 Basic responsive design

## 📦 Installation & Usage

1. **Clone the repository or download the files.**
2. **Open `index.html` in your browser.**  
   No server or additional setup required.

## 🧠 Technologies Used

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **FakeStoreAPI** for product data

## 📌 Code Details

- The `main.js` file:

  - Fetches product data from the API.
  - Dynamically renders product cards.
  - Enables product search via input.
  - Adds/removes items to/from the cart using buttons.
  - Saves the cart to `localStorage` for persistence.

- The `main.css` file provides basic styling and responsive layout between product listing and the cart.

## 🐛 Possible Improvements

- Add item counter in the cart.
- Display total cart price.
- Input validation.
- Error handling on `fetch` (e.g., display message on failure).
- Improve mobile accessibility and user experience.

## 👩‍💻 Author

Developed by Marina Boyano.
