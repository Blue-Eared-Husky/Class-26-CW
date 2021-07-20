class Cannonball{
    constructor(x, y) {
        var options = {
          isStatic: true,
          restitution : 0.8,
          friction : 1.0,
          density : 1
        };
        this.image = loadImage("assets/cannonball.png");
        this.r = 40;
        this.trail = [];
        this.body = Bodies.circle(x, y, this.r, options);
        World.add(world, this.body);
      }

      display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.r, this.r);
        pop();

        if(this.body.velocity.x > 0 && pos.x > 280){
          var p = [this.body.position.x, this.body.position.y];
          this.trail.push(p);
        }

        for (var i = 0; i < this.trail.length;i++){
          image(this.image, this.trail[i][0], this.trail[i][1], 4, 4)
        }
      }

      shoot(){
        var velocity = p5.Vector.fromAngle(cannon.angle);
        velocity.mult(20);
        Matter.Body.setStatic(this.body, false)
        Matter.Body.setVelocity(this.body,{x : velocity.x, y : velocity.y});
      }

      remove(index){
        World.remove(world,this.body);
        balls.splice(index,1);
      }
}