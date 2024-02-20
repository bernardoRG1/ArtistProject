
// ifrebse configgg
import { initializeApp} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { getFirestore, collection, addDoc, Timestamp, doc, getDoc, setDoc, getDocs, deleteDoc, query }  from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // firebase keeysss
  const firebaseConfig = {  
    apiKey: "AIzaSyAdI5ueOOdbjRYiJ5dyXsCIpOTKkUt7fOk",
    authDomain: "mynotes-43734.firebaseapp.com",
    databaseURL: "https://mynotes-43734-default-rtdb.firebaseio.com",
    projectId: "mynotes-43734",
    storageBucket: "mynotes-43734.appspot.com",
    messagingSenderId: "880379342376",
    appId: "1:880379342376:web:9666974749cd6fcbf7cf1d",
    measurementId: "G-KP4PJDN4XG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  const db = getFirestore(app);

  export const saveElement = async ( type ,data) => {
    try {
      const collectionRef = collection(db, type); // Utiliza el tipo como nombre de la colección en Firestore
      const docRef = await  addDoc(collectionRef, data);
      console.log(`Elemento guardado con ID: ${docRef.id}`);
      return docRef.id; // Retorna el ID del documento recién creado
    } catch (error) {
      console.error('Error al guardar el elemento:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };


  export const getElements = async (type) => {
    try {
      const collectionRef = collection(db, type);
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      
      const elements = [];
      querySnapshot.forEach((doc) => {
        elements.push({ id: doc.id, ...doc.data() });
      });
  
      return elements;
    } catch (error) {
      console.error('Error al recuperar elementos:', error);
      throw error;
    }
  };


  export const getNotes = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, `usuarios/${userId}/notas`))
      const notas = []

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notas.push({
          id: doc.id,
          contenido: data.contenido,
          fecha: data.fecha
        })
      })

      return notas
    } catch(error) {
      throw error;
    }
  }



  export const deleteNote = async (userId,selectedNoteId) => {
    try {
      const noteRef= await doc(collection(db, `usuarios/${userId}/notas`), selectedNoteId);
      await deleteDoc(noteRef);
      console.log("Nota eliminada con ID: ", selectedNoteId);
    } catch (error) {
      console.log(error)
    }
  }

  export const deleteElement = async (type, id) => {
    try {
      const docRef = doc(db, type, id);
      await deleteDoc(docRef);
      console.log(`Elemento eliminado con ID: ${id}`);
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
      throw error;
    }
  };


  export const updateNote = async (userId, noteId, contenido, fecha) => {
    try {
      const noteRef = doc(collection(db, `usuarios/${userId}/notas`), noteId);
  
      const timestampDate = new Date(fecha);

    if (isNaN(timestampDate.getTime())) {
        throw new Error("Fecha no válida");
    }

    // Guardar la fecha como timestamp en Firebase
    const timestamp = Timestamp.fromDate(timestampDate);
  
      await setDoc(noteRef, {
        contenido: contenido,
        fecha: timestamp 
      });
  
      console.log("Nota actualizada con ID: ", noteId);
    } catch (error) {
      console.error("Error al actualizar la nota: ", error);
    }};
