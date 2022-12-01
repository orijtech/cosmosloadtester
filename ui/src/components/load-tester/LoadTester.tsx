import Inputs from 'src/components/inputs/Inputs';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

export default function LoadTester() {
    const handleFormSubmission = (data: any) => {
        console.log(data);
    };

    const fields = [
        {
            name: 'size',
            label: 'Size',
            info: 'The size of each transaction, in bytes - must be greater than 40',
            default: 250,
        },
        {
            name: 'rate',
            label: 'Rate',
            info: 'The number of transactions to generate each second on each connection, to each endpoint',
            default: 1000,
        },
        {
            name: 'count',
            label: 'Count',
            info: 'The maximum number of transactions to send - set to -1 to turn off this limit',
            default: -1,
        },
    ];
    return (
        <Paper elevation={0} sx={{ mt: 3, p: 3 }}>
            <Alert severity='info' sx={{ mb: 3 }}>
                <Typography variant="caption">
                    Enter TM Parameters
                </Typography>
            </Alert>
            <Inputs
                handleFormSubmission={handleFormSubmission}
                fields={fields}
            />
        </Paper>
    )
}
