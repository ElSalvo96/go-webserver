package handler

import (
	"app/internal/server/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// HeartbeatHandler defines the handler for the /heartbeat endpoint
type HeartbeatHandler struct {
	service service.HeartbeatService
}

// NewHeartbeatHandler creates a new instance of HeartbeatHandler
func NewHeartbeatHandler(service service.HeartbeatService) *HeartbeatHandler {
	return &HeartbeatHandler{
		service: service,
	}
}

// NewHeartbeatHandler creates a new instance of HeartbeatHandler
func (h *HeartbeatHandler) AddRoutes(r *gin.RouterGroup) {
	r.GET("/heartbeat", h.Handle)
}

// heartbeat godoc
//
//	@Summary		Heartbeat returns a JSON response with the heartbeat status
//	@Description	Heartbeat returns a JSON response with the heartbeat status
//	@Tags			heartbeat
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	jsonResponse[string]
//	@Router			/heartbeat [get]
func (h *HeartbeatHandler) Handle(c *gin.Context) {
	status := h.service.Check()

	sendResponse(c, http.StatusOK, status)
}
