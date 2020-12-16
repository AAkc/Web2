/**
 * 飞机大战游戏类
 */
function AircraftWarGame() {
    this.gameInterface = new GameInterface();//游戏界面
    this.hero = null;//主角
    this.enemys = [];//敌人数组
    this.enemysNum = 0;//敌人数量
    this.score = 0;
    this.maxScore = 0;
    var that = this;//当前对象
    var createEnrmyTimeId;

    this.load = function () {//加载游戏
        this.gameInterface.backGroundMove();//背景移动
        this.gameInterface.startInterfaceRun();//开始界面运行
        this.score = 0;
        var start = document.getElementById("start");//获取开始按键
        start.src = "./img/AircraftWar/start1.png";//开始按键效果
        start.onmouseover = function () {
            start.src = "./img/AircraftWar/start2.png";
        }
        start.onmouseout = function () {
            start.src = "./img/AircraftWar/start1.png";
        }
        start.onclick = function () {//点击开始按键
            that.gameInterface.interfaceChange();//转换游戏界面
            that.hero = new Hero();
            that.run();
        }
        document.getElementById("aircraftWarExit").onclick = function() {//退出按键
            that.hero.state = 1;
        }
    }

    this.run = function () {//运行游戏
        var scoreElem = document.getElementById("score");
        this.hero.run(this.gameInterface.runInterface);//主角运行
        this.createEnrmy();//生成敌人
        var timeId = setInterval(function () {//显示得分
            scoreElem.innerHTML = that.score;
            if (that.score > that.maxScore) {
                that.maxScore = that.score;
            }
            if (that.hero.state == 1) {//判断游戏结束
                scoreElem.innerHTML = 0;
                that.over();
                clearInterval(timeId);
            }
        }, 1);
    }

    this.over = function () {//停止游戏
        clearInterval(createEnrmyTimeId);//停止生成敌人
        this.gameInterface.menuInterface();//弹出菜单
        this.enemysNum = 0;
        this.score = 0;

        var replay = document.getElementById("replay");
        var out = document.getElementById("out");
        replay.onclick = function () {//点击重新开始
            that.gameInterface.menu.style.display = "none";//关闭菜单
            that.hero = new Hero();//重新创建主角
            that.run();
        }
        out.onclick = function () {//点击退出游戏
            that.gameInterface.stop();
            for (var i = 0; i < that.enemys.length; ++i) {
                if(that.enemys[i] != null) {//清空游戏界面内敌人
                    that.enemys[i].remove();
                }
            }
        }
    }

    this.createEnrmy = function () {//生成敌人
        var sumNum = 10;//敌人数组容量
        for (var i = 0; i < sumNum; ++i) {//初始化敌人数组
            this.enemys[i] = null;
        }
        var index = 0;
        createEnrmyTimeId = setInterval(function () {
            if (that.enemysNum < sumNum) {//当前敌人数量小于数组容量时生成敌人
                while (that.enemys[index] != null) {
                    index = (index + 1) % sumNum;
                }
                var enemy = new Enemy(index);
                enemy.run(that.gameInterface.runInterface);
                that.enemys[index] = enemy;//将敌人装进数组中
                that.enemysNum++;
                index = (index + 1) % sumNum;
            }
        }, parseInt(Math.random() * 800) + 200);//生成敌人间隔时间随机
    }

}

/**
 * 游戏界面类
 */
function GameInterface() {
    this.gameInterface = document.getElementById("AircraftWar");//获取游戏界面
    this.startInterface = document.getElementById("startInterface");//获取游戏开始界面
    this.runInterface = document.getElementById("runInterface");//获取游戏运行界面
    this.menu = document.getElementById("menu");
    var that = this;//当前对象
    this.startInterface.style.display = "block";
    this.runInterface.style.display = "none";
    this.menu.style.display = "none";
    var backGroundTimeId;
    var heroAnimationTimeId;

    this.backGroundMove = function () {//游戏背景移动
        var y = 0;
        backGroundTimeId = setInterval(function () {
            that.gameInterface.style.backgroundPosition = "0 " + y + "px";
            y = (y + 1) % 640;
        }, 35);
    }
    this.startInterfaceRun = function () {//开始界面运行
        var heroStart = document.getElementById("heroStart");
        var heroAnimation = ["./img/AircraftWar/hero1.png", "./img/AircraftWar/hero2.png"];
        var index = 0;
        heroAnimationTimeId = setInterval(function () {//播放主角动画
            heroStart.src = heroAnimation[index];
            index = (index + 1) % 2;
        }, 160);
    }
    this.interfaceChange = function () {//游戏界面转换
        if (this.startInterface.style.display == "none") {
            this.startInterface.style.display = "block";
        } else {
            this.startInterface.style.display = "none";
        }
        if (this.runInterface.style.display == "none") {
            this.runInterface.style.display = "block";
        } else {
            this.runInterface.style.display = "none";
        }
    }
    this.stop = function () {//停止
        clearInterval(backGroundTimeId);
        clearInterval(heroAnimationTimeId);
        this.gameInterface.style.display = "none";
        this.menu.style.display = "none";
        this.interfaceChange();
    }
    this.menuInterface = function () {//菜单效果
        this.menu.style.display = "block";
        var score = document.getElementById("menuScore");
        var maxScore = document.getElementById("menuMaxScore");
        score.innerHTML = "得分：" + aircraft.score;
        maxScore.innerHTML = "最高分：" + aircraft.maxScore;
        replay.onmouseover = function () {
            replay.style.height = "35px";
        }
        replay.onmouseout = function () {
            replay.style.height = "30px";
        }
        out.onmouseover = function () {
            out.style.height = "35px";
        }
        out.onmouseout = function () {
            out.style.height = "30px";
        }
    }
}

/**
 * 主角类
 */
function Hero() {
    this.x = 160;//主角位置
    this.y = 430;
    this.hero = document.getElementById("heroRun");//获取主角
    var that = this;//获取本对象
    this.animationImg = [//动画图片
        ["./img/AircraftWar/hero1.png", "./img/AircraftWar/hero2.png"],//普通动画
        ["./img/AircraftWar/hero_blowup1.png", "./img/AircraftWar/hero_blowup2.png", "./img/AircraftWar/hero_blowup3.png"]//死亡动画
    ];
    this.state = 0;//主角状态 0正常 1死亡

    var shootTimeId;
    var attackedtimeId;

    this.animation = function () {//主角动画
        var index = 0;
        var animationtimeId = setInterval(function () {
            that.hero.src = that.animationImg[that.state][index];
            index = index + 1;//循环播放
            if (that.state == 0) {//死亡动画只播放一次
                if (index >= 2) {
                    index = 0;
                }
            }
            if (index > 2) {//播放完死亡动画后
                clearInterval(animationtimeId);
                clearInterval(shootTimeId);
                clearInterval(attackedtimeId);
            }

        }, 160);
    }

    this.move = function (runInterface) {//鼠标控制主角移动
        runInterface.onmousemove = function (e) {
            if (that.state == 0) {//当主角死亡停止移动
                that.x = e.clientX - 581 - 24;
                that.y = e.clientY - 31 - 30;
            }
            that.hero.style.left = that.x + "px";
            that.hero.style.top = that.y + "px";
        }
    }

    this.shooting = function (runInterface) {//射击
        shootTimeId = setInterval(function () {//将子弹装入数组中，数组最大长度为10
            var bullet = new Bullet(that.x + 23, that.y - 3);
            bullet.run(runInterface);//子弹运行
        }, 200);
    }

    this.ifIn = function (x, y, x1, y1, x2, y2) {//判断点(x,y)是否在(x1, x2, y1, y2)范围内
        return (x > x1 && x < x2 && y > y1 && y < y2);
    }

    this.attacked = function () {//受击
        if (this.state == 0) {//主角没有死亡时受击
            attackedtimeId = setInterval(function () {
                for (var i = 0; i < aircraft.enemys.length; ++i) {//遍历当前敌人
                    if (aircraft.enemys[i] != null) {
                        if (aircraft.enemys[i].kind == 0) {//通过判断特殊点位置确定主角是否与敌人相撞
                            if (that.ifIn(that.x, that.y + 36, aircraft.enemys[i].x, aircraft.enemys[i].y, aircraft.enemys[i].x + 26, aircraft.enemys[i].y + 20) ||
                                that.ifIn(that.x + 51, that.y + 36, aircraft.enemys[i].x, aircraft.enemys[i].y, aircraft.enemys[i].x + 26, aircraft.enemys[i].y + 20) ||
                                that.ifIn(that.x + 25, that.y, aircraft.enemys[i].x, aircraft.enemys[i].y, aircraft.enemys[i].x + 26, aircraft.enemys[i].y + 20)) {
                                that.state = 1;
                            }
                        } else if (aircraft.enemys[i].kind == 1) {//不同种类敌人判定范围不同
                            if (that.ifIn(that.x, that.y + 36, aircraft.enemys[i].x, aircraft.enemys[i].y, aircraft.enemys[i].x + 35, aircraft.enemys[i].y + 45) ||
                                that.ifIn(that.x + 51, that.y + 36, aircraft.enemys[i].x, aircraft.enemys[i].y, aircraft.enemys[i].x + 35, aircraft.enemys[i].y + 45) ||
                                that.ifIn(that.x + 25, that.y, aircraft.enemys[i].x, aircraft.enemys[i].y, aircraft.enemys[i].x + 35, aircraft.enemys[i].y + 45)) {
                                that.state = 1;//相撞后主角死亡
                            }
                        }
                    }
                }
            }, 1);
        }
    }

    this.run = function (runInterface) {//运行
        this.hero.style.left = this.x + "px";
        this.hero.style.top = this.y + "px";
        this.hero.src = "./img/AircraftWar/hero1.png";
        this.animation();//播放动画
        this.move(runInterface);//移动
        this.shooting(runInterface);//射击
        this.attacked();//碰撞判定
    }
}

/**
 * 子弹类
 * @param {Number} x 
 * @param {Number} y 
 */
function Bullet(x, y) {
    this.speed = 3;//速度
    this.x = x;//位置
    this.y = y;
    this.bullet = document.createElement("img");
    this.aim = null;//击中目标

    this.create = function (runInterface) {//子弹创建
        this.bullet.setAttribute("src", "./img/AircraftWar/bullet.png");
        this.bullet.setAttribute("class", "bullet");
        this.bullet.style.left = this.x + "px";
        this.bullet.style.top = this.y + "px";
        runInterface.appendChild(this.bullet);
        for (var i = 0; i < aircraft.enemys.length; ++i) {//创建时遍历敌人数组 判断将会击中哪个敌人 将其作为目标
            if (aircraft.enemys[i] != null) {
                if (aircraft.enemys[i].kind == 0) {//不同敌人的判断范围不同
                    if (aircraft.enemys[i].aimedTime < 1) {//若敌人已被其他子弹标记则不再击中
                        if (this.y > aircraft.enemys[i].y + 20 && this.x > aircraft.enemys[i].x && this.x < aircraft.enemys[i].x + 26) {
                            this.aim = aircraft.enemys[i];
                            aircraft.enemys[i].aimedTime++;
                            break;
                        }
                    }
                } else if (aircraft.enemys[i].kind == 1) {
                    if (aircraft.enemys[i].aimedTime < 2) {//敌人1需要击中两次
                        if (this.y > aircraft.enemys[i].y + 45 && this.x > aircraft.enemys[i].x && this.x < aircraft.enemys[i].x + 35) {
                            this.aim = aircraft.enemys[i];
                            aircraft.enemys[i].aimedTime++;
                            break;//找到目标后不再遍历
                        }
                    }
                }
            }
        }
    }

    this.move = function () {//子弹移动
        var that = this;
        var timeId = setInterval(function () {
            that.y -= that.speed;
            that.bullet.style.top = that.y + "px";
            if (that.aim != null) {//击中目标判定
                if (that.y <= that.aim.y + 5) {
                    that.remove();
                    that.aim.attacked();//目标受击
                    clearInterval(timeId);//停止移动
                }
            } else if (that.y < -8) {//子弹离开游戏界面后删除
                that.remove();
                clearInterval(timeId);
            }
        }, 1);
    }

    this.remove = function () {//删除子弹
        this.speed = 0;
        this.bullet.parentNode.removeChild(this.bullet);
    }

    this.run = function (runInterface) {//子弹运行
        this.create(runInterface);//创造子弹
        this.move();//子弹移动
    }
}

/**
 * 敌人类
 */
function Enemy(index) {
    this.kind = (parseInt(Math.random() * 10) > 3 ? 0 : 1);//随机生成不同敌人
    this.x = Math.random() * (this.kind == 0 ? 334 : 326);//随机生成位置
    this.y = (this.kind == 0 ? -20 : -45);
    this.index = index;//在敌人数组内的位置
    this.died = false;//死亡标记
    this.speed = 1;//速度
    this.animationImg = [//敌人图片
        ["./img/AircraftWar/enemy0.png", "./img/AircraftWar/enemy0_down1.png", "./img/AircraftWar/enemy0_down2.png", "./img/AircraftWar/enemy0_down3.png", "./img/AircraftWar/enemy0_down4.png"],
        ["./img/AircraftWar/enemy1.png", "./img/AircraftWar/enemy1_down1.png", "./img/AircraftWar/enemy1_down2.png", "./img/AircraftWar/enemy1_down3.png", "./img/AircraftWar/enemy1_down4.png", "./img/AircraftWar/enemy1_hit.png"]
    ];
    this.enemy = document.createElement("img");
    this.aimedTime = 0;//被瞄准次数
    this.attackedTime = 0;//受击次数
    var moveTimeId;
    var that = this;

    this.create = function (runInterface) {//创建敌人
        this.enemy.src = this.animationImg[this.kind][0];//根据敌人类型添加图片
        this.enemy.setAttribute("class", "enemy" + this.kind);//根据类型添加类名
        this.enemy.style.left = this.x + "px";//初始位置
        this.enemy.style.top = this.y + "px";
        runInterface.appendChild(this.enemy);
    }

    this.move = function () {//敌人移动
        moveTimeId = setInterval(function () {
            that.y += that.speed;
            that.enemy.style.top = that.y + "px";
            if (that.y > 700 || that.died) {//如果敌人离开游戏界面或敌人死亡
                that.remove();//删除敌人
                aircraft.enemysNum--;//敌人数量减1
                aircraft.enemys[that.index] = null;//将敌人数组内相应位置置空
                if (that.died) {
                    aircraft.score += (that.kind == 0 ? 10 : 20);
                }
            }
        }, 10);
    }

    this.remove = function () {//删除敌人
        clearInterval(moveTimeId);//停止移动
        this.enemy.parentNode.removeChild(this.enemy);
    }

    this.attacked = function () {//受到攻击
        this.attackedTime++;//受击次数加一
        if (this.kind == 1) {//如果是种类1的敌人
            var index;
            if (this.attackedTime >= 2) {//受击次数大于等于2则消灭
                index = 2;
                var timeId = setInterval(function () {
                    if (index > 4) {//播放完动画停止
                        clearInterval(timeId);
                        that.died = true;//标记死亡
                        return;
                    }
                    that.enemy.src = that.animationImg[that.kind][index];//播放消灭动画
                    index++;
                }, 200);
            } else {//受击次数不大于2则播放受击动画
                index = 5;
                var timeId = setInterval(function () {
                    if (index == 0) {//播放完停止
                        clearInterval(timeId);
                    }
                    that.enemy.src = that.animationImg[that.kind][index];
                    index = 0;
                }, 50);
            }
        }

        if (this.kind == 0) {//如果是种类0的敌人
            var index;
            if (this.attackedTime >= 1) {
                index = 2;
                var timeId = setInterval(function () {
                    if (index > 4) {//播放完动画停止
                        clearInterval(timeId);
                        that.died = true;
                        return;
                    }
                    that.enemy.src = that.animationImg[that.kind][index];//播放消灭动画
                    index++;
                }, 200);
            }
        }

    }

    this.run = function (runInterface) {//敌人运行
        this.create(runInterface);//创造敌人
        this.move();//敌人移动
    }
}