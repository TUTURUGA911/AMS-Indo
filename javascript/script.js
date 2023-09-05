let thisPage = 1;
let limit = 9;
let list = document.querySelectorAll('.list .item');

function loadItem() {
  let beginGet = limit * (thisPage - 1);
  let endGet = limit * thisPage - 1;
  list.forEach((item, key) => {
    if (key >= beginGet && key <= endGet) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  listPage();
}
loadItem();
function listPage() {
  let count = Math.ceil(list.length / limit);
  document.querySelector('.listPage').innerHTML = '';

  if (thisPage != 1) {
    let prev = document.createElement('li');
    prev.innerText = 'PREV';
    prev.setAttribute('onclick', 'changePage(' + (thisPage - 1) + ')');
    document.querySelector('.listPage').appendChild(prev);
  }

  for (i = 1; i <= count; i++) {
    let newPage = document.createElement('li');
    newPage.innerText = i;
    if (i == thisPage) {
      newPage.classList.add('active');
    }
    newPage.setAttribute('onclick', 'changePage(' + i + ')');
    document.querySelector('.listPage').appendChild(newPage);
  }

  if (thisPage != count) {
    let next = document.createElement('li');
    next.innerText = 'NEXT';
    next.setAttribute('onclick', 'changePage(' + (thisPage + 1) + ')');
    document.querySelector('.listPage').appendChild(next);
  }
}
function changePage(i) {
  thisPage = i;
  loadItem();
}

// Path: javascript/script.js

document.querySelectorAll('.btnDetail').forEach((item) => {
  item.addEventListener('click', (e) => {
    let gambar = item.closest('.item').querySelector('.img img').src; // Menggunakan "src" untuk mendapatkan URL gambar.
    let judul = item.closest('.item').querySelector('.title').innerHTML;

    let subjudul = item.closest('.item').querySelector('.subjudul');
    let subjudulText = subjudul ? subjudul.textContent : '<i>Subjudul tidak tersedia</i>';
    let deskripsi = item.closest('.item').querySelector('.deskripsi');
    let deskripsiText = deskripsi ? deskripsi.querySelector('p').textContent : '<i>Deskripsi tidak tersedia</i>';
    let deskripsi2 = item.closest('.item').querySelector('.deskripsi2');
    let deskripsiText2 = deskripsi2 ? deskripsi2.querySelector('p').textContent : '<i>Deskripsi tidak tersedia</i>';

    let modal = document.querySelector('.btnModal');
    modal.click();

    document.querySelector('.modalTitle').textContent = judul;
    let image = document.createElement('img');
    image.src = gambar;
    image.classList.add('w-50');
    document.querySelector('.modalImage').innerHTML = '';
    document.querySelector('.modalImage').appendChild(image);
    document.querySelector('.modalSubjudul').innerHTML = subjudulText;
    document.querySelector('.modalDeskripsi').innerHTML = deskripsiText;
    document.querySelector('.modalDeskripsi2').innerHTML = deskripsiText2;

    const nohp = '6281290939612';
    let pesan = 'https://api.whatsapp.com/send?phone=' + nohp + '&text=Hallo, Kami Dapat No Anda Dari anugerahmitrautamasejahtera.com';
    document.querySelector('.btnBeli').href = pesan;

    let tokopediaLink = item.getAttribute('data-tokopedia-link');
    document.querySelector('.btnPesan').href = tokopediaLink;
  });
});
