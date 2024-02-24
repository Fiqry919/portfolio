package lib

import (
	"fmt"
	"os/exec"

	db "service.com/portfolio/src/database"
	"service.com/portfolio/src/schema"
)

func Init() {
	db.Connection.Migrator().DropTable(
		&schema.Profile{},
		&schema.Github{},
		&schema.Information{},
		&schema.OtherInformationCategory{},
		&schema.OtherInformation{},
		&schema.Project{},
		&schema.Skill{},
	)
	db.Connection.AutoMigrate(
		&schema.Profile{},
		&schema.Github{},
		&schema.Information{},
		&schema.OtherInformationCategory{},
		&schema.OtherInformation{},
		&schema.Project{},
		&schema.Skill{},
	)

	cmd := exec.Command("go", "run", "src/database/init/main.go")
	stdout, err := cmd.Output()

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	fmt.Println(string(stdout))
}
