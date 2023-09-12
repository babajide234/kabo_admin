import { useState, useEffect } from 'react'

import {useStoreSlice} from 'src/@core/store/storeSlice'
import {useProductsSlice} from 'src/@core/store/productSlice'

import { 
    Grid, 
    Typography, 
    Box, 
    TablePagination,
    TextField,
    Button,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress
} from '@mui/material'
import { EarningStore } from 'src/@core/store/earningsStore'
import { useUserStore } from 'src/@core/store/userStore'

const createData = (email, account, name, pending, successfull) => {
    return {email, account, name, pending, successfull}
}

const rowsPerPageOptions = [5, 10, 25];

const EarningsTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [email, setEmail] = useState('');
    const [account, setAccount] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const earnings = EarningStore((state)=> state.earnings);
    const getEarnings = EarningStore((state)=> state.getEarnings);
    const token = useUserStore((state) => state.user);


    useEffect(()=>{
        
        const data = {
            token,
            account: account,
            from: from,
            to: to
        }

        getEarnings(data);
        
    },[account, from, getEarnings, to, token])

    const rows = earnings?.map((data)=>{
        const row = createData(
            data.store.email,
            data.account,
            data.store.name,
            data.pending,
            data.successfull
        )

        return row
    })

    console.log("rows", rows);
    const ITEM_HEIGHT = 48;

    const handleEdit = (id)=>{
        setDisId(id);
        setEdit(true);

        const data = {
            token: token,
            id: id,
        }

        singleList(data);
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      setPage(0);
    };

    const filteredData = rows?.filter((item) => {
        return (
          item.email.toLowerCase().includes(email.toLowerCase()) 
        );
    });

    return (
        <TableContainer component={Paper}>
            <Grid container px={10}  py={5} spacing={5} sx={{ width:"100%", display: "flex", justifyContent:"end", alignItems:"center" }}>            
                <Grid item md={3} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
                    <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Store</InputLabel>
                        <Select
                            name='store_id'
                            value={account}
                            label="Store"
                            onChange={(e) => setAccount(e.target.value)}
                        >
                            <MenuItem  value="" selected disabled>Select Account</MenuItem>
                            <MenuItem  value="panel">Panel</MenuItem>
                            <MenuItem  value="store">Store</MenuItem>
                            <MenuItem  value="rider">Rider</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={3} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
                    <TextField
                        fullWidth
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                        variant="outlined"
                        size="small"
                        label="Email"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item md={3} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
                    <TextField
                        fullWidth
                        type='date'
                        value={from}
                        onChange={ (e) => setFrom(e.target.value)}
                        variant="outlined"
                        size="small"
                        label="From"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item md={3} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
                    <TextField
                        fullWidth
                        type='date'
                        value={to}
                        onChange={(e)=> setTo(e.target.value)}
                        label="To"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            {
                !rows ? (
                        <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                            <Typography variant='h5'>
                                No Distance Set
                            </Typography>
                        </Box>
                    ):(
                        <>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Account</TableCell>
                                    <TableCell>{account} Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Pending</TableCell>
                                    <TableCell>Successfull</TableCell>
                                    {/* <TableCell align='right'>Action</TableCell>  */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                 {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:last-of-type td, &:last-of-type th': {
                                            border: 0
                                            }
                                        }}
                                    >
                                        <TableCell component='th' scope='row'>
                                            {row.account}
                                        </TableCell>
                                        <TableCell align='left'> {row.name}</TableCell>
                                        <TableCell align='left'> {row.email}</TableCell>
                                        <TableCell align='left'> &#8358; {row.pending}</TableCell>
                                        <TableCell align='left'>&#8358; {row.successfull || 0}</TableCell>
                                        {/* <TableCell align='right'>
                                            {
                                                <Button variant="outlined" size="small" onClick={()=>handleEdit(row.email)}>
                                                    <Typography variant="caption" sx={{ fontSize: '10px' }}>
                                                        Edit
                                                    </Typography>
                                                </Button>
                                        }
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TablePagination
                                rowsPerPageOptions={rowsPerPageOptions}
                                count={rows.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )
            }
        </Table>
    </TableContainer>
    );
}

export default EarningsTable;