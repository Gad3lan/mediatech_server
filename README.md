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

To start a devlopement server you need to type this two command in two different terminal opend in this folder :

- For compiling automaticly on save :

```sh
$ npm watch
```

- For restarting the server automaticly on changes :

```sh
$ npm nodemon
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
