import { styled } from "@mui/material/styles";
import {Chip } from '@mui/material';

const MuiChipCustom = styled(Chip)(() => ({
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 30,
    color: 'white',  
    margin: 10, 
 
    '& .MuiChip-label': {
       fontSize: 16
    },
 
    '& .MuiChip-deleteIcon': {
       color: 'white',
       fontSize: 16,
      
    },
    '& .MuiChip-deleteIcon:hover': {
      color: 'white',
      fontSize: 16,
     
   },
    '&&:hover': {
      backgroundColor: 'purple',
      
    }
 }));

 export default MuiChipCustom;