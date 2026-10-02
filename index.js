/**
 * TUGAS PERTEMUAN 4: SISTEM MANAJEMEN TRANSPORTASI
 * Konsep: Object-Oriented Programming (OOP) dalam JavaScript
 * 
 * Fitur:
 * 1. Base Class Kendaraan & Subclass (Mobil, Motor, Bus) dengan karakteristik & perilaku unik.
 * 2. Class Pelanggan dengan properti: nama, nomorTelepon, kendaraanDisewa.
 * 3. Metode pencatatan transaksi penyewaan kendaraan.
 * 4. Sistem Manajemen Transportasi yang mengelola armada dan menampilkan pelanggan yang sedang menyewa.
 */

// ==========================================
// 1. BASE CLASS: KENDARAAN (SUPERCLASS)
// ==========================================
class Kendaraan {
  constructor(nomorPlat, merk, model, tarifSewaPerHari) {
    this.nomorPlat = nomorPlat;
    this.merk = merk;
    this.model = model;
    this.tarifSewaPerHari = tarifSewaPerHari;
    this.status = "Tersedia"; // "Tersedia" atau "Disewa"
  }

  // Metode umum untuk menampilkan ringkasan informasi kendaraan
  getDeskripsi() {
    return `${this.merk} ${this.model} [Plat: ${this.nomorPlat}] - Tarif: Rp ${this.tarifSewaPerHari.toLocaleString("id-ID")}/hari (Status: ${this.status})`;
  }

  // Perilaku dasar kendaraan
  klakson() {
    return `Kendaraan ${this.merk} membunyikan klakson.`;
  }

  // Mengubah status kendaraan menjadi Disewa
  setDisewa() {
    this.status = "Disewa";
  }

  // Mengubah status kendaraan menjadi Tersedia
  setTersedia() {
    this.status = "Tersedia";
  }
}

// ==========================================
// 2. SUBCLASSES (INHERITANCE & POLYMORPHISM)
// ==========================================

// Subclass Mobil mewarisi Kendaraan
class Mobil extends Kendaraan {
  constructor(nomorPlat, merk, model, tarifSewaPerHari, tipeMobil, kapasitasPenumpang) {
    super(nomorPlat, merk, model, tarifSewaPerHari);
    this.tipeMobil = tipeMobil; // contoh: SUV, MPV, Sedan
    this.kapasitasPenumpang = kapasitasPenumpang;
  }

  // Polymorphism: Override metode getDeskripsi
  getDeskripsi() {
    return `[Mobil - ${this.tipeMobil}] ${super.getDeskripsi()} | Kapasitas: ${this.kapasitasPenumpang} orang`;
  }

  // Polymorphism: Override klakson
  klakson() {
    return `Mobil ${this.merk}: "Bip bip!"`;
  }

  // Perilaku unik Mobil
  nyalakanAC() {
    return `AC mobil ${this.merk} ${this.model} dinyalakan dengan suhu sejuk.`;
  }
}

// Subclass Motor mewarisi Kendaraan
class Motor extends Kendaraan {
  constructor(nomorPlat, merk, model, tarifSewaPerHari, kapasitasMesinCc) {
    super(nomorPlat, merk, model, tarifSewaPerHari);
    this.kapasitasMesinCc = kapasitasMesinCc; // contoh: 150cc, 250cc
  }

  // Polymorphism: Override metode getDeskripsi
  getDeskripsi() {
    return `[Motor - ${this.kapasitasMesinCc}cc] ${super.getDeskripsi()}`;
  }

  // Polymorphism: Override klakson
  klakson() {
    return `Motor ${this.merk}: "Tin tin!"`;
  }

  // Perilaku unik Motor
  gunakanHelm() {
    return `Pengendara motor ${this.merk} telah mengenakan helm berstandar SNI.`;
  }
}

// Subclass Bus mewarisi Kendaraan
class Bus extends Kendaraan {
  constructor(nomorPlat, merk, model, tarifSewaPerHari, kapasitasKursi) {
    super(nomorPlat, merk, model, tarifSewaPerHari);
    this.kapasitasKursi = kapasitasKursi;
  }

  // Polymorphism: Override metode getDeskripsi
  getDeskripsi() {
    return `[Bus Pariwisata] ${super.getDeskripsi()} | Kapasitas Kursi: ${this.kapasitasKursi} kursi`;
  }

  // Polymorphism: Override klakson
  klakson() {
    return `Bus ${this.merk}: "Telolet telolet!"`;
  }

  // Perilaku unik Bus
  bukaPintuPneumatik() {
    return `Pintu otomatis bus ${this.merk} terbuka untuk penumpang.`;
  }
}

// ==========================================
// 3. CLASS PELANGGAN
// ==========================================
class Pelanggan {
  /**
   * Membuat data pelanggan baru
   * @param {string} nama - Nama lengkap pelanggan
   * @param {string} nomorTelepon - Nomor kontak pelanggan
   */
  constructor(nama, nomorTelepon) {
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = []; // Menyimpan daftar objek kendaraan yang sedang disewa
  }

  /**
   * Metode untuk mencatat transaksi penyewaan kendaraan oleh pelanggan
   * @param {Kendaraan} kendaraan - Objek kendaraan yang ingin disewa
   * @param {number} durasiHari - Jumlah hari sewa
   * @returns {object|null} Detail transaksi jika berhasil
   */
  sewaKendaraan(kendaraan, durasiHari = 1) {
    // Validasi apakah kendaraan sedang tersedia
    if (kendaraan.status !== "Tersedia") {
      console.log(`[GAGAL] Kendaraan ${kendaraan.merk} ${kendaraan.model} (${kendaraan.nomorPlat}) sedang tidak tersedia / sudah disewa.`);
      return null;
    }

    // Ubah status kendaraan menjadi disewa
    kendaraan.setDisewa();

    // Simpan objek kendaraan ke daftar kendaraan yang disewa oleh pelanggan ini
    this.kendaraanDisewa.push(kendaraan);

    // Hitung total biaya sewa
    const totalBiaya = kendaraan.tarifSewaPerHari * durasiHari;

    const dataTransaksi = {
      idTransaksi: `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      tanggal: new Date().toLocaleDateString("id-ID"),
      namaPelanggan: this.nama,
      nomorTelepon: this.nomorTelepon,
      kendaraan: kendaraan,
      durasiHari: durasiHari,
      totalBiaya: totalBiaya
    };

    console.log(`[TRANSAKSI BERHASIL]`);
    console.log(`   Pelanggan       : ${this.nama} (${this.nomorTelepon})`);
    console.log(`   Kendaraan       : ${kendaraan.merk} ${kendaraan.model} [${kendaraan.nomorPlat}]`);
    console.log(`   Durasi Sewa     : ${durasiHari} hari`);
    console.log(`   Total Biaya     : Rp ${totalBiaya.toLocaleString("id-ID")}`);
    console.log(`   Suara Kendaraan : ${kendaraan.klakson()}`);
    console.log("------------------------------------------------------------");

    return dataTransaksi;
  }

  /**
   * Metode untuk mengembalikan kendaraan yang disewa
   * @param {string} nomorPlat 
   */
  kembalikanKendaraan(nomorPlat) {
    const index = this.kendaraanDisewa.findIndex(k => k.nomorPlat === nomorPlat);

    if (index !== -1) {
      const kendaraan = this.kendaraanDisewa[index];
      kendaraan.setTersedia();
      this.kendaraanDisewa.splice(index, 1);
      console.log(`[PENGEMBALIAN] ${this.nama} telah mengembalikan kendaraan ${kendaraan.merk} ${kendaraan.model} [${nomorPlat}].`);
    } else {
      console.log(`[PERINGATAN] Kendaraan dengan plat ${nomorPlat} tidak ditemukan pada daftar sewa ${this.nama}.`);
    }
  }
}

// ==========================================
// 4. CLASS SISTEM MANAJEMEN TRANSPORTASI
// ==========================================
class SistemTransportasi {
  constructor(namaPerusahaan = "TransExpress Rental") {
    this.namaPerusahaan = namaPerusahaan;
    this.daftarKendaraan = [];
    this.daftarPelanggan = [];
    this.riwayatTransaksi = [];
  }

  // Menambahkan kendaraan ke armada sistem
  tambahKendaraan(kendaraan) {
    this.daftarKendaraan.push(kendaraan);
  }

  // Mendaftarkan pelanggan ke sistem
  tambahPelanggan(pelanggan) {
    this.daftarPelanggan.push(pelanggan);
  }

  // Metode untuk mencatat transaksi sewa di tingkat sistem
  catatTransaksi(pelanggan, kendaraan, durasiHari = 1) {
    const transaksi = pelanggan.sewaKendaraan(kendaraan, durasiHari);
    if (transaksi) {
      this.riwayatTransaksi.push(transaksi);
    }
    return transaksi;
  }

  // Menampilkan seluruh armada kendaraan
  tampilkanSemuaKendaraan() {
    console.log(`\n============================================================`);
    console.log(` DAFTAR ARMADA KENDARAAN - ${this.namaPerusahaan.toUpperCase()}`);
    console.log(`============================================================`);
    this.daftarKendaraan.forEach((k, idx) => {
      console.log(`${idx + 1}. ${k.getDeskripsi()}`);
    });
  }

  /**
   * Mengembalikan daftar objek pelanggan yang sedang menyewa kendaraan
   * @returns {Pelanggan[]}
   */
  getPelangganSedangMenyewa() {
    return this.daftarPelanggan.filter(p => p.kendaraanDisewa.length > 0);
  }

  /**
   * Menampilkan daftar pelanggan yang sedang menyewa kendaraan
   * (Sesuai tugas yang diminta)
   */
  tampilkanPelangganSedangMenyewa() {
    console.log(`\n============================================================`);
    console.log(` DAFTAR PELANGGAN YANG SEDANG MENYEWA KENDARAAN`);
    console.log(` Perusahaan: ${this.namaPerusahaan}`);
    console.log(`============================================================`);

    // Filter pelanggan yang memiliki kendaraanDisewa minimal 1
    const pelangganAktif = this.getPelangganSedangMenyewa();

    if (pelangganAktif.length === 0) {
      console.log(`(Saat ini tidak ada pelanggan yang sedang menyewa kendaraan)`);
      console.log(`============================================================\n`);
      return;
    }

    pelangganAktif.forEach((pelanggan, index) => {
      console.log(`\n${index + 1}. Nama Pelanggan : ${pelanggan.nama}`);
      console.log(`   Nomor Telepon  : ${pelanggan.nomorTelepon}`);
      console.log(`   Jumlah Disewa  : ${pelanggan.kendaraanDisewa.length} unit`);
      console.log(`   Rincian Kendaraan:`);

      pelanggan.kendaraanDisewa.forEach((k, kIdx) => {
        console.log(`      [${kIdx + 1}] Plat Nomor : ${k.nomorPlat}`);
        console.log(`          Kendaraan  : ${k.merk} ${k.model}`);
        console.log(`          Tarif/Hari : Rp ${k.tarifSewaPerHari.toLocaleString("id-ID")}`);
        console.log(`          Kategori   : ${k.constructor.name}`);
        console.log(`          Detail     : ${k.getDeskripsi()}`);
      });
      console.log(`   ---------------------------------------------------------`);
    });

    console.log(`============================================================\n`);
  }
}

// ==========================================
// 5. DEMONSTRASI & PENGUJIAN SISTEM
// ==========================================

function jalankanSistem() {
  console.log("=== MEMULAI SISTEM MANAJEMEN TRANSPORTASI ===\n");

  // Inisialisasi Sistem
  const sistem = new SistemTransportasi("Nusantara Fleet Management");

  // 1. Membuat Berbagai Macam Kendaraan (Mobil, Motor, Bus)
  const mobilAvanza = new Mobil("B 1423 KAZ", "Toyota", "Avanza Veloz", 350000, "MPV", 7);
  const mobilInnova = new Mobil("B 8899 DFG", "Toyota", "Innova Zenix", 600000, "MPV", 7);
  const motorNmax   = new Motor("B 3456 PLM", "Yamaha", "NMAX 155", 150000, 155);
  const motorVespa  = new Motor("B 6789 VSP", "Vespa", "Sprint S", 200000, 150);
  const busPariwisata = new Bus("B 7777 BUS", "Mercedes-Benz", "OH 1626 Jetbus", 2500000, 45);

  // Daftarkan kendaraan ke dalam sistem
  sistem.tambahKendaraan(mobilAvanza);
  sistem.tambahKendaraan(mobilInnova);
  sistem.tambahKendaraan(motorNmax);
  sistem.tambahKendaraan(motorVespa);
  sistem.tambahKendaraan(busPariwisata);

  // 2. Membuat Data Pelanggan
  const pelanggan1 = new Pelanggan("Ahmad Fauzi", "0812-3456-7890");
  const pelanggan2 = new Pelanggan("Siti Rahmawati", "0857-1122-3344");
  const pelanggan3 = new Pelanggan("Budi Santoso", "0878-9988-7766");

  // Daftarkan pelanggan ke dalam sistem
  sistem.tambahPelanggan(pelanggan1);
  sistem.tambahPelanggan(pelanggan2);
  sistem.tambahPelanggan(pelanggan3);

  // Tampilkan kondisi awal armada
  sistem.tampilkanSemuaKendaraan();

  console.log("\n================ PROSES PENYEWAAN KENDARAAN ================");
  // 3. Mencatat Transaksi Penyewaan
  // Pelanggan 1 menyewa Avanza selama 3 hari
  sistem.catatTransaksi(pelanggan1, mobilAvanza, 3);

  // Pelanggan 1 menyewa Motor Vespa selama 2 hari
  sistem.catatTransaksi(pelanggan1, motorVespa, 2);

  // Pelanggan 2 menyewa Bus Pariwisata selama 1 hari
  sistem.catatTransaksi(pelanggan2, busPariwisata, 1);

  // Coba menyewa kendaraan yang SUDAH disewa (mobilAvanza oleh pelanggan 3)
  console.log("\n[UJI VALIDASI]: Budi mencoba menyewa mobil Avanza yang sudah disewa:");
  sistem.catatTransaksi(pelanggan3, mobilAvanza, 2);

  // 4. Menampilkan Daftar Pelanggan yang Sedang Menyewa Kendaraan
  sistem.tampilkanPelangganSedangMenyewa();

  // 5. Demonstrasi Pengembalian Kendaraan
  console.log("\n================ PROSES PENGEMBALIAN KENDARAAN ================");
  pelanggan1.kembalikanKendaraan("B 6789 VSP"); // Vespa dikembalikan

  // Menampilkan kembali daftar pelanggan yang sedang menyewa setelah pengembalian
  console.log("\nSetelah Vespa dikembalikan oleh Ahmad Fauzi:");
  sistem.tampilkanPelangganSedangMenyewa();

  return sistem;
}

/**
 * SIMULASI ACAK (RANDOMIZED / DYNAMIC SIMULATION)
 * Fungsi ini menghasilkan transaksi, pelanggan, durasi, dan pengembalian yang acak.
 * Hasilnya akan selalu BERBEDA setiap kali dijalankan.
 */
function jalankanSimulasiAcak() {
  console.log("=== MENJALANKAN SIMULASI DINAMIS & ACAK ===");
  console.log(`Waktu Simulasi: ${new Date().toLocaleTimeString("id-ID")}\n`);

  const sistem = new SistemTransportasi("Nusantara Fleet Management (Live Simulation)");

  // Armada Kendaraan
  const armada = [
    new Mobil("B 1010 ABC", "Toyota", "Avanza Veloz", 350000, "MPV", 7),
    new Mobil("B 2020 DEF", "Honda", "HR-V RS", 500000, "Compact SUV", 5),
    new Mobil("B 3030 GHI", "Toyota", "Innova Zenix", 650000, "MPV", 7),
    new Mobil("B 4040 JKL", "Hyundai", "Ioniq 5 EV", 900000, "Electric SUV", 5),
    new Motor("B 5050 MNO", "Yamaha", "NMAX 155", 150000, 155),
    new Motor("B 6060 PQR", "Honda", "PCX 160", 160000, 160),
    new Motor("B 7070 STU", "Vespa", "Sprint S 150", 220000, 150),
    new Bus("B 8080 VWX", "Mercedes-Benz", "Jetbus 3+ Royal", 2800000, 48),
    new Bus("B 9090 YZA", "Scania", "K410IB Double Decker", 3500000, 52)
  ];

  armada.forEach(k => sistem.tambahKendaraan(k));

  // Daftar Calon Pelanggan
  const poolPelanggan = [
    new Pelanggan("Ahmad Fauzi", "0812-1111-2222"),
    new Pelanggan("Siti Rahmawati", "0857-3333-4444"),
    new Pelanggan("Budi Santoso", "0878-5555-6666"),
    new Pelanggan("Dewi Lestari", "0813-7777-8888"),
    new Pelanggan("Rian Hidayat", "0821-9999-0000"),
    new Pelanggan("Maya Putri", "0852-1234-5678")
  ];

  poolPelanggan.forEach(p => sistem.tambahPelanggan(p));

  // Acak jumlah transaksi antara 3 sampai 6 transaksi
  const jumlahTransaksi = Math.floor(Math.random() * 4) + 3;
  console.log(`Melakukan ${jumlahTransaksi} transaksi penyewaan secara acak...\n`);

  for (let i = 0; i < jumlahTransaksi; i++) {
    const pelangganAcak = poolPelanggan[Math.floor(Math.random() * poolPelanggan.length)];
    const kendaraanAcak = armada[Math.floor(Math.random() * armada.length)];
    const durasiAcak = Math.floor(Math.random() * 5) + 1; // 1 s/d 5 hari

    console.log(`[Percobaan Sewa #${i + 1}] ${pelangganAcak.nama} mencoba menyewa ${kendaraanAcak.merk} ${kendaraanAcak.model}...`);
    sistem.catatTransaksi(pelangganAcak, kendaraanAcak, durasiAcak);
  }

  // Tampilkan daftar pelanggan yang sedang menyewa setelah transaksi
  sistem.tampilkanPelangganSedangMenyewa();

  // Pengembalian Acak (jika ada yang sedang menyewa)
  const pelangganMenyewa = poolPelanggan.filter(p => p.kendaraanDisewa.length > 0);
  if (pelangganMenyewa.length > 0) {
    const pReturn = pelangganMenyewa[Math.floor(Math.random() * pelangganMenyewa.length)];
    const kReturn = pReturn.kendaraanDisewa[0];
    console.log(`\n================ SIMULASI PENGEMBALIAN ACAK ================`);
    pReturn.kembalikanKendaraan(kReturn.nomorPlat);
    console.log(`Status setelah pengembalian acak:`);
    sistem.tampilkanPelangganSedangMenyewa();
  }

  if (typeof window !== "undefined") {
    window.sistemAktif = sistem;
  }

  return sistem;
}

// Jalankan demonstrasi standar secara default dan simpan instance sistem aktif
const sistemAktif = jalankanSistem();
if (typeof window !== "undefined") {
  window.sistemAktif = sistemAktif;
}

// Export untuk keperluan modular / testing jika diperlukan
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Kendaraan,
    Mobil,
    Motor,
    Bus,
    Pelanggan,
    SistemTransportasi,
    jalankanSistem,
    jalankanSimulasiAcak
  };
}

