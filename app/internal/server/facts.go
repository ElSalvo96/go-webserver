package server

import (
	"app/internal/server/dogApi"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *Server) getFacts(ctx *gin.Context) {
	result, err := dogApi.GetFacts()

	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"status": "400", "title": "Bad Request", "detail": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, result)
}
