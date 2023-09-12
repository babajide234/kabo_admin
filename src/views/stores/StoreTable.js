import { useState } from 'react'

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
import Button from '@mui/material/Button';

import Chip from '@mui/material/Chip';
import { Box, TablePagination, Typography } from '@mui/material/'


// import MoreVertIcon from '@mui/icons-material/MoreVert';
import DotsVertical  from 'mdi-material-ui/DotsVertical'
import {useTeamSlice} from 'src/@core/store/teamStore'
import {useStoreSlice} from 'src/@core/store/storeSlice'

// import Button from 'src/@core/theme/overrides/button'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react'

const createData = (id, name, area,verified, c_name, c_email, c_phone ) => {
    return { id, name, area, verified, c_name, c_email, c_phone}
}

const rowsPerPageOptions = [ 5, 10, 25];


const StoresTable = () => {

    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [page, setPage] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilter] = useState("No");
    const [filterInput, setFilterInput] = useState("Yes");
    
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const stores = useStoreSlice(state => state.stores);
    const setEdit = useStoreSlice((state)=> state.setEdit);
    const edit = useStoreSlice((state)=> state.edit);
    const setStoreId = useStoreSlice((state)=> state.setStoreId);

    const rows = stores?.map((data)=>{

        const row = createData(
            data.store_id,
            data.name,
            data.area, 
            data.verified,
            data.contact_person.fullname,
            data.contact_person.email,
            data.contact_person.phone,
        )

        return row
    })

    useEffect(()=>{
        console.log('filter', filter)
    },[filter])

    // const rows = stores?.map((data) => {
    //     if (filter === "Yes" && data.verified !== "Yes") {
    //       return null; // Skip the row if it doesn't match the filter
    //     }
      
    //     if (filter === "No" && data.verified !== "No") {
    //       return null; // Skip the row if it doesn't match the filter
    //     }
      
    //     const row = createData(data.store_id, data.name, data.area, data.verified);

    //     return row;
    //   });
      

    console.log("rows", rows);
    const ITEM_HEIGHT = 48;

    const handleEdit = (id) => {
        console.log(id)
        setEdit(!edit);
        setStoreId(id);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const button = (id) => {
        console.log(id)

        return (
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
                    <MenuItem onClick={()=> handleEdit(id)}>Edit</MenuItem>
                </Menu>
            </>
        )
    }

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
      
      const handleFilterChange = (event)=>{
        const value = event.target.checked ? 'Yes' : 'No'; // Use 'Yes' when checked, otherwise empty string
        setFilterInput(value);
      }
      
      const filteredData = rows?.filter((item) => {
            return (
                item.verified.toLowerCase().includes(filterInput.toLowerCase()) 
            );
        });

    return (
        <div className="">

            <Box className="" sx={{ paddingLeft:"20px" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Non Verified</Typography>
                    <AntSwitch checked={filterInput === 'Yes'} onChange={handleFilterChange} inputProps={{ 'aria-label': 'ant design' }} />
                    <Typography>Verified</Typography>
                </Stack>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    {
                        !filteredData ? (
                            <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                            <Typography variant='h5'>
                                No Stores
                            </Typography>
                            </Box>
                        ):(
                            <>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align='right'>Area</TableCell>
                                        <TableCell align='center'>Verified</TableCell>
                                        <TableCell align='center'>Contact Name</TableCell>
                                        <TableCell align='center'>Contact Email</TableCell>
                                        <TableCell align='center'>Contact Phone</TableCell>
                                        <TableCell align='right'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData.map(row => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                '&:last-of-type td, &:last-of-type th': {
                                                border: 0
                                                }
                                            }}
                                        >
                                            <TableCell component='th' scope='row'>{row.name}</TableCell>
                                            <TableCell align='right'>{row.area ? row.area : "null"}</TableCell>
                                            <TableCell component='th' scope='row'>{row.verified}</TableCell>
                                            <TableCell component='th' scope='row'>{row.c_name}</TableCell>
                                            <TableCell component='th' scope='row'>{row.c_email}</TableCell>
                                            <TableCell component='th' scope='row'>{row.c_phone}</TableCell>
                                            <TableCell align='right'>
                                                <Button variant="outlined" size="small" onClick={()=>handleEdit(row.id)}>
                                                    Change Status
                                                </Button>
                                            </TableCell>
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
        </div>
    );
}



export default StoresTable;