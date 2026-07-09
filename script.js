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