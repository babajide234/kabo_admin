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

const createData = (id, name, email, phone,type,status   ) => {
    return { id, name, email, phone,type,status   }
}

const VerifyTable = () => {
    
    const verifiedUsers = VerifyStore((state)=> state.verifiedUsers);
    const setStoreId = VerifyStore((state)=> state.setStoreId);
    const setCheck = VerifyStore((state)=> state.setCheck);
    const check = VerifyStore((state)=> state.check);

    const [ type, setType ] = useState("");
    const [ email, setEmail ] = useState("");

    const store = verifiedUsers?.filter((item) => item.accountInfo.account == type || item.accountInfo.email == email);

    const rows = store?.map((data)=>{

        const row = createData(
            data.accountInfo.store_id,
            data.accountInfo.name,
            data.accountInfo.email,
            data.accountInfo.phone,
            data.process.type,
            data.process.status,
        )

        return row
    })

    console.log("rows", rows);
    const ITEM_HEIGHT = 48;

    const handleEdit = (id) => {
        console.log(id)
        setCheck(!check);
        setStoreId(id);
    }

    const handleAccountType = (e) => {
        setType(e.target.value)
    }

    return (
        <TableContainer component={Paper}>
            <Box sx={{ 
                paddingInline:"20px",
                paddingBlock:"20px",
            }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Grid item xs={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                            <Select
                                name='store_id'
                                value={type}
                                label="Account Type"
                                onChange={handleAccountType}
                            >
                                <MenuItem value="customer">Customer</MenuItem>
                                <MenuItem value="rider">Rider</MenuItem>
                                <MenuItem value="store">Store</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            fullWidth 
                            size='small'
                            label="Search By Email"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setEmail(e.target.value)}
                        ></TextField>
                    </Grid>
                </Stack>
            </Box>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                {
                    !rows || type !== "" ? (
                        <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                        <Typography variant='h5'>
                            No verification
                        </Typography>
                        </Box>
                    ):(
                        <>
                            {
                                type !== "" ? (
                                    <>
                                        <TableHead>
                                        <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell align='right'>Email</TableCell>
                                                <TableCell align='right'>Phone</TableCell>
                                                <TableCell align='right'>Type</TableCell>
                                                <TableCell align='right'>Status</TableCell>
                                                </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{
                                                        '&:last-of-type td, &:last-of-type th': {
                                                        border: 0
                                                        }
                                                    }}
                                                >
                                                    <TableCell component='th' scope='row'>{row.name}</TableCell>
                                                    <TableCell align='right'>{row.email ? row.email : "null"}</TableCell>
                                                    <TableCell align='right'>{row.phone ? row.phone : "null"}</TableCell>
                                                    <TableCell align='right'>{row.type ? row.type : "null"}</TableCell>
                                                    <TableCell align='right'>
                                                        {/* <Chip/> */}
                                                        {row.status ? row.status : "null"}
                                                        
                                                    </TableCell>
                                                    {/* <TableCell align='right'>
                                                        <Button onClick={()=>handleEdit(row.id)}>
                                                            check
                                                        </Button>
                                                    </TableCell> */}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </>
                                ): (
                                    <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                                        <Typography variant='h5'>
                                            Select Account Type
                                        </Typography>
                                    </Box>
                                )
                            }
                        </>
                    )
                }
            </Table>
        </TableContainer>
    );
}

export default VerifyTable;