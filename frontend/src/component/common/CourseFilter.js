import {useState} from "react";
import {FormControl, Grid, InputLabel, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const CourseFilter = ({data, setFilterData}) => {
    const [filter, setFilter] = useState("");

    const handleFilterChange = (e) => {
        const selectedCategory = e.target.value;
        setFilter(selectedCategory);

        const filteredData = data.filter((course) => {
            course.category.toLowerCase().includes(selectedCategory.toLowerCase())});

        setFilterData(filteredData);


    }

    const clearFilter = () => {
        setFilter("");
        setFilterData(data);
    }

    const categories = ["",...new Set(data.map((course) => course.category))];

    return (
        <div>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={8}>
                    <FormControl fullWidth>
                        <InputLabel id="room-type-filter">Select a room type to filter...</InputLabel>
                        <TextField
                            select
                            fullWidth
                            labelId="room-type-filter"
                            value={filter}
                            onChange={handleFilterChange}
                            variant="outlined"
                            sx={{
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                transition: '0.3s',
                                '&:hover': {
                                    bgcolor: 'background.default',
                                },
                            }}
                        >
                            <MenuItem value="">
                                Select a field you want to learn...
                            </MenuItem>
                            {categories.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {String(type)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="outlined"
                        onClick={clearFilter}
                        sx={{
                            color: 'primary.main',
                            borderColor: 'primary.main',
                            mt: 2,
                            transition: '0.3s',
                            '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'white',
                            },
                            height: '100%',
                        }}
                    >
                        Clear Filter
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default CourseFilter;