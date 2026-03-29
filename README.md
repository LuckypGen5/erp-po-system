## Screenshots

Home Page - ![alt text](<screenshots/main page.png>)

Form  - ![alt text](<screenshots/after adding product.png>)

Table - ![alt text](<screenshots/table view.png>)



# ERP Purchase Order System

## Overview

This project is a simple ERP (Enterprise Resource Planning) module for managing Purchase Orders. It allows users to create purchase orders by adding multiple products, automatically calculates the total amount including tax, and stores the data in a database.

---

## Features

* Create Purchase Orders
* Add multiple products dynamically
* Automatic total calculation with 5% tax
* View all purchase orders in a table
* Clean and simple user interface

---

## Tech Stack

* **Backend:** FastAPI (Python)
* **Database:** SQLite
* **Frontend:** HTML, CSS, JavaScript

---

## How to Run the Project

### Step 1: Clone or Download the Project

```bash
git clone <your-repo-link>
cd erp-po-system/backend
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Run Backend Server

```bash
python -m uvicorn main:app --reload
```

### Step 4: Open in Browser

```text
http://127.0.0.1:8000
```

---

## Project Structure

```text
erp-po-system/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── static/
│       ├── index.html
│       ├── style.css
│       └── script.js
│
└── README.md
```

---

## How It Works

1. User enters vendor name
2. Adds one or more products
3. Each product includes:

   * Name
   * Quantity
   * Price
4. System calculates:

   * Total = sum of (quantity × price)
   * Tax = 5%
   * Final Total = Total + Tax
5. Data is stored in database
6. All purchase orders are displayed in table

---

## Notes

* Tax is fixed at **5%**
* Data is stored locally using SQLite
* Designed to be simple and easy to understand
* Focused on functionality rather than over-complex UI

---

## Future Improvements

* Add authentication (login system)
* Add delete/update purchase order
* Add date & filtering
* Deploy online (Render / Railway)

---

## Author

Lucky Patil
