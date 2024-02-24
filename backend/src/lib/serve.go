package lib

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"service.com/portfolio/src/common"
	"service.com/portfolio/src/controller"
	"service.com/portfolio/src/middleware"
)

func Serve() {
	gin.SetMode("release")
	router := gin.Default()
	router.Static("/public", "./resources/public")
	router.Use(middleware.Cors())

	router.GET("/mode", controller.GetMode)
	router.POST("/config", controller.GetConfig)

	common.Clear()
	host := fmt.Sprintf("%s:%s", common.Env("app_url"), common.Env("app_port"))
	fmt.Printf("listening on %s\n", host)

	router.Run(host)
}
