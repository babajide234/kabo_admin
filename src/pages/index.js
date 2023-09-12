import React, { useEffect } from 'react';

import { Grid, Paper, Typography, Avatar,Button } from '@mui/material/';
import {Store, People, ShoppingCart, Person, LocalOffer } from '@mui/icons-material';


import { useUserStore } from 'src/@core/store/userStore'

import Link from 'next/link'

import useSWR from 'swr'
import Skeleton from 'react-loading-skeleton'
import Head from 'next/head'


const Dashboard = () => {

  
  const metrics = useUserStore(state=> state.metrics)
  const details = useUserStore(state=> state.details)
  const getMetrics = useUserStore(state=> state.getMetrics)

  const { data, error, isLoading } = useSWR('/api/', getMetrics)
  
  // console.log("metrics", data)

  const isSuperAdmin = details ? details.role.superAdmin == "Yes" ? true : false : false ;

  // useEffect(() => {
  //   getMetrics();
  // }, [getMetrics])

  // useEffect(() => {
  //   console.log(details)
  // }, [details])

  return (
    <div style={{ padding: 16 }}>
      <Head>
        <title>Kabo Panel-Dashboard</title>
      </Head>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid item xs={12} md={4} sx={{ marginBottom:'30px'}}>
        <Paper style={{ padding: 16 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                {
                  !details?.photo && <Avatar src="./images/logo.png" />
                }
                {
                  details?.photo && <Avatar src={details?.photo} />
                }
              </Grid>
              <Grid item xs>
                <Typography variant="h6">{ details && details.username }</Typography>
                <Typography variant="subtitle1">{ details && details.email }</Typography>
                <Typography variant="subtitle2">{ details && details.role.superAdmin == "Yes" ? "Super Admin" : "Admin" }</Typography>
              </Grid>
            </Grid>
        </Paper>
      </Grid>

      <Grid container spacing={3} mb={10}>
          <Grid item xs={12} md={4} >
            <Paper elevation={3} style={{ padding: 16, }}>
              <Grid container alignItems="center">
                <Grid item mr={5}>
                <ShoppingCart />
                </Grid>
                
                <Grid item xs sx={{ display:"flex", flexDirection:"column"}}>
                  <Typography variant="h6" gutterBottom>
                    Delivered Orders
                  </Typography>
                  <Grid item xs sx={{ display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h4">{metrics && metrics.delivered_orders}</Typography>

                    <Link href="/order" style={{ textDecoration:"none" }} passHref>
                      <Button variant="outlined" size="small">View</Button>
                    </Link>

                  </Grid>
                </Grid>
                <Skeleton/>  
              </Grid>
            </Paper>

          </Grid>
          <Grid item xs={12} md={4} >
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="center">
                <Grid item mr={5}>
                <ShoppingCart />
                </Grid>
                <Grid item xs sx={{ display:"flex", flexDirection:"column"}}>
                  <Typography variant="h6" gutterBottom>
                    Successful Orders
                  </Typography>
                  <Grid item xs sx={{ display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h4">{metrics && metrics.successful_orders}</Typography>
                    <Link href="/order" style={{ textDecoration:"none" }} passHref>
                      <Button variant="outlined" size="small">View</Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} >
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="center">
                <Grid item mr={5}>
                <LocalOffer />
                </Grid>
                <Grid item xs sx={{ display:"flex", flexDirection:"column"}}>
                  <Typography variant="h6"  gutterBottom>
                    Products
                  </Typography>
                  <Grid item xs sx={{ display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h4">{metrics && metrics.total_products}</Typography>
                    <Link href="/products" style={{ textDecoration:"none" }} passHref>
                      <Button variant="outlined" size="small">View</Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
      </Grid>
      <Grid container spacing={3} mb={10}>
          {
            isSuperAdmin &&
            <Grid item xs={12} md={4} >
              <Paper style={{ padding: 16, borderLeft: '5px solid #' }}>
                <Grid container alignItems="center">
                  <Grid item mr={5}>
                    <Store />
                  </Grid>
                  <Grid item xs sx={{ display:"flex", flexDirection:"column"}}>
                    <Typography variant="h6" gutterBottom>
                      Store
                    </Typography>
                    <Grid item xs sx={{ display:"flex", justifyContent:"space-between"}}>
                      <Typography variant="h4">{metrics && metrics.total_stores}</Typography>
                      <Link href="/stores" style={{ textDecoration:"none" }} passHref>
                        <Button variant="outlined" size="small">View</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          }

          <Grid item xs={12} md={4}>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="center">
                <Grid item mr={5}>
                  <People />
                </Grid>
                <Grid item xs sx={{ display:"flex", flexDirection:"column"}}>
                  <Typography variant="h6" gutterBottom>
                    Customers
                  </Typography>
                  <Grid item xs sx={{ display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h4">{metrics && metrics.total_customers}</Typography>
                    <Link href="/customers" style={{ textDecoration:"none" }} passHref>
                      <Button variant="outlined" size="small">View</Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
     


          <Grid item xs={12} md={4}>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="center">
                <Grid item mr={5}>
                  <Person />
                </Grid>
                <Grid item xs sx={{ display:"flex", flexDirection:"column"}}>
                  <Typography variant="h6" gutterBottom>
                    Total Riders
                  </Typography>
                  <Grid item xs sx={{ display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h4">{metrics && metrics.total_riders}</Typography>
                    <Link href="/riders" style={{ textDecoration:"none" }} passHref>
                      <Button variant="outlined" size="small">View</Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
      </Grid>
    </div>
  )
}

export default Dashboard
