package server

import (
	"go-webserver/internal/server/endpoints"
	"go-webserver/internal/util"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	docs "go-webserver/docs"

	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	endpoints *endpoints.Endpoints
	config    *util.MainConfig
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

func setSwaggerDocs(config *util.MainConfig) {
	docs.SwaggerInfo.Title = "Swagger API"
	docs.SwaggerInfo.Description = "This is a sample server."
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = config.SERVER_ADDRESS
	// docs.SwaggerInfo.BasePath = "/v2"
	docs.SwaggerInfo.Schemes = []string{"http", "https"}
}

func setupRouter(config *util.MainConfig) *gin.Engine {
	server := &Server{
		config:    config,
		endpoints: endpoints.CreateEndpoints(config),
	}
	setSwaggerDocs(server.config)

	router := gin.Default()
	router.Use(gin.Recovery())
	router.Use(cors.New(createCORSConfig()))

	// use ginSwagger middleware to serve the API docs
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	server.endpoints.AddRoutes(router)

	return router
}
