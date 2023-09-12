import { 
    Grid, 
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    CardContent,
    Button, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio 
} from "@mui/material";
import { Formik, Form, Field } from 'formik';

import { 
    LoadingButton
} from "@mui/lab";
import { useTeamSlice } from "src/@core/store/teamStore";
import { useUserStore } from "src/@core/store/userStore";
import { useEffect } from "react";


const CommisionForm = () => {

    const token = useUserStore( (state) => state.user )
    const loading = useTeamSlice( (state) => state.loading )
    const userId = useTeamSlice( (state) => state.userId )
    const setBanks = useTeamSlice( (state) => state.setBanks )
    const banks = useTeamSlice( (state) => state.banks )
    const editRider = useTeamSlice( (state) => state.editRider )
    const details = useUserStore( (state) => state.details )

    useEffect(()=>{
        if(!banks){
            setBanks()
        }

    },[banks,setBanks])

    const initialValues = {
        type: '',
        capped: '',
        rate: '',
      };

    const handleSubmit = (values) => {
        editRider({
            token,
            team_id: userId,
            capped: values.capped,
            type: values.type, 
            rate: values.rate,
            active: "" 
        })
    };

    return (
        <CardContent>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                <Grid container xs={6} spacing={3} direction="column" >
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Commision Type</InputLabel>
                            <Field
                                name="type"
                                as={Select}
                                label="Commision Type"
                            >
                                <MenuItem value="percentage">Percentage</MenuItem>
                                <MenuItem value="flat">Flat</MenuItem>
                            </Field>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <Field
                            name="capped"
                            as={TextField}
                            fullWidth
                            label="Capped"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Field
                            name="rate"
                            as={TextField}
                            fullWidth
                            label="Rate"
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>
                            Update Commision
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Form>
            )}
        </Formik>
        </CardContent>
    );
}

export default CommisionForm;