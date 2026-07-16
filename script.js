function pindahHalaman(namaHalaman) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.page-view').forEach(function (el) {
        el.classList.remove('active');
    });

    // Tampilkan halaman yang dipilih
    const target = document.getElementById('page-' + namaHalaman);
    if (target) target.classList.add('active');

    // Update class active di navbar link
    document.querySelectorAll('.nav-link-page').forEach(function (link) {
        const isActive = link.getAttribute('data-page') === namaHalaman;
        link.classList.toggle('active', isActive);
        link.classList.toggle('text-white', isActive);
        link.classList.toggle('text-white-50', !isActive);
    });

    // Scroll ke atas setiap pindah halaman
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Tutup navbar collapse di mobile
    // (Plugin Collapse dipelajari di Pertemuan 12, tapi dipakai
    // di sini sejak awal agar navigasi mobile langsung berfungsi)
    const navbar = document.getElementById("navbarLinks");

    if (navbar.classList.contains("show")) {
        navbar.classList.remove("show");
    }

    // ▶ PERTEMUAN 14 - Refresh Scrollspy saat pindah ke halaman Akademik
    // Scrollspy tidak bisa menghitung posisi elemen yang tersembunyi
    // (display:none). Setelah halaman tampil, perlu di-refresh.
    if (namaHalaman === 'menu') {
        setTimeout(function () {
            $('[data-spy="scroll"]').each(function () {
                $(this).scrollspy('refresh');
            });
        }, 50);
    }
}

document.querySelectorAll('[data-page]').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        pindahHalaman(this.getAttribute('data-page'));
    });
});


// VALIDASI TOMBOL BELI SEKARANG
document.querySelectorAll('[data-toggle="modal"]').forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        if (confirm("Apakah Anda yakin ingin membeli produk ini?")) {
            $($(this).data("target")).modal("show");
        }
    });
});

// VALIDASI FORM KIRIM PESAN
const form = document.querySelector("#page-kontak form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = this.querySelectorAll("input")[0].value.trim();
        const hp = this.querySelectorAll("input")[1].value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const pesan = this.querySelector("textarea").value.trim();

        if (nama === "" || hp === "" || email === "" || pesan === "") {
            alert("Semua data wajib diisi!");
            return;
        }

        if (!/^[0-9]+$/.test(hp)) {
            alert("Nomor HP hanya boleh berisi angka!");
            return;
        }

        if (confirm("Yakin ingin mengirim pesan?")) {
            alert("Pesan berhasil dikirim.");
            this.reset();
        }
    });
}

let harga = 0;
let jumlah = 1;

document.querySelectorAll(".btn-beli").forEach(function (btn) {

    btn.addEventListener("click", function () {

        harga = Number(this.dataset.harga);
        jumlah = 1;

        document.getElementById("namaProduk").innerText =
            this.dataset.nama;

        document.getElementById("hargaProduk").innerText =
            "Rp " + harga.toLocaleString("id-ID");

        document.getElementById("jumlahProduk").innerText =
            jumlah;

        document.getElementById("totalHarga").innerText =
            "Rp " + (harga * jumlah).toLocaleString("id-ID");

    });

});

document.getElementById("btnTambah").addEventListener("click", function () {

    jumlah++;

    document.getElementById("jumlahProduk").innerText =
        jumlah;

    document.getElementById("totalHarga").innerText =
        "Rp " + (harga * jumlah).toLocaleString("id-ID");

});

document.getElementById("btnKurang").addEventListener("click", function () {

    if (jumlah > 1) {

        jumlah--;

        document.getElementById("jumlahProduk").innerText =
            jumlah;

        document.getElementById("totalHarga").innerText =
            "Rp " + (harga * jumlah).toLocaleString("id-ID");

    }

});

document.getElementById("btnPesan").addEventListener("click", function () {

    alert(
        "🎉 Pesanan Berhasil!\n\n" +
        "Produk : " + document.getElementById("namaProduk").innerText +
        "\nJumlah : " + jumlah +
        "\nTotal : Rp " + (harga * jumlah).toLocaleString("id-ID") +
        "\n\nTerima kasih telah berbelanja di D'OVEN Bakery.\nPesanan Anda akan segera kami proses."
    );

    $("#detailPesanan").modal("hide");

});