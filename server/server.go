package server

import (
	"context"
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/informalsystems/tm-load-test/pkg/loadtest"
	loadtestpb "github.com/orijtech/cosmosloadtester/proto/orijtech/cosmosloadtester/v1"
	"github.com/sirupsen/logrus"
	"google.golang.org/protobuf/types/known/durationpb"
)

type Server struct {
	loadtestpb.UnimplementedLoadtestServiceServer
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) RunLoadtest(ctx context.Context, req *loadtestpb.RunLoadtestRequest) (*loadtestpb.RunLoadtestResponse, error) {
	broadcastTxMethod, err := mapBroadcastTxMethod(req.BroadcastTxMethod)
	if err != nil {
		return nil, err
	}

	endpointSelectMethod, err := mapEndpointSelectMethod(req.EndpointSelectMethod)
	if err != nil {
		return nil, err
	}

	statsOutputFilePath := req.StatsOutputFilePath
	if statsOutputFilePath == "" {
		tmpFile, err := os.CreateTemp("", "tm-load-test-output.txt")
		if err != nil {
			return nil, fmt.Errorf("failed to create temporary file for stats output: %w", err)
		}
		defer func() {
			if err := tmpFile.Close(); err != nil {
				logrus.WithError(err).Error("failed to close temporary stats output file at %s", tmpFile.Name)
			}
			if err := os.Remove(tmpFile.Name()); err != nil {
				logrus.WithError(err).Error("failed to remove temporary stats output file at %s", tmpFile.Name)
			}
		}()
		statsOutputFilePath = tmpFile.Name()
	}

	err = loadtest.ExecuteStandalone(loadtest.Config{
		ClientFactory:        req.ClientFactory,
		Connections:          int(req.ConnectionCount),
		Time:                 int(req.Duration.GetSeconds()),
		SendPeriod:           int(req.SendPeriod.GetSeconds()),
		Rate:                 int(req.TransactionsPerSecond),
		Size:                 int(req.TransactionSizeBytes),
		Count:                int(req.TransactionCount),
		BroadcastTxMethod:    broadcastTxMethod,
		Endpoints:            req.Endpoints,
		EndpointSelectMethod: endpointSelectMethod,
		ExpectPeers:          int(req.ExpectPeersCount),
		MaxEndpoints:         int(req.MaxEndpointCount),
		MinConnectivity:      int(req.MinPeerConnectivityCount),
		PeerConnectTimeout:   int(req.PeerConnectTimeout.GetSeconds()),
		StatsOutputFile:      req.StatsOutputFilePath,
		NoTrapInterrupts:     true,
	})
	if err != nil {
		return nil, err
	}

	f, err := os.Open(statsOutputFilePath)
	if err != nil {
		return nil, fmt.Errorf("failed to open stats output file: %w", err)
	}
	csvR := csv.NewReader(f)
	records, err := csvR.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("failed to read stats: %w", err)
	}

	res := &loadtestpb.RunLoadtestResponse{}
	for i := 1; i < len(records); i++ {
		record := records[i]
		switch fieldName, value := record[0], record[1]; fieldName {
		case "total_time":
			totalTime, err := strconv.ParseFloat(value, 64)
			if err != nil {
				return nil, fmt.Errorf("invalid %s in stats file: %s", fieldName, value)
			}
			res.TotalTime = durationpb.New(time.Duration(totalTime * float64(time.Second)))
		case "total_txs":
			totalTxs, err := strconv.ParseInt(value, 10, 64)
			if err != nil {
				return nil, fmt.Errorf("invalid %s in stats file: %s", fieldName, value)
			}
			res.TotalTxs = totalTxs
		case "total_bytes":
			totalBytes, err := strconv.ParseInt(value, 10, 64)
			if err != nil {
				return nil, fmt.Errorf("invalid %s in stats file: %s", fieldName, value)
			}
			res.TotalBytes = totalBytes
		case "avg_tx_rate":
			avgTxRate, err := strconv.ParseFloat(value, 64)
			if err != nil {
				return nil, fmt.Errorf("invalid %s in stats file: %s", fieldName, value)
			}
			res.AvgTxsPerSecond = avgTxRate
		case "avg_data_rate":
			avgDataRate, err := strconv.ParseFloat(value, 64)
			if err != nil {
				return nil, fmt.Errorf("invalid %s in stats file: %s", fieldName, value)
			}
			res.AvgBytesPerSecond = avgDataRate

		default:
			logrus.Warnf("unexpected stats field: %s", fieldName)
		}
	}

	return res, nil
}

func mapBroadcastTxMethod(m loadtestpb.RunLoadtestRequest_BroadcastTxMethod) (string, error) {
	switch m {
	case loadtestpb.RunLoadtestRequest_BROADCAST_TX_METHOD_ASYNC:
		return "async", nil
	case loadtestpb.RunLoadtestRequest_BROADCAST_TX_METHOD_SYNC:
		return "sync", nil
	case loadtestpb.RunLoadtestRequest_BROADCAST_TX_METHOD_COMMIT:
		return "commit", nil
	}
	return "", fmt.Errorf("unsupported broadcast_tx_method: %v", m)
}

func mapEndpointSelectMethod(m loadtestpb.RunLoadtestRequest_EndpointSelectMethod) (string, error) {
	switch m {
	case loadtestpb.RunLoadtestRequest_ENDPOINT_SELECT_METHOD_ANY:
		return "async", nil
	case loadtestpb.RunLoadtestRequest_ENDPOINT_SELECT_METHOD_DISCOVERED:
		return "sync", nil
	case loadtestpb.RunLoadtestRequest_ENDPOINT_SELECT_METHOD_SUPPLIED:
		return "commit", nil
	}
	return "", fmt.Errorf("unsupported endpoint_select_method: %v", m)
}
