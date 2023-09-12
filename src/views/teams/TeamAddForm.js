import { useState,useEffect } from 'react';
import { 
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Button
} from '@mui/material/'
import {useTeamSlice} from 'src/@core/store/teamStore';
import {useUserStore} from 'src/@core/store/userStore';
import { useStoreSlice } from 'src/@core/store/storeSlice';
import { LoadingButton } from '@mui/lab';

const TeamAddForm = ({from}) => {
    
    const addTeam = useTeamSlice( (state)=> state.addTeam);
    const addRider = useTeamSlice( (state)=> state.addRider);
    const loading = useTeamSlice( (state)=> state.loading);
    const token  = useUserStore( (state) => state.user)
    const details  = useUserStore( (state) => state.details)

    const setStore = useStoreSlice((state)=> state.setStore )
    const stores = useStoreSlice(state => state.stores);

    // const setAdd = useTeamSlice((state)=> state.setAdd);

    const S_id = details.store_id.admin ? details.store_id.admin : '';

    const [ email, setEmail ] = useState('');
    const [ role, setRole ] = useState(from);
    const [ capped, setCapped ] = useState('');
    const [ type, setType ] = useState('');
    const [ rate, setRate ] = useState('');
    const [ store_id, setStoreId ] = useState(S_id);


    const handleChange = (value)=>{
        setForm({ ...form, value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(from == "rider"){

            const data = {
                token,
                email,
                type,
                capped,
                rate
            }

            addRider(data)
        }else{
            const data = {
                token,
                store_id:"",
                email,
                role,
            }
            addTeam(data)        
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={7}>
                <Grid item xs={12} sm={12}>
                    <Typography variant='h5' sx={{ marginBottom: 2 }}>{ from == "rider" ? "Add Rider" : "Add Manager" }</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth label='Email' placeholder='email'  value={email} onChange={(e)=> setEmail(e.target.value)} />
                </Grid>
                {
                    from !== 'admin' && (
                        <>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Commission Type</InputLabel>
                                    <Select
                                        name='type'
                                        value={type}
                                        label="Commission Type"
                                        onChange={(e)=> setType(e.target.value)}
                                    >
                                        <MenuItem value={'percentage'}>Percentage</MenuItem>
                                        <MenuItem value={'flat'}>Flat</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField fullWidth label='Capped' placeholder='capped'  value={capped} onChange={(e)=> setCapped(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField fullWidth label='Rate' placeholder='rate'  value={rate} onChange={(e)=> setRate(e.target.value)} />
                            </Grid>
                        </>
                    )
                }
                <Grid item xs={12} >
                    <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>
                       Save
                    </LoadingButton>
                </Grid>
             </Grid>
        </form>
    );
}

export default TeamAddForm;