import firebase from 'firebase';
import 'firebase/firestore';

class Fire {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBzdWCw3BoZ0iRpXpdlof_-r3UfBN-xvhI',
      authDomain: 'food-note.firebaseapp.com',
      databaseURL: 'https://food-note.firebaseio.com',
      projectId: 'food-note',
      storageBucket: 'food-note.appspot.com',
      messagingSenderId: '450257548170',
    });
    firebase.firestore().settings({ timestampsInSnapshots: true });

    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
  }

  createFood = ({ name, cal, protein, lipid, carbohydrate, date }) => {
    const createdAt = Date.now();
    this.foodCollection.add({
      name,
      cal,
      protein,
      lipid,
      carbohydrate,
      date,
      createdAt,
    });
  };

  getFoods = async () => {
    const querySnapshot = await this.foodCollection.get();
    const res = [];
    querySnapshot.forEach(doc => {
      res.push(doc.data());
    });
    return res;
  };

  searchFooodByDay = async day => {
    const results = await this.foodCollection.where('date', '==', day).get();
    const res = [];
    results.forEach(doc => {
      res.push(doc.data());
    });
    return res;
  };

  // Helpers
  get userCollection() {
    return firebase.firestore().collection('users');
  }

  get foodCollection() {
    return this.userCollection.doc(this.uid).collection('foods');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

Fire.shared = new Fire();
export default Fire;
