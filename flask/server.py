# import libraries
from flask import Flask, render_template
from sense_hat import SenseHat

# sensehat instantiëren (instantie maken)
sense = SenseHat()

# flask server instatiëren
# __name__  = name of the module
app = Flask(__name__)

# globale sensehat creëren
sense_values = {
     'value': '#000000',
     'type': 'hex'
}

@app.route('/')
def index():
    return 'Hello World'

@app.route('/hello')
def hello():
    return 'You have reached the Pi of DW'

# server constants
host = '0.0.0.0'
port = 8080
if __name__ == '__main__':
    app.run(host=host, port=port, debug=True)