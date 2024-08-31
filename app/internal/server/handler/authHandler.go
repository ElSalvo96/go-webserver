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
func (h *AuthHandler) AddRoutes(r *gin.RouterGroup) {
	v1 := r.Group("/api/v1/auth")

	v1.POST("/login", h.HandleLogin)
	v1.GET("/logout", h.HandleLogout)
}

type loginInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Auth godoc
//
//	@Summary		Handle login and set the access token into the cookie
//	@Description	Handle login and set the access token into the cookie
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Param		    body	body		loginInput	true	"Body"
//	@Success		200		{object}	jsonResponse[bool]
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

	h.authService.SetAuthCookies(c, inputData.Username)

	sendResponse(c, http.StatusOK, true)
}

// Auth godoc
//
//	@Summary		Handle logout and clear the access token from the Cookie
//	@Description	Handle logout and clear the access token from the Cookie
//	@Tags			Auth
//	@Success		200		{object}	jsonResponse[bool]
//	@Failure		401		{object}	jsonResponse[string]
//	@Failure		503		{object}	jsonResponse[string]
//	@Router			/api/v1/auth/logout [GET]
func (h *AuthHandler) HandleLogout(c *gin.Context) {
	h.authService.ClearAuthCookies(c)
	sendResponse(c, http.StatusOK, true)
}
