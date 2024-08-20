package api

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func (a *api) heartbeat(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, map[string]string{"status": "200", "title": "Health OK v1.0.0", "detail": time.Now().String()})
}

type sumInput struct {
	NumberOne int `form:"num1" json:"num1" binding:"required"`
	NumberTwo int `form:"num2" json:"num2" binding:"required"`
}

func (a *api) sum(ctx *gin.Context) {
	var input sumInput
	if err := ctx.BindQuery(&input); err != nil {
		return
	}

	result := input.NumberOne + input.NumberTwo
	ctx.JSON(http.StatusOK, map[string]int{"result": result})
}

func (a *api) sumAsPost(ctx *gin.Context) {
	var input sumInput

	if err := ctx.BindJSON(&input); err != nil {
		fmt.Printf("Error: %s\n", err)
		ctx.JSON(http.StatusBadRequest, map[string]string{"status": "400", "title": "Bad Request", "detail": err.Error()})
		return
	}

	result := input.NumberOne + input.NumberTwo
	ctx.JSON(http.StatusOK, map[string]int{"result": result})
}

func (a *api) sumAsRoutePath(ctx *gin.Context) {
	var input sumInput

	if err := ctx.BindUri(&input); err != nil {
		fmt.Printf("Error: %s\n", err)
		ctx.JSON(http.StatusBadRequest, map[string]string{"status": "400", "title": "Bad Request", "detail": err.Error()})
		return
	}

	result := input.NumberOne + input.NumberTwo
	ctx.JSON(http.StatusOK, map[string]int{"result": result})
}
