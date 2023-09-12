
import { useState,useEffect } from 'react'
import { 
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Button,
    OutlinedInput,
    InputAdornment,
    Input,
    CircularProgress,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Menu,
    IconButton,
    Chip, 
    Box, 
} from '@mui/material/'

// import MoreVertIcon from '@mui/icons-material/MoreVert';
import DotsVertical  from 'mdi-material-ui/DotsVertical'

import {useStoreSlice} from 'src/@core/store/storeSlice'
import {useProductsSlice} from 'src/@core/store/productSlice'

import { useUserStore } from 'src/@core/store/userStore'

const createData = (id, name, quantity, amount, category, cat_id, details, store ) => {
    return { id, name, quantity, amount, category, cat_id, details, store}
}

const rowsPerPageOptions = [5, 10, 25];



const ProductsTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCat, setFilterCat] = useState('');
    const [filterStore, setFilterStore] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const products = useProductsSlice((state) => state.products);
    const setSingleProducts = useProductsSlice((state) => state.setSingleProducts);
    const setEdit = useProductsSlice((state)=> state.setEdit);
    const clearProduct = useProductsSlice((state)=> state.clearProduct);
    const setProductId = useProductsSlice((state)=> state.setProductId);
    const token  = useUserStore( (state) => state.user);

    const setStore = useStoreSlice( (state)=> state.setStore);
    const stores = useStoreSlice( (state)=> state.stores);
    const categories = useProductsSlice( (state)=> state.categories);
    const subcategories = useProductsSlice( (state)=> state.subcategories);
    const setCategories = useProductsSlice( (state)=> state.setCategories);
    const setSubCategories = useProductsSlice( (state)=> state.setSubCategories);

    const rows = products?.map((data)=>{
        const row = createData(
            data.id,
            data.name,
            data.quantity,
            data.amount,
            data.category_name,
            data.category_id,
            data.details,
            data.store_name, 
        )

        return row
    })

    useEffect(() => {
        setCategories({
            token,
            category_id: ""
        })
        setStore({
            token,
            store_id: "",
            location: "",
            store: "",
            page: "",
            limit: ""
        })
    }, [token,setCategories,setStore])

    console.log("rows", rows);
    const ITEM_HEIGHT = 48;

    const handleEdit = (id)=>{
        clearProduct()
        console.log(id)
        setProductId(id);

        setEdit(true);

        const data = {
                token: token,
                id: id,
                store_id: "",
                category_id: "",
                sub_category_id: "",
                location: "",
                store: "",
                orderBy: "",
                active: ""
        }
        setSingleProducts(data);
    }
    
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
                    <MenuItem onClick={()=>handleEdit(id)}>Edit</MenuItem>
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

    // const filteredData = rows?.filter((item) => {
    //     console.log('item.store:', item.store);
    //     console.log('filterStore:', filterStore);
    //     console.log('item.cat_id:', item.cat_id);
    //     console.log('filterCat:', filterCat);
        
    //     const match =
    //       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       item.cat_id.includes(filterCat) ||
    //       item.store.toLowerCase().includes(filterStore.toLowerCase());
        
    //       console.log('match:', match);

    //     return match;
    // });
    
    
    // const filteredData = rows?.filter((item) => {
    //     return (
    //         item.store.toLowerCase().includes(filterStore.toLowerCase()) ||
    //         item.cat_id.includes(filterCat) ||
    //         item.name.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    // });

    const filteredData = rows?.filter((item) => {
        return(
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            item.cat_id.includes(filterCat) &&
            item.store.toLowerCase().includes(filterStore.toLowerCase()) 
        )
      });
      

      
    console.log('filtered',filteredData);
            
    const handleCategory = (e)=>{
        const val = e.target.value;
        setFilterCat(val);

        console.log('category Id', filterCat)
    }

    const handleFilterStore = (e)=>{
        const val = e.target.value;
        setFilterStore(val);

        console.log('filter', filterCat)
    }

    return (
        <TableContainer component={Paper}>
            <Grid container px={10}  py={5} spacing={5} sx={{ width:"100%", display: "flex", justifyContent:"end", alignItems:"center" }}>            
                <Grid item md={4} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
                    <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Store</InputLabel>
                        <Select
                            name='store_id'
                            value={filterStore}
                            label="Store"
                            onChange={handleFilterStore}
                        >
                            <MenuItem  value="">All Stores</MenuItem>
                            {
                                stores == null ? (
                                    <MenuItem disabled>
                                        {/* <CircularProgress size={24} /> */}
                                        No Stores Available
                                    </MenuItem>
                                ): (
                                    stores?.map(item => (
                                        <MenuItem key={item.store_id} value={item.name}>{item.name}</MenuItem>
                                    ))
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={4} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
                    <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            name='category_id'
                            label="Category"
                            value={filterCat}
                            onChange={handleCategory}
                        >
                            <MenuItem  value="">All Categories</MenuItem>
                            {categories.length == 0 ? (
                                <MenuItem disabled>
                                    <CircularProgress size={24} />
                                </MenuItem>
                            ) : (
                                categories.map((category) => (
                                    <MenuItem key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={4} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
                    <TextField fullWidth size="small" label="Search" value={searchQuery} onChange={handleSearchChange} />
                </Grid>
            </Grid>

            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                {
                    !rows ? (
                            <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                                <Typography variant='h5'>
                                    No Products
                                </Typography>
                            </Box>
                        ):(
                            <>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align='right'>Quantity</TableCell>
                                        <TableCell align='right'>Amount</TableCell>
                                        <TableCell align='right'>Category</TableCell>
                                        <TableCell align='right'>Details</TableCell>
                                        <TableCell align='right'>Store</TableCell> 
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
                                                {row.name}
                                            </TableCell>
                                            <TableCell align='right'>{row.quantity}</TableCell>
                                            <TableCell align='right'>{row.amount ? row.amount : "null"}</TableCell>
                                            <TableCell align='right'>{row.category ? row.category : "null"}</TableCell>
                                            <TableCell align='right'>{row.details ? row.details: "null"}</TableCell>
                                            <TableCell align='right'>{row.store ? row.store: "null"}</TableCell>
                                            
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



export default ProductsTable;
