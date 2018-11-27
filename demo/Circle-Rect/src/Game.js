class Game
{
    constructor() {

    }

    init() {
        //  Initialise the canvas
        gameNs.game.canvas = document.createElement("canvas")
        gameNs.game.canvas.id = 'mycanvas'
        gameNs.game.canvas.width = window.innerWidth
        gameNs.game.canvas.height = window.innerHeight
        gameNs.game.ctx = gameNs.game.canvas.getContext("2d")
        document.body.appendChild(gameNs.game.canvas)

        //  Initialise game objects
        gameNs.game.box = new BoxCollider(new Vector2(300,400), 200, 50);
        gameNs.game.circle = new CircleCollider(new Vector2(120,120), 50);

        gameNs.game.collisionManager = new CollisionManager();
        gameNs.game.collisionManager.addBoxCollider(gameNs.game.box);
        gameNs.game.collisionManager.addCircleCollider(gameNs.game.circle);    
        
        document.addEventListener('keydown', function(event) {
            event.preventDefault();   

            //  Movement up and down
            if(event.keyCode == 87) {   //  W key.
                gameNs.game.circle.shape.position.y += -5;  
            } else if(event.keyCode == 83) {    //  S key.
                gameNs.game.circle.shape.position.y += 5;                  
            }
            //  Movement left and right.
            if(event.keyCode == 65) {   //  A key.
                gameNs.game.circle.shape.position.x += -5;  
            } else if(event.keyCode == 68) {    //  D key.
                gameNs.game.circle.shape.position.x += 5;                  
            }
        });
    }

    update() {
        //  Update game objects.
        if (CollisionManager.CircleRectangleCollision(gameNs.game.box, gameNs.game.circle)){
            console.log('Yes');
        }

        //  Draw new frame.
        gameNs.game.render();
        // Recursive call to Update method.
        window.requestAnimationFrame(gameNs.game.update);
    }


    render() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.collisionManager.render(this.ctx);
    }
}