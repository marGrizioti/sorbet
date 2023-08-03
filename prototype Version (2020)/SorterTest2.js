

// Constructor for Shape objects to hold data for all drawn objects.
// For now they will just be defined as rectangles.

function Shape(x, y, w, h, fill, text) {
    // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    // But we aren't checking anything else! We could put "Lalala" for the value of x
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#5F5654';
    this.type = "target";
    this.text = text;
}



// Draws this shape to a given context (rectangle)
Shape.prototype.draw = function(ctx) {
    //console.log(width);
    ctx.fillStyle = this.fill;
    ctx.font = "25px Arial";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillText(this.text, this.x, this.y-5);
}


// Determine if a point is inside the shape's bounds
Shape.prototype.contains = function(mx, my) {
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
}

function ShapeImage(x, y, w, h, img, right) {
    // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    // But we aren't checking anything else! We could put "Lalala" for the value of x
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    var shape= this;
    var image= document.createElement('img');
    image.src=img;
    this.img= image;
    //this.fill = fill || '#AAAAAA';
    this.type = "element";
    this.right = right;
}

ShapeImage.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.img, this.x, this.y , this.w, this.h);
    ctx.closePath();
    //ctx.fillStyle = this.fill;
    //ctx.fillRect(this.x, this.y , this.w, this.h, 0, true);
    //ctx.fill();

}

ShapeImage.prototype.contains = function(mx, my) {
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
}

function ShapeRectangle(x, y, w, h, fill, right) {
    // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    // But we aren't checking anything else! We could put "Lalala" for the value of x
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#AAAAAA';
    this.type = "element";
    this.right = right;
}

ShapeRectangle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y , this.w, this.h, 0, true);
    ctx.fill();
    ctx.closePath();

}

ShapeRectangle.prototype.contains = function(mx, my) {
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
}

function ShapeCircle(x, y, r, fill, right) {
    // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    // But we aren't checking anything else! We could put "Lalala" for the value of x
    this.x = x || 0;
    this.y = y || 0;
    this.r = r || 1;
    this.fill = fill || '#AAAAAA';
    this.type = "element";
    this.right = right;
}


// Draws this shape to a given context (circle)
ShapeCircle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.fill;
    ctx.arc(this.x, this.y , this.r, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();

}

// Determine if a point is inside the shape's bounds
// vriskw an to shmeio einai mesa ston kuklo
ShapeCircle.prototype.contains = function(mx, my) {
    var distancesquared = (mx - this.x) * (mx - this.x) + (my - this.y) * (my - this.y);
    return distancesquared <= this.r* this.r;
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
}

function ShapeText(x, y, r, fill, right, text) {
    // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    // But we aren't checking anything else! We could put "Lalala" for the value of x
    this.x = x || 0;
    this.y = y || 0;
    this.r = r || 1;
    this.fill = fill || '#5F5654';
    this.type = "element";
    this.right = right;
    this.text = text;
}


ShapeText.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText(this.text, this.x, this.y + 30);
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.closePath();
    var measure = ctx.measureText(this.text);
    this.w=measure.width;
    this.h=30;

}

ShapeText.prototype.contains = function(mx, my) {
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
}

function CanvasState(canvas, questions, answers, elementsPerRound) {
    // **** First some setup! ****
    this.score=0;
    this.addElementTimeouts= [];            //gia na mhn vgainoune thn idia stigmh
    this.currentQuestions = [];
    this.elementsPerRound = elementsPerRound;
    this.questions = questions;
    this.answers= answers;
    this.defaultColour= 	"#9400D3" //"#72e7ff"
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.dataTable = document.getElementById("datatable");      //for the design table
    this.fields = [0,0,0];                                           //for the design table
    this.idCounter=0;
    this.dataTableHeader = document.getElementById("datatableHeader");
    this.images =[];
    this.fieldsCounter=0;

    console.log("answers mesa stin mhtera",answers);
    console.log("questions mesa sti mhtera",questions)


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

    // **** Then events! ****

    // This is an example of a closure!
    // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
    // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
    // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
    // This is our reference!
    var myState = this;


    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    // Up, down, and move are for dragging
    canvas.addEventListener('mousedown', function(e) {
        var mouse = myState.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
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
    }, true);
    canvas.addEventListener('mousemove', function(e) {
        if (myState.dragging){
            var mouse = myState.getMouse(e);
            // We don't want to drag the object by its top-left corner, we want to drag it
            // from where we clicked. Thats why we saved the offset and use it here
            myState.selection.x = mouse.x - myState.dragoffx;
           // myState.selection.y = mouse.y - myState.dragoffy;
            myState.valid = false; // Something's dragging so we must redraw
        }
    }, true);
    canvas.addEventListener('mouseup', function(e) {
        myState.dragging = false;
    }, true);

    myState.fitShapes(answers);
    //this.fitShapes(answers);


    // myState.addShape(new Shape(45, 260, 70, 50, this.defaultColour));
    // myState.addShape(new Shape(205, 260, 70, 50, this.defaultColour));
    // myState.addShape(new Shape(365, 260, 70, 50, this.defaultColour));

    // **** Options! ****
   // this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 30; //30
    this.d=50; //50
    this.containerNumber= answers.length;
    setInterval(function() { myState.draw(); }, myState.interval); //myState.interval
}

CanvasState.prototype.start = function() {
    this.score=0;
    this.currentQuestion = -1;
    this.unusedQuestions = [];
    this.interval=30;

    for(var i = 0; i<this.questions.length; i++){
        this.unusedQuestions.push(i);
    }

    this.usedQuestions = [];
    this.pickManyElements();
    this.updateScore();

}

CanvasState.prototype.stop = function() {
    this.removeElements();
    for(var i =0; i <this.addElementTimeouts.length; i++){
        clearTimeout(this.addElementTimeouts[i]);
    }
}

CanvasState.prototype.ScoreText= function(x,y,color,text){
    this.x=x;
    this.y=y;
    this.text=text;
    var ctx=this.ctx;
    //this.score= score;
    ctx.font = this.width + " " + this.height;
    ctx.fillStyle = color;
    ctx.fillText(this.text, this.x, this.y);

}



CanvasState.prototype.pickManyElements = function() {           //pick question
    var self= this;
    this.totalCurrentQuestions=0;
    this.currentQuestions=[];
    this.removeElements();
    for (var i =0 ; i< getRandNumber(Math.min(this.elementsPerRound,this.unusedQuestions.length)) +1; i++){   //an menoun ligotera apo osa exei kanei pick tha parei tosa osa prepei
        var unusedQuestion = getRandNumber(this.unusedQuestions.length);
        var currentQuestion = this.unusedQuestions[unusedQuestion];
        this.currentQuestions.push(currentQuestion);
        this.unusedQuestions.splice(unusedQuestion,1);
        this.usedQuestions.push(this.currentQuestion);
    }
    function addElementClosure (question, question_i) {             // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
       return function() {
           self.addElement(question, question_i);
       }
       }

    for (var j=0; j<this.currentQuestions.length; j++) {            //drawing question
        var question = this.questions[this.currentQuestions[j]];
        this.addElementTimeouts.push(setTimeout(addElementClosure(question, j), 1500 * j));    //cancel to timeout
        console.log("question sto pickmnay",question);
    }
}

CanvasState.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    this.valid = false;
    //return shapes
}

CanvasState.prototype.fitShapes = function(answers){
    var zones = (answers.length*2)+1;
    var zoneSize= this.width/zones;
    console.log("answers stin fit",this.answers);
    for(var z=0; z<answers.length; z+=1){
        this.addShape(new Shape((1 + (z * 2)) * zoneSize, 560, zoneSize, 40, this.defaultColour, answers[z].text));
    }       //260
}



//dhmiourgia addelement gia na ftiaxnoume to question
CanvasState.prototype.addElement = function(question, question_i){


    var shape = null;
    if(question.type=='circle'){
        shape = new ShapeCircle( getRandNumber(canvas.width-20)+10, 10, 10, '#CC0000', question.right);
    }else if(question.type=='text'){
        shape = new ShapeText( getRandNumber(canvas.width-20)+20, 10, 10, '#CC0000', question.right, question.text );
    }
    else if(question.type=='rectangle'){
        shape = new ShapeRectangle( getRandNumber(canvas.width-20)+10, 10, 60, 20, '#1E1E75', question.right);
    }
    else if(question.type=='image'){
        shape = new ShapeImage( getRandNumber(canvas.width-20)+30, 10, (this.width)*0.06, (this.height)*0.11, question.img , question.right);
    }
    shape.question_i= question_i;
    this.addShape(shape); //gia na min einai sta oria
}

CanvasState.prototype.removeElement = function(question_i){
    for(var i=0; i<this.shapes.length; i++) {

        if(this.shapes[i].type =='element' && question_i == this.shapes[i].question_i){
            this.shapes.splice(i, 1);
            break;

        }
    }
}

CanvasState.prototype.removeElements = function() {
    var i = this.shapes.length;
    while(i--){
        if(this.shapes[i].type =='element'){
            this.shapes.splice(i, 1);
        }
    }
}

CanvasState.prototype.checkRoundEnd = function() {
    if(this.totalCurrentQuestions==this.currentQuestions.length) {       //edw elegxoume an exei teleiwsei to paixnidi
        if (this.unusedQuestions.length > 0) {      //edw elegxoume an exei teleiwsei o guros
           // this.interval=this.interval*2;          //auksanoume thn taxuthta se kathe guro
            this.pickManyElements();
        } else {
            this.end();
        }
    }

}

CanvasState.prototype.checkElementTarget = function(element) {
    var mystate = this;
    var shapes = this.shapes;               //this scope magia
    var l = shapes.length;
    var proceed=false;
    if(element.finish){                         //clears animation
        return;
    }
    if(element.outOfBounds && !element.finish){
        element.finish=true;
        this.totalCurrentQuestions++;
        this.checkRoundEnd();
        return;
    }
    for (var i = l - 1; i >= 0; i--) {
        var mySel = shapes[i];
        if (mySel.type == "element") {      //mySel target sto opoio eimaste pontiki
            continue;
        }
        if (mySel.contains(element.x, element.y)) {
            console.log("object values",Object.values(element));
            console.log("to i einai",i);
            for(var k=0; k<=element.right.length;k++) {
                if (element.right[k] == i+1) {   //i=timi tou rand
                    mySel.fill = '#00e600';
                    this.score++;
                    this.updateScore();
                    // text("score:",this.score);
                    console.log(element.right, i);
                    console.log("score:",this.score);
                    break;
                } else {
                    mySel.fill = '#CC0000';
                }
            }
            proceed=true;
            element.finish=true;
            this.totalCurrentQuestions++;
            //console.log(score);
            break;
        }
     //return this.score;
    }

   // var currentScore = new ScoreText("red",280,20,"text");

    //currentScore.text= "score:"+this.score;

    if(proceed==true){
    //this.removeElement(element.question_i);
        setTimeout(function(){
            mySel.fill = mystate.defaultColour;
           // console.log(mystate.totalCurrentQuestions,mystate.currentQuestions.length);
        mystate.checkRoundEnd();
        },1000);

    }
}

CanvasState.prototype.updateScore = function() {
    document.getElementById("score").innerHTML=this.score + "/" + this.questions.length;
}


/*CanvasState.prototype.checkElementTarget = function(element) {
    var mystate = this;
    var shapes = this.shapes;               //this scope magia
    var l = shapes.length;
    for (var i = l - 1; i >= 0; i--) {
        if (shapes[i].contains(element.x, element.y)) {
           // var mySel = shapes[i];
            if (shapes[i].type == "element") {      //mySel target sto opoio eimaste pontiki
                continue;
            }
            if (element.right == i) {          //i=timi tou rand
                shapes[i].fill = '#00e600';
            } else
            {
                shapes[i].fill = '#CC0000';
            }
            this.removeElement();
            setTimeout(function(){                  //closure anti gia function
                shapes[i].fill = mystate.defaultColour;
                if(mystate.currentQuestion < mystate.questions.length-1) {
                    mystate.addElement();
                } else {
                    mystate.end();
                }
            },1000);

        }
    }
}*/

CanvasState.prototype.clear = function() {
    //this.canvas.width = this.canvas.width;
    // Store the current transformation matrix
// Use the identity matrix while clearing the canvas
    this.ctx.clearRect(0, 0, this.width, this.height);



}

CanvasState.prototype.end = function() {
    alert("finish");
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function() {     //edw mesw tou x,y orizoume tin kinisi
    // if our state is invalid, redraw and validate!
    if (true) {
        var ctx = this.ctx;
        this.clear();
        // ** Add stuff you want drawn in the background all the time here **

        // draw all shapes
        var l = this.shapes.length;
        for (var i = 0; i < l; i++) {
            var shape = this.shapes[i];
         //   console.log("SHAPES STHN DRW EINAI",shape);
            // We can skip the drawing of elements that have moved off the screen:
            if (shape.x > this.width || shape.y > this.height ||
                shape.x + shape.w < 0 || shape.y + shape.h < 0){
                    shape.outOfBounds=true;
            }
            if(shape.type=="element"){
              //  if((this.selection!=null)&&(this.selection.question_i == shape.question_i)) { uncomment an theloume na stamataei h kinhsh tou selected element
                 //   if (!this.dragging) {
                        shape.y += this.d / 1000 * this.interval;
                        this.valid = false;

                 //   }
              //  }
                this.checkElementTarget(shape);
                //console.log("shape sthn checkelement:",shape);
                console.log(this.score);
                //console.log("returned score:",myscore);
            }
            shape.draw(ctx);
        }
        // draw selection
        // right now this is just a stroke along the edge of the selected Shape
        /*if (this.selection != null) {
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            var mySel = this.selection;
            ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
        }*/

        // ** Add stuff you want drawn on top all the time here **

        this.valid = true;
    }
}

/*CanvasState.prototype.showScore = function() {
    var myScore= this.checkElementTarget(element);
    console.log("MY SOCRE:",myScore);
}*/


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
CanvasState.prototype.getMouse = function(e) {
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

// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
//init();



function getRandNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
// Now go make something amazing!