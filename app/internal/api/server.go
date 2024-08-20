package api

import (
	"go-webserver/internal/util"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type api struct {
	config *util.MainConfig
}

func CreateServer(config *util.MainConfig) (*http.Server, error) {
	routers := setupRouter(config)
	srv := &http.Server{
		Addr:         config.SERVER_ADDRESS,
		ReadTimeout:  5 * time.Minute,
		WriteTimeout: 5 * time.Minute,
		IdleTimeout:  5 * time.Minute,
		Handler:      routers,
	}

	return srv, nil
}

func createCORSConfig() cors.Config {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	corsConfig.AllowHeaders = []string{"*"}
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowHeaders("Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "access-control-allow-origin, access-control-allow-headers", "Content-Type", "Accept", "Origin", "X-Requested-With")
	corsConfig.AddAllowMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	return corsConfig
}

func setupRouter(config *util.MainConfig) *gin.Engine {
	apis := &api{
		config: config,
	}
	router := gin.Default()
	router.Use(gin.Recovery())
	router.Use(cors.New(createCORSConfig()))

	// heartbeat
	router.GET("/", apis.heartbeat)
	router.GET("/heartbeat", apis.heartbeat)

	// api v1
	v1 := router.Group("/api/v1")

	// facts
	v1.GET("/facts", apis.getFacts)

	// sum
	v1.GET("/sum", apis.sum)
	v1.POST("/sum", apis.sumAsPost)
	v1.GET("/sum/:NumberOne/:NumberTwo", apis.sumAsRoutePath)

	return router
}
