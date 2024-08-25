package server

import (
	"app/internal/server/handler"
	"app/internal/server/middleware"
	"app/internal/server/service"
	"app/internal/util"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	docs "app/docs"

	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
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

func setSwaggerDocs(config *util.MainConfig) {
	docs.SwaggerInfo.Title = "Swagger API"
	docs.SwaggerInfo.Description = "This is a sample server."
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = config.SERVER_ADDRESS
	docs.SwaggerInfo.Schemes = []string{"http", "https"}

}

func setupRouter(config *util.MainConfig) *gin.Engine {
	server := &Server{
		config: config,
	}
	setSwaggerDocs(server.config)

	router := gin.Default()
	router.Use(gin.Recovery())
	router.Use(cors.New(createCORSConfig()))

	// use ginSwagger middleware to serve the API docs
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	// Services
	heartbeatService := service.NewHeartbeatService()
	sumService := service.NewSumService()
	factsService := service.NewFactsService(config)
	userService := service.NewUserService()
	authService := service.NewAuthService(config)

	// Creates middlewares
	authMiddleware := middleware.NewAuthMiddleware(userService, authService)

	// Create handlers
	heartbeatHandlers := handler.NewHeartbeatHandler(heartbeatService)
	sumHandlers := handler.NewSumHandler(sumService)
	factsHandlers := handler.NewFactsHandler(factsService)
	authHandlers := handler.NewAuthHandler(userService, authService)

	// Create routes
	heartbeatHandlers.AddRoutes(router)
	sumHandlers.AddRoutes(router)
	factsHandlers.AddRoutes(router, authMiddleware)
	authHandlers.AddRoutes(router)

	return router
}
