package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"service.com/portfolio/src/common"
	db "service.com/portfolio/src/database"
	"service.com/portfolio/src/schema"
)

type Mode string

const (
	Manual Mode = "manual"
	Github Mode = "github"
)

func GetMode(c *gin.Context) {
	common.JSON(c, &common.Response{Data: map[string]interface{}{
		"mode": common.Env("MODE_PROFILE"),
	}})
}

func GetConfig(c *gin.Context) {
	var request struct {
		Mode Mode `json:"mode"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		request.Mode = Manual
	}

	if request.Mode != Manual && request.Mode != Github {
		status := false
		common.JSON(c, &common.Response{
			Meta: common.Meta{
				Status:  &status,
				Code:    http.StatusBadRequest,
				Message: "Configuration mode invalid",
			},
		})
		return
	}

	var data schema.Config

	if request.Mode == Manual {
		// getting profile
		db.Connection.Model(&schema.Profile{}).Last(&data.Profile)
	}
	// getting github
	db.Connection.Model(&schema.Github{}).Last(&data.Gihub)
	// getting infromation
	db.Connection.Model(&schema.Information{}).Find(&data.Information)
	// getting education
	db.Connection.Where(&schema.OtherInformation{CategoryID: 1}).Find(&data.Educations)
	// getting experience
	db.Connection.Where(&schema.OtherInformation{CategoryID: 2}).Find(&data.Experiences)
	// getting certification
	db.Connection.Where(&schema.OtherInformation{CategoryID: 3}).Find(&data.Certifications)
	// getting project
	db.Connection.Model(&schema.Project{}).Find(&data.Projects)

	common.JSON(c, &common.Response{Data: data})
}
