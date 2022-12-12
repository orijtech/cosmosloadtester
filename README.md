# cosmosloadtester

## Building and running the server

1. Build the UI:
```shell
make ui
```

2. Build the server:
```shell
make server
```

3. Run the server:
```shell
./bin/server --port=8080
```
4. The server should be available at http://localhost:8080


## Registering custom client factories

[Create your custom client factory](https://github.com/informalsystems/tm-load-test/tree/main/pkg/loadtest#step-2-create-your-load-testing-client) then register it in `registerClientFactories` in `cmd/server/main.go`.
