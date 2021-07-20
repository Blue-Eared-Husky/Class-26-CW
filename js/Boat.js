class Boat{
    constructor(x,y,w,h,boatpos){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.boatpos = boatpos;

        this.image = loadImage("assets/boat.png");

        var options = {
            restitution : 0.8,
            friction : 1.0,
            density : 1
        }
        this.body = Bodies.rectangle(x,y,w,h,options);
        World.add(world,this.body);
    }

    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,this.boatpos,this.w,this.h);
        noTint();
        pop();
    }

    remove(index){
        World.remove(world,this.body);
        boats.splice(index,1);
    }
}