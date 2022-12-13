import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
// import axios from 'axios';

import Inputs from 'src/components/inputs/Inputs';
import Outputs from 'src/components/output/Outputs';
import { fields } from './Fields';

export default function LoadTester() {
    const [running, setRunning] = React.useState(false);
    const [error, setError] = React.useState('');
    const submitRef = React.useRef<HTMLButtonElement>(null);

    const onFormSubmit = async (data: any) => {
        try {
            setRunning(true);
            // make an axios request to server in same host and set the received data.
            const d = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(data);
                }, 2000);
            });
            console.log({ data: d });
        } catch (e: any) {
            setError(e.message);
        } finally {
            setRunning(false);
        }
    };

    return (
        <Paper elevation={0} sx={{ mt: 3, p: 3 }}>
            <Alert severity='info' sx={{ mb: 3 }}>
                <Typography variant="caption">
                    Enter TM Parameters
                </Typography>
            </Alert>
            <Inputs
                handleFormSubmission={onFormSubmit}
                fields={fields}
                submitRef={submitRef}
            />
            <Button
                disableElevation={true}
                disabled={running}
                color={running ? 'inherit' : 'info'}
                sx={{ textTransform: 'none' }}
                variant='contained'
                onClick={() => submitRef.current?.click()}
            >
                {running ? 'Running load testing...' : 'Run load testing'}
            </Button>
            <Alert severity='success' sx={{ my: 3 }}>
                <Typography variant='caption'>
                    Load Testing Results
                </Typography>
            </Alert>
            {error !== '' && <Typography variant='caption'>{error}</Typography>}
            <Outputs />
        </Paper>
    )
}
