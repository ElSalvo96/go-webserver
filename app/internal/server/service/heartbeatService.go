package service

import (
	"fmt"
	"time"
)

// HeartbeatService defines an interface for the health check service
type HeartbeatService interface {
	Check() string
}

// HeartbeatServiceImpl is a concrete implementation of the HeartbeatService interface
type HeartbeatServiceImpl struct{}

func NewHeartbeatService() HeartbeatService {
	return &HeartbeatServiceImpl{}
}

// Check returns a string representing the status of the service
func (s *HeartbeatServiceImpl) Check() string {
	return fmt.Sprintf("Server time: %s", time.Now().Format(time.RFC3339))
}
