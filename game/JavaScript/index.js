/**
 * banner图
 */
function Banner() {
    this.bannerElem = document.getElementById("banner");
    this.img = ["./img/banner/banner1.jpg", "./img/banner/banner2.jpeg"];
    this.imgSize = ["800px", "750px"];
    this.banners = [];
    var middle = 1;//当前显示的位置
    var index = 0;//当前显示的图片
    var moving = false;//是否正在移动banner图
    var that = this;

    this.createBanner = function () {//创建banner图
        for (var i = 0, j = this.img.length - 1; i < 3; ++i, j = (j + 1) % this.img.length) {
            var banner = document.createElement("div");
            banner.style.background = "url(" + this.img[j] + ") no-repeat center";
            banner.style.backgroundSize = this.imgSize[j];
            banner.style.height = "300px";
            banner.style.width = "750px";
            this.bannerElem.appendChild(banner);
            this.banners[i] = banner;
        }
        this.banners[0].style.left = "-750px";
        this.banners[2].style.left = "750px";
    }

    this.bannerMove = function () {//图片移动控制
        var right = document.getElementById("imgChangeRignt");
        var left = document.getElementById("imgChangeLeft");
        left.onclick = function () {//左移
            that.move(0);
        }
        right.onclick = function () {//右移
            that.move(1);
        }
        setInterval(function () {//自动移动
            that.move(0);
        }, 2000);
    }

    this.move = function (direction) {//banner图移动方向
        if (!moving) {//判断是否正在移动
            var left = 0;
            moving = true;
            if (direction == 0) {//如果向左移动
                var middleNext = (middle + 1) % 3;//当前显示位置的下一个
                var middlePrior = ((middle - 1) % 3) == -1 ? 2 : ((middle - 1) % 3);//当前显示位置的上一个
                var moveTimeId = setInterval(function () {
                    left -= 3;
                    that.banners[middle].style.left = left + "px";
                    that.banners[middleNext].style.left = left + 750 + "px";
                    if (left <= -750) {//到达位置停止移动
                        moving = false;
                        clearInterval(moveTimeId);
                        that.banners[middlePrior].style.left = "750px";//将上一个的位置移到后面
                        middle = (middle + 1) % 3;//改变当前显示位置
                        middlePrior = (middlePrior + 1) % 3;
                        middleNext = (middleNext + 1) % 3;
                        //改变当前显示图片
                        index = (index + 1) % that.img.length;
                        var indexNext = (index - 1) % that.img.length == -1 ? that.img.length - 1 : (index - 1) % that.img.length;//下一张显示图片
                        var indexPrior = (index + 1) % that.img.length;//上一张显示图片
                        //将图片分配到正确位置
                        that.banners[middleNext].style.background = "url(" + that.img[indexNext] + ") no-repeat center";
                        that.banners[middlePrior].style.background = "url(" + that.img[indexPrior] + ") no-repeat center";
                        //改变图片大小
                        that.banners[middleNext].style.backgroundSize = that.imgSize[indexNext];
                        that.banners[middlePrior].style.backgroundSize = that.imgSize[indexPrior];
                    }
                }, 1);
            }
            if (direction == 1) {//如果向右移动
                var middleNext = (middle + 1) % 3;//当前显示位置的下一个
                var middlePrior = ((middle - 1) % 3) == -1 ? 2 : ((middle - 1) % 3);//当前显示位置的上一个
                var moveTimeId = setInterval(function () {
                    left += 3;//移动
                    that.banners[middle].style.left = left + "px";
                    that.banners[middlePrior].style.left = left - 750 + "px";
                    if (left >= 750) {//到达位置停止
                        moving = false;
                        clearInterval(moveTimeId);
                        that.banners[middleNext].style.left = "-750px";//将下一个的位置移到前面
                        middle = ((middle - 1) % 3) == -1 ? 2 : ((middle - 1) % 3);//改变当前显示位置
                        middlePrior = ((middlePrior - 1) % 3) == -1 ? 2 : ((middlePrior - 1) % 3);
                        middleNext = ((middleNext - 1) % 3) == -1 ? 2 : ((middleNext - 1) % 3);
                        //改变当前显示图片
                        index = (index - 1) % that.img.length == -1 ? that.img.length - 1 : (index - 1) % that.img.length;
                        var indexNext = (index + 1) % that.img.length;//下一张显示图片
                        var indexPrior = (index - 1) % that.img.length == -1 ? that.img.length - 1 : (index - 1) % that.img.length;//上一张显示图片
                        //将图片分配到正确位置
                        that.banners[middleNext].style.background = "url(" + that.img[indexNext] + ") no-repeat center";
                        that.banners[middlePrior].style.background = "url(" + that.img[indexPrior] + ") no-repeat center";
                        //改变图片大小
                        that.banners[middleNext].style.backgroundSize = that.imgSize[indexNext];
                        that.banners[middlePrior].style.backgroundSize = that.imgSize[indexPrior];
                    }
                }, 1);
            }
        }
    }
}

/**
 * 游戏
 */
function Games() {
    this.gamesId = ["AircraftWar", "Sokoban"];//游戏ID
    this.gamesName = ["飞 机 大 战", "推 箱 子"];//游戏名
    this.games = [];//游戏对象
    var that = this;

    this.creatGameDiv = function () {//创建游戏列表
        var content = document.getElementById("content");
        var gameDiv = [];
        var hoverBlackDiv = [];
        for (var i = 0; i < this.gamesId.length; ++i) {
            var span1 = document.createElement("span");
            span1.innerHTML = "PLAY";
            hoverBlackDiv[i] = document.createElement("div");
            hoverBlackDiv[i].setAttribute("class", "hoverBlack");
            hoverBlackDiv[i].appendChild(span1);
            hoverBlackDiv[i].style.top = "200px";
            var img = document.createElement("img");
            img.src = "./img/" + this.gamesId[i] + "/gameImg.jpg";
            img.setAttribute("class", "gameImg");
            var span2 = document.createElement("span");
            span2.setAttribute("class", "gameName");
            span2.innerHTML = this.gamesName[i];
            var gameInfoDiv = document.createElement("div");
            gameInfoDiv.setAttribute("class", "gameInfo clear");
            gameInfoDiv.appendChild(img);
            gameInfoDiv.appendChild(span2);
            gameInfoDiv.appendChild(hoverBlackDiv[i]);
            gameDiv[i] = document.createElement("div");
            gameDiv[i].setAttribute("class", "game");
            gameDiv[i].appendChild(gameInfoDiv);
            content.appendChild(gameDiv[i]);
        }

        for (var i = 0; i < gameDiv.length; ++i) {
            var topUp = false;
            //鼠标移上效果
            gameDiv[i].onmouseover = function () {
                topUp = true;
                var thisDiv = this;
                var top = parseInt(hoverBlackDiv[gameDiv.indexOf(this)].style.top);
                var moveId = setInterval(function () {
                    if (top >= 0) {
                        top -= 5;
                        hoverBlackDiv[gameDiv.indexOf(thisDiv)].style.top = top + "px";
                    }
                    if (top == 0 || !topUp) {
                        clearInterval(moveId);
                    }
                }, 1);
            }
            //鼠标移出效果
            gameDiv[i].onmouseout = function () {
                topUp = false;
                var thisDiv = this;
                var top = parseInt(hoverBlackDiv[gameDiv.indexOf(this)].style.top);
                var moveId = setInterval(function () {
                    if (top <= 200) {
                        top += 5;
                        hoverBlackDiv[gameDiv.indexOf(thisDiv)].style.top = top + "px";
                    }
                    if (top == 200 || topUp) {
                        clearInterval(moveId);
                    }
                }, 1);
            }
            //点击效果
            gameDiv[i].onclick = function () {
                var gameInterface = document.getElementById(that.gamesId[gameDiv.indexOf(this)]);
                if (gameInterface.style.display != "block") {
                    gameInterface.style.display = "block";
                    that.games[gameDiv.indexOf(this)].load();
                }
            }

        }
    }
}

/**
 * 推箱子类
 */
function Sokoban() {
    this.gameInterface = document.getElementById("Sokoban");//游戏界面
    var that = this;

    this.load = function () {//加载游戏
        this.gameInterface.style.display = "block";
        document.getElementById("sokobanExit").onclick = function () {
            that.exit();
        }
    }

    this.exit = function () {//退出游戏
        this.gameInterface.style.display = "none";
    }
}

var banner = new Banner();
banner.createBanner();//创建banner图
banner.bannerMove();//banner图移动
var games = new Games();
var aircraft = new AircraftWarGame();
var sokoban = new Sokoban();
games.games[0] = aircraft;
games.games[1] = sokoban;
games.creatGameDiv();//创建游戏列表