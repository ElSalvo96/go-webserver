package middleware

import (
	"app/internal/server/service"
	"app/internal/util"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func NewAuthMiddleware(userService service.UserService, authService service.AuthService) gin.HandlerFunc {

	return func(c *gin.Context) {
		authorizationToken := c.GetHeader("Authorization")
		if authorizationToken == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": true, "message": "You are not authorized", "data": "empty token"})
			return
		}

		idToken := strings.TrimSpace(strings.Replace(authorizationToken, "Bearer", "", 1))
		if idToken == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": true, "message": "You are not authorized", "data": "empty token"})
			return
		}

		// verify token
		token, err := authService.VerifyToken(authorizationToken)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": true, "message": "You are not authorized", "data": "invalid token"})
			return
		}

		data, err := userService.GetUserData(token.Username)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": true, "message": "You are not authorized", "data": "invalid token"})
			return
		}

		util.SetUser(c, token.Username)
		util.SetEmail(c, data.Email)
		util.SetPhone(c, data.Phone)

		c.Next()

	}
}
