build:
	docker build -t solidnerd/workdays .

release: build
	docker push solidnerd/workdays
