// window.addEventListener("load", function () {

function init() {
    // Access main canvas
    var canvas = document.getElementById("mainCanvas");

    // Set canvas height and width
    canvas.width = 700;
    canvas.height = 500;

    // 2D drawing context
    mainContext = canvas.getContext("2d");

    // Set main colors
    colors = [["#1962FF"], ["#1790E8"], ["#26DDFF"], ["#17E8D0"], ["#19FFA4"]];

    // Draw circles on canvas
    drawCircles();
}

// Create 100 circles with random sizes and colors from my color palette
function drawCircles() {
    for (var i = 0; i < 100; i++) {
        mainContext.strokeStyle = colors[Math.floor(Math.random() * 5) + 1];
        mainContext.beginPath();
        mainContext.arc(Math.floor(Math.random() * (700) + 1), Math.floor(Math.random() * (500) + 1), Math.floor(Math.random() * (20) + 1), 0, 2 * Math.PI);
        mainContext.stroke();
    }
}