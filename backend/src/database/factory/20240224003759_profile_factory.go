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
	if err := db.Connection.Create(&config.Profile).Error; err != nil {
		panic(err)
	}
	fmt.Println("Profile:", "done")
}
