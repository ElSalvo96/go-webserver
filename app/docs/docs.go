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
