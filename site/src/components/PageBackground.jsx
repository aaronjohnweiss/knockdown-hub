import { Paper, styled } from '@mui/material';

const PageBackground = styled(Paper)(({ imgSrc }) => ({
    position: 'absolute',
    top: 0,
    backgroundImage: `url("${imgSrc}")`,
    maskImage: 'linear-gradient(180deg,transparent 0%,black 30%,black 80%,transparent 100%), linear-gradient(90deg,transparent 0%,black 40%,black 70%,transparent 100%); mask-composite: intersect',
    backgroundRepeat: 'no-repeat',
    minHeight: '700px',
    left: '30%',
    right: '0',
    backgroundPosition: 'center',
    opacity: '15%',
    overflow: 'hidden',
    zIndex: -5
}));

export default PageBackground;