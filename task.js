class Task {
    constructor(nome, description, dataLimite,status,prioridade,categoria) {
      this.id = Task.generateId();
      this.nome = nome;
      this.description = description;
      this.dataLimite = dataLimite;
      this.status = status;
      this.prioridade = prioridade;
      this.categoria = categoria
    }
  
    static generateId() {
      return Math.floor(Math.random() * 1000); // Gera um ID aleatório
    }
  
    setNome(nome){
        this.nome = nome; 
    }
    setDescription(desc){
        this.description = desc
    }
    setDatalimite(data){
        this.dataLimite = data;
    }
    setStatus(status){
        this.status = status
    }

    getFormatedDate(){
        const data = new Date(this.dataLimite);

        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        const hora = data.getHours();
        const minutos = data.getMinutes();

        return `${dia}/${mes}/${ano} ~ ${hora}:${minutos}`;
    }

    compare(taskA, taskB) {
        return taskB.prioridade - taskA.prioridade;
      }
    
    getAtributos(){
        return [
            this.id,
            this.nome,
            this.description,
            this.dataLimite,
            this.status,
            this.prioridade,
            this.categoria
        ]
    }

  
  }

  export default Task;



  