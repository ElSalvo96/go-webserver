package dogApi

import (
	"encoding/json"
	"errors"
	"fmt"
	"go-webserver/internal/util"
	"io"
	"net/http"
	"strconv"
)

// https://dogapi.dog/docs/api-v2

type facts struct {
	Data []datum `json:"data"`
}

type datum struct {
	ID         string     `json:"id"`
	Type       string     `json:"type"`
	Attributes attributes `json:"attributes"`
}

type attributes struct {
	Body string `json:"body"`
}

type optionsType struct {
	Limit uint8
}

func GetFacts(options ...optionsType) (*facts, error) {
	var opt optionsType
	if len(options) > 0 {
		opt = options[0]
	} else {
		opt = optionsType{Limit: 2}
	}
	strUrl := util.GetConfig().DOG_API_BASE_URL + "facts?limit=" + strconv.FormatUint(uint64(opt.Limit), 10)
	response, err := http.Get(strUrl)
	if err != nil {
		return nil, err
	}
	if response.StatusCode != 200 {
		fmt.Printf("Error: %v\n", response)
		return nil, errors.New("error while getting facts data")
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("Error: %s\n", err)
		return nil, err
	}
	var data facts
	err = json.Unmarshal(body, &data)
	if err != nil {
		fmt.Printf("Error: %s\n", err)
		return nil, err
	}

	return &data, nil
}
