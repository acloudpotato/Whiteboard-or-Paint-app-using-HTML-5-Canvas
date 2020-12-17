window.addEventListener("load", () => {

    // selecting canvas element
    const canvas = document.querySelector("#canvas");

    // to draw create a "c" named context 
    const c = canvas.getContext('2d');

    // adjusting the size of canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // selecting color input
    let colorInput = document.querySelector("#color");

    // selecting brush stroke size
    let brushrange = document.querySelector("#range");

    // eraser element 
    let eraserButton = document.querySelector("#eraser");

    // canvas clear element
    let clearButton = document.querySelector("#clear");

    // saving sketch
    let saveButton = document.querySelector("#save");

    // line pencil element
    let lineButton = document.querySelector("#line");

    // rectangle element 
    let rectangleButton = document.querySelector("#rectangle");
    
    // all functions used in this project
   
    // color input function
    function color() {
        colorValue = colorInput.value;
        return colorValue;
    };
    color();

    // canvas clearing function
    function clearCanvas(){
        c.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    
    // line width function
    function rangeWidth(){
        lineWidthSize = brushrange.value;
        return lineWidthSize;
    };
    
    // saving the image
    function save(e){
        var dataURL = canvas.toDataURL('image/png');
        saveButton.href = dataURL;
    };

    // eraser button logic
    let buttonValue = true;
    function toggle() {
        buttonValue = buttonValue ? false : true;
    };
    
    // all tool parameters
    function tools(){
        c.lineCap = 'round';
        c.lineWidth = rangeWidth();
        if(buttonValue == true){
            c.strokeStyle = color();
        }else {
            c.strokeStyle = "#FFFFFF";
        };
    };
    

    // line drawing logic
    function lineDraw(){
        let startPainting = false;

        function start(){
            startPainting = true;
            draw(e);
         };
    
        function draw(e){
            if(!startPainting) return;
            tools();
            //start line drawing
            c.lineTo(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
            c.stroke();
            c.beginPath();
            c.moveTo(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
         };

        function end(){
            startPainting = false;
            c.beginPath();
         };

        // Event listeners for linedraw
        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mouseup', end);
        canvas.addEventListener('mousemove', draw);
    };

    // rectangle drawing logic
    function rectangleDraw(){
        let startPainting = false;
        // initializing the mouse position
        var mousePosition = {
            x: 0,
            y: 0
         };

        function rectdraw(e){
            if(!startPainting) return;
            c.fillStyle = color();
            c.fillRect(mousePosition.x, mousePosition.y, mousePosition.w, mousePosition.h);
         };

        function positonMovement(e){
            mousePosition.w = (e.clientX - this.offsetLeft) - mousePosition.x;
            mousePosition.h = (e.clientY - this.offsetTop) - mousePosition.y;
         }; 

        function rectstart(e){
            startPainting = true;
            c.beginPath();
            mousePosition.x = e.clientX - this.offsetLeft;
            mousePosition.y = e.clientY - this.offsetTop;
            canvas.addEventListener('mousemove', rectdraw);
         };
    
        function rectend(){
            startPainting = false;
         };
        // Event listeners for rectangle drawing
        canvas.addEventListener('mousedown', rectstart);
        canvas.addEventListener('mouseup', rectend);
        canvas.addEventListener('mousemove', positonMovement);
    };
        colorInput.addEventListener('input', color);
        eraserButton.addEventListener('click', toggle);
        clearButton.addEventListener('click', clearCanvas);
        saveButton.addEventListener('click', save);
        lineButton.addEventListener('click', lineDraw);
        rectangleButton.addEventListener('click', rectangleDraw);
    
});