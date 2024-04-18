$(document).ready(function() {
  // Fungsi untuk menampilkan modal edit dengan data barang yang akan diedit
  window.showEditModal = function(id, nama, jumlah, deskripsi, type, tanggal_update) {
      $('#editId').val(id);
      $('#editNama').val(nama);
      $('#editJumlah').val(jumlah);
      $('#editDeskripsi').val(deskripsi);
      $('#editType').val(type);
      $('#editTanggalUpdate').val(tanggal_update);
      $('#editModal').modal('show');
  };

  // Fungsi untuk menampilkan modal konfirmasi hapus
  window.showDeleteModal = function(id) {
      $('#confirmDelete').off('click').on('click', function() {
          deleteBarang(id);
      });
      $('#deleteModal').modal('show');
  };

  // Fungsi untuk mengirim permintaan AJAX untuk menghapus barang
  function deleteBarang(id) {
      $.ajax({
          url: '/delete_barang/' + id,
          type: 'POST',
          success: function(response) {
              $('#deleteModal').modal('hide');
              $('#successModal').modal('show');
              setTimeout(function() {
                  $('#successModal').modal('hide');
                  location.reload(); // Memuat ulang halaman setelah menghapus barang
              }, 2000);
          },
          error: function(error) {
              console.log(error);
              alert('Terjadi kesalahan saat menghapus barang.');
          }
      });
  }

  // Fungsi untuk mengirim permintaan AJAX untuk menyimpan perubahan pada barang yang diedit
  $('.editBtn').on('click', function() {
      var id = $(this).data('id');
      var nama = $(this).data('nama');
      var jumlah = $(this).data('jumlah');
      var deskripsi = $(this).data('deskripsi');
      var type = $(this).data('type');
      var tanggal_update = $(this).data('tanggal_update');

      $('#editId').val(id);
      $('#editNama').val(nama);
      $('#editJumlah').val(jumlah);
      $('#editDeskripsi').val(deskripsi);
      $('#editType').val(type);
      $('#editTanggalUpdate').val(tanggal_update);

      $('#editModal').modal('show');
  });

  // Fungsi untuk mengirim permintaan AJAX untuk menyimpan perubahan pada barang yang diedit
  $('#editForm').submit(function(e) {
      e.preventDefault();
      var id = $('#editId').val();
      var nama = $('#editNama').val();
      var jumlah = $('#editJumlah').val();
      var deskripsi = $('#editDeskripsi').val();
      var type = $('#editType').val();
      var tanggal_update = $('#editTanggalUpdate').val();

      $.ajax({
          url: '/update_barang/' + id,
          type: 'POST',
          data: {
              nama_give: nama,
              jumlah_give: jumlah,
              deskripsi_give: deskripsi,
              type_give: type,
              data_update_give: tanggal_update
          },
          success: function(response) {
              $('#editModal').modal('hide');
              $('#successModal').modal('show');
              setTimeout(function() {
                  $('#successModal').modal('hide');
                  location.reload(); // Memuat ulang halaman setelah menyimpan perubahan barang
              }, 2000);
          },
          error: function(error) {
              console.log(error);
              alert('Terjadi kesalahan saat menyimpan perubahan barang.');
          }
      });
  });
});