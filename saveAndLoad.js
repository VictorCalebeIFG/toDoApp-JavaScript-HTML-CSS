import gsheetsDataBase from "./googleSheetsDataBase.js";
import Task from "./task.js";

const defaulturl = "https://script.google.com/macros/s/AKfycbz155UYs9A-bCue3sPfdXKoG8eW81hzqV1SFcj4ja_ZijJFK6soNk_bWER4qR4JiGAHEA/exec"
const defaultsheetName = "folderdata"



class saveAndLoad{
    
    constructor(url = defaulturl,sheetName = defaultsheetName){
        this.dataBase = new gsheetsDataBase(url,sheetName);
    }
    
    saveList(list) {
        let index = 0;
        
        function processNext() {
            if (index < list.length) {
                const element = list[index];
                this.dataBase.appendData(element.getAtributos());
                
                index++;
                setTimeout(processNext.bind(this), 1000); 
            }
            else{
                alert("Data Saved !")
            }
        }
    
        processNext.call(this); // Inicia o loop
        
        
    }
    deleteAll(){
        this.dataBase.deleteAlldata();
    }

    getData(){
        var todo = []
        var doing = []
        var done = []
        
        this.dataBase.getData().forEach(element => {
            var task = new Task(element[1],element[2],element[3].slice(0,element[3].length-5),element[4],element[5],String(element[6]).replace('$',','));
            task.id = element[0];
            
            if (element[4]=="todo"){
                todo.push(task)    
            }
            if (element[4]=="doing"){
                doing.push(task)    
            }
            if (element[4]=="done"){
                done.push(task)
            }
        })

        console.log([todo,doing,done])

        return [todo,doing,done]
    }
}

export default saveAndLoad