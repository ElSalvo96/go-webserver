package endpoints

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type heartbeatOutput struct {
	Title  string `json:"title"`
	Detail string `json:"detail"`
}

const heartbeatEndpoint = "/heartbeat"

// heartbeat godoc
// @Summary      Heartbeat
// @Description  Heartbeat
// @Tags         heartbeat
// @Accept       json
// @Produce      json
// @Success      200  {object}  jsonResponse[heartbeatOutput]
// @Router       /heartbeat [get]
func (server *Endpoints) heartbeat(ctx *gin.Context) {

	server.sendResponse(ctx, http.StatusOK, heartbeatOutput{
		Title:  "OK",
		Detail: fmt.Sprintf("Server time: %s", time.Now().Format(time.RFC3339)),
	})
}
