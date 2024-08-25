package service

import (
	"app/internal/util"
	"errors"
	"time"

	jwt "github.com/golang-jwt/jwt/v5"
	"github.com/mitchellh/mapstructure"
)

type DataClaims struct {
	Username string `json:"username" mapstructure:"username"`
}

// AuthService defines an interface for the health check service
type AuthService interface {
	CreateToken(username string) (string, error)
	CreateRefreshToken(username string) (string, error)
	VerifyToken(tokenString string) (*DataClaims, error)
	VerifyRefreshToken(tokenString string) (*DataClaims, error)
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

func (h *AuthServiceImpl) CreateToken(username string) (string, error) {
	return h.createToken(username, h.config.JWT_TOKEN_SECRET_KEY, h.config.JWT_TOKEN_EXPIRE_MINUTES)
}

func (h *AuthServiceImpl) CreateRefreshToken(username string) (string, error) {
	return h.createToken(username, h.config.JWT_REFRESH_TOKEN_SECRET_KEY, h.config.JWT_REFRESH_TOKEN_EXPIRE_MINUTES)
}

func (h *AuthServiceImpl) VerifyToken(tokenString string) (*DataClaims, error) {
	return h.verifyToken(tokenString, h.config.JWT_TOKEN_SECRET_KEY)
}

func (h *AuthServiceImpl) VerifyRefreshToken(tokenString string) (*DataClaims, error) {
	return h.verifyToken(tokenString, h.config.JWT_REFRESH_TOKEN_SECRET_KEY)
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

func (h *AuthServiceImpl) createToken(username string, secretKey string, minutes uint8) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"data": DataClaims{
				Username: username,
			},
			"exp": time.Now().Add(time.Minute * time.Duration(minutes)).Unix(),
		})

	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
