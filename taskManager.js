import Task from './task.js';
import SaveAndLoad from './saveAndLoad.js';

let nome_task               = document.getElementById('nome-task');
let data_task               = document.getElementById('data-task');
let status_task             = document.getElementById('estado-task');
let prioridade_task         = document.getElementById('prioridade-task');
let categoria_task          = document.getElementById('categoria-task');
let description_task        = document.getElementById('description-task');

let todoList =  [];
let doingList = [];
let doneList =  [];

const taskListDict = {
    "todo":todoList,
    "doing":doingList,
    "done":doneList
}

let currentID;

const taskContainerDivs = {
    "todo":document.getElementById("content-todo"),
    "doing":document.getElementById("content-doing"),
    "done":document.getElementById("content-done")
}


/*
*ON CLICK DO BOTÃO "ADD" - É AQUI QUE SERÁ ADICIONADO A TASK NA RESPECTIVA LISTA (DE ACORDO COM STATUS)
*/
document.getElementById("add-task").onclick = addTask

function addTask(startID=false){
    addTaskToList(
        nome_task.value,
        description_task.value,
        data_task.value,
        status_task.value,
        prioridade_task.value,
        categoria_task.value,
        startID = startID);
}

/**
 * FUNÇÃO ADD TASK - RECEBE OS PARAMETROS DA CLASSE E CRIA UMA INSTÂNCIA DA TASK E COLOCA NA RESPECTIVA STATUSLIST.
 */

function addTaskToList( nome,
                        description,
                        dataLimite,
                        status,
                        prioridade,
                        categoria,
                        startID = false) {
    
    // Cria uma nova task
    const newTask = new Task(nome,description,dataLimite,status,prioridade,categoria);
    
    // Caso a task já tenha um ID, substitui o ID (utlizado para editar a task)
    if(startID ==true){newTask.id = currentID};
    
    // Adiciona a task na respectiva statuslist
    pushToTaskListOnStatus(newTask);

    // Adiciona o conteudo da task no arquivo html.
    createHtmlTaskContent();

    return newTask

  }

/**
 * VERIFICAR QUAL DAS 3 STATUSLIST DEVE SER COLOCADO A TASK.
 */

function pushToTaskListOnStatus(task){
    switch (status_task.value) {
        case "todo":
            todoList.push(task);
            todoList.sort((taks1,task2) => task2.prioridade - taks1.prioridade)
            break;
        case "doing":
            doingList.push(task);
            doingList.sort((taks1,task2) => task2.prioridade - taks1.prioridade)
            break;
        default:
            doneList.push(task);
            doneList.sort((taks1,task2) => task2.prioridade - taks1.prioridade)
      }  
}


/**
 * ADICIONA OS ELEMENTOS HTML PARA CADA TASK
 */
function createHtmlTaskContent(){

    ['todo','done','doing'].forEach(status =>{
        // Limpando divs
        taskContainerDivs[status].innerHTML = '';
    
        taskListDict[status].forEach(task =>{

            const taskContent  = document.createElement("div");
            taskContent.classList.add("task");
    
            const button            = document.createElement('button');
            button.textContent      = "Selecionar"
    
            taskContent.innerHTML = createTaskText(task);
            setVariablesInDiv(taskContent,task);
    
            const div = taskContainerDivs[status];
    
            div.appendChild(taskContent);
    
            taskContent.appendChild(button)
    
            linkToSelectionButton();
    
        })
    
    })
  

}

/**
 * RETRONA O TEXTO PARA O INNERHTML DA DIV DA TASK.
 */
function createTaskText(task){

    const text = `
    <div class="content">
        ID:         ${task.id}          <br>
        Nome:       ${task.nome}        <br>Data:       ${task.dataLimite} <br>
        Status:     ${task.status}      <br>Prioridade: ${task.prioridade} <br>
        categoria:  ${task.categoria}   <br>
        <div class = 'task-desc'>
        <label>
        Descrição:
        
        ${task.description}
        </label>
            
        </div>
    </div>
    `

    return text
}

/**
 * ADICIONA OS MESMOS ATRIBUTOS DA TASK AOS ATRIBUTOS DA DIV.
 * (ISSO É FEITO PARA QUE EU POSSA OBTER OS DADOS DA TASK
 * AO CLICAR NO BOTÃO "SELECIONAR")
 */
function setVariablesInDiv(div,task){

    div.setAttribute("id",task.id);
    div.setAttribute("nome",task.nome);
    div.setAttribute("data",task.dataLimite);
    div.setAttribute("status",task.status);
    div.setAttribute("prioridade",task.prioridade);
    div.setAttribute("categoria",task.categoria);
    div.setAttribute("description",task.description);

}

/**
 * FUNÇÃO RESPONSÁVEL PELA LÓGICA DE OBTER OS DADOS DA TASK E PASSAR PARA O FORMS
 * PARA A DEKETAR A TASK OU EDITAR.
 */

function linkToSelectionButton(){

    const taskInfo = document.querySelectorAll(".task");

    taskInfo.forEach(div => {
        div.addEventListener("click", () => {
            // Obter o valor do atributo de dados específico dessa div
            currentID = div.getAttribute("id");
            
            sendDataToFormsOnClick( div.getAttribute("nome"),
                                    div.getAttribute("description"),
                                    div.getAttribute("data"),
                                    div.getAttribute("status"),
                                    div.getAttribute("prioridade"),
                                    div.getAttribute("categoria"))

        });
      });

}

/**
 * ENVIA DADOS DA TASK PARA O FORMS.
 */

function sendDataToFormsOnClick(
                                nome,
                                description,
                                dataLimite,
                                status,
                                prioridade,
                                categoria) {

    const data = new Date(dataLimite);

    nome_task.value         = nome;
    data_task.value         = String(dataLimite);
    status_task.value       = status;
    prioridade_task.value   = prioridade;
    categoria_task.value    = categoria;
    description_task.value  = description;

}

/**
 * BOTÃO DELETAR TASK
 */

document.getElementById("delete-task").onclick = deleteTask

function deleteTask(){

    if(currentID){
        ['todo','doing','done'].forEach(function(status, indice){
            deleteTaskFromList(taskListDict[status])
        });
    }

    deleteTaskFromHTML();

    ['todo','doing','done'].forEach(function(status, indice){
        console.log(taskListDict[status])
    });

}


/**
 * DELETA TASK DA RESPECTIVA STATUSLIST.
 */
function deleteTaskFromList(lista){

    lista.forEach(function(task, indice) {
        if (task.id == currentID){
            lista.splice(indice, 1); 
        }
    });

}

/**
 * DELETA TASK DO HTML
 */

function deleteTaskFromHTML(){
    
    const htmlTaskElement = document.getElementById(currentID);

    htmlTaskElement.remove();

}

document.getElementById("edit-task").onclick = editTask

function editTask(){
    deleteTask()
    addTask(true)

}

document.getElementById("save-task").onclick = save

function save(){
    const saveload = new SaveAndLoad();

    document.getElementById("save-task").disabled = true
    saveload.deleteAll()

    const allTask = taskListDict['todo'].concat(taskListDict['doing'],taskListDict['done'])

    setTimeout(function () {saveload.saveList(allTask)}, 1000);

    setTimeout(function () {document.getElementById("save-task").disabled = false}, 3000);

}

document.getElementById("load-task").onclick = load

function load(){
    document.getElementById("load-task").disabled = true
    const saveload = new SaveAndLoad();
    
    
    try {
        const data = saveload.getData()

        todoList = data[0]
        doingList = data[1]
        doneList = data[2]

        taskListDict['todo'] = todoList;
        taskListDict['doing'] = doingList;
        taskListDict['done'] = doneList;

        createHtmlTaskContent();

        alert("Data Loaded !")
        
        
    } catch (error) {
        alert("Data Not Found !")
    }
    

    document.getElementById("load-task").disabled = false

}


