import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export enum FieldType {
    VALUE_BASED = 'value-based-field',
    LIST_BASED = 'list-based-field',
    OBJECT_BASED = 'object-based-field',
    SINGLE_SELECTION_BASED = 'single-selection-field',
};

export type FormField = {
    name: string;
    label: string;
    default?: string | number;
    info?: string;
    fieldType: FieldType,
    keys?: string[],
    required?: string | boolean;
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
        /**
         * Cannot apply undefined to defaultValue or defaultValues at useForm
         * Keeping a default value as undefined would cause an error from React
         * about turning an uncontrolled input to a controlled input
         * @see https://react-hook-form.com/api/usecontroller/controller 
         */
        .reduce((prev, next) => ({
            ...prev,
            [next.name]: next.default || '',
        }), {});

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
                                rules={{ required: f.required }}
                                render={({ field, fieldState: { error } }) => {
                                    if (f.fieldType === FieldType.SINGLE_SELECTION_BASED) {
                                        return (
                                            <TextField
                                                select={true}
                                                variant='outlined'
                                                label={f.label}
                                                size='small'
                                                error={error !== undefined}
                                                helperText={error !== undefined ? error.message : f.info}
                                                {...field}
                                            >
                                                {f.options?.map((p) =>
                                                    <MenuItem value={p.value} key={p.value}>
                                                        <Typography variant='caption'>
                                                            {p.name}
                                                        </Typography>
                                                    </MenuItem>
                                                )}
                                            </TextField>
                                        )
                                    }
                                    return (
                                        <TextField
                                            variant='outlined'
                                            label={f.label}
                                            size='small'
                                            error={error !== undefined}
                                            helperText={error !== undefined ? error.message : f.info}
                                            {...field}
                                        />
                                    )
                                }}
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
