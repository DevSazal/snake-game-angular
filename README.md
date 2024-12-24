<p align="center">
<img width="55%" alt="Snake Game - Angular By DevSazal" src="https://github.com/user-attachments/assets/6eb62631-a0e1-4487-b96b-58500039d844" />
</p>

<br>

# Snake Game

The game was developed on angular 19.0.1.

<br>

Let's clone the repository on your machine.

The application includes the following files and folders:

```bash
# architecture
# deep drive

todo-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── game/  # container component
│   │   │   │   ├── game.component.html
│   │   │   │   ├── game.component.css
│   │   │   │   └── game.component.ts
│   │   │   │
│   │   │   ├── playground/  # presentation component
│   │   │   │   ├── playground.component.html
│   │   │   │   ├── playground.component.css
│   │   │   │   └── playground.component.ts
│   │   │   │
│   │   ├── models/
│   │   │   ├── food.model.ts
│   │   │   └── snake.model.ts
│   │   │   │
│   │   ├── services/
│   │   │   ├── game.service.ts
│   │   │   └── score.service.ts  # use localStorage
│   │   │
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── styles.css
│   ├── index.html
│   └── main.ts
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md

```


## Installation and Configuration

Let's move to the cloned directory with your terminal.

To install, build, and start the application for the first time, run the following commands:

```bash
npm install
```
<br>

Already done? Cool! You are almost ready to enjoy the game ⛳️🐟🐍

### Build & Run:

To start a local development server, run:

```bash
ng serve

```

Once the server is running, open your browser and navigate to `http://localhost:4200/`


### Game Rules:

* 15 seconds timer to collect food or game over
* Game over if the snake hits the playground walls
* Game over if snake's head collides with the body
* Just move in the playground and grow by collecting food
* Keyboard control: `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`


## 🧑‍💻 Stay in touch

- Author - [Sazal Ahamed](https://sazal.vercel.app)
- Linkedin - [Profie](https://www.linkedin.com/in/sazal-ahamed/)
- GitHub - [DevSazal](https://github.com/DevSazal)

## License

[MIT licensed](LICENSE) © 2024
