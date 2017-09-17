// Global variables
var colors = [["#1962FF"], ["#1790E8"], ["#26DDFF"], ["#17E8D0"], ["#19FFA4"]];
var circleList = [];
var mouse = {x: 0, y: 0, ox: 0, oy: 0, vx: 0, vy: 0};
var canvas = document.getElementById("mainCanvas");

// Initializes canvas
function init() {
    // Set canvas height and width
    canvas.width = 900;
    canvas.height = 600;

    // 2D drawing context
    mainContext = canvas.getContext("2d");
}


// Animates circles
requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);

    // Refresh canvas
    mainContext.fillStyle = "#ffffff";
    mainContext.fillRect(0, 0, canvas.width, canvas.height);

    //
    var fish = new Fish();
    fish.render();

    for (var i = 0; i < 100; i++) {
        var currentCircle = circleList[i];
        currentCircle.move();
        currentCircle.render();
    }
});


// Defines circle objects
var Circle = function (color) {
    // x and y coordinates
    this.x = Math.floor(Math.random() * (900) + 1);
    this.y = Math.floor(Math.random() * (600) + 1);

    // Radius
    this.r = Math.floor(Math.random() * (20) + 1);

    // Colors
    this.c = color;

    // Time: increments for every move
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

    // Move circles to the left and up/down
    move: function () {
        // Move to the left
        this.x = this.x - 1;

        // Move up and down: inside sin = rate of moving up and down; outside sin = change in height
        this.y += (Math.sin(this.t/20))*1.2;

        // Moves circle from left to right of screen after it exits the screens
        if (this.x + this.r <= 0) {
            this.x = canvas.width + this.r;
        }

        // Managing cursor interaction
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var d = Math.sqrt(dx * dx + dy * dy);

        // Checks for distance between cursor and objects
        if (d < 50) {
            if (d < 1) {
                d = 1;
            }
            d = Math.sqrt(d);
            // d*=5;
            this.x += mouse.vx/d;
            this.y += mouse.vy/d;
        }

        this.t++;
    }
};

// Defines circle objects
var Fish = function () {
    // x and y coordinates
    this.x = 0;
    this.y = 0;

    // Rotation
    this.rot = 0;

    // Time: increments for every move
    this.time = 0;
};

// Defines circle methods
Fish.prototype = {
    // constructor: Circle,

    // Draw fish
    render: function () {
        // Main oval
        mainContext.beginPath();
        mainContext.ellipse(300, 300, 50, 75, 1.5708, 0, 2 * Math.PI);
        mainContext.fillStyle = "orange";
        mainContext.fill();

        // One fin
        mainContext.beginPath();
        mainContext.ellipse(210, 280, 30, 45, 11.5708, 0, 2 * Math.PI);
        mainContext.fillStyle = "orange";
        mainContext.fill();

        // One fin
        mainContext.beginPath();
        mainContext.ellipse(210, 320, 30, 45, -10+1.5708, 0, 2 * Math.PI);
        mainContext.fillStyle = "orange";
        mainContext.fill();
    },

    // Move fish along path
    move: function () {

    }
};

// Add cursor interaction to bubbles
canvas.addEventListener('mousemove', function(e){
    // Gets canvas info
    var rect = canvas.getBoundingClientRect();

    // Update previous position: old one is now the new one
    mouse.ox = mouse.x;
    mouse.oy = mouse.y;

    // Update current position: compensates for position canvas with respect to the window
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    // Update velocity
    mouse.vx = mouse.x - mouse.ox;
    mouse.vy = mouse.y - mouse.oy;
});

// Add cursor interaction to bubbles
canvas.addEventListener('mouseout', function(e){
    // Update velocity
    mouse.vx = 0;
    mouse.vy = 0;
});



// Create circle
function createCircle() {
    var circleObject = new Circle(colors[Math.floor(Math.random() * 5) + 1]);
    return circleObject;
}

for (var i = 0; i < 100; i++) {
    circleList.push(createCircle());
}

//TODO: figure out path of fish, add bubbles as children to fish

