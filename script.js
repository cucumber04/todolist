let todoInput //miejsce, gdzie uzytkownik wpisuje tresc
let errorInfo //info o braku zadan / trzeba wpisac tekst
let addBtn    //przycisk ADD - dodaje nowe el do listy
let ulList    //lista zadan, tagi UL
let newToDos //nowo dodany li, nowe zadanie
let toolsPanel // div do przechowywania guzikow
let completeBtn //przycik zrobionego zadania
let editBtn   //przycisk edycji
let deleteBtn //przycisk usuniecia

let popup         //popuop
let popupInfo     //tekst w popupie
let todoToEdit    // edytowany Todo
let popupInput    // input w popupie
let popupAddBtn   //przycisk zatwierdz w popup
let popupCloseBtn // przycisk anuluj w popup




const main = () =>{
  prepareDOMElements()
  prepareDOMEvents()
}



const prepareDOMElements = () =>{
  //pobieramy wszystkie elementy
  todoInput = document.querySelector('.todo-input')
  errorInfo = document.querySelector('.error-info')
  addBtn = document.querySelector('.btn-add')
  ulList = document.querySelector('.todolist ul')
  popup = document.querySelector('.popup')       
  popupInfo = document.querySelector('.popup-info')
  popupInput = document.querySelector('.popup-input') 
  popupAddBtn = document.querySelector('.accept')
  popupCloseBtn = document.querySelector('.cancel')
  
}



const prepareDOMEvents = () =>{
  addBtn.addEventListener('click',addNewToDo)
  ulList.addEventListener('click',checkClick)
  popupCloseBtn.addEventListener('click',closePopup)
  popupAddBtn.addEventListener('click',changeTodoText)
  todoInput.addEventListener('keyup',enterKeyCheck)
}


const addNewToDo = () =>{

  if(todoInput.value !== ''){
    newToDos = document.createElement('li')
    newToDos.textContent = todoInput.value
    createToolsArea()
    ulList.append(newToDos)
    todoInput.value = ''
    errorInfo.textContent = ''
  }else{
    errorInfo.textContent = 'Wpisz tresc zadania!'    
  }
}

const createToolsArea = () =>{


  toolsPanel = document.createElement('div')
  toolsPanel.classList.add('tools') 


  completeBtn = document.createElement('button')
  completeBtn.classList.add('complete')
  completeBtn.innerHTML = '<i class="fas fa-check"></i>'

  editBtn = document.createElement('button')
  editBtn.classList.add('edit')
  editBtn.textContent = 'EDIT'

  deleteBtn = document.createElement('button')
  deleteBtn.classList.add('delete')
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

  toolsPanel.append(completeBtn,editBtn,deleteBtn)
  newToDos.append(toolsPanel)
}

const checkClick = e =>{
  if(e.target.matches('.complete')){
   e.target.closest('li').classList.toggle('completed');
   e.target.classList.toggle('completed')
  }else if(e.target.matches('.edit')){
    editTodo(e)
  }else if(e.target.matches('.delete')){
    deleteToDo(e)
  }
}

const editTodo = e =>{
  todoToEdit =e.target.closest('li')
  popupInput.value = todoToEdit.firstChild.textContent
  popup.style.display = 'flex'
}

const closePopup = () =>{
  popup.style.display = 'none'
  popupInfo.textContent = ''
}

const changeTodoText = () =>{

  if(popupInput.value !== ''){
    todoToEdit.firstChild.textContent = popupInput.value
    popup.style.display = 'none'
    popupInfo.textContent = ''
  }else{
    popupInfo.textContent = 'Musisz podać treść!'
  }
}


const deleteToDo = e =>{
  e.target.closest('li').remove()
    const allTodos = ulList.querySelectorAll('li')

    if(allTodos.length === 0){
      errorInfo.textContent = 'Brak zadań na liście'
    }
}

const enterKeyCheck = e =>{
  if(e.key === 'Enter'){
    addNewToDo()
  }
}

document.addEventListener('DOMContentLoaded',main)