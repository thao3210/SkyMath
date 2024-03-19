import { Box } from '@mui/material';
import SkyMathLogo from '../../assets/images/LogoSkyMath.png'

// ----------------------------------------------------------------------

const Logo = () => {
    return(
        <Box
            component="img"
            src= {SkyMathLogo}
            alt='Logo'
            sx={{ width: 179.35, height: 84, cursor: 'pointer', margin: '0 auto' }}
        />
    );
};


export default Logo;
