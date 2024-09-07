
server:
	go run cmd/main.go
air:
	air -c .air.toml
generate-swagger:
	swag init -d ./cmd,./internal/server/handler


.PHONY: air server generate-swagger send-swagger-to-frontend
