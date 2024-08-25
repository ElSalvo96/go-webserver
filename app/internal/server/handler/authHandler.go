package handler

import (
	"app/internal/server/service"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

// AuthHandler defines the handler for the /auth endpoint
type AuthHandler struct {
	userService service.UserService
	authService service.AuthService
}

// NewAuthHandler creates a new instance of AuthHandler
func NewAuthHandler(userService service.UserService, authService service.AuthService) *AuthHandler {
	return &AuthHandler{
		userService: userService,
		authService: authService,
	}
}

// NewAuthHandler creates a new instance of AuthHandler
func (h *AuthHandler) AddRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/auth")

	v1.POST("/login", h.HandleLogin)
	v1.POST("/refresh", h.HandleRefresh)
}

type loginInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type loginResponse struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refresh_token"`
}

// Auth godoc
//
//	@Summary		Handle login and generate token and refresh token
//	@Description	Handle login and generate token and refresh token
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Param		    body	body		loginInput	true	"Body"
//	@Success		200		{object}	jsonResponse[loginResponse]
//	@Failure		400		{object}	jsonResponse[string]
//	@Failure		401		{object}	jsonResponse[string]
//	@Failure		403		{object}	jsonResponse[string]
//	@Failure		503		{object}	jsonResponse[string]
//	@Router			/api/v1/auth/login [POST]
func (h *AuthHandler) HandleLogin(c *gin.Context) {
	var inputData loginInput
	if err := bindJSON(c, &inputData, true); err != nil {
		return
	}

	inLogin := h.userService.UserCanLogin(inputData.Username, inputData.Password)

	if !inLogin {
		sendError(c, errors.New("wrong username or password"), http.StatusForbidden)
		return
	}

	h.generateResponse(c, inputData.Username)

}

type refreshTokenInput struct {
	RefreshToken string `json:"refresh_token"`
}

// Auth godoc
//
//	@Summary		Regenerate token and refresh token
//	@Description	Regenerate token and refresh token
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Param		    body	body		refreshTokenInput	true	"Body"
//	@Success		200		{object}	jsonResponse[loginResponse]
//	@Failure		400		{object}	jsonResponse[string]
//	@Failure		401		{object}	jsonResponse[string]
//	@Failure		403		{object}	jsonResponse[string]
//	@Failure		503		{object}	jsonResponse[string]
//	@Router			/api/v1/auth/refresh [POST]
func (h *AuthHandler) HandleRefresh(c *gin.Context) {

	var inputData refreshTokenInput
	if err := bindJSON(c, &inputData, true); err != nil {
		return
	}

	token, err := h.authService.VerifyRefreshToken(inputData.RefreshToken)
	if err != nil {
		sendError(c, err, http.StatusServiceUnavailable)
		return
	}

	h.generateResponse(c, token.Username)
}

func (h *AuthHandler) generateResponse(c *gin.Context, username string) {
	newToken, err := h.authService.CreateToken(username)
	if err != nil {
		sendError(c, err, http.StatusServiceUnavailable)
		return
	}
	newRefreshToken, err := h.authService.CreateRefreshToken(username)
	if err != nil {
		sendError(c, err, http.StatusServiceUnavailable)
		return
	}
	sendResponse(c, http.StatusOK, loginResponse{
		Token:        newToken,
		RefreshToken: newRefreshToken,
	})
}
