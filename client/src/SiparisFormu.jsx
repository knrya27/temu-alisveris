
import React, { useState } from "react";

const SiparisFormu = () => {
  const [formData, setFormData] = useState({
    isim: "",
    adres: "",
    urun: "",
    adet: 1,
    dekont: null,
  });

  const [mesaj, setMesaj] = useState("");

  const fiyat = 100; // Ürün birim fiyatı
  const tutar = formData.adet * fiyat;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "adet" ? parseInt(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      dekont: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const veri = new FormData();
    veri.append("isim", formData.isim);
    veri.append("adres", formData.adres);
    veri.append("urun", formData.urun);
    veri.append("adet", formData.adet);
    veri.append("tutar", tutar);
    if (formData.dekont) {
      veri.append("dekont", formData.dekont);
    }

    try {
      const res = await fetch("https://temu-server.onrender.com/api/order", {
        method: "POST",
        body: veri,
      });

      if (res.ok) {
        setMesaj("✅ Sipariş başarıyla gönderildi!");
        setFormData({ isim: "", adres: "", urun: "", adet: 1, dekont: null });
      } else {
        setMesaj("❌ Sipariş gönderilemedi.");
      }
    } catch (err) {
      console.error(err);
      setMesaj("❌ Sunucuya erişilemedi.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Sipariş Formu</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="isim" value={formData.isim} onChange={handleChange} placeholder="Adınız" className="w-full p-2 border rounded" required />
        <input name="adres" value={formData.adres} onChange={handleChange} placeholder="Adres" className="w-full p-2 border rounded" required />
        <input name="urun" value={formData.urun} onChange={handleChange} placeholder="Ürün" className="w-full p-2 border rounded" required />
        <input type="number" name="adet" value={formData.adet} onChange={handleChange} min="1" className="w-full p-2 border rounded" required />

        <p className="text-sm text-gray-600">
          💳 <strong>IBAN:</strong> TR00 0000 0000 0000 0000 0000 00
        </p>

        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} className="w-full p-2 border rounded" />

        <div className="text-right font-semibold">
          Tutar: <span className="text-green-600">{tutar.toLocaleString()} TL</span>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sipariş Ver
        </button>
      </form>
      {mesaj && <p className="mt-4 text-center">{mesaj}</p>}
    </div>
  );
};

export default SiparisFormu;
