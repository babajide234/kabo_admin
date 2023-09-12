import { 
    Box, 
    Typography,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    Chip,
    Menu,
    MenuItem,
    IconButton,
    Button,
    Stack,
    Grid,
    FormControl,
    InputLabel,
    Select,
    TextField
 } from '@mui/material/'
import { VerifyStore } from 'src/@core/store/verifyStore';
import { useState } from 'react';
import { walletStore } from 'src/@core/store/walletSlice';

const createData = (amount,balance_after,balance_before,reference_code,status,timestamp,type) => {
    return {amount,balance_after,balance_before,reference_code,status,timestamp,type }
}

const TransactionsTable = () => {
    const transactions = walletStore((state)=> state.transactions);



    const rows = transactions?.data.map((data)=>{

        const row = createData(
            data.amount,
            data.balance_after,
            data.balance_before,
            data.reference_code,
            data.status,
            data.timestamp,
            data.type,
        )

        return row
    })

    console.log("rows", rows);
    const ITEM_HEIGHT = 48;

    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                {
                    !rows ? (
                        <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                            <Typography variant='h5'>
                                No Transaction
                            </Typography>
                        </Box>
                    ):(
                        <>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ref</TableCell>
                                    <TableCell align='right'>Type</TableCell>
                                    <TableCell align='center'>Status</TableCell>
                                    <TableCell align='center'>Amount</TableCell>
                                    <TableCell align='center'>Before Amount</TableCell>
                                    <TableCell align='center'>After Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                rows.map(row => (
                                    <TableRow
                                        key={row.reference_code}
                                        sx={{'&:last-of-type td, &:last-of-type th': { border: 0}}}
                                    >
                                        <TableCell component='th' scope='row'>{row.reference_code}</TableCell>
                                        <TableCell align='right'>
                                            <Chip label={row.type}color={row.type == "Credit" ? "success":"error"}  size="small" />
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Chip label={row.status} color={row.status == "Successful" ? "success":"error"} size="small" />
                                        </TableCell>
                                        <TableCell align='center'> &#8358; {row.amount}</TableCell>
                                        <TableCell align='center'> &#8358; {row.balance_before}</TableCell>
                                        <TableCell align='center'> &#8358; {row.balance_after}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </>
                    )
                }
            </Table>
        </TableContainer>
    );
}


export default TransactionsTable;