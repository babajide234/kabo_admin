import { 
    Grid,
    Typography,
    Button,
    Card,
    CardHeader,
    Box,
    Modal,
    Stack
} from '@mui/material/'
import EarningsTable from 'src/views/earnings/EarningsTable';

const Earnings = () => {
    return (
        <Grid container spacing={6} >
            <Grid item xs={12} sx={{ display:"flex", justifyContent: "space-between"}}>
                <Typography variant='h5'>
                    Earnings
                </Typography>
                {/* <Stack spacing={5} direction="row">
                    <Button variant="contained" onClick={ ()=> setAdd(!add) }>Add New Distance</Button>
                </Stack> */}
            </Grid>
            <Grid item xs={12}>
            <Card>
                <CardHeader title='Earnings Table' titleTypographyProps={{ variant: 'h6' }} />
                <EarningsTable/>
            </Card>
            </Grid>
        </Grid>
    );
}

export default Earnings;