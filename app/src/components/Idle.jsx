import { Typography } from '@mui/material';
import React from 'react';

const Idle = ({ context='setup' }) => {
    const [count, setCount] = React.useState(0);
    const [text, setText] = React.useState(`Waiting for ${context}`);

    React.useEffect(() => {
        const ellipsis = Array.from('...').filter((_, idx) => idx < count).join('')
        const timer = setInterval(() => {
            setCount((count + 1) % 4)
            setText(`Waiting for ${context}` + ellipsis);
        }, 500);

        return () => clearInterval(timer); 
    }, [count, context]);

    return (
        <Typography variant='h4' component='h1' sx={{ minWidth: '295px'}}>
           {text}
        </Typography>
    );
}

export default Idle;