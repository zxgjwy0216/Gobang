var qipan,
    qiziS,//棋子的二维数组
    qipanWidth = 15,
    count = 0,
    block = false; //不能下时block为true
    AI = false;
function createQizi(x, y) {//创建棋盘节点div
    var qizi = document.createElement("div");
    qizi.classList.add("qizi");
    qizi.style.left = (6 + x * 50 )+ "px";
    qizi.style.top = (6 + y * 50) + "px";
    qizi.x = x;
    qizi.y = y;
    qizi.value = 0;//0为空位，1为黑子，2为白子
    return qizi;
}
function checkLine(x,y){//检查横向，纵向，斜上，斜下是否有5连棋子
    var result1 = 3,result2 = 3 ,result3 = 3, result4 = 4;
    for(var i = 0 ; i < 5 ; i ++){
        result1 &= y + i > 14 ? 0 : qiziS[x][y + i].value;
        result2 &= x + i > 14 ? 0 : qiziS[x + i][y].value;
        result3 &= x + i > 14 || y - i < 0 ? 0 : qiziS[x + i][y - i].value;
        result4 &= x + i > 14 || y + i > 14 ? 0 : qiziS[x + i][y + i].value;
    }
    return result1 | result2 | result3 | result4;
}
function checkFinish(){
    for(var i = 0;i < qiziS.length; i ++){
        for(var j = 0 ; j < qiziS[i].length ; j ++){
            if (qiziS[i][j].value == 0){
                continue;
            }
            var result = checkLine(i,j);
            if(result > 0){
                return result;
            }
        }
    }
    return 0;
}
function init(){
    qiziS = new Array(qipanWidth);
    for(var i = 0 ; i < qiziS.length ; i ++){
        qiziS[i] = new Array(qipanWidth);
        for(var j = 0 ;j < qiziS[i].length ; j ++){
            qiziS[i][j] = createQizi(i,j);
            qiziS[i][j].onclick = function(){
                if(this.value > 0 || block){
                    return;
                }
                block = true;
                this.style.backgroundImage = "url('./img/" + (count % 2 + 1) + ".png')";
                this.value = count % 2 + 1;
                count += 1;
                var result = checkFinish();//检查是否结束
                if(result == 0) {
                    if(AI && count % 2 == 1){//判断是否有AI
                        block = false;
                        aiAction();
                    }
                    block = false;
                } else {
                    setTimeout(function () {
                        alert(result == 1 ? "黑棋胜利" : "白旗胜利");
                    },200);
                }
            }
            qipan.appendChild(qiziS[i][j]);
        }
    }
}
window.onload = function (){
    qipan = document.getElementById('qipan');
    init();
}