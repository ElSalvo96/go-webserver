package service

import (
	"errors"

	"github.com/gin-gonic/gin"
)

type userData struct {
	Email string
	Phone string
}

// simulate some private data
var secrets = map[string]userData{
	"foo":    {Email: "foo@bar.com", Phone: "123433"},
	"austin": {Email: "austin@example.com", Phone: "666"},
	"lena":   {Email: "lena@guapa.com", Phone: "523443"},
}

var passwords = gin.H{
	"foo":    "bar",
	"austin": "1234",
	"lena":   "hello2",
}

// UserService defines an interface for the health check service
type UserService interface {
	UserCanLogin(user string, pwd string) bool
	GetUserData(user string) (*userData, error)
}

// UserServiceImpl is a concrete implementation of the UserService interface
type UserServiceImpl struct{}

func NewUserService() UserService {
	return &UserServiceImpl{}
}

func (s *UserServiceImpl) UserCanLogin(user string, pwd string) bool {
	password, ok := passwords[user]

	return ok && password == pwd
}

func (s *UserServiceImpl) GetUserData(user string) (*userData, error) {
	data, ok := secrets[user]
	if !ok {
		return nil, errors.New("user not exist")
	}
	return &data, nil
}
