package handler

import (
	"app/internal/server/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// SumHandler defines the handler for the /sum endpoint
type SumHandler struct {
	sumService service.SumService
}

// NewSumHandler creates a new instance of SumHandler
func NewSumHandler(sumService service.SumService) *SumHandler {
	return &SumHandler{
		sumService: sumService,
	}
}

// NewSumHandler creates a new instance of SumHandler
func (h *SumHandler) AddRoutes(r *gin.RouterGroup) {
	v1 := r.Group("/api/v1")

	v1.GET("/sum", h.SumQuery)
	v1.POST("/sum", h.SumAsPost)
	v1.GET("/sum/:num1/:num2", h.SumAsRoutePath)
	v1.GET("/sum/:num1", h.SumAsRouteMixed)
}

type sumInput struct {
	NumberOne int `form:"num1" json:"num1" uri:"num1" binding:"required"`
	NumberTwo int `form:"num2" json:"num2" uri:"num2" binding:"required"`
} // @name SumInput
type sumOutput struct {
	Result int `json:"result"`
} // @name SumOutput

// sum godoc
//
//	@Summary		Handle the sum service using the query string
//	@Description	Handle the sum service using the query string
//	@Tags			sum
//	@Accept			json
//	@Produce		json
//	@Param			num1	query		int	true	"Number One"
//	@Param			num2	query		int	true	"Number Two"
//	@Success		200		{object}	jsonResponse[sumOutput]
//	@Failure		400		{object}	jsonResponse[string]
//	@Router			/api/v1/sum [get]
func (h *SumHandler) SumQuery(c *gin.Context) {
	var input sumInput
	if err := bindQuery(c, &input, true); err != nil {
		return
	}

	result := h.sumService.Execute(input.NumberOne, input.NumberTwo)

	sendResponse(c, http.StatusOK, sumOutput{Result: result})
}

// sum godoc
//
//	@Summary		Handle the sum service using the body
//	@Description	Handle the sum service using the body
//	@Tags			sum
//	@Accept			json
//	@Produce		json
//	@Param			input	body		sumInput	true	"body input"
//	@Success		200		{object}	jsonResponse[sumOutput]
//	@Failure		400		{object}	jsonResponse[string]
//	@Router			/api/v1/sum [post]
func (h *SumHandler) SumAsPost(c *gin.Context) {
	var input sumInput
	if err := bindJSON(c, &input, true); err != nil {
		return
	}

	result := h.sumService.Execute(input.NumberOne, input.NumberTwo)

	sendResponse(c, http.StatusOK, sumOutput{Result: result})
}

// sum godoc
//
//	@Summary		Handle the sum service using the route path
//	@Description	Handle the sum service using the route path
//	@Tags			sum
//	@Accept			json
//	@Produce		json
//	@Param			num1	path		int	true	"Number One"
//	@Param			num2	path		int	true	"Number Two"
//	@Success		200		{object}	jsonResponse[sumOutput]
//	@Failure		400		{object}	jsonResponse[string]
//	@Router			/api/v1/sum/{num1}/{num2} [get]
func (h *SumHandler) SumAsRoutePath(c *gin.Context) {
	var input sumInput
	if err := bindUri(c, &input, true); err != nil {
		return
	}

	result := h.sumService.Execute(input.NumberOne, input.NumberTwo)

	sendResponse(c, http.StatusOK, sumOutput{Result: result})
}

// sum godoc
//
//	@Summary		Handle sum with first number in route path and second in query string
//	@Description	Handle sum with first number in route path and second in query string
//	@Tags			sum
//	@Accept			json
//	@Produce		json
//	@Param			num1	path		int	true	"Number One"
//	@Param			num2	query		int	true	"Number Two"
//	@Success		200		{object}	jsonResponse[sumOutput]
//	@Failure		400		{object}	jsonResponse[string]
//	@Router			/api/v1/sum/{num1} [get]
func (server *SumHandler) SumAsRouteMixed(ctx *gin.Context) {
	var input sumInput

	bindUri(ctx, &input, false)
	if err := bindQuery(ctx, &input, true); err != nil {
		return
	}

	result := input.NumberOne + input.NumberTwo

	sendResponse(ctx, http.StatusOK, sumOutput{Result: result})
}
