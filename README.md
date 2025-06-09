# 🔐 Simulasi Brute Force pada Algoritma DES 8-bit

Proyek ini merupakan **simulasi interaktif berbasis web** yang dirancang untuk **mendemonstrasikan kerentanan algoritma DES (Data Encryption Standard)** apabila digunakan dengan **kunci yang dipersingkat menjadi hanya 8-bit**.

Melalui ini, mahasiswa dapat **melihat secara langsung bagaimana serangan brute force dapat dilakukan terhadap cipher DES**, dan **menemukan kunci enkripsi hanya dengan mencoba seluruh kemungkinan kunci dari 0 hingga 255**.

Simulasi ini dibuat sebagai bagian dari eksperimen keamanan dalam mata kuliah **Kriptografi**, untuk memahami pentingnya panjang kunci dalam sistem enkripsi simetris.

---

## 🎯 Tujuan Eksperimen

> **Eksperimen Keamanan DES dan Brute Force**
> Mahasiswa diminta untuk mensimulasikan serangan brute force sederhana terhadap DES, dengan panjang kunci yang dipersingkat.

Tujuan eksperimen ini adalah:

* Menggambarkan **konsep serangan brute force** dalam kriptografi simetris.
* Memberikan pengalaman langsung kepada mahasiswa untuk memahami **dampak dari penggunaan kunci pendek**.
* Menganalisis **berapa cepat** brute force dapat menembus sistem DES dengan ruang kunci kecil.

---

## 📁 Struktur Proyek
```plaintext
simulasi-bruteforce-des/
│
├── index.html       # Halaman utama aplikasi: input plaintext, kunci, hasil enkripsi & log brute force
├── java.js          # File JavaScript utama: logika enkripsi DES dan proses brute force
├── README.md        # Dokumentasi proyek
 ```

---

## 🚀 Fitur Utama

* ✅ **Enkripsi plaintext** menggunakan algoritma DES dengan **kunci 8-bit (0–255)**.
* ✅ Menampilkan hasil enkripsi dalam **format Base64**.
* ✅ Simulasi **serangan brute force** untuk menemukan kembali kunci yang digunakan.
* ✅ Log proses brute force ditampilkan secara **real-time** di halaman.
* ✅ Aplikasi sepenuhnya berjalan di browser (client-side).
* ✅ UI responsif menggunakan **Bootstrap 5**.

---

## 🖥️ Cara Menjalankan Aplikasi

1. Buka file `index.html` di browser .
2. Masukkan **plaintext** (contoh: `HELLO`) dan angka **kunci (0 – 255)**.
3. Klik tombol **"🔐 Enkripsi"** untuk menghasilkan ciphertext.
4. Klik tombol **"🚀 Mulai Brute Force"** untuk memulai proses pencarian kunci secara otomatis.

---

## 📌 Penjelasan Teknis Berdasarkan Kode

### 🔐 Enkripsi DES

* Enkripsi dilakukan dengan pustaka [CryptoJS](https://cdnjs.com/libraries/crypto-js).
* Algoritma yang digunakan adalah **DES** dalam **ECB mode** dengan **Pkcs7 padding**.
* Fungsi utama enkripsi adalah:

```javascript
const encrypted = CryptoJS.DES.encrypt(plain, key, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
});
```

### 🔑 Fungsi `getKeyHexFromInt(k)`

* Fungsi ini menerima angka `k` (0–255) dan menghasilkan kunci 64-bit (8-byte) berbasis nilai tersebut:

```javascript
function getKeyHexFromInt(k) {
  let bytes = [];
  for (let i = 0; i < 8; i++) {
    bytes.push((k + i) % 256);
  }
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

* Kunci hex ini digunakan dalam fungsi enkripsi maupun dekripsi, menjaga konsistensi format.

### 💥 Fungsi Brute Force

Fungsi `bruteForce()` menjalankan logika berikut:

1. Loop dari `k = 0` hingga `k = 255`.
2. Untuk setiap kunci `k`, hasil kunci hex di-generate.
3. Ciphertext didekripsi menggunakan kunci tersebut.
4. Jika hasil dekripsi sama dengan plaintext asli, maka kunci dianggap ditemukan.

Contoh bagian kodenya:

```javascript
if (decryptedText === globalPlain) {
  logEl.textContent += `\n✅ Kunci ditemukan: ${k}`;
  break;
}
```

* Proses dilakukan dengan delay 5ms agar log tampil bertahap dan bisa dilihat langsung oleh pengguna.

---

## 📸 Tampilan Antarmuka
  ![image](https://github.com/user-attachments/assets/97bd8a42-5f26-4edc-a30b-3a6c4c63f73e)

* Form input untuk plaintext dan kunci
* Tombol untuk enkripsi dan brute force
* Output ciphertext (Base64)
* Log real-time pencarian kunci
* Penjelasan teori singkat tentang:
  * DES
  * Ancaman brute force
  * Pentingnya panjang kunci
* Tag edukatif: `#CyberSecurity #BruteForce #DES`

---

## 🔧 Teknologi yang Digunakan

| Komponen    | Teknologi                                                          |
| ----------- | ------------------------------------------------------------------ |
| UI/Frontend | HTML5, CSS3, JavaScript                                            |
| Styling     | Bootstrap 5                                                        |
| Kriptografi | [CryptoJS DES](https://cdnjs.com/libraries/crypto-js) – ECB, Pkcs7 |

---

## ⚠️ Catatan Keamanan

* **DES dengan kunci 8-bit** seperti pada simulasi ini **sangat tidak aman**.
* membuatnya **mudah dianalisis**.
* Simulasi ini **tidak cocok** untuk penggunaan di dunia nyata — hanya untuk **pembelajaran dan eksperimen**.

> **Catatan:** DES asli memiliki panjang kunci 56-bit. Kami memperpendek menjadi 8-bit agar brute force dapat disimulasikan secara langsung dan cepat sesuai dengan ketentuan soal.

---
## ✅ contoh input output
uji 1
  ![image](https://github.com/user-attachments/assets/48c2e38b-331b-4bd7-b348-068e95f9105d)

uji 2
  ![image](https://github.com/user-attachments/assets/a307f6ed-765e-4281-bd91-eab09ab93594)

uji 3
  ![image](https://github.com/user-attachments/assets/c4d0d197-cd1e-4299-81dc-5934614ddd07)

## ✅ Hasil Uji Coba

* Semua ciphertext yang dihasilkan berhasil ditemukan kembali melalui brute force.
* Proses brute force memakan waktu ± 1–2 detik untuk 256 iterasi.
* Kunci ditemukan dengan tepat jika input plaintext dan ciphertext tidak berubah.
* ketika menginputkan panjang kunci lebih dari 255 maka muncul pemberitahuan dan proses dihentikan.
* Simulasi berhasil menggambarkan secara visual bagaimana **kunci pendek mempercepat brute force attack**.

---

## 🔍 Kesimpulan

* Panjang kunci adalah **faktor penting** dalam kriptografi simetris.
* DES dengan kunci yang dipersingkat sangat mudah dibobol, bahkan tanpa alat khusus.
* Brute force adalah teknik sederhana, tapi **masih sangat relevan** untuk cipher lemah.
* Simulasi ini memberikan **pemahaman praktis** bahwa keamanan kriptografi bukan hanya soal algoritma, tapi juga soal **implementasi dan konfigurasi kunci**.

---

## 📬 Kontributor

**Kelompok 8 – Kriptografi**

| Nama                   | NPM             |
| ---------------------- | ----------------|
| Linia Nur Aini         | G1A023007       |
| Lidya Feronica         | G1A023009       |
| Nadya Alici Putri      | G1A023019       |
| Aulia Dwi Rahmadani    | G1A023043       |
| Ayu Dewanti Suci       | G1A023057       |

---
