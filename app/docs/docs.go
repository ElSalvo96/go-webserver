// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/v1/auth/isLoggedIn": {
            "get": {
                "description": "Handle checking if the user is logged in",
                "tags": [
                    "Auth"
                ],
                "summary": "Handle checking if the user is logged in",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-bool"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            }
        },
        "/api/v1/auth/login": {
            "post": {
                "description": "Handle login and set the access token into the cookie",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Handle login and set the access token into the cookie",
                "parameters": [
                    {
                        "description": "Body",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/handler.loginInput"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-bool"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    },
                    "403": {
                        "description": "Forbidden",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            }
        },
        "/api/v1/auth/logout": {
            "get": {
                "description": "Handle logout and clear the access token from the Cookie",
                "tags": [
                    "Auth"
                ],
                "summary": "Handle logout and clear the access token from the Cookie",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-bool"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            }
        },
        "/api/v1/facts/cats": {
            "get": {
                "description": "Facts about cats",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Facts"
                ],
                "summary": "Facts about cats",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-array_handler_FactResponse"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            }
        },
        "/api/v1/facts/dogs": {
            "get": {
                "description": "Facts about dogs",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Facts"
                ],
                "summary": "Facts about dogs",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-array_handler_FactResponse"
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            }
        },
        "/api/v1/sum": {
            "get": {
                "description": "Handle the sum service using the query string",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sum"
                ],
                "summary": "Handle the sum service using the query string",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Number One",
                        "name": "num1",
                        "in": "query",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Number Two",
                        "name": "num2",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-SumOutput"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            },
            "post": {
                "description": "Handle the sum service using the body",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sum"
                ],
                "summary": "Handle the sum service using the body",
                "parameters": [
                    {
                        "description": "body input",
                        "name": "input",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/SumInput"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-SumOutput"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            }
        },
        "/api/v1/sum/{num1}": {
            "get": {
                "description": "Handle sum with first number in route path and second in query string",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sum"
                ],
                "summary": "Handle sum with first number in route path and second in query string",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Number One",
                        "name": "num1",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Number Two",
                        "name": "num2",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-SumOutput"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            }
        },
        "/api/v1/sum/{num1}/{num2}": {
            "get": {
                "description": "Handle the sum service using the route path",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sum"
                ],
                "summary": "Handle the sum service using the route path",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Number One",
                        "name": "num1",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Number Two",
                        "name": "num2",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-SumOutput"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            }
        },
        "/heartbeat": {
            "get": {
                "description": "Heartbeat returns a JSON response with the heartbeat status",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "heartbeat"
                ],
                "summary": "Heartbeat returns a JSON response with the heartbeat status",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Response-string"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "Response-SumOutput": {
            "type": "object",
            "properties": {
                "data": {
                    "$ref": "#/definitions/SumOutput"
                },
                "error": {
                    "type": "boolean"
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "Response-array_handler_FactResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/handler.FactResponse"
                    }
                },
                "error": {
                    "type": "boolean"
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "Response-bool": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "boolean"
                },
                "error": {
                    "type": "boolean"
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "Response-string": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "string"
                },
                "error": {
                    "type": "boolean"
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "SumInput": {
            "type": "object",
            "required": [
                "num1",
                "num2"
            ],
            "properties": {
                "num1": {
                    "type": "integer"
                },
                "num2": {
                    "type": "integer"
                }
            }
        },
        "SumOutput": {
            "type": "object",
            "properties": {
                "result": {
                    "type": "integer"
                }
            }
        },
        "handler.FactResponse": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "text": {
                    "type": "string"
                }
            }
        },
        "handler.loginInput": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
