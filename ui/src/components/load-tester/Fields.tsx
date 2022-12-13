import { FieldType, FormField } from 'src/components/inputs/Inputs';

export const fields: FormField[] = [
    {
        name: 'broadcast_tx_method',
        label: 'Broadcast TX Method',
        info: 'The broadcast tx method to use when submitting transactions, can be async, sync, or commit',
        fieldType: FieldType.SINGLE_SELECTION_BASED,
        default: 'async',
        options: [
            { name: 'Async', value: 'async' },
            { name: 'Sync', value: 'sync' },
            { name: 'Commit', value: 'commit' },
        ],
    },
    {
        name: 'endpoint_select_method',
        label: 'Endpoint Select method',
        info: 'The method by which to select endpoints',
        fieldType: FieldType.SINGLE_SELECTION_BASED,
        default: 'supplied',
        options: [
            { name: 'Supplied', value: 'supplied', info: 'select only supplied endpoints(s) for load testing' },
            { name: 'Discovered', value: 'discovered', info: 'select newly discovered endpoints only (excluding supplied endpoints)' },
            { name: 'Any', value: 'any', info: 'select from any of supplied and/or discovered endpoints' }
        ]
    },
    {
        name: 'client_factory',
        label: 'Client factory',
        info: 'The identifier of the client factory to use for generating load testing transactions',
        fieldType: FieldType.VALUE_BASED,
    },
    {
        name: 'duration',
        label: 'Duration',
        info: 'Duration in seconds for which to handle the load test',
        fieldType: FieldType.OBJECT_BASED,
        /** the output path here would be `duration.seconds` */
        keys: ['seconds'],
    },
    {
        name: 'endpoints',
        label: 'Endpoints',
        info: 'A list of URLs indicating Terndermint Websocket RPC endpoints to which to connect',
        fieldType: FieldType.LIST_BASED,
    },
    {
        name: 'max_endpoint_count',
        label: 'Max endpoint count',
        info: 'The maximum number of endpoints to use for testing, where 0 means unlimited',
        default: 0,
        fieldType: FieldType.VALUE_BASED,

    },
    {
        name: 'min_peer_connectivity_count',
        label: 'Min peer connectivity count',
        info: 'The minimum number of peers to which each peer must be connected before starting the load test',
        default: 0,
        fieldType: FieldType.VALUE_BASED,
    },
    {
        name: 'peer_connect_timeout',
        label: 'Peer connect timeout',
        info: 'The duration to wait for connect to a peer',
        default: 2,
        fieldType: FieldType.OBJECT_BASED,
        keys: ['seconds'],
    },
    {
        name: 'send_period',
        label: 'Send period',
        info: 'The period (in seconds) at which to send batches of transactions.',
        default: 1,
        fieldType: FieldType.OBJECT_BASED,
        keys: ['seconds'],
    },
    {
        name: 'stats_output_file_path',
        label: 'Stats output file',
        info: 'Stats output file',
        fieldType: FieldType.VALUE_BASED,
    },
    {
        name: 'transaction_count',
        label: 'Transaction Count',
        info: 'The maximum number of transactions to send (set to -1 to turn off this limit)',
        default: -1,
        fieldType: FieldType.VALUE_BASED,
    },
    {
        name: 'transaction_size_bytes',
        label: 'Transaction size bytes',
        info: 'The size of each transaction - must be greater than 40',
        default: 40,
        fieldType: FieldType.VALUE_BASED,
    },
    {
        name: 'transactions_per_second',
        label: 'Transaction rate per second',
        info: 'The number of transactions to generate each second on each connection, to each endpoint',
        default: 1000,
        fieldType: FieldType.VALUE_BASED,
    }
];