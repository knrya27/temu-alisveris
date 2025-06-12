
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS ve JSON parser
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// uploads klasörü yoksa oluştur
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Dosya yükleme ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

// Sipariş alma endpoint
app.post("/api/order", upload.single("dekont"), (req, res) => {
  const { isim, adres, urun, adet, tutar } = req.body;
  const dekont = req.file ? req.file.filename : null;

  const yeniSiparis = { isim, adres, urun, adet, tutar, dekont, tarih: new Date().toISOString() };

  const ordersFilePath = path.join(__dirname, "orders.json");

  let orders = [];
  if (fs.existsSync(ordersFilePath)) {
    try {
      orders = JSON.parse(fs.readFileSync(ordersFilePath, "utf8"));
    } catch (e) {
      console.error("Sipariş okuma hatası:", e);
    }
  }

  orders.push(yeniSiparis);

  fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
    if (err) {
      console.error("Sipariş kaydetme hatası:", err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

app.get("/", (req, res) => {
  res.send("✅ Temu Backend Çalışıyor");
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
