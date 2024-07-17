import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, addDoc, serverTimestamp, setDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmWrceJInBvcNpPf4SnRPI9bu-ctYgL0Q",
  authDomain: "tuto-firebase-f8fc2.firebaseapp.com",
  projectId: "tuto-firebase-f8fc2",
  storageBucket: "tuto-firebase-f8fc2.appspot.com",
  messagingSenderId: "342116271650",
  appId: "1:342116271650:web:7a371f1784ba476cc42c7b",
  measurementId: "G-X4F61W786N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const utilisateurs = collection(db, 'utilisateurs');
const citiesRef = collection(db, 'villes');

// AJOUTER
// getDocs(utilisateurs).then((snapshot) => {
//     let utilisateurs = [];
//     snapshot.docs.forEach((doc) => {
//         utilisateurs.push({ ...doc.data(), id: doc.id});
//     });
//     console.log(utilisateurs);
// });

// RECUPERER
getDocs(citiesRef).then((snapshot) => {
    // let villes = [];
    // snapshot.docs.forEach((doc) => {
    //     villes.push({ ...doc.data(), id: doc.id});
    // });
    // console.log(villes);
});

// REAL TIME UPDATE
onSnapshot(citiesRef, (snapshot) => {
    let villes = [];
    snapshot.docs.forEach((doc) => {
        villes.push({ ...doc.data(), id: doc.id});
    });
    console.log(villes);
});

// AJOUTER UN DOCUMENT
const addCityForm = document.querySelector(".ajouter");
addCityForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // AJOUTER UN NOUVEAU DOCUMENT AVEC UN ID GENERER
    addDoc(citiesRef, {
        pays: addCityForm.pays.value,
        villes: addCityForm.villes.value,
        capital: addCityForm.capital.value === 'true' ? true :  false,
        dateDajout: serverTimestamp(),
    }).then(() => addCityForm.reset());

    // AJOUT DU DOCUMENT
    // setDoc(doc(db, "villes", "FRA"), {
    //     pays: addCityForm.pays.value,
    //     villes: addCityForm.villes.value,
    //     capital: addCityForm.capital.value === 'true' ? true :  false,
    //     dateDajout: serverTimestamp(),
    // }).then(() => addCityForm.reset());
});

// SUPRESSION D'UN DOCUMENT
const deleteCityForm = document.querySelector(".suppression");
deleteCityForm.addEventListener("submit", (e) => {
    e.preventDefault();;

    const docRef = doc(db, "villes", deleteCityForm.id.value)

    deleteDoc(docRef).then(() => deleteCityForm.reset());
})