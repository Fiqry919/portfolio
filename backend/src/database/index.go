package db

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"service.com/portfolio/src/common"
	"service.com/portfolio/src/schema"
)

type SslMode string

const (
	Enable  SslMode = "enable"
	Disable SslMode = "disable"
)

var Connection *gorm.DB

func init() {
	/* enable for sqlite */
	dsn := fmt.Sprintf("%s.db", common.Env("database"))
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})

	/* enable for postgresql */
	// dsn := fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s sslmode=%s",
	// 	common.Env("DB_HOST"),
	// 	common.Env("DB_PORT"),
	// 	common.Env("DATABASE"),
	// 	common.Env("DB_USERNAME"),
	// 	common.Env("DB_PASSWORD"),
	// 	Disable,
	// )
	// db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(
		&schema.Profile{},
		&schema.Github{},
		&schema.Information{},
		&schema.OtherInformationCategory{},
		&schema.OtherInformation{},
		&schema.Project{},
	)

	Connection = db
}
