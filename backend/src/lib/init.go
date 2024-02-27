package lib

import (
	"fmt"
	"os/exec"

	db "service.com/portfolio/src/database"
)

func Init() {
	db.Connection.Migrator().DropTable(*db.Schema...)
	db.Connection.AutoMigrate(*db.Schema...)

	cmd := exec.Command("go", "run", "src/database/init/main.go")
	stdout, err := cmd.Output()

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	fmt.Println(string(stdout))
}
