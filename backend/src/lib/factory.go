package lib

import (
	"fmt"
	"os"
	"strings"
	"time"

	"service.com/portfolio/src/common"
)

func Factory() {
	common.Clear()
	args := os.Args[2:]

	var name string
	for _, arg := range args {
		parts := strings.SplitN(arg, "=", 2)
		cmd := parts[0]
		val := ""
		if len(parts) > 1 {
			val = parts[1]
		}

		// Handle each command
		switch cmd {
		case "--name":
			name = val
		default:
			fmt.Println("Unknown command:", cmd)
		}
	}

	if name == "" {
		panic("invalid argument")
	}

	filename := fmt.Sprintf("%s_%s_factory", time.Now().Format("20060102150405"), name)
	content := `package factory

		func init() { 
			// write a code here
		}
		`

	common.WriteFile(fmt.Sprintf("src/database/factory/%s.go", filename), strings.ReplaceAll(content, "\t", ""))
	fmt.Println(filename, "successfully")
}
