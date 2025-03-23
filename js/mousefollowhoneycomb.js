const patternElement = document.getElementById("pattern");




//START OF MOUSE FOLLOW HONEYCOMB
// store the mouse position:
let mousePosition = {
    x: 0,
    y: 0
}


//function that tracks the mouse position:
document.addEventListener('mousemove', (mouse) => {
    //store the current mouse position:
    mousePosition = {
        x: mouse.clientX,
        y: mouse.clientY
    };
});



//move smoothly the honeycomb:
const loop = () => {

    const gradientElement = document.getElementById('gradient');

    gradientElement.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;



    // Request the NEXT Animation frame
    window.requestAnimationFrame(loop);
};


// Start the Animation loop
window.requestAnimationFrame(loop);

//END OF MOUSE FOLLOW HONEYCOMB



//START DISPLAYING THE HONEYCOMB


//store the number of hexagons in the honeycomb:


//store the gap between the hexagons:
const gap = 2;
function loadHoneycomb() {
    //less efficient way to store the number of hexagons in the honeycomb:
    const hexagonCountY = Math.ceil(patternElement.clientHeight / 40) + 1;
    const hexagonCountX = Math.ceil(patternElement.clientWidth / 48) + 1;
    //need to recalculate the number of hexagons in the honeycomb each call 

for (let y = 0; y < hexagonCountY; y++) {
    for (let x = 0; x < hexagonCountX; x++) {
        //create a hexagon element:
        const hexagon = document.createElement('div');
        hexagon.classList.add('hexagon');
        // hexagon.style.left = `${x * 48 + ((y % 24) % 48)}px`;
        // hexagon.style.top = `${y * 40}px`;
        // hexagon.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;

        //set size = 
        hexagon.style = `
         background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODciIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgODcgMTAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMi4xOTg3MyAyNi4xNTQ3TDQzLjUgMi4zMDk0TDg0LjgwMTMgMjYuMTU0N1Y3My44NDUzTDQzLjUgOTcuNjkwNkwyLjE5ODczIDczLjg0NTNWMjYuMTU0N1oiIGZpbGw9IiMxMzEyMTciIHN0cm9rZT0iIzEzMTIxNyIgc3Ryb2tlLXdpZHRoPSI0Ii8+Cjwvc3ZnPgo=') no-repeat;
        color:rgba(60, 18, 228, 0.05);
         width: 44px;
        height: 50px;
        background-size: contain;
        position: absolute;
        top: ${y * 40}px;
        left: ${x * 48 + ((y * 24) % 48)}px;
        `;

        patternElement.appendChild(hexagon);
    }//end inner for loop
}//end outer for loop

}//end loadHoneycomb function

//only load the hexagons when the window is resized or loaded:
window.addEventListener("resize", loadHoneycomb);
window.addEventListener("load", loadHoneycomb);


