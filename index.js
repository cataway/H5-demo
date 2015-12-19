~(function () {
    var main = document.querySelector("#main");
    var oLis = document.querySelectorAll(".slide>li");
    var winW = document.documentElement.clientWidth; //屏幕宽度
    var winH = document.documentElement.clientHeight;
    var desW = 640; //记录设计稿宽度
    var desH = 960; //设计稿高度
    //缩放页面适配各个移动设备
    main.style.webkitTransform = 'scale(' + winH / desH + ')';

    [].forEach.call(oLis, function () {
        arguments[0].index = arguments[1];  //获取索引
        arguments[0].addEventListener("touchstart", start, false);
        arguments[0].addEventListener("touchmove", move, false);
        arguments[0].addEventListener("touchend", end, false);
    })

    var init = function () {
        for (var i = 0; i < oLis.length; i++) {
            oLis[0].firstElementChild.id = "a1";
        }
    }
    init();

    function start(e) {
        this.startY = e.changedTouches[0].pageY;
    }

    function move(e) {
        e.preventDefault();
        this.flag=true;
        var touchMove = e.changedTouches[0].pageY;
        var changePos = touchMove - this.startY;
        var cur = this.index;
        var step = 1 / 2;
        var scalePos = (Math.abs(changePos) / winH) * step;

        [].forEach.call(oLis, function () {
            if (arguments[1] != cur) {
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
            arguments[0].firstElementChild.id = "";
        })
        if (changePos > 0) { /*往下滑*/
            var pos = -winH + changePos;
            this.prevIndex = cur == 0 ? oLis.length - 1 : cur - 1;

        } else if (changePos < 0) {/*往上滑*/
            var pos = winH + changePos;
            this.prevIndex = cur == oLis.length - 1 ? 0 : cur + 1;
        }

        oLis[this.prevIndex].style.webkitTransform = "translate(0," + pos + "px)";
        oLis[this.prevIndex].className = "zIndex";
        oLis[this.prevIndex].style.display = "block";

        oLis[cur].style.webkitTransform = "scale(" + (1 - scalePos) + ") translate(0," + changePos + "px)";
    }

    function end(e) {
        if(this.flag){
            oLis[this.prevIndex].style.webkitTransform = "translate(0,0)";
            oLis[this.prevIndex].style.webkitTransition = "0.5s";
            oLis[this.prevIndex].addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
                this.firstElementChild.id = "a" + (this.index + 1);
            },false);
        }
    }
    document.addEventListener('touchmove',function(){

    })
})()
