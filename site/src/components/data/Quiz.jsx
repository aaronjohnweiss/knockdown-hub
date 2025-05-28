import React from 'react';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
    FormLabel,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    Box,
    FormGroup,
    Switch,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";
import characters from '../../../../shared/characters.json';

function getSlightlyRandomPercent(omit, exclude) {
  const maxNum = Math.ceil(omit + 20);
  const minNum = Math.floor(Math.max(omit - 20, 0));

  const num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  if (exclude.includes(num) || num === omit) {
    return getSlightlyRandomPercent(omit, exclude);
  }
  return num;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const QuizEntry = ({ move, percent, offenderId, recipientId, reveal=false, isCc }) => {
    const options = React.useMemo(() => {
        const opts = [0, 1, 2, 3];
        opts.forEach((_, index) => {
            opts[index] = getSlightlyRandomPercent(percent, opts)
        })
        opts[0] = percent;
        shuffleArray(opts);
        return opts;
    }, [percent, getSlightlyRandomPercent]);

    const [selectedValue, setSelectedValue] = React.useState(null);
    const handleChange = React.useCallback((_, value) => {
        setSelectedValue(value);
    }, []);
    

    return (
        <Box paddingY={2}>
            <FormControl>
                <FormLabel 
                    id={`${move}-quiz-label`}
                    sx={{ color: theme => reveal === null ? null : (`${selectedValue}` === `${percent}`) ? theme.palette.success.main : theme.palette.error.main }}
                >
                    {`${characters[offenderId].name} `}
                    <b>{move} </b>
                    {`knocks down ${characters[recipientId].name} ${isCc ? 'through crouch ' : ''} at..`}
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby={`${move}-quiz-label`}
                    defaultValue={null}
                    name={`${move}-quiz-radio-group`}
                    onChange={handleChange}
                >
                    {options.map((val, idx) => <FormControlLabel 
                            key={`${idx}-value`} 
                            value={val} 
                            control={<Radio />} 
                            label={`${val}%`} 
                            sx={{ color: theme => reveal === null ? null : (val === percent) ? theme.palette.success.main : theme.palette.error.main }}
                        />)}
                </RadioGroup>
            </FormControl>
        </Box>
    )
}

const Quiz = ({ rows=[], offenderId, recipientId }) => {
    const [revealAnswers, setRevealAnswers] = React.useState(null);
    const [ccChecked, setCcChecked] = React.useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const quizRows = React.useMemo(() => {
        const data = [...rows];
        shuffleArray(data);
        return data;
    }, [rows]);

    const handleSubmit = React.useCallback(() => {
        setRevealAnswers(true);
    }, []);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        setRevealAnswers(null);
    }, []);

    const handleChange = (event) => {
        setCcChecked(event.target.checked);
    };

    const [open, setOpen] = React.useState();
    return (
        <>
            <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
                <Button onClick={() => setOpen(true)} disabled={rows.length === 0}>
                    Generate Quiz
                </Button>
                <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
                    <Typography>ASDI</Typography>
                    <Switch size='small' onChange={handleChange} />
                    <Typography>CC</Typography>
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
                <DialogTitle>
                    {`${characters[offenderId].name} vs. ${characters[recipientId].name}`}
                </DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {quizRows.map((r, idx) => <QuizEntry 
                            key={`${idx}-entry`}
                            move={r.move} 
                            percent={ccChecked ? r.cc : r.asdi} 
                            offenderId={offenderId} 
                            recipientId={recipientId} 
                            reveal={revealAnswers}
                            isCc={ccChecked}
                        />)}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleSubmit} variant='outlined'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Quiz;