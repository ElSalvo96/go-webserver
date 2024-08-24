package service

import (
	"app/internal/util"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"time"
)

// FactsService defines an interface for the health check service
type FactsService interface {
	AboutDogs() (*dogFacts, error)
	AboutCats() (*catFacts, error)
}

// FactsServiceImpl is a concrete implementation of the FactsService interface
type FactsServiceImpl struct {
	config *util.MainConfig
}

func NewFactsService(config *util.MainConfig) FactsService {
	return &FactsServiceImpl{
		config,
	}
}

type dogFacts struct {
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

// Get facts about dog
func (s *FactsServiceImpl) AboutDogs() (*dogFacts, error) {
	strUrl := s.config.DOG_API_BASE_URL + "facts?limit=3"
	response, err := http.Get(strUrl)
	if err != nil {
		return nil, err
	}

	if response.StatusCode != 200 {
		// fmt.Printf("Error: %v\n", response)
		return nil, errors.New("error while getting facts data")
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		// fmt.Printf("Error: %s\n", err)
		return nil, err
	}
	var data dogFacts
	err = json.Unmarshal(body, &data)
	if err != nil {
		// fmt.Printf("Error: %s\n", err)
		return nil, err
	}

	return &data, nil
}

type catFacts []catFact

type catFact struct {
	ID        string    `json:"_id"`
	V         int64     `json:"__v"`
	Text      string    `json:"text"`
	UpdatedAt time.Time `json:"updatedAt"`
	Deleted   bool      `json:"deleted"`
	Source    string    `json:"source"`
	SentCount int64     `json:"sentCount"`
}

func (s *FactsServiceImpl) AboutCats() (*catFacts, error) {
	strUrl := s.config.CAT_API_BASE_URL + "facts/random?animal_type=cat&amount=3"
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
	var data catFacts
	err = json.Unmarshal(body, &data)
	if err != nil {
		fmt.Printf("Error: %s\n", err)
		return nil, err
	}

	return &data, nil
}
