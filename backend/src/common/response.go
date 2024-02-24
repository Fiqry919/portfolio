package common

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Meta struct {
	Status  *bool `json:"status"`
	Code    int   `json:"code"`
	Message any   `json:"message"`
}

type Response struct {
	Meta Meta `json:"meta"`
	Data any  `json:"data"`
}

var DefaultResponse = Response{
	Meta: Meta{
		Status:  func() *bool { b := true; return &b }(),
		Code:    http.StatusOK,
		Message: "",
	},
	Data: []any{},
}

func JSON(c *gin.Context, data *Response) {
	response := DefaultResponse

	if data.Meta.Status != nil {
		response.Meta.Status = data.Meta.Status
	}
	if data.Meta.Code != 0 {
		response.Meta.Code = data.Meta.Code
	}
	if data.Meta.Message != nil {
		response.Meta.Message = data.Meta.Message
	}
	if data.Data != nil {
		response.Data = data.Data
	}

	c.JSON(response.Meta.Code, response)
}
