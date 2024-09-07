package util

import (
	"os"
	"strconv"
	"sync"

	"github.com/sirupsen/logrus"
)

var (
	once   sync.Once
	config *MainConfig
)

// MainConfig main configuration
type MainConfig struct {
	SERVER_ADDRESS          string `mapstructure:"SERVER_ADDRESS"`
	SERVER_ADDRESS_EXTERNAL string `mapstructure:"SERVER_ADDRESS_EXTERNAL"`
	CORS_ALLOW_ORIGINS      string `mapstructure:"CORS_ALLOW_ORIGINS"`
	CLIENT_COOKIE_DOMAIN    string `mapstructure:"CLIENT_COOKIE_DOMAIN"`
	GIN_MODE                string `mapstructure:"GIN_MODE"`
	DOG_API_BASE_URL        string `mapstructure:"DOG_API_BASE_URL"`
	CAT_API_BASE_URL        string `mapstructure:"CAT_API_BASE_URL"`

	JWT_TOKEN_SECRET_KEY     string `mapstructure:"JWT_TOKEN_SECRET_KEY"`
	JWT_TOKEN_EXPIRE_MINUTES uint8  `mapstructure:"JWT_TOKEN_EXPIRE_MINUTES"`
}

func GetConfig() *MainConfig {
	return config
}

func GetString(key string, isOptional ...bool) string {
	value := os.Getenv(key)
	if value == "" && len(isOptional) > 0 && isOptional[0] {
		return ""
	}
	if value == "" {
		logrus.Panicf("Environment variable not set: %v", key)
	}
	return value
}
func GetUint8(key string, isOptional ...bool) uint8 {
	value := os.Getenv(key)
	if value == "" && len(isOptional) > 0 && isOptional[0] {
		return 0
	}
	if value == "" {
		logrus.Panicf("Environment variable not set: %v", key)
	}
	intValue, err := strconv.ParseInt(value, 10, 8)
	if err != nil {
		logrus.Panicf("Error converting environment variable %v, to uint8: %v", key, err)
	}
	return uint8(intValue)
}
func LoadConfig() (*MainConfig, error) {
	var err error
	once.Do(func() {
		// Get the environment variable
		config = &MainConfig{
			GIN_MODE:                 GetString("GIN_MODE"),
			SERVER_ADDRESS:           GetString("SERVER_ADDRESS"),
			SERVER_ADDRESS_EXTERNAL:  GetString("SERVER_ADDRESS_EXTERNAL"),
			CLIENT_COOKIE_DOMAIN:     GetString("CLIENT_COOKIE_DOMAIN", true),
			CORS_ALLOW_ORIGINS:       GetString("CORS_ALLOW_ORIGINS"),
			DOG_API_BASE_URL:         GetString("DOG_API_BASE_URL"),
			CAT_API_BASE_URL:         GetString("CAT_API_BASE_URL"),
			JWT_TOKEN_SECRET_KEY:     GetString("JWT_TOKEN_SECRET_KEY"),
			JWT_TOKEN_EXPIRE_MINUTES: GetUint8("JWT_TOKEN_EXPIRE_MINUTES"),
		}

	})

	return config, err
}
