class Shape {
    constructor(x,y)
    {
        this.x = x || 0;
        this.y = y || 0;
    }

    // Determine if a point is inside the shape's bounds
    contains (mx, my) {
        // All we have to do is make sure the Mouse X,Y fall in the area between
        // the shape's X and (X + Width) and its Y and (Y + Height)
        return  (this.x <= mx) && (this.x + this.w >= mx) &&
            (this.y <= my) && (this.y + this.h >= my);
    }

    setImage(img){
        var image= document.createElement('img');
        image.src=img;
        this.img= image;
    }
}

class ShapeTarget extends Shape {

    constructor(x, y, w, h, fill , text) {
        super(x,y);

        this.fill = fill || '#5F5654';
        let boxImage = "media/imgs/box.png";
        this.setImage(boxImage);
        this.boxImage=this.img

        this.img.onload=function() {
         //   this.w = this.width; //|| 100;
           // this.h = this.height;// || 100;
        }
        this.img.width=100;
        this.img.height=100;
             this.w =  w;
            this.h =  120;
        this.type = "target";
        this.text = text;

        this.boxImageRight= document.createElement('img');
        this.boxImageRight.src="media/imgs/boxRight.png";;
        this.boxImageRight.width=100;
        this.boxImageRight.height=100;

        this.boxImageWrong= document.createElement('img');
        this.boxImageWrong.src="media/imgs/boxWrong.png";;
             this.boxImageWrong.width=100;
        this.boxImageWrong.height=100;
    }

    // Draws this shape to a given context (text + box)
    draw (ctx) {
        //console.log(width);
        ctx.fillStyle = this.fill;
        ctx.font = "20px Helvetica";
        ctx.beginPath();

        ctx.drawImage(this.img, this.x+this.w/2-this.img.width/2, this.y-20,
                    this.img.width, this.img.height)

        ctx.fillText(this.text, this.x, this.y+90);

        //ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
   }


}
class ShapeImage extends Shape {
    constructor(x, y, w, h, img, right) {
        super(x,y);
        this.w = w || 50;
        this.h = h || 50;
        //var shape= this;
        this.setImage(img)

        this.type = "element";
        this.right = right;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y , this.w, this.h);
        ctx.closePath();
    }

}

class ShapeRectangle extends Shape {
    constructor(x, y, w, h, fill, right) {
        super(x,y);
        this.w = w || 1;
        this.h = h || 1;
        this.fill = fill || '#AAAAAA';
        this.type = "element";
        this.right = right;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.fillRect(this.x, this.y , this.w, this.h, 0, true);
        ctx.fill();
        ctx.closePath();

    }
}

class ShapeCircle extends Shape {
    constructor(x, y, r, fill, right) {
        super(x,y);
        this.r = r || 1;
        this.fill = fill || '#AAAAAA';
        this.type = "element";
        this.right = right;
    }
    // Draws this shape to a given context (circle)
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.arc(this.x, this.y , this.r, 0, Math.PI*2, true);
        ctx.fill();
        ctx.closePath();

    }

    // vriskw an to shmeio einai mesa ston kuklo
    contains (mx, my) {
        var distancesquared = (mx - this.x) * (mx - this.x) + (my - this.y) * (my - this.y);
        return distancesquared <= this.r* this.r;
    }
}

class ShapeText extends Shape{
    constructor(x, y, w, fill, right, text) {
        super(x,y);
        this.w = w || 150;
        this.fill = fill || '#5F5654';
        this.type = "element";
        this.right = right;
        this.text = text;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.font = "20px Arial";
        ctx.fillText(this.text, this.x, this.y + 30, this.w );
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.closePath();
        var measure = ctx.measureText(this.text);
        //this.w=measure.width;
        this.h=30;

    }
}
function SorterGame(canvas, gameObjects, categories, elementsPerRound) {
    // **** First some setup! ****
    this.score=0;
    this.addElementTimeouts= [];            //gia na mhn vgainoune thn idia stigmh
    this.currentgameObjects = [];
    this.elementsPerRound = elementsPerRound;
    this.gameObjects = gameObjects;
    //this.defaultValues = {right: [],text:"sometext",type: "text",num:1}
    this.defaultValues = {right: [],text:language.sometext,type: "text",num:1}
    this.categories= categories;
    this.playAnswers= [];
    this.defaultColour= 	"#000000" //"#72e7ff"
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    const ctx= this.ctx = canvas.getContext('2d');

   // ctx.textAlign="center"      //* changed!

    this.dataTable = document.getElementById("datatable");      //for the design table
    //this.fields = [{name: "OBJECT"}, {name: "Field1"}, {name: "Field2"}];                                           //for the design table
    this.fields = [{name: "OBJECT"}, {name: language.field1}, {name: language.field2}];
    this.idCounter=0;
    this.dataTableHeader = document.getElementById("datatable").tHead;
    this.images =[];
    this.fieldsCounter=0;
    //console.log("categories: ",categories);
    //console.log("gameObjects: ",gameObjects)


    // This complicates things a little but but fixes mouse co-ordinate problems
    // when there's a border or padding. See getMouse for more detail
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
        this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
        this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
        this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
    }
    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    // **** Keep track of state! ****

    this.valid = false; // when set to false, the canvas will redraw everything
    this.shapes = [];  // the collection of things to be drawn
    this.dragging = false; // Keep track of when we are dragging
    // the current selected object. In the future we could turn this into an array for multiple selection
    this.selection = null;
    this.dragoffx = 0; // See mousedown and mousemove events for explanation
    this.dragoffy = 0;

    this.myPalmState=null;
    this.landmarks=null;

    var myState = this;

    var input=Array.from(Array(5), () => ({"x": 0.5,"y":0.5, "z":0.5}));

    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

    // Up, down, and move are for dragging
    canvas.addEventListener('mousedown', (e) => tryStartDrag(myState.getMouse(e)), true);

    function tryStartDrag(c) {
        //p.innerText+="σύρσιμο αρχίζει"
        const mx=c.x, my=c.y;
        var shapes = myState.shapes;
        var l = shapes.length;
        for (var i = l-1; i >= 0; i--) {
            if (shapes[i].contains(mx, my)) {
                var mySel = shapes[i];
                if (mySel.type=="target"){
                    return;
                }
                // Keep track of where in the object we clicked
                // so we can move it smoothly (see mousemove)
                myState.dragoffx = mx - mySel.x;
            // myState.dragoffy = my - mySel.y;
                myState.dragging = true;

                myState.selection = mySel;
                myState.valid = false;
                return;
            }
        }

        // havent returned means we have failed to select anything.
        // If there was an object selected, we deselect it
        if (myState.selection) {
            myState.selection = null;
            myState.valid = false; // Need to clear the old selection border
        }
    }

    canvas.addEventListener('mousemove', function(e) {
        if (myState.dragging) {
            dragging(myState.getMouse(e));
        }
    }, true);

    canvas.addEventListener('mouseup', function(e) {
        endDrag();
    }, true);

    canvas.addEventListener('touchend', function(e) {
        endDrag();
    }, true);

    function dragging (c) {
        const x=c.x, y=c.y;
        //p.innerText+="\n σύρσιμο"

        // We don't want to drag the object by its top-left corner, we want to drag it
        // from where we clicked. Thats why we saved the offset and use it here
        myState.selection.x = x - myState.dragoffx;
        //we dont want to move around - just the x axis
        //myState.selection.y = y - myState.dragoffy;
        myState.valid = false; // Something's dragging so we must redraw
    }

    function endDrag() {
        myState.dragging = false;
        //p.innerText+="\nσύρσιμο τελείωσε"
    }

    myState.createTargets(categories);

    // **** Options! ****
    this.selectionWidth = 2;
    this.interval = 070; //30
    this.d=50; //50
    this.containerNumber= categories.length;
    setInterval(function() { myState.draw(); }, myState.interval); //myState.interval
}
SorterGame.prototype.loadPlayMode = function (){
    $("#introArea").hide();
    $("#gameScene").show();
    $("#designArea").hide();
    $("#playButton").hide();
    $("#downloadButton").show();
    $("#editButton").show();
    $("#stopButton").hide();
    $("#startButton").show();
}

/* changed! moved this here from designmode.js */
SorterGame.prototype.saveGame = function(){
    this.playAnswers = [];
    this.categories = [];
    this.gameObjects = [];
    this.dataTableRows = [];
    var gameObjects =[];
    var newgameObjects= [];
    var categories=[];
    var thead = this.dataTableHeader;
    var trsh = thead.getElementsByTagName("tr");
    var tdsh = null;
    tdsh = trsh[0].getElementsByTagName("th");
    if(tdsh!=null) {
        for (var m = 1; m < tdsh.length; m++) {
            this.processField(tdsh[m], categories);
        }
    }
    var trs = this.dataTable.getElementsByTagName("tr");
    var tds = null;
    for (var i=0; i<trs.length; i++) {
        tds = trs[i].getElementsByTagName("td");
        for (var n=0; n<tds.length;n++)     {
            if(n==0) {
                this.processCel(tds[n], gameObjects);
            }else{
                this.processCorrects(tds[n], gameObjects,n);
            }

        }
        }
        for (var q=0; q<gameObjects.length;q++){
          this.dataTableRows.push(gameObjects[q])
            for(var j=0;j<gameObjects[q].num;j++){
                newgameObjects.push(gameObjects[q]);

        }
        }
    this.shapes=[];
    this.gameObjects=newgameObjects;
  //  console.log("gameObjects mesa sto design",gameObjects)
    this.categories=categories;
    var playAnswer;
    for (var i=0; i<categories.length; i++) {
      playAnswer = {category: categories[i].text+": ", answers: []}
      this.playAnswers.push(playAnswer);
    }
    playAnswer =  {category: language.classUncl, answers: []}
    this.playAnswers.push (playAnswer)
    this.clear();
    this.createTargets(categories);
}

SorterGame.prototype.start = function() {
    $("#startButton").hide();
    $("#stopButton").show();
    this.score=0;
    this.currentgameObject = -1;
    this.unusedgameObjects = [];
    this.interval=30;
    for(var i = 0; i<this.gameObjects.length; i++){
        this.unusedgameObjects.push(i);
    }
    for(var i = 0; i<this.playAnswers.length; i++){
        this.playAnswers[i].answers = [];
    }
    this.usedgameObjects = [];
    this.pickManyElements();
    this.updateScore();

}

SorterGame.prototype.stop = function() {
  $("#stopButton").hide();
  $("#startButton").show();
    this.end();
    this.removeElements();
    for(var i =0; i <this.addElementTimeouts.length; i++){
        clearTimeout(this.addElementTimeouts[i]);
    }

}

SorterGame.prototype.ScoreText= function(x,y,color,text){
    this.x=x;
    this.y=y;
    this.text=text;
    var ctx=this.ctx;
    //this.score= score;
    ctx.font = this.width + " " + this.height;
    ctx.fillStyle = color;
    ctx.fillText(this.text, this.x, this.y);
}
SorterGame.prototype.pickManyElements = function() {           //pick gameObject
    var self= this;
    this.totalCurrentgameObjects=0;
    this.currentgameObjects=[];
    this.removeElements();
    for (var i =0 ; i< getRandNumber(Math.min(this.elementsPerRound,this.unusedgameObjects.length)) +1; i++){   //an menoun ligotera apo osa exei kanei pick tha parei tosa osa prepei
        var unusedgameObject = getRandNumber(this.unusedgameObjects.length);
        var currentgameObject = this.unusedgameObjects[unusedgameObject];
        this.currentgameObjects.push(currentgameObject);
        this.unusedgameObjects.splice(unusedgameObject,1);
        this.usedgameObjects.push(this.currentgameObject);
    }
    function addElementClosure (gameObject, gameObject_i) {             // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
       return function() {
           self.addElement(gameObject, gameObject_i);
       }
       }

    for (var j=0; j<this.currentgameObjects.length; j++) {            //drawing gameObject
        var gameObject = this.gameObjects[this.currentgameObjects[j]];
        this.addElementTimeouts.push(setTimeout(addElementClosure(gameObject, j), 1500 * j));    //cancel to timeout
        //console.log("gameObject sto pickmnay",gameObject);
    }
}
SorterGame.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    this.valid = false;
    //return shapes
}
SorterGame.prototype.createTargets = function(categories){
    var zones = (categories.length*2)+1;
    var zoneSize= this.width/zones;
    for(var z=0; z<categories.length; z+=1){
        this.addShape(new ShapeTarget((1 + (z * 2)) * zoneSize, 505, zoneSize, 20, this.defaultColour, categories[z].text));
    }       //260
}

//dhmiourgia addelement gia na ftiaxnoume to gameObject
SorterGame.prototype.addElement = function(gameObject, gameObject_i){
    var canvas = this.canvas;
    var shape = null;

    //what if gameObject.type=shape? from preloaded.js
    switch(gameObject.type) {
        case 'circle':
            shape = new ShapeCircle( getRandNumber(canvas.width-20)+10, 10, 10, '#1E1E75', gameObject.right);
            break;

        case 'text':
            shape = new ShapeText( getRandNumber(canvas.width-100), 10, canvas.width*0.2, '#5F5654', gameObject.right, gameObject.text );
            break;

        case 'rectangle':
            shape = new ShapeRectangle( getRandNumber(canvas.width-20)+10, 10, 60, 20, '#1E1E75', gameObject.right);
            break;

        case 'image':
            var image = new Image();
            var w,h, maxWidth, maxHeight ;
            maxWidth = canvas.width*0.05;
            maxHeight = canvas.height*0.1;
            image.src = gameObject.img;
            h = image.height;
            w = image.width;
            if (h>maxHeight){
                h =  h * Math.min( maxHeight / h);
            }
            if (w>maxWidth){
             w =  w * Math.min( maxWidth / w);
            }
            shape = new ShapeImage( getRandNumber(canvas.width-100), 10, w,h, gameObject.img , gameObject.right);
            break;
        default:
            return;
    }
    //console.log(gameObject.type, gameObject, shape);
    shape.gameObject_i= gameObject_i;
    this.addShape(shape); //gia na min einai sta oria
}

SorterGame.prototype.removeElement = function(gameObject_i){
    for(var i=0; i<this.shapes.length; i++) {

        if(this.shapes[i].type =='element' && gameObject_i == this.shapes[i].gameObject_i){
            this.shapes.splice(i, 1);
            break;

        }
    }
}
SorterGame.prototype.removeElements = function() {
    var i = this.shapes.length;
    while(i--){
        if(this.shapes[i].type =='element'){
            this.shapes.splice(i, 1);
        }
    }
}

SorterGame.prototype.checkRoundEnd = function() {
    if(this.totalCurrentgameObjects==this.currentgameObjects.length) {       //edw elegxoume an exei teleiwsei to paixnidi
        if (this.unusedgameObjects.length > 0) {      //edw elegxoume an exei teleiwsei o guros
           // this.interval=this.interval*2;          //auksanoume thn taxuthta se kathe guro
            this.pickManyElements();
        } else {
            this.end();
        }
    }

}
//This is where we check if an element hits a correct or wrong target
// and react. ** changed enough
SorterGame.prototype.checkElementTarget = function(element) {
    var mystate = this;
    var shapes = this.shapes;               //this scope magia
    var l = shapes.length;
    var proceed=false;
    if(element.finish){                         //clears animation
        return;
    }
    if(element.outOfBounds && !element.finish){       //object out of bounds = missed object
        element.finish=true;
        var length = this.playAnswers.length;
        if(element.img!=undefined) {
          this.playAnswers[length-1].answers.push({type:"img", uri: element.img.currentSrc});
        }
        else{
        this.playAnswers[length-1].answers.push({type:"text", text: element.text});
      }
        this.totalCurrentgameObjects++;
        this.checkRoundEnd();
        return;
    }
    for (var i = l - 1; i >= 0; i--) {
        var myTarget = shapes[i];
        if (myTarget.type == "element") {      //mySel = mouse target
            continue;
        }
        if (myTarget.contains(element.x, element.y)) {
            if(element.img!=undefined) {
              this.playAnswers[i].answers.push({type:"img", uri: element.img.currentSrc});
            }
            else{
                this.playAnswers[i].answers.push({type:"text", text: element.text});
            }

            for(var k=0; k<=element.right.length;k++) {
                if (element.right[k] == i+1) {   //i = rand value
                 //hits the right target

                    myTarget.fill = '#00e600';
                    myTarget.img = myTarget.boxImageRight;

                    //this.removeElement(element.gameObject_i);

                    this.score++;
                    this.updateScore();
                    setTimeout(restoreTarget, 1000);
                    break;

                } else {
                    // wrong target
                    myTarget.fill = '#CC0000';
                    myTarget.img=myTarget.boxImageWrong;
                    setTimeout(restoreTarget, 1000);
                }

                function restoreTarget()  {
                    myTarget.fill = mystate.defaultColour;
                    myTarget.img=myTarget.boxImage;
                    // console.log(mystate.totalCurrentgameObjects,mystate.currentgameObjects.length);
                    mystate.checkRoundEnd();
                }

            }

            element.finish=true;
            this.totalCurrentgameObjects++;
            break;
        }
    }

}

SorterGame.prototype.updateScore = function() {
    document.getElementById("score").innerHTML=this.score + "/" + this.gameObjects.length;
}

SorterGame.prototype.clear = function() {
    //this.canvas.width = this.canvas.width;
    // Store the current transformation matrix
    // Use the identity matrix while clearing the canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
}

SorterGame.prototype.end = function() {
  var playAnswersTable = document.getElementById("playAnswersTable").tBodies;
  var scoreModal = document.getElementById("score-modal");
  var newRow, newCell, text, answer;
  $("#gameOverModal").show();
  $("#stopButton").hide();
  $("#startButton").show();
    this.removeElements();
    for(var i =0; i <this.addElementTimeouts.length; i++){
        clearTimeout(this.addElementTimeouts[i]);
    }
  //text = "Correct: " + this.score + " out of " + this.gameObjects.length;
  text = language.correct + this.score + language.outof +
      this.gameObjects.length;

  scoreModal.innerHTML = text;
  text = "";
    if (playAnswersTable.length>0){
    var tableRows = playAnswersTable[0].rows;
  if (tableRows.length>0){
    for (var i=tableRows.length-1; i>=0; i--) {
      playAnswersTable[0].deleteRow(i);
    }
  }
}
  for (var i=0; i<this.playAnswers.length; i++) {
    newRow= playAnswersTable[0].insertRow(i);
    newCell = newRow.insertCell (0);
    newCell.innerHTML = this.playAnswers[i].category;
    newCell = newRow.insertCell (1);
    text = ""
    for (var j=0; j<this.playAnswers[i].answers.length; j++){
      if(this.playAnswers[i].answers[j].type =="text"){
        text = "    " + this.playAnswers[i].answers[j].text;
      newCell.innerHTML +=  text;
      }
      else {
        thumbnail = document.createElement("img");
        thumbnail.src = this.playAnswers[i].answers[j].uri;
        thumbnail.style.width = "40px"
        thumbnail.style.height = "40px"
        newCell.appendChild(thumbnail)
      }

    }
  }

}
// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
SorterGame.prototype.draw = function() {     //edw mesw tou x,y orizoume tin kinisi
    // if our state is invalid, redraw and validate!
    if (true /*!this.valid*/) {

        var ctx = this.ctx;
        this.clear();

        // ** Add stuff you want drawn in the background all the time here **
        if(this.landmarks){
            drawConnectors(ctx, this.landmarks, HAND_CONNECTIONS,
                                {color: '#e0e0e0', lineWidth: 5});
            drawLandmarks(ctx, this.landmarks, {color: '#ababab', lineWidth: 2});
        }

        // draw all shapes
        var l = this.shapes.length;
        for (var i = 0; i < l; i++) {
            var shape = this.shapes[i];
            // We can skip the drawing of elements that have moved off the screen:
            if (shape.x > this.width || shape.y > this.height ||
                shape.x + shape.w < 0 || shape.y + shape.h < 0){
                    shape.outOfBounds=true;
            }
            if(shape.type=="element"){
              //  if((this.selection!=null)&&(this.selection.gameObject_i == shape.gameObject_i)) { uncomment an theloume na stamataei h kinhsh tou selected element
                 //   if (!this.dragging) {
                        shape.y += this.d / 1000 * this.interval;
                        this.valid = false;

                 //   }
              //  }
                this.checkElementTarget(shape);

            }
            shape.draw(ctx);
        }

        this.valid = true;
    }
}
SorterGame.prototype.getMouse = function(e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return {x: mx, y: my};
}

SorterGame.prototype.getPlayAnswers = function () {
  return this.playAnswers ;
}
