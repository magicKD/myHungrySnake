/**
 * 1.点击开始游戏--->startPage消失-->游戏开始
 * 2.随机出现食物，出现三节蛇开始运动
 * 3.按上下左右-->改变方向运动
 * 4.判断是否吃到食物-->食物消失蛇+1
 * 5.判断游戏结束，弹出结束框
 */


var startBtn = document.getElementById("startBtn");
var startP = document.getElementById("startP");
var close = document.getElementById("close");
var loserScore = document.getElementById("loserScore");
var lose = document.getElementById("lose");
var content = document.getElementById("content");
var startPage = document.getElementById("startPage");
var scoreBox = document.getElementById("score");
var startGameBool = true;
var startPauseBool = true;
//蛇的运动

var snakeMove;
var speed = 200;

function Snake(bench){
    var _this = {};
    _this._bench = bench;
    _this._snakeW = 20;
    _this._snakeH = 20;
    if (bench == "red"){
        _this.snakeBody = [
            [3, 1, "head"],
            [2, 1, "body"],
            [1, 1, "body"]
        ];
        //游戏属性
        _this.direct = "right";
        _this.score = 0;
        //判断能否转向
        _this.left = false;
        _this.right = false;
        _this.up = true;
        _this.down = true;
    } else{
        _this.snakeBody = [
            [3, 10, "head"],
            [2, 10, "body"],
            [1, 10, "body"]
        ];
        //游戏属性
        _this.direct = "right";
        _this.score = 0;
        //判断能否转向
        _this.left = false;
        _this.right = false;
        _this.up = true;
        _this.down = true;
    }
    /**
     * 生成蛇
     */
    _this.snake = function() {
        for (var i = 0; i < _this.snakeBody.length; i++) {
            var snake = document.createElement("div");
            snake.style.width = _this.snakeW + "px";
            snake.style.height = _this.snakeH + "px";
            snake.style.position = "absolute";
            snake.style.left = _this.snakeBody[i][0] * 20 + "px";
            snake.style.top = _this.snakeBody[i][1] * 20 + "px";
            snake.classList.add(_this.snakeBody[i][2]); //添加类名
            this.mapDiv.appendChild(snake).classList.add("snake");
            //判断蛇头方向
            switch (_this.direct) {
                case "right":
                    break;
                case "up":
                    snake.style.transform = "rotate(270deg)";
                    break;
                case "left":
                    snake.style.transform = "rotate(180deg)";
                    break;
                case "down":
                    snake.style.transform = "rotate(90deg)";
                    break;
                default:
                    break;
            }
        }
    }
    _this.move = function() {
        for (var i = snakeBody.length - 1; i >= 1; i--) {
            _this.snakeBody[i][0] = _this.snakeBody[i - 1][0];
            _this.snakeBody[i][1] = _this.snakeBody[i - 1][1];
        }
        switch (_this.direct) {
            case "right":
                _this.snakeBody[0][0] += 1;
                break;
            case "up":
                _this.snakeBody[0][1] -= 1;
                break;
            case "left":
                _this.snakeBody[0][0] -= 1;
                break;
            case "down":
                _this.snakeBody[0][1] += 1;
                break;
            default:
                break;
        }
        //删除原来那条蛇，重新渲染一条蛇
        removeClass("snake");
        snake();
        //碰撞检测
        console.log(_this.snakeBody[0][0] + " " + _this.snakeBody[0][1]);
        //1. 吃到食物了
        if (_this.snakeBody[0][0] == _this.foodX && _this.snakeBody[0][1] == _this.foodY) {
            //蛇长+1
            var snakeEndX = _this.snakeBody[_this.snakeBody.length - 1][0];
            var snakeEndY = _this.snakeBody[_this.snakeBody.length - 1][1];
            switch (_this.direct) {
                case "right":
                    _this.snakeBody.push([snakeEndX + 1, snakeEndY, "body"]);
                    break;
                case "up":
                    _this.snakeBody.push([snakeEndX, snakeEndY - 1, "body"]);
                    break;
                case "left":
                    _this.snakeBody.push([snakeEndX - 1, snakeEndY, "body"]);
                    break;
                case "down":
                    _this.snakeBody.push([snakeEndX, snakeEndY + 1, "body"]);
                    break;
    
            }
            //分数+1
            _this.score += 1;
            scoreBox.innerHTML = _this.score;
            //重新生成食物
            removeClass("food");
            food();
        }
        //2. 碰到边界了
        if (_this.snakeBody[0][0] < 0 || _this.snakeBody[0][0] > _this.mapW / 20) {
             console.log("碰到左右边界了 " + _this.mapW / 20);
            reloadGame();
        }
        if (_this.snakeBody[0][1] < 0 || _this.snakeBody[0][1] > _this.mapH / 20) {
             console.log("碰到上下边界了" + _this.mapH / 20);
            reloadGame();
        }
        var snakeHX = _this.snakeBody[0][0];
        var snakeHY = _this.snakeBody[0][1];
        for (var i = 1; i < _this.snakeBody.length; i++) {
            if (snakeHX == _this.snakeBody[i][0] && snakeHY == _this.snakeBody[i][1]) {
                 console.log("吃到自己了");
                reloadGame();
            }
        }
    }
    return _this;
}

init();
/**
 * 地图中以20为基本单位，实现坐标系
 */
function init() { //设置初始属性
    //地图--取得地图宽度
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20; //[x,y,attr]
    this.snakeBody = [
        [3, 1, "head"],
        [2, 1, "body"],
        [1, 1, "body"]
    ];
    //游戏属性
    this.direct = "right";
    this.score = 0;
    //判断能否转向
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    bindEvent();
   // startGame();

}

function startGame() {
    startPage.style.display = "none";
    startP.style.display = "block";
    //生成食物
    food();
    //生成蛇
    this.snake1 = Snake("red");
    this.snake2 = Snake("black");
    //snake1.snake();
    //snake2.snake();
    snake();
    
    //绑定键盘事件
    bindEvent();
}

/**
 * 生成食物
 */
function food() {
    var food = document.createElement("div");
    food.style.width = this.foodW + "px";
    food.style.height = this.foodH + "px";
    food.style.position = "absolute"; //绝对定位才能控制位置
    //优化生成食物的位置
    var bFind = false;
    while (!bFind){
        var tmpX = Math.floor(Math.random() * (this.mapW / 20));
        var tmpY = Math.floor(Math.random() * (this.mapH / 20));
        var bOK = true;
        for (var i = 0; i < this.snakeBody.length; i++){
            if (this.snakeBody[i][0] == tmpX && this.snakeBody[i][1] == tmpY){
                bOK = false;
                break;
            }
        }
        if (bOK){
            bFind = true;
            this.foodX = tmpX;
            this.foodY = tmpY;
        }
    }
    // this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    // this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + "px";
    food.style.top = this.foodY * 20 + "px";
    this.mapDiv.appendChild(food).setAttribute("class", "food");
}

/**
 * 生成蛇
 */
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement("div");
        snake.style.width = this.snakeW + "px";
        snake.style.height = this.snakeH + "px";
        snake.style.position = "absolute";
        snake.style.left = this.snakeBody[i][0] * 20 + "px";
        snake.style.top = this.snakeBody[i][1] * 20 + "px";
        snake.classList.add(this.snakeBody[i][2]); //添加类名
        this.mapDiv.appendChild(snake).classList.add("snake");
        //判断蛇头方向
        switch (this.direct) {
            case "right":
                break;
            case "up":
                snake.style.transform = "rotate(270deg)";
                break;
            case "left":
                snake.style.transform = "rotate(180deg)";
                break;
            case "down":
                snake.style.transform = "rotate(90deg)";
                break;
            default:
                break;
        }
    }
}

/**
 * 蛇移动的逻辑
 */
function move() {
    for (var i = snakeBody.length - 1; i >= 1; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case "right":
            this.snakeBody[0][0] += 1;
            break;
        case "up":
            this.snakeBody[0][1] -= 1;
            break;
        case "left":
            this.snakeBody[0][0] -= 1;
            break;
        case "down":
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    //删除原来那条蛇，重新渲染一条蛇
    removeClass("snake");
    snake();
    //碰撞检测
    console.log(this.snakeBody[0][0] + " " + this.snakeBody[0][1]);
    //1. 吃到食物了
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        //蛇长+1
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case "right":
                this.snakeBody.push([snakeEndX + 1, snakeEndY, "body"]);
                break;
            case "up":
                this.snakeBody.push([snakeEndX, snakeEndY - 1, "body"]);
                break;
            case "left":
                this.snakeBody.push([snakeEndX - 1, snakeEndY, "body"]);
                break;
            case "down":
                this.snakeBody.push([snakeEndX, snakeEndY + 1, "body"]);
                break;

        }
        //分数+1
        this.score += 1;
        scoreBox.innerHTML = this.score;
        //重新生成食物
        removeClass("food");
        food();
    }
    //2. 碰到边界了
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] > this.mapW / 20) {
         console.log("碰到左右边界了 " + this.mapW / 20);
        reloadGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > this.mapH / 20) {
         console.log("碰到上下边界了" + this.mapH / 20);
        reloadGame();
    }
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]) {
             console.log("吃到自己了");
            reloadGame();
        }
    }
}

/**
 * 游戏结束，重新加载游戏
 */
function reloadGame() {
    //清除对象，暂停计时器
    removeClass("snake");
    removeClass("food");
    clearInterval(snakeMove);
    //重新加载
    //蛇
    this.snakeBody = [
        [3, 1, "head"],
        [2, 1, "body"],
        [1, 1, "body"]
    ];
    //游戏属性
    this.direct = "right";
    //判断能否转向
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    
    //弹框显示
    lose.style.display = "block";
    loserScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;

    startGameBool = true;
    startPauseBool = true;
    startP.setAttribute("src", "img/start.png");

}


/**
 * 删除元素
 */
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length) {
        //找到元素的爸爸，然后爸爸不要它了，好可怜的被删除了
        ele[0].parentNode.removeChild(ele[0]);
    }
}

/**
 * 绑定事件
 */
function bindEvent() {
    //键盘按下
    // document.onkeydown = function (e) {
    //     var code = e.keyCode;
    //     setDirect(code);
    // }
    //鼠标点击
    close.onclick = function(){
        lose.style.display = "none";
        startPage.style.display = "block";
        // startAndPause();
    }
    startBtn.onclick = function(){
        startAndPause();
    }
    startP.onclick = function(){
        startAndPause();
    }
}


/**
 * 开始暂停游戏
 */
function startAndPause(){
    if (startPauseBool){
        if (startGameBool){
            startGame();
            startGameBool = false;
        }
        startP.setAttribute("src", "img/pause.png");
        //键盘按下
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDirect(code);
        }
        //一直在动
        snakeMove = setInterval(function () {
            move();
        }, speed)
        startPauseBool = false;
    } else{
        startP.setAttribute("src", "img/start.png");
        clearInterval(snakeMove);
        document.onkeydown = function(e){
            e.returnValue = false;
            return false;
        };
        startPauseBool = true;
    }
}

/**
 * 根据键盘按键改变方向
 */
function setDirect(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = "left";
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = "up";
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = "right";
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = "down";
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;

        default:
            break;
    }
}