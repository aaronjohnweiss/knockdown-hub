import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router';
import { FalconKnockdownTable } from '../components/data/FalconKnockdownTable'

export const Data = () => {
    return (
        <Grid container spacing={2} overflow='hidden' sx={{ minWidth: 0 }}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                    How was this data collected?
                </Typography>
                <Typography>
                    The data for this site and companion app originates from the <Link to='https://ikneedata.com/calculator.html' target='_blank' rel='noreferrer noopener'>IKneeData Calculator</Link> - created by Schmoo and GentleFox. Using Python, created a web-scraper for the calculator that performs the following: 
                </Typography>
                <Typography>
                    <ol>
                        <li>Capture the list of Attackers</li>
                        <li>Capture the list of Victims</li>
                        <li>Iterate across each attacker</li>
                        <li>For each attacker, iterate across all victims</li>
                        <li>For each victim, iterate across all attacker's attacks + subattacks + hitboxes of those attacks</li>
                        <li>Modify victim's % until the "knockdown" element appears</li>
                        <li>Record the attacker, victim, attack, subattack, hitbox, and percentage</li>
                    </ol>
                </Typography>
                <Typography>
                    This process outputs a set of raw data that can be found in the <Link to='https://github.com/aaronjohnweiss/knockdown-hub' target='_blank' rel='noreferrer noopener'>Knockdown-Hub</Link> repository. With 26 characters, each having 26 unique match-ups, the operation produced approximately 140,000 lines of data!
                </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                    How was this data refined?
                </Typography>
                <Typography>
                    While having the raw data is good, it isn't quite useful to us. For example, think of Fox's neutral air. With a strong initial hitbox and weak lingering hitbox, we need to make a decision on what hitbox becomes "the" knockdown percentage for his neutral air. To do so, we need an opinionated algorithm to pick and choose these important hitboxes of a move. The current algorithm operates as follows:
                </Typography>
                <Typography>
                    <ol>
                        <li>Iterate across each attacker</li>
                        <li>For each attacker, iterate across all victims</li>
                        <li>For each victim, iterate across all attacker's attacks + subattacks + hitboxes of those attacks</li>
                        <li>Select the attack / subattack of a move that produces the <b>earliest instance of knockback</b> (lowest percentage). The algorithm deems this move to be "the most effective" (and most commonly perceived) hitbox that represents the move.</li>
                    </ol>
                    From here, we reduce all selected moves for an entire character's matchup spread into an object of move arrays that map to the victim's character id. What does this look like? Let's visualize Captain Falcon(characterId 0)'s matchup spread into this reduced dataset:
                </Typography>
                <FalconKnockdownTable />
                <Typography>
                    With this foundation, the charts and application started to take shape. But what are the drawbacks?
                </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                    Limitations & Caveats
                </Typography>
                <Typography>
                    TBD
                </Typography>
            </Grid>
            
        </Grid>
    )
}

export default Data;