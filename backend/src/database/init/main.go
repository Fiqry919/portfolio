package main

import (
	"fmt"

	_ "service.com/portfolio/src/database/factory"
)

func main() {
	fmt.Println("database initialize successfully")
}
