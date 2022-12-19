type PercentileBase = {
    at_ns: number;
    at_str: string;
};

type PercentilePerLatency = PercentileBase & { latency: number };
type PercentilePerBytesSize = PercentileBase & { size: number };
type PercentilePerCombined = PercentilePerBytesSize & PercentilePerLatency;

type PercentileRanking<T> = {
    p50: T,
    p75: T,
    p90: T,
    p95: T,
    p99: T,
};

type PerSecPoint = {
    sec: number;
    qps: number;
    bytes: number;
    bytes_rankings: PercentileRanking<PercentilePerBytesSize>,
    latency_rankings: PercentileRanking<PercentilePerLatency>,
}

export type LoadOutputPoint = {
    avg_bytes_per_sec: number;
    avg_tx_per_sec: number;
    total_time: number;
    total_bytes: number;
    total_txs: number;
    p50: PercentilePerCombined;
    p75: PercentilePerCombined;
    p90: PercentilePerCombined;
    p95: PercentilePerCombined;
    p99: PercentilePerCombined;
    per_sec: PerSecPoint[];
};

export type LoadTestOutput = LoadOutputPoint[];

export const outputSample: LoadTestOutput= [
    {
        "avg_bytes_per_sec": 422.15393825983676,
        "avg_tx_per_sec": 105.53848456495919,
        "total_time": 18002911524,
        "total_bytes": 7600,
        "total_txs": 1900,
        "p50": {
            "at_ns": 12000740850,
            "at_str": "12.00074085s",
            "latency": 16942,
            "size": 4
        },
        "p75": {
            "at_ns": 2001010940,
            "at_str": "2.00101094s",
            "latency": 25159,
            "size": 4
        },
        "p90": {
            "at_ns": 15002840984,
            "at_str": "15.002840984s",
            "latency": 40838,
            "size": 4
        },
        "p95": {
            "at_ns": 16000796152,
            "at_str": "16.000796152s",
            "latency": 54770,
            "size": 4
        },
        "p99": {
            "at_ns": 3000639229,
            "at_str": "3.000639229s",
            "latency": 88433,
            "size": 4
        },
        "per_sec": [
            {
                "sec": 0,
                "qps": 100,
                "bytes": 400,
                "bytes_rankings": {
                    "p50": {
                        "at_ns": 3025761,
                        "at_str": "3.025761ms",
                        "size": 4
                    },
                    "p75": {
                        "at_ns": 3126893,
                        "at_str": "3.126893ms",
                        "size": 4
                    },
                    "p90": {
                        "at_ns": 710362,
                        "at_str": "710.362µs",
                        "size": 4
                    },
                    "p95": {
                        "at_ns": 2010957,
                        "at_str": "2.010957ms",
                        "size": 4
                    },
                    "p99": {
                        "at_ns": 633480,
                        "at_str": "633.48µs",
                        "size": 4
                    }
                },
                "latency_rankings": {
                    "p50": {
                        "at_ns": 3025761,
                        "at_str": "3.025761ms",
                        "latency": 17800
                    },
                    "p75": {
                        "at_ns": 3126893,
                        "at_str": "3.126893ms",
                        "latency": 26296
                    },
                    "p90": {
                        "at_ns": 710362,
                        "at_str": "710.362µs",
                        "latency": 42240
                    },
                    "p95": {
                        "at_ns": 2010957,
                        "at_str": "2.010957ms",
                        "latency": 56953
                    },
                    "p99": {
                        "at_ns": 633480,
                        "at_str": "633.48µs",
                        "latency": 242929
                    }
                }
            },
            {
                "sec": 1,
                "qps": 100,
                "bytes": 400,
                "bytes_rankings": {
                    "p50": {
                        "at_ns": 1002111655,
                        "at_str": "1.002111655s",
                        "size": 4
                    },
                    "p75": {
                        "at_ns": 1002353024,
                        "at_str": "1.002353024s",
                        "size": 4
                    },
                    "p90": {
                        "at_ns": 1002326247,
                        "at_str": "1.002326247s",
                        "size": 4
                    },
                    "p95": {
                        "at_ns": 1002397596,
                        "at_str": "1.002397596s",
                        "size": 4
                    },
                    "p99": {
                        "at_ns": 1001288678,
                        "at_str": "1.001288678s",
                        "size": 4
                    }
                },
                "latency_rankings": {
                    "p50": {
                        "at_ns": 1002111655,
                        "at_str": "1.002111655s",
                        "latency": 14099
                    },
                    "p75": {
                        "at_ns": 1002353024,
                        "at_str": "1.002353024s",
                        "latency": 23419
                    },
                    "p90": {
                        "at_ns": 1002326247,
                        "at_str": "1.002326247s",
                        "latency": 39388
                    },
                    "p95": {
                        "at_ns": 1002397596,
                        "at_str": "1.002397596s",
                        "latency": 42895
                    },
                    "p99": {
                        "at_ns": 1001288678,
                        "at_str": "1.001288678s",
                        "latency": 81521
                    }
                }
            }
        ]
    }
]
