package service

// SumService defines an interface for the health check service
type SumService interface {
	Execute(numberOne int, numberTwo int) int
}

// SumServiceImpl is a concrete implementation of the SumService interface
type SumServiceImpl struct{}

func NewSumService() SumService {
	return &SumServiceImpl{}
}

// Execute the sum
func (s *SumServiceImpl) Execute(numberOne int, numberTwo int) int {
	return numberOne + numberTwo
}
