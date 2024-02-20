import { saveElement , getElements, deleteElement} from "./firebase.js";
const btnAnadirConcierto = document.getElementById('btnAnadirConcierto'); // Asegúrate de tener el ID correcto en tu HTML
const btnAnadirMusica = document.getElementById('btnAnadirMusica'); // Asegúrate de tener el ID correcto en tu HTML
const tablaMuiscBody = document.getElementById('musicaTableBody');
const tablaConciertoBody = document.getElementById('tablaConciertoBody')
function guardarConcierto() {
   const sitio = document.getElementById('sitio').value;
   const ciudad = document.getElementById('ciudad').value;
   const estado = document.getElementById('estado').value;
   const fecha = document.getElementById('fecha').value;
   const entradas = parseInt(document.getElementById('entradas').value);
 
   // Verifica que todos los campos estén completos
   if (sitio && ciudad && estado && fecha && entradas) {
     // Guarda el concierto utilizando la función saveElement
     saveElement('conciertos', {
       sitio,
       ciudad,
       estado,
       fecha,
       entradas
     })
     .then(() => {
       alert('Concierto guardado exitosamente');
       llenarTablaConcierto();
     })
     .catch(error => {
       console.error('Error al guardar el concierto:', error);
       alert('Error al guardar el concierto. Consulta la consola para más detalles.');
     });
   } else {
     alert('Por favor, completa todos los campos.');
   }
 }
 
 
 function guardarMusica() {
   const titulo = document.getElementById('titulo').value;
   const duracion = document.getElementById('duracion').value;
   const enlaceImg = document.getElementById('enlaceImg').value;
   const fecha = document.getElementById('fechaMusica').value;
   const linkYoutube = document.getElementById('linkYoutube').value;
 
   // Verifica que todos los campos estén completos
   if (titulo && duracion && enlaceImg && fecha && linkYoutube) {
     // Guarda el concierto utilizando la función saveElement
     saveElement('musica', {
      titulo,
      duracion,
      enlaceImg,
      fecha,
      linkYoutube
     })
     .then(() => {
       alert('musica guardado exitosamente');
       llenarTablaMusica();
     })
     .catch(error => {
       console.error('Error al guardar el musica:', error);
       alert('Error al guardar el musica. Consulta la consola para más detalles.');
     });
   } else {
     alert('Por favor, completa todos los campos.');
   }
 }

 
 
 function eliminarMusica(id) {
 
   // Elimina la música utilizando la función deleteElement
   deleteElement('musica', id)
     .then(() => {
       alert('Música eliminada exitosamente');
       llenarTablaMusica(); // Actualiza la tabla después de eliminar
     })
     .catch(error => {
       console.error('Error al eliminar la música:', error);
       alert('Error al eliminar la música. Consulta la consola para más detalles.');
     });
 }


 function eliminarConcierto(id) {
 
   // Elimina la música utilizando la función deleteElement
   deleteElement('conciertos', id)
     .then(() => {
       alert('Música eliminada exitosamente');
       llenarTablaConcierto(); // Actualiza la tabla después de eliminar
     })
     .catch(error => {
       console.error('Error al eliminar la música:', error);
       alert('Error al eliminar la música. Consulta la consola para más detalles.');
     });
 }
async function llenarTablaMusica() {
   const musicas = await getElements('musica');

   tablaMuiscBody.innerHTML = ''; // Limpia el contenido actual de la tabla
 
   musicas.forEach(musica => {
     const fila = document.createElement('tr');
     fila.innerHTML = `
       <td class="py-2 px-4 border-b">${musica.titulo}</td>
       <td class="py-2 px-4 border-b">${musica.duracion}</td>
       <td class="py-2 px-4 border-b  w-[150px] overflow-x-scroll inline-block">${musica.enlaceImg}</td>
       <td class="py-2 px-4 border-b">${musica.fecha}</td>
       <td class="py-2 px-4 border-b">${musica.linkYoutube}</td>
       <td class="py-2 px-4 border-b">
       <button data-id="${musica.id}" class="deleteMusicaBtn text-red-500 ml-2">Eliminar</button>
       </td>
     `;
     tablaMuiscBody.appendChild(fila);
   });

 }
async function llenarTablaConcierto() {
   const conciertos = await getElements('conciertos');

   tablaConciertoBody.innerHTML = ''; // Limpia el contenido actual de la tabla
 
   conciertos.forEach(concierto => {
     const fila = document.createElement('tr');
     fila.innerHTML = `
       <td class="py-2 px-4 border-b">${concierto.sitio}</td>
       <td class="py-2 px-4 border-b">${concierto.ciudad}</td>
       <td class="py-2 px-4 border-b ">${concierto.estado}</td>
       <td class="py-2 px-4 border-b">${concierto.fecha}</td>
       <td class="py-2 px-4 border-b">${concierto.entradas}</td>
       <td class="py-2 px-4 border-b">
       <button data-id="${concierto.id}" class="deleteConciertoBtn text-red-500 ml-2">Eliminar</button>
       </td>
     `;
     tablaConciertoBody.appendChild(fila);
   });
 }
 
 

 // Agrega un evento de clic al botón "Añadir"
 llenarTablaMusica();
 llenarTablaConcierto();

 btnAnadirConcierto.addEventListener('click', guardarConcierto);

 // Agrega un evento de clic al botón "Añadir"

 tablaMuiscBody.addEventListener('click', function(event) {
   const target = event.target;
 
   // Verifica si el clic fue en un botón de eliminar música
   if (target.tagName === 'BUTTON' && target.classList.contains('deleteMusicaBtn')) {
     const id = target.getAttribute('data-id');
     eliminarMusica(id);
   }
 });

 tablaConciertoBody.addEventListener('click', function(event) {
   const target = event.target;
 
   // Verifica si el clic fue en un botón de eliminar música
   if (target.tagName === 'BUTTON' && target.classList.contains('deleteConciertoBtn')) {
     const id = target.getAttribute('data-id');
     eliminarConcierto(id);
   }
 });

 btnAnadirMusica.addEventListener('click', guardarMusica);