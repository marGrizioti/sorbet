/*
    This file is part of "ChoiCo" a web application for designing digital games, written by Marianthi Grizioti for the National and Kapodistrian University of Athens (Educational Technology Lab).
    Copyright (C) 2017-2018.
    ChoiCo is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChoiCo is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
*/

//Interactive datatable Constructor
 function interactiveDataTable (divContainer) {
  var parentDiv = divContainer;
  var tableHeader = null;
  var fieldsCounter = 0;
  var fields = [];
  var rows = [];
  this.addField();
  //draw the dataTable
}

interactiveDataTable.prototype.importVariables = function () {

}

interactiveDataTable.prototype.addField = function(){        //adds a new th field on the table header
  var th;
  var   newName = "Field" + this.fields.length;
  th = this.newTh (newName);
  $(th).find("span").children("input").last().css("visibility", "hidden")
  var elem2 = th.previousElementSibling;
  $(elem2).find("span").children("input").last().css("visibility", "visible")
  this.insertNumberCol();
  this.fieldsCounter++;
  fieldrec = {name: newName};
  this.fields.push(fieldrec);

}

interactiveDataTable.prototype.selectField  = function (cbx){
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

interactiveDataTable.prototype.deleteField = function  (){

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

interactiveDataTable.prototype.newTh = function(name){     //adds new th in the dataTableHeader
var newField,th,checkbox,i;
th = document.createElement('th');
newField= document.createElement("input")
newField.type = "text"
newField.style.width="78%" ;
newField.style.height="98%";
newField.value = name;
newField.className = "tableField"
newField.onchange = function (){myGame.updateField(this)}  //**************** closure
th.appendChild (newField)
 checkbox = document.createElement('input');
  checkbox.type="checkbox";
  checkbox.setAttribute('id', this.fieldsCounter-1 +"_check");
  checkbox.onclick=function(){myGame.selectField(this);}  //**********************
  th.appendChild (checkbox)
  var sortArrow =  document.createElement('input');
  sortArrow.type= "image";
  sortArrow.src = "media/imgs/sort_des.png"
  sortArrow.onclick = function () {sortCol(this)}    //******************
  sortArrow.title = "sort column"
  th.appendChild (sortArrow)
var spanEl = document.createElement('span')
var leftArrow =  document.createElement('input');
leftArrow.type= "image";
leftArrow.src = "media/imgs/left.png"
leftArrow.onclick = function () {moveColumnLeft(leftArrow.closest("th"))}  //******************
leftArrow.title = "move to the left"
  spanEl.appendChild (leftArrow)
  var rightArrow =  document.createElement('input');
  rightArrow.type= "image";
  rightArrow.src = "media/imgs/right.png"
  rightArrow.onclick = function () {moveColumnRight(rightArrow.closest("th"))}   //******************
  rightArrow.title = "move to the right"
    spanEl.appendChild (rightArrow)
    th.appendChild (spanEl);

return (this.dataTableHeader.rows[0].appendChild(th));
}


interactiveData.prototype.insertNumberCol = function () {
  for ( i=0; i<this.idCounter; i++){
		cel = this.dataTable.tBodies[0].rows[i].insertCell()
		var fieldBox = document.createElement("input")
			fieldBox.type = "number"
			fieldBox.style.width="98%" ;
			fieldBox.style.height="98%";
      fieldBox.step='.1'
			cel.appendChild (fieldBox)

	}

}

interactiveData.prototype.updateField = function (f){
  	var c = f.parentElement.cellIndex;
  var cleanName = replaceSpecialChars (f.value)
  if (checkDoubleName (cleanName)) {
    alert ('You cannot have two fields with the same name!')
    f.value = this.fields[c-1].name
  }
  else {
  f.value = cleanName;
	this.fields[c-1].name = f.value;}
}
interactiveData.prototype.selectField  = function (cbx){
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

interactiveData.prototype.deleteField = function  (){

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

interactiveData.prototype.changeType  = function (newType) {
	var boxes = $(':checkbox:checked',this.dataTableHeader);
	var fieldNo = boxes[0].parentElement.cellIndex
  var oldType = this.fields[fieldNo-1].type ;
  var inputElement, oldValue;

	for (var i =0; i < this.myMap.markers.length; i++){        //for each table row
		//console.log (this.dataTable.tBodies[0].rows[i].cells[fieldNo].children[0])
		var cel = this.dataTable.tBodies[0].rows[i].cells[fieldNo];       //get the cell
    if (oldType == "file"){
        cel.innerHTML = ""
        inputElement = document.createElement("input");
        cel.appendChild (inputElement)
    }
    else if (oldType == "formula") {    //was a formula
        inputElement = cel.children[2]
        cel.innerHTML = ""
        cel.appendChild (inputElement)
    }
    else{
	     inputElement = cel.children[0]
    }
	   oldValue = inputElement.value;

    if (newType=="formula"){
      inputElement.type = "number"
    }
    else {
        inputElement.type = newType;
    }
		if (newType == "file"){
		inputElement.addEventListener('change', loadImgFile, false)
		inputElement.style.width="50px" ;

				inputElement.style.float="right";

				var thumbnail = document.createElement("img");
				thumbnail.src = "";
				thumbnail.style.width = "50px"
				thumbnail.style.height = "50px"
				cel.appendChild (thumbnail);
	}
  else if (newType == "formula"){
    var sel = createFormulaField (0);

    inputElement.style.width="40%" ;
		//inputElement.style.float="right";
    var br = document.createElement ("br")
    cel.removeChild(inputElement);
    cel.appendChild (sel);
    cel.appendChild (br);
    cel.appendChild (inputElement);
  }
	else {       //number, text, url, date
			inputElement.style.width="90%" ;
	}
  if (newType != "file")
	inputElement.value = oldValue;
	}
  this.fields[fieldNo-1].type 	= newType;

}
interactiveData.prototype.changeVisibility  = function (newType) {
	var boxes = $(':checkbox:checked',this.dataTableHeader);
	var fieldNo = boxes[0].parentElement.cellIndex;
	this.fields[fieldNo-1].visibility = newType;
}


interactiveData.prototype.settingsField  = function (){
	var boxes = $(':checkbox:checked',this.dataTableHeader);
	var fieldNo = boxes[0].parentElement.cellIndex;
	$("#selectBox").val( this.fields[fieldNo-1].type);
	$("#visibilityBox").val( this.fields[fieldNo-1].visibility);
	$("#fS").css('visibility','visible');

}

interactiveData.prototype.closeSettings  = function () {$("#fS").css('visibility','hidden');
 var boxes = $(':checkbox:checked',this.dataTableHeader);
 boxes[0].checked = false;
}
interactiveData.prototype.importVariables = function() {
	//fieldsCounter = this.variables.length;

	this.loadData();  //load fields' names
	var table = this.dataTable.tBodies[0]; 	//load the records of database
	for (var i = 0; i < this.points.length; i++){
    for (var k=0 ; k<myGame.myMap.markers.length; k++){
      if(myGame.myMap.markers[k]._leaflet_id == this.points[i].id){
      marker = myGame.myMap.markers[k]
      }
    }
  this.newEntry (this.idCounter, marker, this.points[i].id, this.points[i].description, this.points[i].values)

	}

	for (var i =0; i<this.fields.length; i++){
			this.dataTableHeader.rows[0].cells[i+1].childNodes[0].value = this.fields[i].name;

	}

 }
interactiveData.prototype.newEntry = function (index, marker, id, description, values) {       //adds a new Entry (row) in position 'index' and sets each cell's value either to 'values' or to default if values are not passed. Index is a number values is an array of length the number of fields
var row, cel, fieldbox, j, thumbnail, formula, br, sel, table;
try{
if(description === undefined) {  description = "" }
//if(values === 'undefined') {values = []}
//TODO Check the first 3 args and throw errors
if(index === undefined) {index = this.idCounter}
//if(id === 'undefined') {throw "adding a new entry: id arguement must have a value"}
//if(marker === 'undefined') {throw "adding a new entry: marker arguement must have a value"}
}
catch (err) {
  console.log (err)
}
table = this.dataTable.tBodies[0];
row = table.insertRow (index);
cel = row.insertCell(0);              //id
cel.innerHTML = id;
fieldBox = document.createElement("input")  		//Description
fieldBox.type = "text"
fieldBox.style.width="98%" ;
fieldBox.style.height="98%" ;
fieldBox.value = description;
fieldBox.onchange = function (){ marker.label.setContent(this.value);}
cel = row.insertCell(1);
cel.appendChild (fieldBox);
for (j=1; j <this.fields.length; j ++){
cel= row.insertCell(j+1);
fieldBox = document.createElement("input")
fieldBox.style.width="98%";
if(this.fields[j].type === "file"){
fieldBox.type =  "file"
fieldBox.style.width="60%" ;
fieldBox.style.height="98%";
fieldBox.style.float="right";
thumbnail = document.createElement("img");
thumbnail.src = this.points[j].imguri
thumbnail.style.width = "50px"
thumbnail.style.height = "50px"
fieldBox.value =  ""
cel.appendChild (fieldBox);
cel.appendChild (thumbnail);
//this.images.push (this.points[i].imguri)
fieldBox.addEventListener('change', loadImgFile, false)
}
else if (this.fields[j].type === "formula"){
fieldBox.type = "number"
fieldBox.step = '.1'
if (values != undefined){
formula = values[this.fields[j].name]
}
else {formula =  {type: "plus", num: "0"} }       //default value
br = document.createElement ("br")
fieldBox.style.width = "30px"
if (formula.type === "rand") {
  sel = createFormulaField(4)
  fieldBox.value = formula.from;
  cel.appendChild (sel);
  cel.appendChild (br);
  cel.appendChild (fieldBox);
  var t = document.createElement("text")
  t.textContent = " to: "
  cel.appendChild(t)
  var to = document.createElement("input");
  to.type = "number"
  to.step = '.1'
  to.id = 'randomTo'
  to.value = formula.to;
  cel.appendChild(to)
  to.style.width = "30px"
}
else {
switch (formula.type) {
  case "plus":
      sel = createFormulaField(0)
    break;
  case "minus":
      sel = createFormulaField (1)
    break;
    case "dev":
      sel = createFormulaField(2)
      break;
      case "mul":
        sel = createFormulaField(3)
        break;

}
cel.appendChild (sel);
cel.appendChild (br);
cel.appendChild (fieldBox);
  fieldBox.value = formula.num
}
}
else if (this.fields[j].type == "number"){
  fieldBox.style.height="98%";
  fieldBox.type = this.fields[j].type
  fieldBox.step =".1"
  if (values != undefined){
  fieldBox.value = values[this.fields[j].name] }
  cel.appendChild (fieldBox);
}
else{
  fieldBox.style.height="98%";
fieldBox.type = this.fields[j].type
if (values != undefined){
fieldBox.value = values[this.fields[j].name] }
cel.appendChild (fieldBox);
}
}
this.idCounter ++;
}
newGame.prototype.loadData = function() {       //loads data to the datatable header
  var th;
  this.dataTableHeader.rows[0].deleteCell(3)
	this.dataTableHeader.rows[0].deleteCell(2)
	this.dataTableHeader.rows[0].deleteCell(1)
	for (var i =0; i < this.fields.length ; i++){
		th= this.newTh(this.fields[i].name)
  }
$(th).find("span").children("input").last().css("visibility", "hidden")   //hide right arrow for last field

}
moveColumnRight= function (elem) {
//  var elem = arrow.closest("th");
  var cellIndex = elem.cellIndex;
   var elem2 = elem.nextElementSibling;
   var parent = elem.parentNode;
   var i,cell1, cell2, cellparent,temp;
   if(elem2==null){
     return;
   }
   if (cellIndex == myGame.fields.length-1) {      // if it was the second last column hide right arrow and show right arrow for the swaped one
     $(elem).find("span").children("input").last().css("visibility", "hidden")
     $(elem2).find("span").children("input").last().css("visibility", "visible")
   }
   if (cellIndex == 2) {      // if it was the  first column show left arrow and hide left arrow for the swaped one
     $(elem).find("span").children("input").first().css("visibility", "visible")
     $(elem2).find("span").children("input").first().css("visibility", "hidden")
   }
    parent.insertBefore (elem2, elem)
   for (i=0; i<myGame.dataTable.rows.length; i++){
     cell1 = myGame.dataTable.rows[i].cells[cellIndex];
  //   console.log(cell1)
     cell2 = cell1.nextElementSibling;
  //   console.log(cell2)
     cellparent = cell1.parentNode;
    cellparent.insertBefore (cell2, cell1)

   }
   myGame.fields.swapItems(cellIndex-1, cellIndex)
}
Array.prototype.swapItems = function (a, b) {
  this[a] = this.splice(b, 1, this[a])[0];
 return this;
}
moveColumnLeft= function (elem) {
//  var elem = arrow.closest("th");
  var cellIndex = elem.cellIndex;
  var elem2 = elem.previousElementSibling;
  var parent = elem.parentNode;
  var i,cell1, cell2, cellparent;
  if(cellIndex===2)
    return;
   parent.insertBefore (elem, elem2)
   if (cellIndex == myGame.fields.length) {      // if it was the last column show right arrow and hide right arrow for the swaped one
     $(elem).find("span").children("input").last().css("visibility", "visible")
     $(elem2).find("span").children("input").last().css("visibility", "hidden")
   }
   if (cellIndex == 3) {      // if it was the second first column hide left arrow and show left arrow for the swaped one
     $(elem).find("span").children("input").first().css("visibility", "hidden")
     $(elem2).find("span").children("input").first().css("visibility", "visible")
   }
   for (i=0; i<myGame.dataTable.rows.length; i++){
     cell1 = myGame.dataTable.rows[i].cells[cellIndex];
     //console.log(cell1)
     cell2 = cell1.previousElementSibling;
  //   console.log(cell2)
     cellparent = cell1.parentNode;
    cellparent.insertBefore (cell1, cell2)

   }
    myGame.fields.swapItems(cellIndex-1, cellIndex-2)
}
 $("#bodyContainer").scroll(function ()
    {
        $("#headerContainer").css('left', -1*this.scrollLeft );
    });
function showFormulaOptions(){
  $("#formulaSelection").show();
}
function hideFormulaOptions(){
  $("#formulaSelection").hide();
}

function changeFormula (newFormula, cel) {
  switch (newFormula) {
    case "random":
      var t = document.createElement("text")
      t.textContent = " to: "
      cel.appendChild(t)
      var to = document.createElement("input");
      to.type = "number"
      to.step = ".1"
      to.id = 'randomTo'
      cel.appendChild(to)
      to.style.width = "30px"
      //myGame.fields[fieldNo-1].type = "formula_Random";
      break;
    default :
    var children = cel.childNodes;
    if (children.length > 3) {
      cel.removeChild(children [4])
      cel.removeChild (children [3])
    }

  }
}

function createFormulaField (index) {
  var sel = document.createElement ("select")
  sel.id = "formulaBox";
  var op = document.createElement("option");
  op.text = "+"
  op.value = "plus"
  sel.options.add(op,1);
  var op = document.createElement("option");
  op.text = "-"
  op.value = "minus"
  sel.options.add(op,2);
  var op = document.createElement("option");
  op.text = "/"
  op.value = "dev"
  sel.options.add(op,3);
  var op = document.createElement("option");
  op.text = "*"
  op.value = "mul"
  sel.options.add(op,4);
  var op = document.createElement("option");
  op.text = "rand"
  op.value = "random"
  sel.options.add(op,5);
  sel.onchange = function() {changeFormula(this.value,this.parentNode)}
  sel.style.width = "40%"
  sel.selectedIndex = index;
  return sel;
}

function changeOptionFormula (index){
  document.getElementById("formulaBox").selectedIndex = index;
}

function sortTable(table,column,type, dir) {
  var table, rows, switching, i, x, y, shouldSwitch;
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 0; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      //check if the two rows should switch place:
      if(type === "number"){
        if(dir === "asc") {   //small to big
          if (Number(x.children[0].value) > Number(y.children[0].value)) {
            shouldSwitch = true;
            break;
          }
        }
      else {    //big to small
        if (Number(x.children[0].value) < Number(y.children[0].value)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    else {        //alphabetical order
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      else if (dir == "des") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function replaceSpecialChars  (textValue) {

  var special = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/g
  if (special.test(textValue)) {
      textValue =textValue.replace(special ,"");
    alert ('Parameter names cannot contain special characters (!@#$%^*,. etc). Any special character was removed from the name.')
  }
  textValue =textValue.replace(/ /g,"_");     //replace spaces
  return textValue;
}
function checkDoubleName (newName){
  for (var i=0; i<myGame.fields.length; i++){
    if(myGame.fields[i].name === newName){
      return 1;
    }
  }
  return 0;
}
