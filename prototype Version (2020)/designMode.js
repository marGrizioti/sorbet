

    function vanisher() {
        var x = document.getElementById("vanishDIV");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    };





    CanvasState.prototype.clearContainers = function(){
        var c = document.getElementById ("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
    }



    CanvasState.prototype.processCel = function(cel,questions){
       // var cel = this.cel;

        var typeElement= cel.querySelector(".type");
        console.log("cel is",cel);
        console.log("value of cel",cel.type);
        console.log("typeelement",typeElement);
        var quantity= cel.querySelector(".how-many").value;
        console.log("quantity is:",quantity);
        if(quantity==""){
            quantity=1;
            console.log("quantity is:",quantity);

        }
        //var type = typeElement[selectedIndex].value;
        if(typeElement!=null){
        var type = typeElement.options[typeElement.selectedIndex].value;
        console.log("type",type);
        switch (type){
            case "text":
                questions.push({

                    right: [],
                    text: cel.querySelector(".text-type").value,
                    type: type,
                    num: quantity
                })
                console.log("type",type);
                break;
            case "image":
                questions.push({
                    right: [],
                    img: cel.querySelector(".image-type").value,
                    type: type,
                    num: quantity

                })
                break;
            case "shape":
                questions.push({
                    right: [],
                    text: cel.querySelector(".shape-type").value,
                    type: type,
                    num: quantity

                })
                break;

        }


        }
        console.log("kati");
        console.log("questions in process are",questions);
    }

    CanvasState.prototype.processField = function(cel,answers){
        // var cel = this.cel;

        var typeContainer= cel.querySelector(".tableField");
        console.log("typecontainer:",typeContainer);
        //var type = typeElement[selectedIndex].value;
        if(typeContainer!=null) {

            answers.push({

                text: typeContainer.value,
            })

        }else {console.log("eimai kenooooo");}

    }


    CanvasState.prototype.processCorrects = function(cel,questions,right){
        var checkboxElement= cel.querySelector(".correct");
        var checked = checkboxElement.checked;
        if(checked==true){
            questions[questions.length-1].right.push(right);
        }

    }


        CanvasState.prototype.saveGame = function(){
            var questions =[];
            var newQuestions= [];
            var answers=[];
            var thead = document.getElementById("datatableHeader");
            var trsh = thead.getElementsByTagName("tr");
            console.log("trsh",trsh.length);
            var tdsh = null;
            tdsh = trsh[0].getElementsByTagName("th");
            if(tdsh!=null) {
                console.log("tdsh", tdsh.length);
                for (var m = 1; m < tdsh.length; m++) {
                    this.processField(tdsh[m], answers);

                }
            }
        /*    for (var q=0; q<answers.length;q++){
                for(var j=0;j<answers[q].num;j++){
                    newAnswers.push(answers[q]);
                }
            }
            this.questions=newQuestions;*/

            // var t = document.getElementById("datatable");
           // var trs = t.getElementsByTagName("tr");
            var trs = this.dataTable.getElementsByTagName("tr");
            var tds = null;
            for (var i=0; i<trs.length; i++) {
                tds = trs[i].getElementsByTagName("td");
                for (var n=0; n<tds.length;n++)     {
                    if(n==0) {
                        this.processCel(tds[n], questions);
                    }else{
                        this.processCorrects(tds[n], questions,n);
                    }

                }
                }
                for (var q=0; q<questions.length;q++){
                    for(var j=0;j<questions[q].num;j++){
                        newQuestions.push(questions[q]);
                }
                }
            this.shapes=[];
            this.questions=newQuestions;
            console.log("questions mesa sto design",questions)
            this.answers=answers;
            console.log("answers mesa sto design",answers);
            this.clear();
            this.fitShapes(answers);


            //   localStorage.setItem("questions",JSON.stringify(questions));
           // localStorage.setItem("questions",JSON.stringify(answers));

        }

    CanvasState.prototype.createFile = function() {
        this.saveGame();
        var fileName = prompt("Please enter a name for the game:", "name");
        var JSONdata =  { "questions": this.questions, "answers":this.answers};
        //var jquestions = JSON.stringify(this.questions);
        //var janswers = JSON.stringify(this.answers);
        var textToWrite = JSON.stringify (JSONdata);
       // console.log("jasons are:", janswers, jquestions);
        const a = document.createElement("a");
       // const file = new Blob([jquestions, janswers], {type: 'application/json'});
        const file = new Blob([textToWrite], {type: 'application/json'});

        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();


    }

///////////////////////



 /*       function onDownload(){
            download(JSON.stringify(jsonData), "yourfile.json", "text/plain");
        }
    }*/


        CanvasState.prototype.newTh = function(name){     //adds new th in the dataTableHeader
        var newField,th,checkbox,i;
        th = document.createElement('th');

        newField= document.createElement("input");
        newField.type = "text";
        newField.style.width="78%" ;
        newField.style.height="98%";
        newField.value = name;
        newField.className = "tableField";
        //newField.classList.add("container");

       // newField.onchange = function (){canvasState.updateField(this)};
        th.appendChild (newField);
        checkbox = document.createElement('input');
        checkbox.type="checkbox";
        checkbox.setAttribute('id', this.fieldsCounter-1 +"_check");
        checkbox.onclick=function(){canvasState.selectField(this);};
        th.appendChild (checkbox);
       /* var sortArrow =  document.createElement('input');
        sortArrow.type= "image";
        sortArrow.src = "media/imgs/sort_des.png";
        sortArrow.onclick = function () {sortCol(this)};
        sortArrow.title = "sort column";
        th.appendChild (sortArrow);
        var spanEl = document.createElement('span');
        var leftArrow =  document.createElement('input');
        leftArrow.type= "image";
        leftArrow.src = "media/imgs/left.png";
        leftArrow.onclick = function () {moveColumnLeft(leftArrow.closest("th"))};
        leftArrow.title = "move to the left";
        spanEl.appendChild (leftArrow);
        var rightArrow =  document.createElement('input');
        rightArrow.type= "image";
        rightArrow.src = "media/imgs/right.png";
        rightArrow.onclick = function () {moveColumnRight(rightArrow.closest("th"))}
        rightArrow.title = "move to the right";
        spanEl.appendChild (rightArrow);
        th.appendChild (spanEl);*/

        return (this.dataTableHeader.rows[0].appendChild(th));
    }

    CanvasState.prototype.addField = function(){
        //var tr = table.tHead.children[0];
        var th;
        var   newName = "Field" + this.fields.length;
        th = this.newTh (newName);
        $(th).find("span").children("input").last().css("visibility", "hidden")
        var elem2 = th.previousElementSibling;
        $(elem2).find("span").children("input").last().css("visibility", "visible")
        this.insertNumberCol();
        this.fieldsCounter++;
        fieldrec = {name: newName};
        // fieldrec = {name: newName, type: "number", step: '.1'};
        this.fields.push(fieldrec);
        //this.newEntry(this.idCounter);
    }

   CanvasState.prototype.insertNumberCol = function () {
        for (var i=0; i<this.idCounter; i++){
            cel = this.dataTable.tBodies[0].rows[i].insertCell();
            console.log("counter col",this.idCounter);
            fieldBox1 = document.createElement("input");
            fieldBox1.type = "checkbox";
            fieldBox1.classList.add("correct");
            cel.appendChild(fieldBox1);

        }
        console.log("entrys counter:", this.idCounter);

    }

   /* CanvasState.prototype.updateField = function (f){
        var c = f.parentElement.cellIndex;
        var cleanName = replaceSpecialChars (f.value)
        if (checkDoubleName (cleanName)) {
            alert ('You cannot have two fields with the same name!')
            f.value = this.fields[c-1].name
        }
        else {
            f.value = cleanName;
            this.fields[c-1].name = f.value;}
    }*/

    CanvasState.prototype.selectField  = function (cbx){
        var boxes = $(':checkbox:checked',this.dataTableHeader);
        var i;
        for (i=0; i<boxes.length; i ++){
            if (boxes[i]!=cbx)
                boxes[i].checked = false;
        }
        if(cbx.checked){
            field = cbx.parentElement;
            //field.className = "selectedField";
            this.checkId = cbx.id;
            $("#deleteIco").css('visibility','visible');
            $("#settingsIco").css('visibility','visible');
        }
        else {
            this.checkId = -1 		//uncheck
            $("#deleteIco").css('visibility','hidden');
            $("#settingsIco").css('visibility','hidden');
        }
    }

    CanvasState.prototype.deleteField = function  (){

        var boxes = $(':checkbox:checked',this.dataTableHeader);
        var fieldNo = boxes[0].parentElement.cellIndex;
      /*  if (this.fields[fieldNo-1].type == "file"){
            this.images = [];
        }*/
        console.log("fielno",fieldNo);
        this.dataTableHeader.rows[0].deleteCell(fieldNo);
        for (var i=0; i<this.idCounter; i++){
            this.dataTable.tBodies[0].rows[i].deleteCell(fieldNo)

        }
        this.fieldsCounter --;
        this.fields.splice(fieldNo-1, 1);
    }

    CanvasState.prototype.deleteElement = function  (){

       // var boxes = $(':checkbox:checked',this.dataTableHeader);
       // var fieldNo = boxes[0].parentElement.cellIndex;
        /*  if (this.fields[fieldNo-1].type == "file"){
              this.images = [];
          }*/
        var  table = this.dataTable.tBodies[0];
        table.deleteRow(0);
       // table.deleteRow(this.idCounter-1);  an theloume na svisoume to prwto apo th lista
        console.log("counter sthn delete:",this.idCounter);
        /*this.dataTableHeader.rows[0].deleteCell(fieldNo);
        for (var i=0; i<this.idCounter; i++){
            this.dataTable.tBodies[0].rows[i].deleteCell(fieldNo)

        }*/
        this.idCounter --;
        //this.fields.splice(fieldNo-1, 1);
    }

    CanvasState.prototype.newEntry = function (index, values) {       //adds a new Entry (row) in position 'index' and sets each cell's value either to 'values' or to default if values are not passed. Index is a number values is an array of length the number of fields
        var row, cel, fieldbox1, typeofelements, j, i, thumbnail, formula, br, sel, table;
       // var boxes = $(':checkbox:checked',this.dataTableHeader);

       // var fieldNo = boxes[0].parentElement.cellIndex;
      //  console.log("fielno",fieldNo);
       // this.dataTableHeader.rows[0].deleteCell(fieldNo);
      //  console.log("rows",this.dataTableHeader.rows[0]);
       /* for (i=0; i<this.idCounter; i++){
            this.dataTable.tBodies[0].rows[i].deleteCell(fieldNo)

        }
*/
        try {
            if (index === undefined) {
                index = this.idCounter
            }
        }
        catch (err) {
            console.log(err)
        }
        table = this.dataTable.tBodies[0];
        row = table.insertRow(index);
        console.log("row:",row);

        //cel = row.insertCell(0);              //id
        //cel.innerHTML = id;
        //console.log("cel:",cel);
       /* fieldBox = document.createElement("input");		//Description
        fieldBox.type = "text"
        fieldBox.style.width = "98%";
        fieldBox.style.height = "98%";*/
        //cel = row.insertCell(1);            //-1 isws ??
       // cel.appendChild(fieldBox);
        console.log("fields:",this.fields.length);
       for (j = 0; j < this.fields.length; j++) {
           cel = row.insertCell(j);
           //for (i = 0; i < this.idCounter; i++) {
           console.log("MPHKA:");
           if(j==0 ){
              // var currentCel= row.cells[fieldNo];
               var fieldBox2 = document.createElement("select");
               fieldBox2.type = "select";
               fieldBox2.classList.add("type");
               typeofelements = document.createElement("option");
               typeofelements.value = "image";
               typeofelements.text = "image";
               fieldBox2.options.add(typeofelements, 1);
               typeofelements = document.createElement("option");
               typeofelements.value = "text";
               typeofelements.text = "text";
               fieldBox2.options.add(typeofelements, 2);
               typeofelements = document.createElement("option");
               typeofelements.value = "shape";
               typeofelements.text = "shape";
               fieldBox2.options.add(typeofelements, 3);
               /* var numOfObjects = document.createElement("input");
                numOfObjects.type = "number";
                numOfObjects.step = "1";
                numOfObjects.style.width = "30px"
                //console.log(this.fields.length);*/
               fieldBox2.onchange = function() {canvasState.changeType(this.value,this.parentNode)};
               //fieldbox2.style.width = "40%"
               // fieldbox2.selectedIndex = index;
               // return sel;
               var wrapper = document.createElement("div");
               wrapper.classList.add("fields-wrapper");

               //cel.appendChild(fieldBox1);
               cel.appendChild(fieldBox2);
               cel.appendChild(wrapper);
               fieldBox2.onchange();
           }else if (j>=1) {
               // console.log("j is", j);
               fieldBox1 = document.createElement("input");
               fieldBox1.type = "checkbox";
               fieldBox1.classList.add("correct");
               cel.appendChild(fieldBox1);
           }

       }
         /*   var currentCel= row.cells[fieldNo];
            console.log("current cel:",currentCel);
            var fieldBox2 = document.createElement("select");
            fieldBox2.type = "select";
            fieldBox2.classList.add("type");
            typeofelements = document.createElement("option");
            typeofelements.value = "image";
            typeofelements.text = "image";
            fieldBox2.options.add(typeofelements, 1);
            typeofelements = document.createElement("option");
            typeofelements.value = "text";
            typeofelements.text = "text";
            fieldBox2.options.add(typeofelements, 2);
            typeofelements = document.createElement("option");
            typeofelements.value = "shape";
            typeofelements.text = "shape";
            fieldBox2.options.add(typeofelements, 3);
           /* var numOfObjects = document.createElement("input");
            numOfObjects.type = "number";
            numOfObjects.step = "1";
            numOfObjects.style.width = "30px"
            //console.log(this.fields.length);*/
          //  fieldBox2.onchange = function() {canvasState.changeType(this.value,this.parentNode)};
            //fieldbox2.style.width = "40%"
           // fieldbox2.selectedIndex = index;
           // return sel;
       /*     var wrapper = document.createElement("div");
            wrapper.classList.add("fields-wrapper");

            //cel.appendChild(fieldBox1);
            currentCel.appendChild(fieldBox2);
            currentCel.appendChild(wrapper);
            //cel.appendChild(numOfObjects);*/

        //}
        this.idCounter++;
        console.log("fields in add field are:",this.fields);
        console.log("idcounter:",this.idCounter);
        //return (this.dataTableHeader.rows[0].appendChild(th));

    }

    CanvasState.prototype.changeType = function (newType,cel){   //cel
        var wrapper = cel.querySelector(".fields-wrapper");
        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.lastChild);

        }
       /* var children = wrapper.childNodes;
        console.log("parent is",  wrapper);
        console.log("children are:", children);
        for (var i=0; i<children.length;i++){
            wrapper.removeChild(children[i]);
            console.log("i is ",i);
        }*/
        switch (newType) {
           case "text":
             /*   if(children.length > 3) {
                    cel.removeChild(children [4]);
                    cel.removeChild(children [3]);
                }*/
                var t = document.createElement("input");
                t.type= "text";
                t.textContent = " to: ";
                t.classList.add("text-type");
                wrapper.appendChild(t);
                var to = document.createElement("input");
                to.type = "number"
                to.step = "1"
                to.classList.add("how-many");
                wrapper.appendChild(to)
                to.style.width = "30px"
                break;
            case "image":
               /* if(children.length > 3) {
                    cel.removeChild(children [4]);
                    cel.removeChild(children [3]);
                }*/
                var img = document.createElement("input");
                img.type= "text";
                img.textContent = " to: ";
                img.classList.add("image-type");
                wrapper.appendChild(img);
                console.log("image type is", img.type);
                var to = document.createElement("input");
                to.type = "number"
                to.min="1";
                to.classList.add("how-many");
                wrapper.appendChild(to)
                to.style.width = "30px"
                break;
            case "shape":
              /*  if(children.length > 3) {
                    cel.removeChild(children [4]);
                    cel.removeChild(children [3]);
                }*/
                var shSelect = document.createElement("select");
                console.log("MPHKA")
                shSelect.type = "select";
                var sh = document.createElement("option");
                sh.classList.add("shape-type");
                sh.value = "text";
                sh.text = "κύκλος";
                shSelect.options.add(sh, 1);
                sh = document.createElement("option");
                sh.value = "text";
                sh.text = "ορθογώνιο";
                shSelect.options.add(sh, 2);
                wrapper.appendChild(shSelect);
                var to = document.createElement("input");
                to.type = "number"
                to.step = "1"
                to.classList.add("how-many");
                wrapper.appendChild(to)
                to.style.width = "30px"
                break;
            default :
                var children = cel.childNodes;
                console.log("child:", cel.childNodes);
                if (children.length > 3) {
                    cel.removeChild(children [4])
                    cel.removeChild (children [3])
                }

        }

    }

    CanvasState.prototype.deleteField = function  (){

        var boxes = $(':checkbox:checked',this.dataTableHeader);
        var fieldNo = boxes[0].parentElement.cellIndex;
        if (this.fields[fieldNo-1].type == "file"){
            this.images = [];
        }
        this.dataTableHeader.rows[0].deleteCell(fieldNo);
        for (i=0; i<this.idCounter; i++){
            this.dataTable.tBodies[0].rows[i].deleteCell(fieldNo)

        }
        this.fieldsCounter --;
        this.fields.splice(fieldNo-1, 1);
    }

