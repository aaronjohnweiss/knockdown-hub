import { Box } from '@mui/material';
import Idle from '../components/Idle';

export const Root = () => {

    return (
        <Box display='flex' flexDirection='column' justifyContent='center' sx={{ flexGrow: 1 }}>
            <Idle sx={{ justifySelf: 'center', alignSelf: 'center' }} />
        </Box>
    )
}

export default Root;