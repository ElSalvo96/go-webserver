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

func main() {
	fmt.Println("PID2:", os.Getpid())
	cfg, err := util.LoadConfig()
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
