import React, { useState, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import { Grid, Typography, Box, TablePagination,TextField, Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import {useTeamSlice} from 'src/@core/store/teamStore'

// import MoreVertIcon from '@mui/icons-material/MoreVert';
import DotsVertical  from 'mdi-material-ui/DotsVertical'

const createData = (lastname, othernames, email, phone, address, active  ) => {
    return { lastname, othernames, email, phone, address, active  }
}

const rowsPerPageOptions = [5, 10, 25];


const CustomerTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterInput, setFilterInput] = useState("Yes");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const customers = useTeamSlice(state => state.customers);
    const setEdit = useTeamSlice((state)=> state.setEdit);

    const rows = customers?.map((data)=>{
        const row = createData(
            data.lastname, 
            data.othernames, 
            data.email, 
            data.phone, 
            data.address,
            data.active
        )

        return row
    })

    const ITEM_HEIGHT = 48;

    // const handleEdit =(id)=>{
    //     console.log(id)
    //     setEdit(true);
    // }
    
    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
          '& .MuiSwitch-thumb': {
            width: 15,
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
          },
        },
        '& .MuiSwitch-switchBase': {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
          width: 12,
          height: 12,
          borderRadius: 6,
          transition: theme.transitions.create(['width'], {
            duration: 200,
          }),
        },
        '& .MuiSwitch-track': {
          borderRadius: 16 / 2,
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
          boxSizing: 'border-box',
        },
    }));

    const button = (id) =>{
        return(
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <DotsVertical />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch'
                    }
                }}
            >
                    <MenuItem onClick={() => handleEdit(id)}>Edit</MenuItem>
            </Menu>
        </>
        )
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
      
    const handleFilterChange = (event)=>{
        const value = event.target.checked ? 'Yes' : 'No'; // Use 'Yes' when checked, otherwise empty string
        setFilterInput(value);
    }

    const filteredData = rows?.filter((item) => {
        return (
          (item.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.othernames.toLowerCase().includes(searchQuery.toLowerCase())) &&
          item.active.toLowerCase().includes(filterInput.toLowerCase())
        );
      });
      

    const handleEdit = (id) => {
        console.log(id)
        setEdit(!edit);
        setStoreId(id);
    }

    return (
        <TableContainer component={Paper}>
            <Grid mb={5} mx={5} mt={5} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
                <Stack direction="row" spacing={1} alignItems="center" sx={{ marginRight:10 }}>
                    <Typography>Non Active</Typography>
                    <AntSwitch checked={filterInput === 'Yes'} onChange={handleFilterChange} inputProps={{ 'aria-label': 'ant design' }} />
                    <Typography>Active</Typography>
                </Stack>

               <TextField size="small" label="Search" value={searchQuery} onChange={handleSearchChange} />
            </Grid>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                {
                    !rows ? (
                        <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                        <Typography variant='h5'>
                            No Customers
                        </Typography>
                        </Box>
                    ) : (
                        <>           
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Email</TableCell>
                                    <TableCell align='right'>Phone</TableCell>
                                    <TableCell align='right'>Address</TableCell>
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
                                            { row.othernames} {row.lastname} 
                                        </TableCell>
                                        <TableCell align='right'>{row.email}</TableCell>
                                        <TableCell align='right'>{row.phone} </TableCell>
                                        <TableCell align='right'>{row.address}</TableCell>
                                        {/* <TableCell align='right'>
                                            <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(row.id)}>Change Status</Button>
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



export default CustomerTable;