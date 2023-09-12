import { orderSlice } from "src/@core/store/orderSlice";
import {
    Grid,
    List,
    ListItem, 
    Typography, 
    Box,
    CircularProgress
} from '@mui/material'

const OrderDetials = () => {
    const order = orderSlice((state)=> state.order )
    order = order ? order[0] : null;


    return (
        <Box sx={{ paddingTop:"200px"}}>
            {
                order  ? (
                    <Grid container spacing={7} >
                    <Grid item xs={12} mt={30}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                            <Typography variant="h5" sx={{ fontWeight:"bold", color: "#0d0a63"}}>Store Details</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                            <Typography variant="h6" mr={10} sx={{ textTransform:"capitalize"}}>Store:</Typography>
                            <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ order?.store[0].name }</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} mt={5}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                            <Typography variant="h5" sx={{ fontWeight:"bold", color: "#0d0a63"}}>Customer Details</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                            <Typography variant="h6" mr={10} sx={{ textTransform:"capitalize"}}>Customer name:</Typography>
                            <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ order?.customer[0].othernames } { order.customer[0].lastname }</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                        <Typography variant="h6" mr={10} sx={{ textTransform:"capitalize"}}>Phone:</Typography>
                            <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ order?.customer[0].phone }</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                        <Typography variant="h6" mr={10} sx={{ textTransform:"capitalize"}}>Address:</Typography>
                            <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ order?.shipping[0].address }</Typography>
                        </Box>
                    </Grid>
    
    
                    <Grid item xs={12} mt={5}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                            <Typography variant="h5" sx={{ fontWeight:"bold", color: "#0d0a63"}}>Order Details</Typography>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                        <Typography variant="h6" mr={10} sx={{ textTransform:"capitalize"}}>Order Status:</Typography>
                            <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ order?.order_status }</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                        <Typography variant="h6" mr={10} sx={{ textTransform:"capitalize"}}>Order Timestamp:</Typography>
                            <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ order?.order_timestamp }</Typography>
                        </Box>
                    </Grid>

                    {/* 
                        <Grid item xs={12}>
                            <Box sx={{ display:"flex", alignItems:"center" }}>
                                <Typography variant="">Payment Status:</Typography>
                                <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ order.payment_status }</Typography>
                            </Box>
                        </Grid> 
                    */}

                    <Grid item xs={12} mt={5}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                            <Typography variant="h5" sx={{ fontWeight:"bold", color: "#0d0a63"}}>Product Details</Typography>
                        </Box>
                    </Grid>
                    {
                        order?.product.map(item => (
                            <Grid container item key={item.id}>
                                <Grid item xs={12}>
                                    <Box sx={{ display:"flex", alignItems:"center" }}>
                                    <Typography variant="h6" mr={10} sx={{ textTransform:"capitalize"}}>Product Name:</Typography>
                                        <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ item.name }</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display:"flex", alignItems:"center" }}>
                                         <Typography variant="h6" mr={10} sx={{ textTransform:"capitalize"}}>Product price:</Typography>
                                        <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ item.amount }</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        ))
                    }
    
                    {/* <Grid item xs={12}>
                        <Box sx={{ display:"flex", alignItems:"center" }}>
                            <Typography variant="">Payment Status:</Typography>
                            <Typography variant="" sx={{ fontSize:"14px",fontWeight:"bold"}}>{ order.payment_status }</Typography>
                        </Box>
                    </Grid> */}
                </Grid>
                ):(
                    <Box sx={{ display:"flex", alignItems:"center" }}>
                        <CircularProgress/>
                    </Box>

                )
            }

        </Box>
    );
}

export default OrderDetials;