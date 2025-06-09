let globalCipherBase64 = '';
let globalPlain = '';
let globalKey = 0;

function getKeyHexFromInt(k) {
  let bytes = [];
  for (let i = 0; i < 8; i++) {
    bytes.push((k + i) % 256);
  }
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

function encrypt() {
  const plain = document.getElementById('plaintext').value.trim();
  const keyNum = parseInt(document.getElementById('key').value);

  if (!plain) {
    alert('Masukkan plaintext');
    return;
  }
  if (isNaN(keyNum) || keyNum < 0 || keyNum > 255) {
    alert('Kunci harus antara 0 sampai 255');
    return;
  }

  const keyHex = getKeyHexFromInt(keyNum);
  const key = CryptoJS.enc.Hex.parse(keyHex);

  const encrypted = CryptoJS.DES.encrypt(plain, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  globalCipherBase64 = encrypted.toString();
  globalPlain = plain;
  globalKey = keyNum;

  document.getElementById('encrypted').innerText = globalCipherBase64;
  document.getElementById('log').innerText = '';
}

async function bruteForce() {
  if (!globalCipherBase64) {
    alert('Lakukan enkripsi dulu');
    return;
  }

  const logEl = document.getElementById('log');
  logEl.textContent = 'Memulai brute force...\n';

  const startTime = performance.now();

  for (let k = 0; k <= 255; k++) {
    const keyHex = getKeyHexFromInt(k);
    const key = CryptoJS.enc.Hex.parse(keyHex);
    let decryptedText = '';

    try {
      const decrypted = CryptoJS.DES.decrypt(globalCipherBase64, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      decryptedText = '';
    }

    if (decryptedText === globalPlain) {
      logEl.textContent += `Mencoba kunci ${k}: ${decryptedText}\n`;
      logEl.textContent += `\n✅ Kunci ditemukan: ${k}`;
      break;
    } else {
      logEl.textContent += `Mencoba kunci ${k}: <hasil tidak cocok>\n`;
    }

    await new Promise(r => setTimeout(r, 5)); 
  }

  const endTime = performance.now();
  const duration = (endTime - startTime).toFixed(2);
  logEl.textContent += `\n🕒 Waktu eksekusi: ${duration} ms`;
}