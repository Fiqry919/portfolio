package main

import (
	"os"

	_ "service.com/portfolio/src/database"
	"service.com/portfolio/src/lib"
)

// go run . [args]
//
// [serve]  run a serve
//
// [db:init] initialize database & seed data from config file
//
// [make:factory] make a factory for seed
func main() {
	switch os.Args[1] {
	case "serve":
		lib.Serve()
	case "db:init":
		lib.Init()
	case "make:factory":
		lib.Factory()
	}
}
