# Tugas Pertemuan 4: Sistem Manajemen Transportasi (OOP JavaScript)

Repositori ini berisi implementasi Sistem Manajemen Transportasi menggunakan konsep Object-Oriented Programming (OOP) dalam JavaScript modern (ES6+).

---

## Deskripsi Tugas & Spesifikasi

1. Class Pelanggan:
   - Memiliki properti: nama, nomorTelepon, dan kendaraanDisewa.
2. Pencatatan Transaksi:
   - Metode sewaKendaraan(kendaraan, durasiHari) untuk mencatat transaksi penyewaan kendaraan oleh pelanggan.
   - Melakukan validasi ketersediaan unit dan pembaruan status unit.
3. Daftar Pelanggan yang Menyewa:
   - Sistem memiliki kemampuan menampilkan seluruh pelanggan yang saat ini aktif menyewa kendaraan beserta rincian kendaraan yang disewa.
4. Keanekaragaman Kendaraan (OOP Pillars: Inheritance & Polymorphism):
   - Base class Kendaraan dengan properti umum (nomorPlat, merk, model, tarifSewaPerHari, status).
   - Turunan (Mobil, Motor, Bus) dengan karakteristik spesifik serta polymorphism pada perilaku klakson() dan metode deskripsi.

---

## Struktur Kelas OOP

```text
                +---------------------------------+
                |            Kendaraan            |
                +---------------------------------+
                | - nomorPlat                     |
                | - merk                          |
                | - model                         |
                | - tarifSewaPerHari              |
                | - status ("Tersedia" / "Disewa")|
                +---------------------------------+
                | + getDeskripsi()                |
                | + klakson()                     |
                | + setDisewa()                   |
                | + setTersedia()                 |
                +----------------+----------------+
                                 | extends
         +-----------------------+-----------------------+
         |                       |                       |
+--------+--------+     +--------+--------+     +--------+--------+
|      Mobil      |     |      Motor      |     |       Bus       |
+-----------------+     +-----------------+     +-----------------+
| + tipeMobil     |     | + kapasitasCc   |     | + kapasitasKursi|
| + kapasitas     |     | + gunakanHelm() |     | + bukaPintu()   |
| + nyalakanAC()  |     | + klakson()     |     | + klakson()     |
| + klakson()     |     +-----------------+     +-----------------+
+-----------------+

+---------------------------------------+       +--------------------------------------+
|               Pelanggan               |       |          SistemTransportasi          |
+---------------------------------------+       +--------------------------------------+
| - nama                                |       | - namaPerusahaan                     |
| - nomorTelepon                        |       | - daftarKendaraan                    |
| - kendaraanDisewa: Kendaraan[]        |<------| - daftarPelanggan                    |
+---------------------------------------+       | - riwayatTransaksi                   |
| + sewaKendaraan(kendaraan, durasiHari)|       +--------------------------------------+
| + kembalikanKendaraan(nomorPlat)      |       | + tambahKendaraan(kendaraan)         |
|                                       |       | + tambahPelanggan(pelanggan)         |
|                                       |       | + catatTransaksi(...)                |
|                                       |       | + getPelangganSedangMenyewa()        |
|                                       |       | + tampilkanPelangganSedangMenyewa()  |
|                                       |       | + tampilkanSemuaKendaraan()          |
+---------------------------------------+       +--------------------------------------+
```

---

## Mode Simulasi & Cara Menjalankan

Tersedia dua mode simulasi:
1. Skenario Standar / Deterministik (jalankanSistem()):
   - Menjalankan urutan uji coba terstruktur (Ahmad Fauzi menyewa Avanza & Vespa, Siti menyewa Bus, Budi mencoba menyewa mobil yang sudah dipakai lalu gagal, dan Ahmad mengembalikan Vespa).
   - Berguna untuk memastikan seluruh poin penilaian tugas terbukti bekerja dengan pasti dan dapat direplikasi secara konsisten.
2. Simulasi Dinamis & Acak (jalankanSimulasiAcak()):
   - Mengacak pelanggan, pilihan unit dari armada, durasi sewa, serta pengembalian acak.
   - Setiap kali dijalankan, hasilnya selalu berbeda dan dinamis menyerupai operasional rental kendaraan secara nyata.

### Cara 1: Menggunakan Web Browser (Dashboard UI Berbasis Tabel)
1. Buka file index.html di peramban web (Google Chrome, Microsoft Edge, Mozilla Firefox, dll.).
2. Data langsung tersaji rapi dalam bentuk:
   - Kartu Metrik / Statistik: Total armada, unit tersedia, unit disewa, pelanggan aktif.
   - Tabel Pelanggan Sedang Menyewa: Dilengkapi rincian unit, tarif, dan tombol "Kembalikan".
   - Tabel Seluruh Armada: Menampilkan kategori, spesifikasi unik, tarif, suara klakson (polymorphism), dan badge status.
   - Tabel Riwayat Transaksi: Menampilkan catatan transaksi penyewaan lengkap.
   - Formulir Sewa Manual: Memungkinkan Anda memilih pelanggan dan kendaraan secara langsung.

### Cara 2: Menggunakan Node.js (Console Mode)
Jika di sistem sudah terpasang Node.js:
```bash
node index.js
```

---

## Contoh Potongan Kode Implementasi

### 1. Class Pelanggan
```javascript
class Pelanggan {
  constructor(nama, nomorTelepon) {
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = []; // Menampung kendaraan yang sedang disewa
  }

  sewaKendaraan(kendaraan, durasiHari = 1) {
    if (kendaraan.status !== "Tersedia") {
      console.log(`[GAGAL] Kendaraan ${kendaraan.merk} sedang tidak tersedia.`);
      return null;
    }

    kendaraan.setDisewa();
    this.kendaraanDisewa.push(kendaraan);

    const totalBiaya = kendaraan.tarifSewaPerHari * durasiHari;
    return {
      tanggal: new Date().toLocaleDateString("id-ID"),
      namaPelanggan: this.nama,
      nomorTelepon: this.nomorTelepon,
      kendaraan,
      durasiHari,
      totalBiaya
    };
  }

  kembalikanKendaraan(nomorPlat) {
    const index = this.kendaraanDisewa.findIndex(k => k.nomorPlat === nomorPlat);
    if (index !== -1) {
      this.kendaraanDisewa[index].setTersedia();
      this.kendaraanDisewa.splice(index, 1);
    }
  }
}
```

### 2. Metode Menampilkan Pelanggan yang Sedang Menyewa di SistemTransportasi
```javascript
tampilkanPelangganSedangMenyewa() {
  const pelangganAktif = this.daftarPelanggan.filter(p => p.kendaraanDisewa.length > 0);

  if (pelangganAktif.length === 0) {
    console.log("Saat ini tidak ada pelanggan yang sedang menyewa kendaraan.");
    return;
  }

  pelangganAktif.forEach((pelanggan, index) => {
    console.log(`${index + 1}. ${pelanggan.nama} (${pelanggan.nomorTelepon})`);
    pelanggan.kendaraanDisewa.forEach(k => {
      console.log(`   - [${k.nomorPlat}] ${k.merk} ${k.model} (${k.getDeskripsi()})`);
    });
  });
}
```

---

## Hasil Eksekusi Sistem (Output Console)

```text
=== MEMULAI SISTEM MANAJEMEN TRANSPORTASI ===

============================================================
 DAFTAR ARMADA KENDARAAN - NUSANTARA FLEET MANAGEMENT
============================================================
1. [Mobil - MPV] Toyota Avanza Veloz [Plat: B 1423 KAZ] - Tarif: Rp 350.000/hari (Status: Tersedia) | Kapasitas: 7 orang
2. [Mobil - MPV] Toyota Innova Zenix [Plat: B 8899 DFG] - Tarif: Rp 600.000/hari (Status: Tersedia) | Kapasitas: 7 orang
3. [Motor - 155cc] Yamaha NMAX 155 [Plat: B 3456 PLM] - Tarif: Rp 150.000/hari (Status: Tersedia)
4. [Motor - 150cc] Vespa Sprint S [Plat: B 6789 VSP] - Tarif: Rp 200.000/hari (Status: Tersedia)
5. [Bus Pariwisata] Mercedes-Benz OH 1626 Jetbus [Plat: B 7777 BUS] - Tarif: Rp 2.500.000/hari (Status: Tersedia) | Kapasitas Kursi: 45 kursi

================ PROSES PENYEWAAN KENDARAAN ================
[TRANSAKSI BERHASIL]
   Pelanggan       : Ahmad Fauzi (0812-3456-7890)
   Kendaraan       : Toyota Avanza Veloz [B 1423 KAZ]
   Durasi Sewa     : 3 hari
   Total Biaya     : Rp 1.050.000
   Suara Kendaraan : Mobil Toyota: "Bip bip!"
------------------------------------------------------------
...
============================================================
 DAFTAR PELANGGAN YANG SEDANG MENYEWA KENDARAAN
 Perusahaan: Nusantara Fleet Management
============================================================

1. Nama Pelanggan : Ahmad Fauzi
   Nomor Telepon  : 0812-3456-7890
   Jumlah Disewa  : 2 unit
   Rincian Kendaraan:
      [1] Plat Nomor : B 1423 KAZ
          Kendaraan  : Toyota Avanza Veloz
          Tarif/Hari : Rp 350.000
          Kategori   : Mobil
          Detail     : [Mobil - MPV] Toyota Avanza Veloz [Plat: B 1423 KAZ] - Tarif: Rp 350.000/hari (Status: Disewa) | Kapasitas: 7 orang
      [2] Plat Nomor : B 6789 VSP
          Kendaraan  : Vespa Sprint S
          Tarif/Hari : Rp 200.000
          Kategori   : Motor
          Detail     : [Motor - 150cc] Vespa Sprint S [Plat: B 6789 VSP] - Tarif: Rp 200.000/hari (Status: Disewa)
   ---------------------------------------------------------

2. Nama Pelanggan : Siti Rahmawati
   Nomor Telepon  : 0857-1122-3344
   Jumlah Disewa  : 1 unit
   Rincian Kendaraan:
      [1] Plat Nomor : B 7777 BUS
          Kendaraan  : Mercedes-Benz OH 1626 Jetbus
          Tarif/Hari : Rp 2.500.000
          Kategori   : Bus
          Detail     : [Bus Pariwisata] Mercedes-Benz OH 1626 Jetbus [Plat: B 7777 BUS] - Tarif: Rp 2.500.000/hari (Status: Disewa) | Kapasitas Kursi: 45 kursi
   ---------------------------------------------------------
============================================================
```
