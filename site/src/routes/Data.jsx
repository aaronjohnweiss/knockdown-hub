import { Grid, Typography, Link } from '@mui/material';
import { FalconKnockdownTable } from '../components/data/FalconKnockdownTable'

export const Data = () => {
    return (
        <Grid container spacing={2} overflow='hidden' sx={{ minWidth: 0 }}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                    How was this data collected?
                </Typography>
                <Typography>
                    The data for this site and companion app originates from the <Link to='https://ikneedata.com/calculator.html' target='_blank' rel='noreferrer noopener'>IKneeData Calculator</Link> - created by Schmoo and GentleFox. It stood to reason that researching the site's code to grab the values and formulas would be the best way to go. This would allow for quickly running through all permutations of knockdown interactions. So anyway, a web-scraper created in Python was utilized for the calculator that performs the following: 
                </Typography>
                <Typography component='ol'>
                    <li>Capture the list of attackers</li>
                    <li>Capture the list of victims</li>
                    <li>Iterate across each attacker</li>
                    <li>For each attacker, iterate across all victims</li>
                    <li>For each victim, iterate across all attacker's attacks + subattacks + hitboxes of those attacks</li>
                    <li>Modify victim's percentage until the "knockdown" element appears</li>
                    <li>Record the attacker, victim, attack, subattack, hitbox, and percentage</li>
                </Typography>
                <Typography>
                    This process outputs a set of raw data that can be found in the <Link to='https://github.com/aaronjohnweiss/know-your-percents' target='_blank' rel='noreferrer noopener'>know-your-percents</Link> repository. With 26 characters, each having 26 unique match-ups, the operation produced approximately 140,000 lines of data!
                </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                    How was this data refined?
                </Typography>
                <Typography>
                    While having the raw data is good, it isn't quite useful to us. For example, think of Fox's neutral air. With a strong initial hitbox and weak lingering hitbox, we need to make a decision on what hitbox becomes "the" knockdown percentage for his neutral air. To do so, we need an opinionated algorithm to pick and choose these important hitboxes of a move. The current algorithm operates as follows:
                </Typography>
                <Typography component='ol'>
                    <li>Iterate across each attacker</li>
                    <li>For each attacker, iterate across all victims</li>
                    <li>For each victim, iterate across all attacker's attacks + subattacks + hitboxes of those attacks</li>
                    <li>Select the attack / subattack of a move that produces the <b>earliest instance of knockback</b> (lowest percentage). The algorithm deems this move to be "the most effective" (and most commonly perceived) hitbox that represents the move.</li>
                </Typography>
                <Typography>
                    From here, we reduce all selected moves for an entire character's matchup spread into an object of move arrays that map to the victim's character id. What does this look like? Let's visualize Captain Falcon(character ID 0)'s matchup spread into this reduced dataset:
                </Typography>
                <FalconKnockdownTable />
                <Typography>
                    With this foundation, the charts and application started to take shape. But what are the drawbacks?
                </Typography>
            </Grid>
            <Grid container size={{ xs: 12 }}>
                <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                    Limitations / caveats
                </Typography>
                <Typography paddingBottom={1}>
                    Knockdowns are only charted up to 200% for the recipient - it is a future goal to recreate the data up to 999% for thoroughness.
                </Typography>
                <Typography paddingBottom={1}>
                    Due to the opinionated decisions used to reduce the data, there is a significant chance the selected hitbox used to represent a move's knockdown isn't the ideal one. For example, let's look at Young Link's down air. 
                    The move infamously has two separate behaviors - the standard "pogo" where the tip of the sword strikes the opponent, and the flame "hilt" hitbox that is a meteor attack. 
                    With these two hitboxes, the algorithm favors the flame "hilt" hitbox, as meteor attacks produce knockdown at 0%. However, us as players likely perceive the "pogo" to be the true version of the move we'd expect to see knockdown data for.
                </Typography>
                <Typography>
                    At the time of writing, Marth is in a rough spot in regards to this - his tipper hitboxes are prioritized for knockdown values (which isn't the "expected" hitbox to consistently land) as well as the strongest form of his specials being used.
                </Typography>
                <Grid size={{ xs: 10 }} offset={{ xs: 1 }}>
                    <Typography variant='subtitle2' component='h3' fontSize='1em' paddingY={1}>
                        Let's fix this!
                    </Typography>
                    <Typography>
                        Outside of purposing a new algorithm for the raw data parser, I'd like to ask the community to provide <Link to='https://github.com/aaronjohnweiss/know-your-percents/issues/new' target='_blank' rel='noreferrer noopener'>feature enhancement requests</Link> if cases such as the above are found in the dataset. When doing so, please include the following points:
                    </Typography>
                    <Typography component='ul'>
                        <li>The Character</li>
                        <li>The current attack / subattack / move id being used in the algorithm (if possible)</li>
                        <li>The proposed attack / subattack / move id</li>
                        <li>A short message on why this change is warranted</li>
                    </Typography>
                    <Typography>
                        Using these requests, I can include static logic in the parser as it reduces the data to ensure these manually accounted for moves take priority.
                    </Typography>
                </Grid>
                
            </Grid>
            
        </Grid>
    )
}

export default Data;