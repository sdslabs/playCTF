<p align="center">
  <img src="https://user-images.githubusercontent.com/44467788/176223695-94752fd5-137f-4dc0-8350-90f167862896.svg" alt="playCTF Logo">
</p>

<h3 align="center">An all-in-one open source platform for hosting jeopardy style CTFs powered by Beast</h3>

## Contents

- [Overview](#overview)
- [Features](#features)
- [Development](#development)
- [Contributing](#contributing)
- [Contact](#contact)

## Overview

- playCTF is the frontend service powered by Beast. 
- It is written in VueJS and integrates all the endpoints provided by Beast which makes deploying challenges a breeze.
- There are different panels for admins and users which enable easy moderation of CTF competitions.

Visit [playctf.sdslabs.co/docs](https://playctf.sdslabs.co/docs) for more details and documentation about the APIs.

Also check out the Beast source code at https://github.com/sdslabs/beast.

## Features

- Create your own challenges, categories, hints, and flags from the Admin Interface
  - Dynamic Scoring Challenges
  - Challenge plugin architecture to create your own custom challenges
  - File uploads to the server
  - Hide challenges
  - Automatic bruteforce protection
- Scoregraphs comparing the top 3 players and player progress graphs
- Player banning
- Exporting of CTF data for archival
- Announcements
And a lot more...

## Development
- Install `docker` and `docker-compose`
- Run `docker-compose up --build -d` to spin up the playctf container
- Site can be accessed on `localhost:8080`

### To run the application in development mode
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Contributing

We are always open for contributions. If you find any feature missing, or just want to report a bug, feel free to open an issue and/or submit a pull request regarding the same.

For more information on contribution, check out our
[docs](./CONTRIBUTING.md).

## Contact

If you have a query regarding the product or just want to say hello then feel
free to visit [chat.sdslabs.co](https://chat.sdslabs.co) or drop a mail at
[contact@sdslabs.co.in](mailto:contact@sdslabs.co.in)

---

Made with :heart: by [SDSLabs](https://sdslabs.co)
