package endpoints

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type sumInput struct {
	NumberOne int `form:"num1" json:"num1" uri:"num1" binding:"required"`
	NumberTwo int `form:"num2" json:"num2" uri:"num2" binding:"required"`
}
type sumOutput struct {
	Result int `json:"result"`
}

const sumQueryEndpoint = "/sum"
const sumAsPostEndpoint = "/sum"
const sumAsRoutePathEndpoint = "/sum/:num1/:num2"
const sumAsRouteMixedEndpoint = "/sum/:num1"

// sum godoc
// @Summary      Sum in query string
// @Description  Sum in query string
// @Tags         sum
// @Accept       json
// @Produce      json
// @Param        num1   query  int  true  "Number One"
// @Param        num2   query  int  true  "Number Two"
// @Success      200  {object}  jsonResponse[sumOutput]
// @Failure      400  {object}  jsonResponse[string]
// @Router       /api/v1/sum [get]
func (server *Endpoints) sumQuery(ctx *gin.Context) {
	var input sumInput
	if err := server.bindQuery(validationInput{ctx: ctx, data: &input}); err != nil {
		return
	}

	result := input.NumberOne + input.NumberTwo

	server.sendResponse(ctx, http.StatusOK, sumOutput{Result: result})
}

// sum godoc
// @Summary      Sum as post
// @Description  Sum as post
// @Tags         sum
// @Accept       json
// @Produce      json
// @Param        input   body  sumInput true "body input"
// @Success      200  {object}  jsonResponse[sumOutput]
// @Failure      400  {object}  jsonResponse[string]
// @Router       /api/v1/sum [post]
func (server *Endpoints) sumAsPost(ctx *gin.Context) {
	var input sumInput
	if err := server.bindJSON(validationInput{ctx: ctx, data: &input}); err != nil {
		return
	}

	result := input.NumberOne + input.NumberTwo
	server.sendResponse(ctx, http.StatusOK, sumOutput{Result: result})
}

// sum godoc
// @Summary      Sum as route path
// @Description  Sum as route path
// @Tags         sum
// @Accept       json
// @Produce      json
// @Param        num1   path  int  true  "Number One"
// @Param        num2   path  int  true  "Number Two"
// @Success      200  {object}  jsonResponse[sumOutput]
// @Failure      400  {object}  jsonResponse[string]
// @Router       /api/v1/sum/{num1}/{num2} [get]
func (server *Endpoints) sumAsRoutePath(ctx *gin.Context) {
	var input sumInput

	if err := server.bindUri(validationInput{ctx: ctx, data: &input}); err != nil {
		return
	}

	result := input.NumberOne + input.NumberTwo

	server.sendResponse(ctx, http.StatusOK, sumOutput{Result: result})
}

// sum godoc
// @Summary      Sum with first number in route path and second in query string
// @Description  Sum with first number in route path and second in query string
// @Tags         sum
// @Accept       json
// @Produce      json
// @Param        num1   path  int  true  "Number One"
// @Param        num2   query  int  true  "Number Two"
// @Success      200  {object}  jsonResponse[sumOutput]
// @Failure      400  {object}  jsonResponse[string]
// @Router       /api/v1/sum/{num1} [get]
func (server *Endpoints) sumAsRouteMixed(ctx *gin.Context) {
	var input sumInput

	server.bindUri(validationInput{ctx: ctx, data: &input, withoutCheck: true})
	if err := server.bindQuery(validationInput{ctx: ctx, data: &input}); err != nil {
		return
	}

	result := input.NumberOne + input.NumberTwo

	server.sendResponse(ctx, http.StatusOK, sumOutput{Result: result})
}
