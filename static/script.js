function addProduct() {
  const div = document.createElement("div");
  div.className = "product-row";

  div.innerHTML = `
    <label>Product Name</label>
    <input placeholder="Enter product name" class="name">

    <label>Quantity</label>
    <input placeholder="Enter quantity" class="qty" type="number">

    <label>Price</label>
    <input placeholder="Enter price" class="price" type="number" step="0.01">

    <button class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
  `;

  document.getElementById("products").appendChild(div);
}

async function submitPO() {
  try {
    const vendor = document.getElementById("vendor").value.trim();

    const names = document.querySelectorAll(".name");
    const qtys = document.querySelectorAll(".qty");
    const prices = document.querySelectorAll(".price");

    let products = [];

    for (let i = 0; i < names.length; i++) {
      const name = names[i].value.trim();
      const quantity = parseInt(qtys[i].value);
      const price = parseFloat(prices[i].value);

      if (!name || isNaN(quantity) || isNaN(price)) {
        alert("Please fill all product fields correctly.");
        return;
      }

      products.push({
        name: name,
        quantity: quantity,
        price: price
      });
    }

    if (!vendor) {
      alert("Please enter vendor name.");
      return;
    }

    if (products.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    const res = await fetch("/create-po", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vendor_name: vendor,
        products: products
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      alert("Server error: " + errorText);
      return;
    }

    const data = await res.json();
    alert("PO Created Successfully. Total with tax: " + data.total);

    document.getElementById("vendor").value = "";
    document.getElementById("products").innerHTML = "";

    loadPOs();
  } catch (error) {
    alert("Error: " + error.message);
  }
}

async function loadPOs() {
  try {
    const res = await fetch("/purchase-orders");
    const data = await res.json();

    const tableBody = document.getElementById("poTableBody");

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="3">No purchase orders yet.</td></tr>`;
      return;
    }

    tableBody.innerHTML = data.map(po => `
  <tr>
    <td>${po.id}</td>
    <td>${po.vendor_name}</td>
    <td>${po.total_amount}</td>
    <td>
      <button onclick="deletePO(${po.id})">Delete</button>
    </td>
  </tr>
`).join("");
  } catch (error) {
    console.error("Error loading purchase orders:", error);
  }
}

async function deletePO(id) {
  const confirmDelete = confirm("Are you sure you want to delete this PO?");
  
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/purchase-orders/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    alert("Deleted successfully");

    // reload table
    loadPOs();

  } catch (error) {
    alert("Error: " + error.message);
  }
}

window.onload = loadPOs;