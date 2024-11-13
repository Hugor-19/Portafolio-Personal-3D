from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # Tu contraseña de MySQL, si la tienes configurada
    database="portafolio"
)

cursor = db.cursor(dictionary=True)

# Endpoint para manejar los mensajes de contacto
@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    full_name = data.get('full_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    affair = data.get('affair')
    message = data.get('message')

    if not all([full_name, email, phone_number, affair, message]):
        return jsonify({'message': 'Faltan datos del formulario'}), 400
    
     # Verificar si el usuario ya existe
    cursor.execute("SELECT * FROM contact_messages WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user:
        return jsonify({'message': 'El usuario ya está registrado'}), 409

    # Insertar el mensaje en la base de datos
    cursor.execute(
        "INSERT INTO contact_messages (full_name, email, phone_number, affair, message) VALUES (%s, %s, %s, %s, %s)",
        (full_name, email, phone_number, affair, message)
    )
    db.commit()

    return jsonify({'message': 'Mensaje enviado con éxito'}), 201

if __name__ == '__main__':
    app.run(debug=True)
