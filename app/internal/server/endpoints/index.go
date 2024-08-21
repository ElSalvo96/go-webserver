package endpoints

import (
	"go-webserver/internal/util"

	"github.com/gin-gonic/gin"
)

type Endpoints struct {
	config *util.MainConfig
}

const v1Group = "/api/v1"

func CreateEndpoints(config *util.MainConfig) *Endpoints {
	return &Endpoints{
		config: config,
	}
}
func (server *Endpoints) AddRoutes(r *gin.Engine) {
	// heartbeat
	r.GET(heartbeatEndpoint, server.heartbeat)

	// api v1
	v1 := r.Group(v1Group)

	v1.GET(sumQueryEndpoint, server.sumQuery)
	v1.POST(sumAsPostEndpoint, server.sumAsPost)
	v1.GET(sumAsRoutePathEndpoint, server.sumAsRoutePath)
	v1.GET(sumAsRouteMixedEndpoint, server.sumAsRouteMixed)
	// v1.GET("/sum/{NumberOne}/{NumberTwo}", server.sumAsRoutePath)

	// facts
	// v1.GET("/facts", apis.getFacts)

	// sum
}
