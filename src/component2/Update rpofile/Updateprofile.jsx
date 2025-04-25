import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image from '../../Assests/mainlogo.jpg'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { baseUrl } from '../../features/Api/BaseUrl';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Updateprofile() {
  const [data, setData] = React.useState({})
  const useridd = localStorage.getItem("id")
  React.useEffect(() => {
    axios.get(`${baseUrl}getAdmin/${useridd}`).then((response) => {
      setData(response.data.Details)
    }).catch((error) => {
      console.log(error.response)
    })
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3} >
          <Item style={{ height: "220px", objectFit: "cover", objectPosition: "center" }}>
            <img src={image} alt='djkf' style={{ height: "200px", width: "200px", borderRadius: "50%" }} />
          </Item>
        </Grid>
        <Grid item xs={9}>
          <Item>
            <TextField id="outlined-basic" value={data.email} name='email' label="email" className='mb-3' variant="outlined" />
            <TextField id="outlined-basic" value={data.name} label="Name" className='mb-3' variant="outlined" />
            <TextField id="outlined-basic" value={data.role} label="Role" className='mb-3' variant="outlined" />
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
