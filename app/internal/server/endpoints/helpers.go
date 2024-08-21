package endpoints

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type jsonResponse[T any] struct {
	Error   bool   `json:"error"`
	Message string `json:"message"`
	Data    T      `json:"data,omitempty"`
}

type validationInput struct {
	ctx          *gin.Context
	data         any
	withoutCheck bool
}

func (server *Endpoints) bindQuery(in validationInput) error {
	if err := in.ctx.ShouldBindQuery(in.data); err != nil {
		// server.Logger.Errorf("cannot bind request %v", err)
		if !in.withoutCheck {
			in.ctx.AbortWithStatusJSON(http.StatusBadRequest, jsonResponse[any]{
				Error:   true,
				Message: "validation error",
				Data:    err.Error(),
			})
		}
		return err
	}
	return nil
}
func (server *Endpoints) bindJSON(in validationInput) error {
	if err := in.ctx.ShouldBindJSON(in.data); err != nil {
		// server.Logger.Errorf("cannot bind request %v", err)
		if !in.withoutCheck {
			in.ctx.AbortWithStatusJSON(http.StatusBadRequest, jsonResponse[any]{
				Error:   true,
				Message: "validation error",
				Data:    err.Error(),
			})
		}
		return err
	}
	return nil
}

func (server *Endpoints) bindUri(in validationInput) error {
	if err := in.ctx.ShouldBindUri(in.data); err != nil {
		// server.Logger.Errorf("cannot bind request %v", err)

		if !in.withoutCheck {
			in.ctx.AbortWithStatusJSON(http.StatusBadRequest, jsonResponse[any]{
				Error:   true,
				Message: "validation error",
				Data:    err.Error(),
			})
		}
		return err
	}
	return nil
}

// func (server *Endpoints) sendError(ctx *gin.Context, err error, s int, message ...string) {
// 	// server.Logger.Errorf("request error with status %v: %v", s, err)
// 	if len(message) > 0 {
// 		ctx.AbortWithStatusJSON(s, jsonResponse[any]{
// 			Error:   true,
// 			Message: message[0],
// 			Data:    err.Error(),
// 		})
// 		return
// 	}
// 	ctx.AbortWithStatusJSON(s, jsonResponse[any]{
// 		Error:   true,
// 		Message: "something went wrong",
// 		Data:    err.Error(),
// 	})
// }

func (server *Endpoints) sendResponse(ctx *gin.Context, status int, data any) {
	ctx.JSON(status, jsonResponse[any]{
		Error:   false,
		Message: "success",
		Data:    data,
	})
}
