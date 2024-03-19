import { Box } from '@mui/material';
import VietNamFlag from '../../assets/images/VIETNAM.png'
import UKFlag from '../../assets/images/UK.png'


// ----------------------------------------------------------------------

const FlagVietNam = () => {
    return(
        <Box
            component="img"
            src={VietNamFlag}
            alt='vietnam'
            sx={{width:'30px', height:'20px', cursor: 'pointer', margin: '0 auto'}}
        />
    );
};

const FlagEngland = () => {
    return(
        <Box
            component="img"
            src={UKFlag}
            alt='england'
            sx={{width:'30px', height:'20px', cursor: 'pointer', margin: '0 auto' }}
        />
    );
};


export {
    FlagEngland,
    FlagVietNam,
};
