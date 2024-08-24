package handler

import (
	"app/internal/server/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// FactsHandler defines the handler for the /Facts endpoint
type FactsHandler struct {
	service service.FactsService
}

// NewFactsHandler creates a new instance of FactsHandler
func NewFactsHandler(service service.FactsService) *FactsHandler {
	return &FactsHandler{
		service: service,
	}
}

// NewFactsHandler creates a new instance of FactsHandler
func (h *FactsHandler) AddRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/facts")

	v1.GET("/dogs", h.HandleDogs)
	v1.GET("/cats", h.HandleCats)
}

type FactResponse struct {
	ID   string `json:"id"`
	Text string `json:"text"`
}

// Facts godoc
//
//	@Summary		Facts about dogs
//	@Description	Facts about dogs
//	@Tags			Facts
//	@Accept			json
//	@Produce		json
//	@Success		200		{object}	jsonResponse[FactResponse[]]
//	@Failure		503		{object}	jsonResponse[string]
//	@Router			/api/v1/facts/dogs [get]
func (h *FactsHandler) HandleDogs(c *gin.Context) {
	dogData, error := h.service.AboutDogs()

	if error != nil {
		sendError(c, error, http.StatusServiceUnavailable)
		return
	}

	var dogsResponse []FactResponse
	for _, dog := range dogData.Data {
		dogsResponse = append(dogsResponse, FactResponse{
			ID:   dog.ID,
			Text: dog.Attributes.Body,
		})
	}

	sendResponse(c, http.StatusOK, dogsResponse)
}

// Facts godoc
//
//	@Summary		Facts about cats
//	@Description	Facts about cats
//	@Tags			Facts
//	@Accept			json
//	@Produce		json
//	@Success		200		{object}	jsonResponse[[]FactResponse]
//	@Failure		503		{object}	jsonResponse[string]
//	@Router			/api/v1/facts/cats [get]
func (h *FactsHandler) HandleCats(c *gin.Context) {
	catData, error := h.service.AboutCats()

	if error != nil {
		sendError(c, error, http.StatusServiceUnavailable)
		return
	}

	var catsResponse []FactResponse
	for _, cat := range *catData {
		catsResponse = append(catsResponse, FactResponse{
			ID:   cat.ID,
			Text: cat.Text,
		})
	}

	sendResponse(c, http.StatusOK, catsResponse)
}
