const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: "phaser-example",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: {
        create: create,
        update: update,
    },
};

const game = new Phaser.Game(config);

let ball;
let paddleLeft;
let paddleRight;
let playerLeftScore = 0;
let playerRightScore = 0;

const velocityIncreaseValue = 1.5;

function create() {
    //Keyboard
    cursors = this.input.keyboard.addKeys({
        paddleLeftUp: Phaser.Input.Keyboard.KeyCodes.W,
        paddlLeftDown: Phaser.Input.Keyboard.KeyCodes.S,
        paddleRightUp: Phaser.Input.Keyboard.KeyCodes.UP,
        paddleRightDown: Phaser.Input.Keyboard.KeyCodes.DOWN,
    });

    //Ball
    ball = this.add.rectangle(400, 300, 20, 20, 0xffffff);
    this.physics.add.existing(ball);
    ball.body.setCollideWorldBounds(true);
    ball.body.setBounce(1, 1);
    ball.body.setVelocity(Phaser.Math.Between(-100, 100) > 0 ? 100 : -100, 100);

    //PaddleLeft
    paddleLeft = this.add.rectangle(100, 300, 20, 100, 0xffffff);
    this.physics.add.existing(paddleLeft);
    paddleLeft.body.setCollideWorldBounds(true);
    paddleLeft.body.immovable = true;

    //PaddleRight
    paddleRight = this.add.rectangle(700, 300, 20, 100, 0xffffff);
    this.physics.add.existing(paddleRight);
    paddleRight.body.setCollideWorldBounds(true);
    paddleRight.body.immovable = true;

    //Coliders
    this.physics.add.collider(ball, paddleLeft, paddleLeftHit, null, this);
    this.physics.add.collider(ball, paddleRight, paddleRightHit, null, this);

    //Score
    namePlayerLeft = this.add.text(16, 16, "Player 1", {
        fontSize: "16px",
        fill: "#fff",
    });
    scorePlayerLeft = this.add.text(16, 48, "Score: 0", {
        fontSize: "24px",
        fill: "#fff",
    });
    namePlayerRight = this.add
        .text(784, 16, "Player 2", { fontSize: "16px", fill: "#fff" })
        .setOrigin(1, 0);
    scorePlayerRight = this.add
        .text(784, 48, "Score: 0", { fontSize: "24px", fill: "#fff" })
        .setOrigin(1, 0);
}

function update() {
    //Keyboard
    if (cursors.paddleLeftUp.isDown) {
        if (paddleLeft.y !== 50) paddleLeft.y -= 10;
    }
    if (cursors.paddlLeftDown.isDown) {
        if (paddleLeft.y !== 550) paddleLeft.y += 10;
    }
    if (cursors.paddleRightUp.isDown) {
        if (paddleRight.y !== 50) paddleRight.y -= 10;
    }
    if (cursors.paddleRightDown.isDown) {
        if (paddleRight.y !== 550) paddleRight.y += 10;
    }

    //Score
    if (ball.x === 790) {
        scorePlayerLeft.setText(`Score: ${++playerLeftScore}`);
        restartGame();
    }
    if (ball.x === 10) {
        scorePlayerRight.setText(`Score: ${++playerRightScore}`);
        restartGame();
    }
}


//Functions

function paddleLeftHit(ball, paddleLeft) {
    ball.body.setVelocityX(ball.body.velocity.x * velocityIncreaseValue);
}

function paddleRightHit(ball, paddleRight) {
    ball.body.setVelocityX(ball.body.velocity.x * velocityIncreaseValue);
}

function restartGame() {
    ball.x = 400;
    ball.y = 300;
    ball.body.setVelocity(Phaser.Math.Between(-100, 100) > 0 ? 100 : -100, 100);
    paddleLeft.y = 300;
    paddleRight.y = 300;
}