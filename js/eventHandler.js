/** ADD MODAL EVENT HANDLER**/
const addBtn = document.getElementById('addBtn');
const addModal = document.getElementById('addModal');

const openModal = (element) => {
  element.style.display = 'block';
};

addBtn.addEventListener('click', () => openModal(addModal));
addModal.addEventListener('click', (e) => {
  if (e.target.id === 'addModal') {
    addModal.style.display = 'none';
  }
})

/** PARAMETERS MODAL EVENT HANDLER**/
const openParamModal = document.getElementById('openParamModal');
const paramModal = document.getElementById('paramModal');
openParamModal.addEventListener('click', () => openModal(paramModal));
paramModal.addEventListener('click', (e) => {
  if (e.target.id === 'paramModal') {
    paramModal.style.display = 'none';
  }
})

/** CUBE MODAL EVENT HANDLER **/
const cube = document.getElementById('activeCube');
const cubeModal = document.getElementById('cubeModal');
activeCube.addEventListener('click', () => openModal(cubeModal));
cubeModal.addEventListener('click', (e) => {
  if (e.target.id === 'cubeModal') {
    cubeModal.style.display = 'none';
  }
})

/** ALERT Chrono et Share btn **/

const chrono = document.getElementById('openChronos');
chrono.addEventListener('click', () => alert('fonctionalité indisponible (en cours de dev)'));
const share = document.getElementById('share');
share.addEventListener('click', () => alert('fonctionalité indisponible (en cours de dev)'));
