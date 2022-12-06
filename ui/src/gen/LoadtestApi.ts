/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
*  - ENDPOINT_SELECT_METHOD_UNSPECIFIED: Default value. This value is unused.
 - ENDPOINT_SELECT_METHOD_SUPPLIED: Select only the supplied endpoint(s) for load testing (the default).
 - ENDPOINT_SELECT_METHOD_DISCOVERED: Select newly discovered endpoints only (excluding supplied endpoints).
 - ENDPOINT_SELECT_METHOD_ANY: Select from any of supplied and/or discovered endpoints.
*/
export enum RunLoadtestRequestEndpointSelectMethod {
  ENDPOINT_SELECT_METHOD_UNSPECIFIED = "ENDPOINT_SELECT_METHOD_UNSPECIFIED",
  ENDPOINT_SELECT_METHOD_SUPPLIED = "ENDPOINT_SELECT_METHOD_SUPPLIED",
  ENDPOINT_SELECT_METHOD_DISCOVERED = "ENDPOINT_SELECT_METHOD_DISCOVERED",
  ENDPOINT_SELECT_METHOD_ANY = "ENDPOINT_SELECT_METHOD_ANY",
}

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

export interface V1RunLoadtestRequest {
  /**
   * The identifier of the client factory to use for generating load testing transactions.
   * Maps to --client-factory in tm-load-test.
   */
  clientFactory?: string;

  /**
   * The number of connections to open to each endpoint simultaneously.
   * Maps to --connections in tm-load-test.
   * @format int32
   */
  connectionCount?: number;

  /**
   * The duration (in seconds) for which to handle the load test.
   * Maps to --time in tm-load-test.
   */
  duration?: string;

  /**
   * The period (in seconds) at which to send batches of transactions.
   * Maps to --send-period in tm-load-test.
   */
  sendPeriod?: string;

  /**
   * The number of transactions to generate each second on each connection, to each endpoint.
   * Maps to --rate in tm-load-test.
   * @format int32
   */
  transactionsPerSecond?: number;

  /**
   * The size of each transaction, in bytes - must be greater than 40.
   * Maps to --size in tm-load-test.
   * @format int32
   */
  transactionSizeBytes?: number;

  /**
   * The maximum number of transactions to send - set to -1 to turn off this limit.
   * Maps to --count in tm-load-test.
   * @format int32
   */
  transactionCount?: number;
  broadcastTxMethod?: string;

  /**
   * A comma-separated list of URLs indicating Tendermint WebSockets RPC endpoints to which to connect.
   * Maps to --endpoints in tm-load-test.
   */
  endpoints?: string[];

  /**
   * The method by which to select endpoints.
   * Maps to --endpoint-select-method in tm-load-test.
   */
  endpointSelectMethod?: RunLoadtestRequestEndpointSelectMethod;

  /**
   * The minimum number of peers to expect when crawling the P2P network from the specified endpoint(s) prior to waiting for workers to connect.
   * Maps to --expect-peers in tm-load-test.
   * @format int32
   */
  expectPeersCount?: number;

  /**
   * The maximum number of endpoints to use for testing, where 0 means unlimited.
   * Maps to --max-endpoints in tm-load-test.
   * @format int32
   */
  maxEndpointCount?: number;

  /**
   * The number of seconds to wait for all required peers to connect if expect-peers > 0.
   * Maps to --peer-connect-timeout in tm-load-test.
   */
  peerConnectTimeout?: string;

  /**
   * The minimum number of peers to which each peer must be connected before starting the load test.
   * Maps to --min-peer-connectvity in tm-load-test.
   * @format int32
   */
  minPeerConnectivityCount?: number;

  /**
   * Where to store aggregate statistics (in CSV format) for the load test.
   * Maps to --stats-output in tm-load-test.
   */
  statsOutputFilePath?: string;
}

export interface V1RunLoadtestResponse {
  /**
   * The total number of transactions sent.
   * Corresponds to total_time in tm-load-test.
   * @format int32
   */
  totalTxs?: number;

  /**
   * The total time taken to send `total_txs` transactions.
   * Corresponds to total_txs in tm-load-test.
   */
  totalTime?: string;

  /**
   * The cumulative number of bytes sent as transactions.
   * Corresponds to total_bytes in tm-load-test.
   * @format int32
   */
  totalBytes?: number;

  /**
   * The rate at which transactions were submitted (tx/sec).
   * Corresponds to avg_tx_rate in tm-load-test.
   * @format int32
   */
  avgTxsPerSecond?: number;

  /**
   * The rate at which data was transmitted in transactions (bytes/sec).
   * Corresponds to avg_data_rate in tm-load-test.
   * @format int32
   */
  avgBytesPerSecond?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title orijtech/cosmosloadtester/v1/loadtest_service.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags LoadtestService
     * @name LoadtestServiceRunLoadtest
     * @request POST:/v1/loadtest:run
     */
    loadtestServiceRunLoadtest: (run: string, body: V1RunLoadtestRequest, params: RequestParams = {}) =>
      this.request<V1RunLoadtestResponse, RpcStatus>({
        path: `/v1/loadtest${run}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
