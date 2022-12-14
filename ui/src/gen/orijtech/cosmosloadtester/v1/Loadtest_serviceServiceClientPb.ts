/**
 * @fileoverview gRPC-Web generated client stub for orijtech.cosmosloadtester.v1
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v0.0.0
// source: orijtech/cosmosloadtester/v1/loadtest_service.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as orijtech_cosmosloadtester_v1_loadtest_service_pb from '../../../orijtech/cosmosloadtester/v1/loadtest_service_pb';


export class LoadtestServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorRunLoadtest = new grpcWeb.MethodDescriptor(
    '/orijtech.cosmosloadtester.v1.LoadtestService/RunLoadtest',
    grpcWeb.MethodType.UNARY,
    orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestRequest,
    orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestResponse,
    (request: orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestRequest) => {
      return request.serializeBinary();
    },
    orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestResponse.deserializeBinary
  );

  runLoadtest(
    request: orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestRequest,
    metadata: grpcWeb.Metadata | null): Promise<orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestResponse>;

  runLoadtest(
    request: orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestResponse) => void): grpcWeb.ClientReadableStream<orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestResponse>;

  runLoadtest(
    request: orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: orijtech_cosmosloadtester_v1_loadtest_service_pb.RunLoadtestResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/orijtech.cosmosloadtester.v1.LoadtestService/RunLoadtest',
        request,
        metadata || {},
        this.methodDescriptorRunLoadtest,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/orijtech.cosmosloadtester.v1.LoadtestService/RunLoadtest',
    request,
    metadata || {},
    this.methodDescriptorRunLoadtest);
  }

}

