import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";


const CourseCard = ({course}) => {
    return (
        <>
            <Grid item ml={4} pd={4}>
                <Card>
                    <Grid container direction="column" alignItems="center" spacing={2}>
                        <Grid item alignItems="center">
                            <CardMedia
                                component="img"
                                image="/images/folderImg.png"
                                alt='Course Photo'
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            />
                        </Grid>

                        <Grid item>
                            <CardContent>
                                <Typography variant="h5" component="div" style={{ fontWeight: "bold" }} >{course.courseName}</Typography>
                                <Typography variant="h6" component="div" style={{ color: "gray" }}>{course.author}</Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>

            </Grid>
        </>
    );
};

export default CourseCard;
