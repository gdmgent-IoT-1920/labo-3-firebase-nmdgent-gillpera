from sense_hat import SenseHat
import firebase_admin
from firebase_admin import credentials, firestore
import time

# firebase
cred = credentials.Certificate("../app/config/iotlabo3-61d21-firebase-adminsdk-ucudq-c8ce131428.json")
firebase_admin.initialize_app(cred)

# connect to firestore
db = firestore.client()

# sensehat 
sense = SenseHat()
sense.set_imu_config(False, False, False)
sense.clear()

# app
while True:
    data = {
        u'temperature': sense.get_temperature(),
        u'humidity': sense.get_humidity(),
    }
    db.collection(u'raspberry').document(u'sensor').set(data)
    time.sleep(60)