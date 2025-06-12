
import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [siparisler, setSiparisler] = useState([]);

  useEffect(() => {
    fetch("https://temu-server.onrender.com/orders.json")
      .then(res => res.json())
      .then(data => setSiparisler(data.reverse()))
      .catch(err => console.error("Sipariş verileri alınamadı:", err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-6 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">📋 Sipariş Listesi</h2>

      {siparisler.length === 0 ? (
        <p className="text-center">Henüz sipariş yok.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">İsim</th>
              <th className="p-2 border">Ürün</th>
              <th className="p-2 border">Adet</th>
              <th className="p-2 border">Tutar</th>
              <th className="p-2 border">Tarih</th>
              <th className="p-2 border">Dekont</th>
            </tr>
          </thead>
          <tbody>
            {siparisler.map((siparis, i) => (
              <tr key={i} className="text-center">
                <td className="p-2 border">{siparis.isim}</td>
                <td className="p-2 border">{siparis.urun}</td>
                <td className="p-2 border">{siparis.adet}</td>
                <td className="p-2 border">{Number(siparis.tutar).toLocaleString()} TL</td>
                <td className="p-2 border">{new Date(siparis.tarih).toLocaleString()}</td>
                <td className="p-2 border">
                  {siparis.dekont ? (
                    <a
                      href={`https://temu-server.onrender.com/uploads/${siparis.dekont}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Görüntüle
                    </a>
                  ) : (
                    "Yok"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
