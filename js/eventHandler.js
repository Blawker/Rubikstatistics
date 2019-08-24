/** ADD MODAL EVENT HANDLER**/
const addBtn = document.getElementById('addBtn');
const addModal = document.getElementById('addModal');

const openModal = (element) => {
  console.log('click');
  if (element.style.display === 'none') {
      element.style.display = 'block';
  }
  else {
    element.style.display = 'none';
  }
};

addBtn.addEventListener('click', () => openModal(addModal));
addModal.addEventListener('click', (e) => {
  if (e.target.id === 'addModal') {
    closeParamtModal();
  }
})

/** PARAMETERS MODAL EVENT HANDLER**/
/*
const openParamModal = document.getElementById('openParamModal');
const paramModal = document.getElementById('paramModal');
openParamModal.addEventListener('click', () => openModal(paramModal));
paramModal.addEventListener('click', (e) => {
  if (e.target.id === 'paramModal') {
    paramModal.style.display = 'none';
  }
})
*/
const openParamModal = () => {
  let modal = document.getElementById('insideModal');
  modal.style.top='-50px';
  modal.style.bottom='unset';
  modal.style.paddingTop='200px';
  document.getElementById('modalTitle').style.display = 'none';
  document.getElementById('modalAddButton').style.display = 'none';
  openModal(addModal);
}

const closeParamtModal = () => {
  let modal = document.getElementById('insideModal');
  modal.style.bottom='-10px';
  modal.style.top='unset';
  modal.style.paddingTop='unset';
  document.getElementById('modalTitle').style.display = 'block';
  document.getElementById('modalAddButton').style.display = 'flex';
  addModal.style.display = 'none';
}

const paramModal = document.getElementById('openParamModal');
paramModal.addEventListener('click', () => openParamModal());

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

document.getElementById('avg').addEventListener('click', () => openOption('avg'));
document.getElementById('std').addEventListener('click', () => openOption('std'));
document.getElementById('rsd').addEventListener('click', () => openOption('rsd'));
document.getElementById('reg').addEventListener('click', () => openOption('reg'));
document.getElementById('rep').addEventListener('click', () => openOption('rep'));


/**** TABLE ***/

document.getElementById('openTableAverage').addEventListener('click', () => openModal(document.getElementById('tableAverage')));

/**** GRAPH AVERAGE RSD ***/

document.getElementById('openGraphAverage').addEventListener('click', () => openModal(document.getElementById('canvas__container')));

/**** GRAPH CHRONO DISTRIBUTION ***/

document.getElementById('openGraphDistribution').addEventListener('click', () => openModal(document.getElementById('canvas__distribution__container')));

/**** INPUT CHRONO NUMBER ****/

let text = document.getElementById('chronoText');
let input = document.getElementById('inputChronos');

const displayInput = () => {
  text.style.display  = 'none';
  input.style.display = 'block';
}
document.getElementById('chronoText').addEventListener('click', () => displayInput());

const chronoInput = document.getElementById('chronos_selected');
const setChronoNumber = (value) => {
  if (value > parseInt(document.getElementById('chronos_total').innerHTML)) {
    chronoInput.value = parseInt(document.getElementById('chronos_total').innerHTML);
    return parseInt(document.getElementById('chronos_total').innerHTML);
  }
  if (value <= 0) {
    chronoInput.value = 0;
    return 0;
  }  
  return value;
};

const backToChronoText = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    text.style.display  = 'flex';
    input.style.display = 'none';

    document.getElementById('chronos_selected_value').innerHTML = setChronoNumber(chronoInput.value);

  }
}

chronoInput.addEventListener('keyup', (e) => backToChronoText(e));
