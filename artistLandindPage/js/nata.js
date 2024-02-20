// metodo de firebase
import { getElements } from "./firebase.js";

// elementos html

const musicContainer = document.getElementById("musicContainer")
const fechasContainer = document.getElementById("fechasContainer")

// funcion para añadir dinamicamente la seccion de musica
async function llenarTablaMusica() {
   const musicas = await getElements('musica');

   musicContainer.innerHTML = ''; // Limpia el contenido actual de la tabla
  // metodo para recorrer todo el objeto elemento por elemetno
   musicas.forEach(musica => {
      const card = document.createElement('article');
      card.innerHTML += `
      <img src="${musica.enlaceImg}" alt="Imagen cover">
      <h3>${musica.titulo}</h3>
      <p>eleased august ${musica.fecha}</p>
      <a href="${musica.linkYoutube}">Escuchar en youtube</a>
     `;
     card.classList = "albumCarta"
     musicContainer.appendChild(card);
   });

 }

// funcion para añadir dinamicamente la seccion de conciertos
 async function llenarTablaConciertos() {
   const conciertos = await getElements('conciertos');

 
   conciertos.forEach(concierto => {
      const card = document.createElement('article');
      
      card.innerHTML += `
      <h3>Concierto en ${concierto.sitio}</h3>
      <p>Fecha: ${concierto.fecha}</p>
      <p>Lugar: ${concierto.ciudad}, ${concierto.estado}</p>
      <p>entradas disponibles: ${concierto.entradas}</p>
      <a href="${concierto.id}">Comprar boletos</a>
     `;
     card.classList = "fechaCarta"
     fechasContainer.appendChild(card);
   });

 }


// se ejecutan las funciones
llenarTablaMusica() 
llenarTablaConciertos() 