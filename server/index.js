
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sipariş gönderme endpoint'i
app.post("/api/order", (req, res) => {
  const order = req.body;

  const ordersFilePath = path.join(__dirname, "orders.json");

  fs.readFile(ordersFilePath, "utf8", (err, data) => {
    let orders = [];
    if (!err && data) {
      try {
        orders = JSON.parse(data);
      } catch (e) {
        console.error("JSON parse hatası:", e);
      }
    }

    orders.push(order);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        console.error("Yazma hatası:", err);
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    });
  });
});

app.get("/", (req, res) => {
  res.send("Temu Backend API çalışıyor!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
