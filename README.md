# Simple quiz game

An exercise of React and Socket.IO.

## Playing

Up to 10 players can connect and will be assigned as player 1, 2, 3, etc. A question will be posed with a true/false answer. (By default the questions will be simple math operations, with the four basic operators and operands between 1 and 10.) A wrong answer scores -1 point, a correct answer scores 1 point and ends the turn.

There's no end game. Turns will continue until the server is stopped.

## Running

There are two separate packages, the client and the server. The server is a node app using Socket.IO and should run standalone. The client is built using Webpack, and can be run in dev mode or built and deployed to a web server.

Both client and server can be run in development mode the same way: `yarn install`, then `yarn start`.

If building the client for production deployment, you can optionally first set an environment variable `SERVER_ADDRESS` to the URL where the server will be found.

## Improvements

- The client doesn't handle errors. There could be a problem connecting, for example, or the server can refuse the login (if the game is full); in those cases the client just stays at the “connecting…” screen.

- It could look better. Proper styling was beyond the scope of the exercise.

- By adding modules to `server/questions` and setting the `QUESTIONS_MODULE` environment variable, different game modes can be implemented.
