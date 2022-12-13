import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { V1RunLoadtestResponse as Result } from 'src/gen/LoadtestApi';

interface OutputProps {
    data: Result;
};

export default function Inputs(props: OutputProps) {
    return (
        <Box>
            <Typography variant='caption'>
                <pre style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                    {JSON.stringify(props.data, null, 2)}
                </pre>
            </Typography>
        </Box>
    )
}
