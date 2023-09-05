class gsheetsDataBase{

    constructor(gsheeturl,worksheetname){
        this.gsheeturl = gsheeturl
        this.worksheetname = worksheetname
    }

    getData(){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",this.gsheeturl+"?action=getdata"+"&wkname="+this.worksheetname,false);
        Httpreq.send(null);
        return JSON.parse(Httpreq.responseText);          
    }
    

    appendData(data){
        fetch(this.gsheeturl+"?action=append&data="+data.join(",") + "&wkname="+this.worksheetname)
    }

    deleteDataRow(row){
        fetch(this.gsheeturl+"?action=delete&data="+String(row)+"]&wkname="+this.worksheetname)
    }

    deleteAlldata(){
        fetch(this.gsheeturl+"?action=deleteall&wkname="+this.worksheetname)
    }
}

export default gsheetsDataBase

