import { BallProps, PaddleProps } from "../../HelperFunctions/GameTypes";

export const moveBall = (
	ball: BallProps,
	paddle: PaddleProps,
	launchBall: boolean,
	speedMultiplier: number
) => {
	if (!launchBall) {
		ball.position.x = paddle.position.x + paddle.width / 2;
		ball.position.y = paddle.position.y - ball.size;
	} else {
		if (ball.velocity.x === 0 && ball.velocity.y === 0) {
			ball.velocity.y = -1;
		}
		ball.position.x += ball.velocity.x * speedMultiplier;
		ball.position.y += ball.velocity.y * speedMultiplier;
		
	}

	ball.position.x = Math.round(ball.position.x);
	ball.position.y = Math.round(ball.position.y);
};

