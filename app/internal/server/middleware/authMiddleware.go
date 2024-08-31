package middleware

import (
	"app/internal/server/service"
	"app/internal/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewAuthMiddleware(userService service.UserService, authService service.AuthService) gin.HandlerFunc {

	return func(c *gin.Context) {

		isAuthenticated, dataClaims := authService.VerifyAuthCookies(c)
		if !isAuthenticated {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": true, "message": "You are not authorized", "data": ""})
			return
		}

		data, err := userService.GetUserData(dataClaims.Username)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": true, "message": "You are not authorized", "data": "invalid data"})
			return
		}

		util.SetUser(c, dataClaims.Username)
		util.SetEmail(c, data.Email)
		util.SetPhone(c, data.Phone)

		c.Next()

	}
}
