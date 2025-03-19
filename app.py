from flask import Flask, render_template, request, jsonify
import mysql.connector
from config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Koneksi ke database
def get_db_connection():
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )

# Route untuk menampilkan halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# API untuk menambahkan item ke database
@app.route('/add_item', methods=['POST'])
def add_item():
    try:
        nama_item = request.form['nama_item']
        target = int(request.form['target'])
        terprint = int(request.form['terprint'])
        
        # Upload file gambar
        file = request.files['image']
        if file:
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(image_path)
            image_path = image_path.replace('static/', '')  # Path relatif

        # Simpan ke database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO items (nama_item, target, terprint, image_path) VALUES (%s, %s, %s, %s)",
                       (nama_item, target, terprint, image_path))
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({'message': 'Item berhasil ditambahkan!'})
    
    except Exception as e:
        return jsonify({'error': str(e)})

# API untuk mengambil semua item dari database
@app.route('/get_items', methods=['GET'])
def get_items():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM items")
    items = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True)
