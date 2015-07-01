(function() {
    // 拿到CanvasDom对象
    var canvas = document.getElementById('canvas');
    // 获取绘图上下文对象
    var context = canvas.getContext('2d');
    // 数量
    var count = 14;
    // 背景
    var backgroundStyle = '#BDB76A';
    var title = 'Hello world';
    var link = 'www.micua.com';
    /**
     * 重设canvas大小
     */
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // 重新绘制内容
        draw();
    }

    // 第一次执行
    resizeCanvas();
    /**
     * 绘制内容
     */
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // 绘制背景
        drawBackground();
        for (var i = 0; i < 4; i++) {
            var points = getDotPoints(i);
            // 绘制内容
            drawLines(points);
        };
        drawLogo();
        context.save();
    }

    function getDotPoints(index) {
        var radius = 400 - index * 50;
        var even = [];
        var odd = [];
        for (var i = 0; i < count; i++) {
            var a = i * 360 / count + (index % 2 ? 0 : (360 / count) * 0.5);
            var point = {
                x: canvas.width / 2 + radius * Math.cos(a * Math.PI / 180),
                y: canvas.height / 2 + radius * Math.sin(a * Math.PI / 180),
            };
            if (i % 2) {
                odd.push(point);
            } else {
                even.push(point);
            }
        }
        return {
            even: even,
            odd: odd,
            color: 'rgba(255,255,255,' + (0.3 + index * 0.25) + ')'
        };
    }

    function drawBackground() {
        context.fillStyle = backgroundStyle;
        context.fillRect(0, 0, canvas.width, canvas.height);
        //创建一个径向渐变，从圆心为(160,120)半径为20的圆周开始沿着半径向圆心为(160120)半径为200的圆周进行径向渐变
        var g = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.height);
        g.addColorStop(0, 'rgba(255,255,255,0.7)'); //定义红色渐变色
        g.addColorStop(1, 'rgba(255,255,255,0)'); //定义蓝色渐变色
        context.fillStyle = g;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawLines(points) {
        for (var i = -1; i < 2; i++) {
            var r = i * canvas.width / 1.8;
            // context.beginPath();
            // // 线条
            // context.strokeStyle = 'rgba(255,255,255,.05)';
            // context.arc(canvas.width / 2 + r, canvas.height / 2, 300, 0, Math.PI * 2);
            // context.closePath();
            // context.stroke();


            // 设置线条辅助色
            context.strokeStyle = points.color;
            context.beginPath();
            points.even.forEach(function(item, i) {
                context.lineTo(item.x + r, item.y);
            });
            context.closePath();
            context.stroke();

            context.beginPath();
            points.odd.forEach(function(item, i) {
                context.lineTo(item.x + r, item.y);
            });
            context.closePath();
            context.stroke();
        };
    }

    function drawLogo() {
        context.font = "60px Georgia";
        context.fillStyle = 'rgba(255,255,255,.9)';
        context.textAlign = 'center';
        context.shadowColor = "rgba(100,100,100,1)";
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowBlur = 10;

        context.fillText(title, canvas.width / 2, canvas.height / 2 + 10);

        context.shadowColor = 'rgba(255,255,255,0)';
        context.font = "30px Georgia";
        context.fillStyle = 'rgba(255,255,255,.6)';
        context.fillText(link, canvas.width / 2, canvas.height / 2 + 80);
    }

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    // redSlider.addEventListener('change', resizeCanvas, false);
    // greenSlider.addEventListener('change', resizeCanvas, false);
    // blueSlider.addEventListener('change', resizeCanvas, false);
    // alphaSlider.addEventListener('change', resizeCanvas, false);
    var r = 0,
        g = 125,
        b = 200,
        a = 1,
        ri = 1,
        gi = 1,
        bi = 2;

    setInterval(function() {
        r += ri;
        if (r >= 255 || r < 0) {
            ri = -ri;
        };
    }, 20);
    setInterval(function() {
        g += gi;
        if (g >= 255 || g < 0) {
            gi = -gi;
        };
    }, 30);
    setInterval(function() {
        b += bi;
        if (b >= 255 || b < 0) {
            bi = -bi;
        };
    }, 10);


    setInterval(function() {
        backgroundStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        draw();
    }, 50);


})();
