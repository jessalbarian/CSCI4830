function init() {
    // Access main canvas
    canvas = document.getElementById("mainCanvas");

    // Set canvas height and width
    canvas.width = 700;
    canvas.height = 500;

    // 2D drawing context
    mainContext = canvas.getContext("2d");
}

// Global variables
var colors = [["#1962FF"], ["#1790E8"], ["#26DDFF"], ["#17E8D0"], ["#19FFA4"]];

// Animates circles
requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);

    // Refresh canvas
    mainContext.fillStyle = "#ffffff";
    mainContext.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 100; i++) {
        var currentCircle = circleList[i];
        currentCircle.move();
        currentCircle.render();
    }
});

// Defines circle objects
var Circle = function (color) {
    // x and y coordinates
    this.x = Math.floor(Math.random() * (700) + 1);
    this.y = Math.floor(Math.random() * (500) + 1);

    // Radius
    this.r = Math.floor(Math.random() * (20) + 1);

    // Colors
    this.c = color;

    this.t = Math.random() * (50) + 1;
};

// Defines circle methods
Circle.prototype = {
    // constructor: Circle,

    // Draw circles
    render: function () {
        mainContext.strokeStyle = this.c;
        mainContext.beginPath();
        mainContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        mainContext.stroke();
    },

    // Move circles to the left
    move: function () {
        // Move to the left
        this.x = this.x - 1;

        // Move up and down
        this.y += (Math.sin(this.t/20))*1.2;

        // Moves circle from left to right of screen after it exits the screens
        if (this.x + this.r === 0) {
            this.x = canvas.width + this.r;
        }

        this.t++;
    }
};

var circleList = [];

// Create circle
function createCircle() {
    var circleObject = new Circle(colors[Math.floor(Math.random() * 5) + 1]);
    return circleObject;
}

for (var i = 0; i < 100; i++) {
    circleList.push(createCircle());
}

// TODO: up and down slightly