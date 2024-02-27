package middleware

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"service.com/portfolio/src/common"
)

func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		end := time.Now()

		file := fmt.Sprintf("resources/logs/%s.log", time.Now().Format("02-01-2006"))
		content := fmt.Sprintf("[%s] %d | %s	| %s 	| %s %s	  %s	| %s	 %s",
			time.Now().Format("02.01.2006 15:04:05"),
			c.Writer.Status(),
			end.Sub(start).String(),
			c.ClientIP(),
			c.Request.Proto,
			c.Request.Method,
			c.Request.URL.Path,
			c.Request.UserAgent(),
			c.Errors.String(),
		)

		common.WriteFile(file, content)
	}
}
