import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export enum FieldType {
    VALUE_BASED = 'value-based-field',
    LIST_BASED = 'list-based-field',
    OBJECT_BASED = 'object-based-field',
    SINGLE_SELECTION_BASED = 'single-selection-field',
};

export type FormField = {
    name: string;
    label: string;
    default?: string|number;
    info?: string;
    fieldType: FieldType,
    keys?: string[],
    options?: { name: string, value: string, info?: string }[],
};

interface Props {
    handleFormSubmission: Function;
    fields: FormField[];
    submitRef: React.Ref<HTMLButtonElement>;
};

export default function Inputs(props: Props) {
    const {
        handleFormSubmission,
        fields,
        submitRef,
    } = props;

    const defaultValues: { [key: string]: any } = fields
        .filter(p => p.default != null)
        .reduce((prev, next) => ({ ...prev, [next.name]: next.default }), {});
    
    const { control, handleSubmit } = useForm({ defaultValues });
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
                ref={submitRef}
                sx={{ display: 'none' }}
            />
        </form>
    );
}
