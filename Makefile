CONTAINER_ID=b8ad2f31ed94bab8878cedd800c22d8c357da0d7e987e79e9a11ef9e30b08529

build-dev:
	docker compose -f docker-compose.dev.yml up --build
run-dev:
	docker compose -f docker-compose.dev.yml up

sh:
	docker exec -it $(CONTAINER_ID) sh


.PHONY: build-dev run-dev clear-dev recreate-run-dev sh build-client