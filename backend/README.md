edit configuration `config.json` <br/>

`note:` every edit configuration you must `reinitialize database`

copy .env file

```shell
$ cp .env.example .env
```
initialize database

```shell
$ go run main.go db:init
```
run serve

```shell
$ go run main.go serve
```