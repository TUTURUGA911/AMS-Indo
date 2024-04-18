# app.py
from flask import Flask, render_template, request, jsonify, redirect, url_for
import os
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('mongodb+srv://test:sparta@cluster0.evhvrqa.mongodb.net/?retryWrites=true&w=majority')
db = client.dbams

app = Flask(__name__)
app.config['UPLOAD_FOLDER']='./static/img_barang'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/admin')
def tambah():
    return render_template('admin.html')

@app.route('/tambah_barang', methods=['POST'])
def tambah_barang():
    if request.method == 'POST':
        nama_barang = request.form['nama_give']
        jumlah_barang = request.form['jumlah_give']
        deskripsi_barang = request.form['deskripsi_give']
        type_barang = request.form['type_give']
        tanggal_update_barang = request.form['data_update_give']

        if 'file_give' in request.files:
            file = request.files['file_give']
            if file.filename == '':
                picture_name = 'default.jpg'
            else:
                file_name = secure_filename(file.filename)
                file_ext = file_name.rsplit('.', 1)[1]  # Get the file extension
                picture_name = f"{nama_barang}.{file_ext}"  # Construct picture name based on item name
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], picture_name)
                
                # Ensure the directory exists before saving the file
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                
                file.save(file_path)
        else:
            picture_name = 'default.jpg'

        # Simpan data barang ke database
        db.barang.insert_one({
            'nama': nama_barang,
            'jumlah': jumlah_barang,
            'deskripsi': deskripsi_barang,
            'type': type_barang,
            'tanggal_update': tanggal_update_barang,
            'gambar': picture_name  # Simpan nama file gambar saja, bukan path lengkap
        })
        
        return jsonify({'msg': 'Data barang berhasil ditambahkan'})

@app.route('/lihat_barang', methods=['GET'])
def liat_barang():
    barang_list = db.barang.find()
    return render_template('barang.html', barang_list = barang_list)

@app.route('/produk')  # Ubah methods ke GET, karena Anda hanya perlu mengambil data
def produk():
    barang_list = db.barang.find()
    return render_template('produk.html', barang_list=barang_list)  # Kirim data ke produk.html

@app.route('/edit_barang/<id>', methods=['GET'])
def edit_barang(id):
    barang = db.barang.find_one({'_id': ObjectId(id)})
    return render_template('edit.html', barang=barang)

@app.route('/update_barang/<id>', methods=['POST'])
def update_barang(id):
    nama_barang = request.form['nama_give']
    jumlah_barang = request.form['jumlah_give']
    deskripsi_barang = request.form['deskripsi_give']
    type_barang = request.form['type_give']
    tanggal_update_barang = request.form['data_update_give']
    
    db.barang.update_one(
        {'_id': ObjectId(id)},
        {'$set': {
            'nama': nama_barang,
            'jumlah': jumlah_barang,
            'deskripsi': deskripsi_barang,
            'type': type_barang,
            'tanggal_update': tanggal_update_barang,
        }}
    )
    return redirect(url_for('liat_barang'))

# Handle request delete_barang
@app.route('/delete_barang/<id>', methods=['POST'])
def delete_barang(id):
    db.barang.delete_one({'_id': ObjectId(id)})
    return redirect(url_for('liat_barang'))


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
