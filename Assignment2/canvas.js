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
var Fish = function (x, y, size) {
    // x and y coordinates
    this.x = x;
    this.y = y;

    // Size of fish (small or large)
    this.size = size;

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
        mainContext.ellipse(this.x, this.y, (50 * this.size), (75 * this.size), 1.5708, 0, 2 * Math.PI);
        mainContext.fillStyle = "orange";
        mainContext.fill();

        // One fin
        mainContext.beginPath();
        mainContext.ellipse(this.x - (90 * this.size), this.y - (20 * this.size), (30 * this.size), (45 * this.size), 11.5708, 0, 2 * Math.PI);
        mainContext.fillStyle = "orange";
        mainContext.fill();

        // Another fin
        mainContext.beginPath();
        mainContext.ellipse(this.x - (90 * this.size), this.y + (20 * this.size), (30 * this.size), (45 * this.size), -8.4292, 0, 2 * Math.PI);
        mainContext.fillStyle = "orange";
        mainContext.fill();
    },

    // Move fish along path
    move: function () {
        // Move to the right
        this.x = this.x + 2;

        // Moves fish from right to left of screen after it exits the screens
        if (this.x - 120 >= 900) {
            this.x = -75;
        }
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

var bigFish = new Fish(300, 300, 1);
var smallFish = new Fish(200, 400, 0.5);

// Animates circles
requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);

    // Refresh canvas
    mainContext.fillStyle = "#29abe2";
    mainContext.fillRect(0, 0, canvas.width, canvas.height);

    bigFish.render();
    smallFish.render();
    // bigFish.move();

    for (var i = 0; i < 100; i++) {
        var currentCircle = circleList[i];
        currentCircle.move();
        currentCircle.render();
    }
});

