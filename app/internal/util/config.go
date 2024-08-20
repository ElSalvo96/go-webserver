package util

import (
	"os"
	"sync"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

var (
	once   sync.Once
	config *MainConfig
)

// MainConfig main configuration
type MainConfig struct {
	SERVER_ADDRESS   string `mapstructure:"SERVER_ADDRESS"`
	GIN_MODE         string `mapstructure:"GIN_MODE"`
	DOG_API_BASE_URL string `mapstructure:"DOG_API_BASE_URL"`
}

func GetConfig() *MainConfig {
	return config
}
func LoadConfig(path string) (*MainConfig, error) {
	var err error
	once.Do(func() {
		// Check if env exists
		err := pathExists(path)
		if err != nil {
			return
		}
		viper.AddConfigPath(path)
		viper.SetConfigName("app")
		viper.SetConfigType("env")

		viper.AutomaticEnv()
		err = viper.ReadInConfig()
		if err != nil {
			return
		}
		err = viper.Unmarshal(&config)
		if err != nil {
			return
		}
	})

	return config, err
}

func pathExists(path string) error {
	_, err := os.Stat(path)
	if os.IsNotExist(err) {
		logrus.Errorf("configuration file not found: %s", err)
		return err
	}
	return nil
}