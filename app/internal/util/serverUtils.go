package util

import (
	"github.com/gin-gonic/gin"
)

// SetUser sets the username in the gin context.
func SetUser(c *gin.Context, username string) {
	c.Set("USER", username)
}

// GetUser retrieves the username from the gin context.
func GetUser(c *gin.Context) string {
	return c.MustGet("USER").(string)
}

// SetEmail sets the email in the gin context.
func SetEmail(c *gin.Context, email string) {
	c.Set("EMAIL", email)
}

// GetEmail retrieves the email from the gin context.
func GetEmail(c *gin.Context) string {
	return c.MustGet("EMAIL").(string)
}

// SetPhone sets the phone number in the gin context.
func SetPhone(c *gin.Context, phone string) {
	c.Set("PHONE", phone)
}

// GetPhone retrieves the phone number from the gin context.
func GetPhone(c *gin.Context) string {
	return c.MustGet("PHONE").(string)
}
