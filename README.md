# mediatech_server

Back-end of the "mediatech" project.

Using :

- `nodejs`

- `docker`

- `typescript`

- `express`

- `graphql`

## Developement :

You need `nodejs` and `npm` installed on your computer.

The entry point of the code is `src/index.ts`.

To start a devlopement server you need to type this three commands in three differents terminals opend in this folder :

- For launching the dev database (necessite `Docker`) :

```sh
$ npm run devdb
```

- For compiling automaticly on save :

```sh
$ npm run watch
```

- For restarting the server automaticly on changes :

```sh
$ npm run nodemon
```

## Deployment :

You need `nodejs`, `npm` and `docker` installed on your computer.

- For building the container :

```sh
$ bash build.sh
```

- For testing the container :

```
$ bash start.sh
```
