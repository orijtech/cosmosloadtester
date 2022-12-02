import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

interface Props {
    handleFormSubmission: Function;
    defaultValues?: { [key: string]: any };
    fields: {
        name: string;
        label: string;
        info?: string;
        default?: any;
    }[];
};


export default function Inputs(props: Props) {
    const { handleFormSubmission, defaultValues, fields } = props;
    const { control, handleSubmit } = useForm({
        defaultValues,
    });

    const onSubmit = (data: any) => {
        handleFormSubmission?.(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {fields.map((f) => {
                    return (
                        <Grid item xs={12} md={3} key={f.name}>
                            <Controller
                                name={f.name}
                                control={control}
                                render={({ field }) => 
                                    <TextField
                                        variant='outlined' 
                                        label={f.label}
                                        size='small'
                                        defaultValue={f.default}
                                        helperText={f.info}
                                        {...field}
                                    />
                                }
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Button
                type="submit"
                variant='contained'
                color='inherit'
                disableElevation
                sx={{ textTransform: 'none' }}
            >
                Run
            </Button>
        </form>
    )
}
