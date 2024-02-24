package factory

import (
	"fmt"

	"service.com/portfolio/src/common"
	db "service.com/portfolio/src/database"
	"service.com/portfolio/src/schema"
)

func init() {
	var config schema.Config
	_, err := common.ReadJSON("config.json", &config)
	if err != nil {
		panic(err.Error())
	}

	var skills []schema.Skill
	for _, str := range config.Skills {
		skills = append(skills, schema.Skill{Name: str})
	}

	if err := db.Connection.Create(&skills).Error; err != nil {
		panic(err)
	}
	fmt.Println("Skills:", "done")
}
