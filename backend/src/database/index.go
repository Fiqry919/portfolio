//lint:file-ignore U1000 Ignore all unused code, it's generated
package db

import (
	"fmt"

	"gorm.io/driver/postgres"
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
	/* change this as needed */
	db, err := usePostgres() // useSqlite() | usePostgres()

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
		&schema.Skill{},
	)

	Connection = db
}

func useSqlite() (*gorm.DB, error) {
	dsn := fmt.Sprintf("%s.db", common.Env("database"))
	return gorm.Open(sqlite.Open(dsn), &gorm.Config{})
}

func usePostgres() (*gorm.DB, error) {
	dsn := fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s sslmode=%s",
		common.Env("DB_HOST"),
		common.Env("DB_PORT"),
		common.Env("DATABASE"),
		common.Env("DB_USERNAME"),
		common.Env("DB_PASSWORD"),
		Disable,
	)
	return gorm.Open(postgres.Open(dsn), &gorm.Config{})
}
