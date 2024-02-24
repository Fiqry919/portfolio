package factory

import (
	"fmt"

	db "service.com/portfolio/src/database"
	"service.com/portfolio/src/schema"
)

func init() {
	data := []schema.OtherInformationCategory{
		{Name: "education"},
		{Name: "experience"},
		{Name: "certification"},
	}
	if err := db.Connection.Create(&data).Error; err != nil {
		panic(err)
	}
	fmt.Println("Gihub:", "done")
}
