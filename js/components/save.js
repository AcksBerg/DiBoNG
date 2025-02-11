class Save{
    // handling: neues save anlegen und dann mit downlaod json die json datei runterladen
    // TODO: in button auf website implementieren

constructor(){

    this.cableinfo = []
    cables.forEach(cable => {
        
        this.cableinfo.push([cable.startPin.id,cable.links,cable.endPin.id,cable.color]);    
}
)
}
downloadJSON(filename = "data.json") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(this.cableinfo)], { type: "application/json" }));
    a.download = filename;
    a.click();
}
}
