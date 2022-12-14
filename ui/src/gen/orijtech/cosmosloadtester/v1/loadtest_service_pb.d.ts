import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../google/api/annotations_pb';
import * as google_protobuf_duration_pb from 'google-protobuf/google/protobuf/duration_pb';


export class RunLoadtestRequest extends jspb.Message {
  getClientFactory(): string;
  setClientFactory(value: string): RunLoadtestRequest;

  getConnectionCount(): number;
  setConnectionCount(value: number): RunLoadtestRequest;

  getDuration(): google_protobuf_duration_pb.Duration | undefined;
  setDuration(value?: google_protobuf_duration_pb.Duration): RunLoadtestRequest;
  hasDuration(): boolean;
  clearDuration(): RunLoadtestRequest;

  getSendPeriod(): google_protobuf_duration_pb.Duration | undefined;
  setSendPeriod(value?: google_protobuf_duration_pb.Duration): RunLoadtestRequest;
  hasSendPeriod(): boolean;
  clearSendPeriod(): RunLoadtestRequest;

  getTransactionsPerSecond(): number;
  setTransactionsPerSecond(value: number): RunLoadtestRequest;

  getTransactionSizeBytes(): number;
  setTransactionSizeBytes(value: number): RunLoadtestRequest;

  getTransactionCount(): number;
  setTransactionCount(value: number): RunLoadtestRequest;

  getBroadcastTxMethod(): RunLoadtestRequest.BroadcastTxMethod;
  setBroadcastTxMethod(value: RunLoadtestRequest.BroadcastTxMethod): RunLoadtestRequest;

  getEndpointsList(): Array<string>;
  setEndpointsList(value: Array<string>): RunLoadtestRequest;
  clearEndpointsList(): RunLoadtestRequest;
  addEndpoints(value: string, index?: number): RunLoadtestRequest;

  getEndpointSelectMethod(): RunLoadtestRequest.EndpointSelectMethod;
  setEndpointSelectMethod(value: RunLoadtestRequest.EndpointSelectMethod): RunLoadtestRequest;

  getExpectPeersCount(): number;
  setExpectPeersCount(value: number): RunLoadtestRequest;

  getMaxEndpointCount(): number;
  setMaxEndpointCount(value: number): RunLoadtestRequest;

  getPeerConnectTimeout(): google_protobuf_duration_pb.Duration | undefined;
  setPeerConnectTimeout(value?: google_protobuf_duration_pb.Duration): RunLoadtestRequest;
  hasPeerConnectTimeout(): boolean;
  clearPeerConnectTimeout(): RunLoadtestRequest;

  getMinPeerConnectivityCount(): number;
  setMinPeerConnectivityCount(value: number): RunLoadtestRequest;

  getStatsOutputFilePath(): string;
  setStatsOutputFilePath(value: string): RunLoadtestRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunLoadtestRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RunLoadtestRequest): RunLoadtestRequest.AsObject;
  static serializeBinaryToWriter(message: RunLoadtestRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunLoadtestRequest;
  static deserializeBinaryFromReader(message: RunLoadtestRequest, reader: jspb.BinaryReader): RunLoadtestRequest;
}

export namespace RunLoadtestRequest {
  export type AsObject = {
    clientFactory: string,
    connectionCount: number,
    duration?: google_protobuf_duration_pb.Duration.AsObject,
    sendPeriod?: google_protobuf_duration_pb.Duration.AsObject,
    transactionsPerSecond: number,
    transactionSizeBytes: number,
    transactionCount: number,
    broadcastTxMethod: RunLoadtestRequest.BroadcastTxMethod,
    endpointsList: Array<string>,
    endpointSelectMethod: RunLoadtestRequest.EndpointSelectMethod,
    expectPeersCount: number,
    maxEndpointCount: number,
    peerConnectTimeout?: google_protobuf_duration_pb.Duration.AsObject,
    minPeerConnectivityCount: number,
    statsOutputFilePath: string,
  }

  export enum BroadcastTxMethod { 
    BROADCAST_TX_METHOD_UNSPECIFIED = 0,
    BROADCAST_TX_METHOD_SYNC = 1,
    BROADCAST_TX_METHOD_ASYNC = 2,
    BROADCAST_TX_METHOD_COMMIT = 3,
  }

  export enum EndpointSelectMethod { 
    ENDPOINT_SELECT_METHOD_UNSPECIFIED = 0,
    ENDPOINT_SELECT_METHOD_SUPPLIED = 1,
    ENDPOINT_SELECT_METHOD_DISCOVERED = 2,
    ENDPOINT_SELECT_METHOD_ANY = 3,
  }
}

export class RunLoadtestResponse extends jspb.Message {
  getTotalTxs(): number;
  setTotalTxs(value: number): RunLoadtestResponse;

  getTotalTime(): google_protobuf_duration_pb.Duration | undefined;
  setTotalTime(value?: google_protobuf_duration_pb.Duration): RunLoadtestResponse;
  hasTotalTime(): boolean;
  clearTotalTime(): RunLoadtestResponse;

  getTotalBytes(): number;
  setTotalBytes(value: number): RunLoadtestResponse;

  getAvgTxsPerSecond(): number;
  setAvgTxsPerSecond(value: number): RunLoadtestResponse;

  getAvgBytesPerSecond(): number;
  setAvgBytesPerSecond(value: number): RunLoadtestResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunLoadtestResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RunLoadtestResponse): RunLoadtestResponse.AsObject;
  static serializeBinaryToWriter(message: RunLoadtestResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunLoadtestResponse;
  static deserializeBinaryFromReader(message: RunLoadtestResponse, reader: jspb.BinaryReader): RunLoadtestResponse;
}

export namespace RunLoadtestResponse {
  export type AsObject = {
    totalTxs: number,
    totalTime?: google_protobuf_duration_pb.Duration.AsObject,
    totalBytes: number,
    avgTxsPerSecond: number,
    avgBytesPerSecond: number,
  }
}

