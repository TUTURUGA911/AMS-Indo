document.querySelectorAll('.btnDetail').forEach((button) => {
  button.addEventListener('click', (event) => {
    let cell = event.target.closest('.cell');
    let image = cell.querySelector('.card-img-top');
    let judul = cell.querySelector('.card-text');
    let deskripsi = cell.querySelector('.deskripsi');
    let deskripsi2 = cell.querySelector('.deskripsi2');
    let subjudul = cell.querySelector('.subjudul');
    let imageSrc = image.src;
    let judulText = judul.textContent;
    let subjudulText = subjudul ? subjudul.textContent : '<i>Subjudul tidak tersedia</i>';
    let deskripsiText = deskripsi ? deskripsi.querySelector('p').textContent : '<i>Deskripsi tidak tersedia</i>';
    let deskripsiText2 = deskripsi2 ? deskripsi2.querySelector('p').textContent : '<i>Deskripsi tidak tersedia</i>';

    let modal = document.querySelector('.btnModal');
    modal.click();

    document.querySelector('.modalTitle').textContent = judulText;
    let gambar = document.createElement('img');
    gambar.src = imageSrc;
    gambar.classList.add('w-50');
    document.querySelector('.modalImage').innerHTML = '';
    document.querySelector('.modalImage').appendChild(gambar);
    document.querySelector('.modalSubjudul').innerHTML = subjudulText;
    document.querySelector('.modalDeskripsi').innerHTML = deskripsiText;
    document.querySelector('.modalDeskripsi2').innerHTML = deskripsiText2;

    const nohp = '6281290939612';
    let pesan = 'https://api.whatsapp.com/send?phone=' + nohp + '&text=Hallo, Kami Dapat No Anda Dari anugerahmitrautamasejahtera.com';

    let tokopediaLink = button.getAttribute('data-tokopedia-link');

    document.querySelector('.btnBeli').href = pesan;

    document.querySelector('.btnPesan').href = tokopediaLink;
  });
});
