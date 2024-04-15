var crs=[]
var cr
let color1 = ["#F2EDEC"];
let color2 = ["#e9c46a", "#e63946", "#f7ede2", "#ffffff", "#582f0e"];
let gradationpallet1 = [  
"#7f5539",
"#606c38",
"#ff758f",
"#f7ede2",
"#936639",
"#4ecdc4",
"#f9c74f",
];
let gradationpallet2 = [  
"#582f0e",
"#c6ac8f",
"#fe6d73",
"#713200",
"#bd897e",
"#f9c74f",
"#6a4c93",
"#e5383b",
];

class cr_class{
  constructor(args){
    this.p=args.p || {x:random(width),y:random(height)}
    this.d=args.d || 50
    this.s1=args.s1 || random(50/3, 50/3)
    this.s2=args.s2 || random(-50/14, -50/2.5)
    this.s3=args.s3|| random(50/10)
    this.v=args.v || {x:random(-2,2),y:random(-2,2)}
    this.a=args.a || {x:0,y:random(0.7,1.2)}
    this.c1 = args.c1 || random(color1)
    this.c2 = args.c2 || random(color2)
    this.g1 = args.g1 || random(gradationpallet1)
    this.g2 = args.g2 || random(gradationpallet2)
  }
  draw(){
    push();
    translate(this.p.x , this.p.y );
    let gradient = drawingContext.createLinearGradient(
    this.d,-this.d,this.d,this.d)
    gradient.addColorStop(0, this.g1);
    gradient.addColorStop(1, this.g2)
    noStroke()
    drawingContext.fillStyle = gradient;
    arc(0, 0, this.d * 0.9, this.d, 180, 360);
    circle(0, this.d/8, this.d/2);
    circle(this.d/3, this.d/8, this.d/2);
    circle(-this.d/3, this.d/8, this.d/2);
    fill(this.c2)
    circle(this.s1,this.s2,this.s3);
    pop();
  }

  update(){
    this.p.x=this.p.x+this.v.x
    this.p.y=this.p.y+this.v.y
    if(this.p.x>width){
      this.v.x=-this.v.x
      }
    if(this.p.x<0){
      this.v.x=-this.v.x
      }
    if(this.p.y>height){
      this.v.y= -this.v.y
      }
    if(this.p.y<0){
      this.v.y= -this.v.y
      }
  }
  isBallInRange(){
    let d=dist(mouseX,mouseY,this.p.x,this.p.y)
    if(d<this.d){
      return true
    }
    else{
      return false
    }
  }
}  


function setup() {
  createCanvas(windowWidth,windowHeight);
  background(this.c1)
  for(i=0;i<80;i++){
    cr=new cr_class({
    })
   crs.push(cr)
  }
}



function draw() {
  background(this.c1)

  for(j=0;j<crs.length;j++){
    cr=crs[j]
    cr.draw()
    cr.update()
    if(cr.isBallInRange()){
      cr.v.x=cr.v.x+random(-5,5)
      cr.v.y=cr.v.y+random(-5,5)
    }
    else{
      cr.v.x=cr.v.x
      cr.v.y=cr.v.y
    }
  }
}

function mousePressed(){
  for(let cr of crs){
    if(cr.isBallInRange()){   
      crs.splice(crs.indexOf(cr),1)
    }
  }
}