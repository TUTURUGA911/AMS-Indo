// admin.js
$(document).ready(function(){
    $('#form-barang').submit(function(event){
        event.preventDefault();
        
        var fileSelected = $('#gambar').prop("files").length > 0;
        if (!fileSelected) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Anda harus memilih gambar!',
                confirmButtonText: 'OK'
            });
            return;
        }

        var nama = $('#nama').val();
        var jumlah = $('#min_pemb').val();
        var deskripsi = $('#deskripsi').val();
        var type = $('#type').val();
        var tanggal_update = $('#data_update').val();
    
        var formData = new FormData();
        formData.append('nama_give', nama);
        formData.append('jumlah_give', jumlah);
        formData.append('deskripsi_give', deskripsi);
        formData.append('type_give', type);
        formData.append('data_update_give', tanggal_update);
        formData.append('file_give', $('#gambar')[0].files[0]);
    
        $.ajax({
            type: 'POST',
            url: '/tambah_barang',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response){
                Swal.fire({
                    icon: 'success',
                    title: 'Data Barang Ditambahkan',
                    text: 'Data barang berhasil ditambahkan!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = '/admin';
                });
            },
            error: function(xhr, status, error){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Gagal menambahkan data barang. Silakan coba lagi.',
                    confirmButtonText: 'OK'
                });
            }
        });
    });
});
