import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import {
    RunLoadtestResponse as Result,
} from 'src/gen/orijtech/cosmosloadtester/v1/loadtest_service_pb';

interface OutputProps {
    data: Result.AsObject;
};

interface ResultBarProps {
    title: string;
    value: string | number;
};

function ResultBar(props: ResultBarProps) {
    const { title, value } = props;
    return (
        <span style={{ marginRight: 5 }}>
            <Chip label={title} size='small' variant='outlined' color='info'  sx={{ borderRadius: 0 }} />
            <Chip label={value} size='small' variant='filled' color='info'  sx={{ borderRadius: 0 }} />
        </span>
    );
}

export default function Inputs(props: OutputProps) {
    const { data } = props;
    return (
        <Box>
            <ResultBar title='avg bytes per second' value={data.avgBytesPerSecond} />
            <ResultBar title='avg tx per second' value={data.avgTxsPerSecond} />
            <ResultBar title='total bytes' value={data.totalBytes} />
            <ResultBar title='total time' value={`${data.totalTime?.seconds || 0} seconds`} />
            <ResultBar title='total tx' value={data.totalTxs} />
        </Box>
    );
}
