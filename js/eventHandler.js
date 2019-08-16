
const addBtn = document.getElementById('addBtn');
const addModal = document.getElementById('addModal');

const openModal = () => {
  addModal.style.display = 'block';
}

addBtn.addEventListener('click', () => openModal());
addModal.addEventListener('click', (e) => {
  if (e.target.id === 'addModal') {
    addModal.style.display = 'none';
  }
})
