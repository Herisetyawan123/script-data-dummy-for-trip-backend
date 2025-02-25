const readline = require('readline');
// const fs = require('fs');
const axios = require('axios');
const https = require('https');
// constant for url
const API_URL = "https://trip-backend-v2.devs";

// API ENDPOINT
const epAuth = "/api/driver/auth/registration";


// Membuat interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi untuk menghasilkan nama acak
function getRandomName() {
  const names = [
    'John',
    'Jane',
    'Alice',
    'Bob',
    'Charlie',
    'Diana',
    'Ethan',
    'Fiona',
    'George',
    'Hannah',
  ];
  return names[Math.floor(Math.random() * names.length)];
}

// Fungsi untuk menghasilkan nomor telepon acak
function getRandomPhone() {
  let phone = '+658';
  for (let i = 0; i < 9; i++) {
    phone += Math.floor(Math.random() * 10);
  }
  return phone;
}

// Fungsi untuk menghasilkan data pengguna acak
function generateUserData() {
  return {
    last_name: getRandomName(),
    first_name: getRandomName(),
    phone: getRandomPhone(),
    password: '11111111', // Password statis,
    service: "['ride_request']",
    date_of_birth: "2002-02-02"
  };
}

// Meminta input dari pengguna
rl.question(
  'Masukkan jumlah entri data pengguna yang ingin dihasilkan: ',
  async (jumlah) => {
    const jumlahEntri = parseInt(jumlah, 10);

    if (isNaN(jumlahEntri) || jumlahEntri <= 0) {
      console.log('Jumlah entri harus berupa angka positif.');
      rl.close();
      return;
    }

    const userDataEntries = [];
    for (let i = 0; i < jumlahEntri; i++) {
      userDataEntries.push(generateUserData());
    }


    const url_destination = API_URL + epAuth;

    userDataEntries.forEach(async (userData) => {

      try {
        // Agent untuk melewati validasi SSL
        const agent = new https.Agent({
          rejectUnauthorized: false, // Lewati validasi SSL
        });
        // console.log(agent)
        const response = await axios.post(url_destination, userData, {
          httpsAgent: agent,
        });
        console.log(response)

        console.log('Data pengguna berhasil dikirim:', response.data);
      } catch (error) {
        // console.log(userData);
        console.log(error.response.data)
        console.error('Terjadi kesalahan saat mengirim data:', error.message);
      }
    });

    // Menyimpan data ke file JSON
    // const jsonData = JSON.stringify(userDataEntries, null, 2);
    // fs.writeFile('userData.json', jsonData, (err) => {
    //   if (err) {
    //     console.error('Terjadi kesalahan saat menulis file:', err);
    //   } else {
    //     console.log('Data pengguna berhasil disimpan ke userData.json');
    //   }
    // });
    //
    // Menutup interface readline
    rl.close();
  }
);
