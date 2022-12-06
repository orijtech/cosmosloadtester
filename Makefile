.PHONY: pb

pb:
	(cd proto && buf mod update)
	(cd proto && buf generate)
	npx --yes swagger-typescript-api -p ./proto/orijtech/cosmosloadtester/v1/loadtest_service.swagger.json -o ./ui/src/gen -n LoadtestApi.ts
