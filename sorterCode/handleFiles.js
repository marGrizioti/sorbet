//document.getElementById('loadGame').addEventListener('change', readFile, false);
// todo load game, fill table


CanvasState.prototype.readFile = function(){
    //document.getElementById('loadGame').addEventListener('change', readFile, false);
    const reader = new FileReader();
   // const file = document.querySelector('input[type=file]').files[0];
    reader.addEventListener('load', (event) => {
        const file = event.target.file;
    });
    reader.readAsText(this.file);
    console.log("the file is: ", this.file);
}
