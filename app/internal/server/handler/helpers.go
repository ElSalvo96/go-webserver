package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type jsonResponse[T any] struct {
	Error   bool   `json:"error"`
	Message string `json:"message"`
	Data    T      `json:"data,omitempty"`
} // @name Response

func bindQuery(ctx *gin.Context, data any, withCheck bool) error {
	if err := ctx.ShouldBindQuery(data); err != nil {
		// server.Logger.Errorf("cannot bind request %v", err)
		if withCheck {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, jsonResponse[any]{
				Error:   true,
				Message: "validation error",
				Data:    err.Error(),
			})
		}
		return err
	}
	return nil
}
func bindJSON(ctx *gin.Context, data any, withCheck bool) error {
	if err := ctx.ShouldBindJSON(data); err != nil {
		// server.Logger.Errorf("cannot bind request %v", err)
		if withCheck {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, jsonResponse[any]{
				Error:   true,
				Message: "validation error",
				Data:    err.Error(),
			})
		}
		return err
	}
	return nil
}

func bindUri(ctx *gin.Context, data any, withCheck bool) error {
	if err := ctx.ShouldBindUri(data); err != nil {
		// server.Logger.Errorf("cannot bind request %v", err)

		if withCheck {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, jsonResponse[any]{
				Error:   true,
				Message: "validation error",
				Data:    err.Error(),
			})
		}
		return err
	}
	return nil
}

// func sendError(ctx *gContext, err error, s int, message ...string) {
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

func sendResponse(ctx *gin.Context, status int, data any) {
	ctx.JSON(status, jsonResponse[any]{
		Error:   false,
		Message: "success",
		Data:    data,
	})
}
