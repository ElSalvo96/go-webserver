// Declare the package name
package main

// Import any modules required

import (
	"app/internal/server"
	"app/internal/util"
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/sirupsen/logrus"
)

// Define the main function
// @Version 1.0.0
// @Title Backend API
// @Description API usually works as expected. But sometimes its not true.
// @ContactName Parvez
// @ContactEmail abce@email.com
// @ContactURL http://someurl.oxox
// @TermsOfServiceUrl http://someurl.oxox
// @LicenseName MIT
// @LicenseURL https://en.wikipedia.org/wiki/MIT_License
// @Server http://www.fake.com Server-1
// @Server http://www.fake2.com Server-2
// @Security AuthorizationHeader read write
// @SecurityScheme AuthorizationHeader http bearer Input your token
//
// @securitydefinitions.oauth2.accessCode  OAuth2AccessCode
// @in                           		   header
// @name                         		   Authorization
// @tokenUrl                               https://127.0.0.1:8080/api/v1/auth/login
// @authorizationUrl                       https://127.0.0.1:8080/api/v1/auth/login
func main() {

	if len(os.Args) < 2 {
		fmt.Println("Please provide the environment path as an argument.")
		return
	}

	fmt.Println("PID:", os.Getpid())
	cfg, err := util.LoadConfig(os.Args[1])
	if err != nil {
		logrus.Panicf("Cannot load config %v", err)
		return
	}

	server, err := server.CreateServer(cfg)
	if err != nil {
		logrus.Panicf("Server cannot be init %v", err)
		return
	}

	go func() {
		err := server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			logrus.Fatalf("listen: %s\n", err)
		}
	}()

	// Graceful Shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	logrus.Println("Shutdown Server ...")

	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		logrus.Fatal("Server Shutdown: ", err)
	}
	logrus.Println("Server exiting")
}
