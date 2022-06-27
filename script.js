// CAPTURA DOS ELEMENTOS HTML
const taskList = document.getElementById('lista-tarefas');
const arrTasks = taskList.children;
const addButton = document.getElementById('criar-tarefa');
const clearListButton = document.getElementById('apaga-tudo');
const clearCompleteTasksButton = document.getElementById('remover-finalizados');
const moveUpButton = document.getElementById('mover-cima');
const moveDownButton = document.getElementById('mover-baixo');
const saveListButton = document.getElementById('salvar-tarefas');
const removeSelectedButton = document.getElementById('remover-selecionado');
const input = document.getElementById('texto-tarefa');

// FUNÇÃO PARA CAPTURAR O TEXTO DIGITADO NO INPUT
function captureInputText() {
  return input.value;
}

// FUNÇÃO PARA LIMPAR O VALOR DO INPUT
function clearInputValue() {
  input.value = '';
}

// FUNÇÃO PARA ALTERAR A COR DE FUNDO DO ELEMENTO SELECIONADO
function changeBackgroundColor(event) {
  const item = document.getElementsByTagName('li');
  const clickedItem = event.target;
  if (item !== undefined) {
    for (let i = 0; i < item.length; i += 1) {
      if (item[i].classList[0] === 'selected' || item[i].classList[1] === 'selected') {
        item[i].classList.remove('selected');
      }
      if (clickedItem.classList[0] === undefined || clickedItem.classList[0] === 'completed') {
        clickedItem.classList.add('selected');
      }
    }   
  }
}

// FUNÇÃO PARA MARCAR UMA TAREFA COMO COMPLETA
function completeTask(event) {
  const clickedElement = event.target;
  if (clickedElement.classList[1] === 'completed' || clickedElement.classList[0] === 'completed') {
    clickedElement.classList.remove('completed');
  } else {
    clickedElement.classList.add('completed');
  }
}

// FUNÇÃO PARA ADICIONAR O QUE FOI DIGITADO A LISTA
function addContentToList() {
  console.log('clicou');
  const inputValue = captureInputText();
  const createLi = document.createElement('li');
  createLi.innerHTML = inputValue;
  taskList.appendChild(createLi);
  clearInputValue();
}

// FUNÇÃO PARA LIMPAR TODA A LISTA
function clearList() {
  taskList.innerHTML = '';
  localStorage.setItem('estadoAnterior', '');
}

// FUNÇÃO PARA LIMPAR TODAS AS TAREFAS COMPLETAS
function clearCompleteTasks() {
  const actualLength = [];
  for (let i = 0; i < arrTasks.length; i += 1) {
    if (arrTasks[i].classList[0] === 'completed' || arrTasks[i].classList[1] === 'completed') {
      actualLength.push(arrTasks[i]);
    }
  }
  for (let i = 0; i < actualLength.length; i += 1) {
    actualLength[i].remove();
  }
}

//  FUNÇÃO PARA ADQUIRIR O ELEMENTO SELECIONADO NO MOMENTO
function selectedElement() {
  for (let i = 0; i < arrTasks.length; i += 1) {
    if (arrTasks[i].classList[0] === 'selected') {
      return arrTasks[i];
    }
  }
}

// MOVE UP TASK FUNCTION
// Aprendi sobre insertBefor com auxílio do MDN e ti-enxame.com:
// https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
// https://www.ti-enxame.com/pt/javascript/mover-um-elemento-um-lugar-para-cima-ou-para-baixo-na-arvore-do-dom-com-javascript/822635469/
function moveUp() {
  if (selectedElement() !== undefined && selectedElement() !== arrTasks[0]) {
    taskList.insertBefore(selectedElement(), selectedElement().previousElementSibling);
  }
}

// MOVE DOWN TASK FUNCTION
function moveDown() {
  if (selectedElement() !== undefined && selectedElement().nextElementSibling !== null) {
    taskList.insertBefore(selectedElement().nextElementSibling, selectedElement());
  }
}

// FUNÇÃO PARA SALVAR O CONTEÚDO DA LISTA NO LOCALSTORAGE
function saveList() {
  localStorage.setItem('estadoAnterior', taskList.innerHTML);
}

// FUNÇÃO PARA REMOVER ITEM SELECIONADO
function removeSelected() {
  const actualLength = [];
  for (let i = 0; i < taskList.children.length; i += 1) {
    if (arrTasks[i].classList[0] === 'selected' || arrTasks[i].classList[1] === 'selected') {
      actualLength.push(arrTasks[i]);
    }
  }
  for (let i = 0; i < actualLength.length; i += 1) {
    actualLength[i].remove();
  }
}

// FUNÇÃO PARA ADICIONAR EVENTOS NOS BOTÕES
function addEventsToButtons() {
  addButton.addEventListener('click', addContentToList);
  clearListButton.addEventListener('click', clearList);
  clearCompleteTasksButton.addEventListener('click', clearCompleteTasks);
  moveUpButton.addEventListener('click', moveUp);
  moveDownButton.addEventListener('click', moveDown);
  saveListButton.addEventListener('click', saveList);
  removeSelectedButton.addEventListener('click', removeSelected);
  taskList.addEventListener('click', changeBackgroundColor);
  taskList.addEventListener('dblclick', completeTask);
  input.addEventListener('keyup', captureInputText);
}

function load() {
  addEventsToButtons();
  taskList.innerHTML = localStorage.getItem('estadoAnterior');
}

window.onload = function() {
  addEventsToButtons();
  taskList.innerHTML = localStorage.getItem('estadoAnterior');
};
