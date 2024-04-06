import {Box, Grid, Typography} from "@mui/material";

const Footer = () => {
    let today = new Date();

    return (
        <Box component="footer" sx={{ bgcolor: 'dark', color: 'light', py: 3, mt: 5 }}>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <Typography align="center" variant="body1">
                        &copy; {today.getFullYear()} E-Learning. Your comfort is our priority.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
