const dbConfig = {
    collection: 'raspberry_coll',
    document: 'sensor'
};

const app = {
    init() {
        // initialiseer de firebase app
        firebase.initializeApp(firebaseConfig);
        this._db = firebase.firestore();
        // cache the DOM
        this.cacheDOMElements();
        this.cacheDOMEvents();
        this.getDataFromSensor();

        this._matrix = {
            isOn: false, color: {value: '#000000', type: 'hex'}
        };

    },
    cacheDOMElements() {
        this.$colorPicker = document.querySelector('#colorPicker');
        this.$toggleMatrix = document.querySelector('#toggleMatrix');
        this.$btnChange = document.querySelector('#btnChange');
        this.$temperature = document.getElementById('temp');
        this.$humidity = document.getElementById('humi');
    },
    cacheDOMEvents() {
        this.$btnChange.addEventListener('click', (e) => {
            e.preventDefault();
            this._matrix.color.value = this.$colorPicker.value;
            this._matrix.isOn = this.$toggleMatrix.checked;

            this.updateInFirebase();
        });

    },
    updateInFirebase() {
        this._db.collection(dbConfig.collection).doc(dbConfig.document)
            // change value
			.set(
                {matrix: this._matrix},
                {merge: true}
            );
    },
    getDataFromSensor() {
        const temp = document.getElementById('temp');
        const humi = document.getElementById('humi');

        this._db.collection(dbConfig.collection).doc(dbConfig.document)
        // SAME //
        // this._db.collection('raspberry_coll').doc('sensor')
        .onSnapshot((doc) => {
            temp.innerText = `${doc.data().temperature}°C`;
            humi.innerText = `${doc.data().humidity}`;
        })
    }
}

app.init();