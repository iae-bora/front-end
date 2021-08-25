//importando o firebase
import firebase  from 'firebase/app'

//Importando cada serviço que será utilizado do firebase
//Authentication
import 'firebase/auth'
//RealTime Database
import 'firebase/database'

//Const gerado no site do firebase
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

//Inicializando o app
firebase.initializeApp(firebaseConfig);

//Variaveis que serão utilizadas dentro do projeto (Autenticaçãoe Database)
const auth = firebase.auth();
const database = firebase.database();

export {firebase, auth, database}
