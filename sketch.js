let bg = ["#F2EDEC"];
let colors=["#e9c46a", "#e63946", "#f7ede2", "#ffffff", "#582f0e"];
let color1 = [  
"#7f5539",
"#606c38",
"#ff758f",
"#f7ede2",
"#936639",
"#4ecdc4",
"#f9c74f",];
let color2 = [   
"#582f0e",
"#c6ac8f",
"#fe6d73",
"#713200",
"#bd897e",
"#f9c74f",
"#6a4c93",
"#e5383b",];

var balls=[]
var ball
class ball_class{
  constructor(args){
    this.p=args.p||{x:width/2,y:height/2}
    this.r=args.r||random(0.08,0.3)
    this.c=args.c||random(colors)
    this.v=args.v||{x:random(-3,3),y:random(-3,3)}
    this.s=args.s||random(color1)  //邊框
    this.s1=random(color2) 
    this.ro=args.ro||random(-20, 20)
    let offset = height / 10;
    let margin = offset / 2;
    let h = (height - offset * 2 - margin * 3) /4 ;
    let d = h;
    this.w1=random(-d / 3, d / 3)
    this.w2=random(-d / 14, -d / 2.5)
    this.w3=random(d / 10)
  }
  draw(){
    push();
      translate(this.p.x,this.p.y);
      angleMode(DEGREES)  //設定為角度
//------------漸層設定------------            

let offset = height / 10;
let margin = offset / 2;
let w = (width - offset * 2 - margin * 3) / 4;
let h = (height - offset * 2 - margin * 3) /4 ;

let d = h;
      //----------------------------------------      
      rotate(this.ro);  //旋轉
//-------漸層--------------------------------      
      let gradient = drawingContext.createLinearGradient(
        w / 2,
        -h / 2,
        w / 2,
        h / 2);
//----------------------------------------------------
      gradient.addColorStop(0,this.s);
      gradient.addColorStop(1,this.s1);
//-----------畫圖-------------------------      
      noStroke(); 
      // scale(this.r)
      drawingContext.fillStyle = gradient;
      arc(0, 0, d * 0.9, d, 180, 360);
      circle(0, d / 8, d / 2);
      circle(d / 3, d / 8, d / 2);
      circle(-d / 3, d / 8, d / 2);
      fill(this.c)
      circle(this.w1,this.w2,this.w3);
    pop();
  } 
  update(){  //物件更新後的程式碼
    this.p.x=this.p.x+this.v.x
    this.p.y=this.p.y+this.v.y  
    //反彈
    if(this.p.x<0){
      this.v.x=-this.v.x
    }
    if(this.p.x>width){
      this.v.x=-this.v.x
    }
    if(this.p.y<0){
      this.v.y=-this.v.y
    }
    if(this.p.y>height){
      this.v.y=-this.v.y
    }
  }
  isballInRange(){  //計算
    //d:把目前這個物件的位置與滑鼠間的距離
    let d=dist(mouseX,mouseY,this.p.x,this.p.y)
    if(d<this.w){
      return true
    }else{
      return false
    }   
  }
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  for(i=0;i<30;i=i+1){  //產生幾個
    ball=new ball_class({ //傳一段參數值到class，以參數為主
      p:{x:random(0,width),y:random(0,height)}, 
      v:{x:random(-8,5),y:random(-8,5)}
    })
    balls.push(ball)  //把數據存入
  }

}

function draw() {
  background(bg);
  for(j=0;j<balls.length;j=j+1){
    ball=balls[j]
    ball.draw()
    ball.update()
  }

}
