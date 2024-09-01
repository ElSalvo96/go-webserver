package service

import (
	"app/internal/util"
	"errors"
	"time"

	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v5"
	"github.com/mitchellh/mapstructure"
)

type DataClaims struct {
	Username string `json:"username" mapstructure:"username"`
}

// AuthService defines an interface for the health check service
type AuthService interface {
	ClearAuthCookies(c *gin.Context)
	VerifyAuthCookies(c *gin.Context) (bool, *DataClaims)
	IsAuthCookiesValid(c *gin.Context) (*DataClaims, error)
	SetAuthCookies(c *gin.Context, username string) error
}

// AuthServiceImpl is a concrete implementation of the AuthService interface
type AuthServiceImpl struct {
	config *util.MainConfig
}

func NewAuthService(config *util.MainConfig) AuthService {
	return &AuthServiceImpl{
		config: config,
	}
}

func (h *AuthServiceImpl) verifyToken(tokenString string, secretKey string) (*DataClaims, error) {
	verifyToken, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, err
	}
	claims, ok := verifyToken.Claims.(jwt.MapClaims)
	if !ok || !verifyToken.Valid {
		return nil, errors.New("invalid token")
	}

	// Deconstructed DataClaims
	var dataClaims DataClaims
	var dataClaimToDecode = claims["data"]
	err = mapstructure.Decode(dataClaimToDecode, &dataClaims)
	if err != nil {
		return nil, err
	}
	if dataClaims.Username == "" {
		return nil, errors.New("invalid token")
	}

	return &dataClaims, nil
}

func (h *AuthServiceImpl) createToken(username string, secretKey string, minutes uint8) (string, int, error) {
	expireTime := int(time.Now().Add(time.Minute * time.Duration(minutes)).Unix())
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"data": DataClaims{
				Username: username,
			},
			"exp": expireTime,
		})

	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", -1, err
	}

	return tokenString, expireTime, nil
}

func (h *AuthServiceImpl) SetAuthCookies(c *gin.Context, username string) error {
	newToken, expireTime, err := h.createToken(username, h.config.JWT_TOKEN_SECRET_KEY, h.config.JWT_TOKEN_EXPIRE_MINUTES)

	if err != nil {
		return err
	}

	c.SetCookie("token", newToken, expireTime/1e6, "/", "", true, true)

	return nil
}

func (h *AuthServiceImpl) VerifyAuthCookies(c *gin.Context) (bool, *DataClaims) {

	claims, err := h.IsAuthCookiesValid(c)
	if err != nil {
		return false, nil
	}

	// Update token with a new one
	err = h.SetAuthCookies(c, claims.Username)

	if err != nil {
		return false, nil
	}

	return true, claims
}
func (h *AuthServiceImpl) IsAuthCookiesValid(c *gin.Context) (*DataClaims, error) {
	token, err := c.Cookie("token")
	if err != nil {
		return nil, err
	}

	claims, err := h.verifyToken(token, h.config.JWT_TOKEN_SECRET_KEY)
	if err != nil {
		return nil, err
	}

	return claims, nil
}

func (h *AuthServiceImpl) ClearAuthCookies(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "", true, true)
}
