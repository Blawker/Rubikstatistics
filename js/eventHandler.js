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


/** GRAPH **/

/*document.getElementById('pb-chart').setAttribute('stroke-dasharray', "350 500");
document.getElementById('avg5-chart').setAttribute('stroke-dasharray', "300 500");
document.getElementById('avg12-chart').setAttribute('stroke-dasharray', "175 500");
document.getElementById('avg50-chart').setAttribute('stroke-dasharray', "190 500");
document.getElementById('avg100-chart').setAttribute('stroke-dasharray', "130 500");

document.getElementById('rsd5-chart').setAttribute('stroke-dasharray', "350 500");
document.getElementById('rsd12-chart').setAttribute('stroke-dasharray', "300 500");
document.getElementById('rsd50-chart').setAttribute('stroke-dasharray', "220 500");
document.getElementById('rsd100-chart').setAttribute('stroke-dasharray', "190 500");
*/

/*** PARAMETERS ***/
const openOption = (str) => {
  if (document.getElementById(str + 'Arrow').innerHTML === "▼") {
      document.getElementById(str + 'Option').style.display="block";
      document.getElementById(str + 'Arrow').innerHTML="▲";
  }
  else {
    document.getElementById(str + 'Option').style.display="none";
    document.getElementById(str + 'Arrow').innerHTML="▼";
  }
}

document.getElementById('average').addEventListener('click', () => openOption('average'));
