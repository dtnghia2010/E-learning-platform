import {useContext, useEffect, useState} from "react";

import {
    Alert,
    Box,
    CircularProgress,
    Divider,
    FormControl,
    MenuItem,
    OutlinedInput
} from "@mui/material";
import Select from "@mui/material/Select";
import {StepperContext} from "../../context/StepperContext";
//chỉnh css cho add new của category và document
const Selector = ({handleObjectInputChange, newObject = "", data, input, loading, error, handleSubmit}) => {
    // the new object will be the newobject.categoryname/documentname
    const   {newDocument, setNewDocument} = useContext(StepperContext);

    const [objectName, setObjectName] = useState([]);
    const [showNewObjectInput, setShowNewObjectInput] = useState(false);
    const [newObjectName, setNewObjectName] = useState("");

    useEffect(() => {
        if (data && data.length > 0) {
            const names = data.map(item => item[`${input}_name`]);
            setObjectName(names);
        } else {
            setObjectName([]);
        }
    }, [data, input]);

    const handleNewObjectInputChange = (e) => {
        setNewObjectName(e.target.value);
    }

    const handleAddNewObjectType = () => {
        if(newObjectName !== ""){
            setObjectName([...objectName,newObjectName])
            setNewObjectName("")
            setShowNewObjectInput(false)

            setNewDocument({
                ...newDocument,
                [`${input}_name`]: newObjectName
            });

            if(input ==='course' && typeof handleSubmit === 'function'){
                handleSubmit(newObjectName)
            }
        }
    }

    return (
        <div className="flex items-start justify-start mx-3">
            {objectName.length >=0 && (
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        {/*<InputLabel id="object-label" >Select {input} ... </InputLabel>*/}
                        <Select
                            labelId="object-label"
                            name={`${input}`}
                            id={`${input}`}
                            value={newObject}
                            onChange={(e) => {
                                if(e.target.value ==="Add new") {
                                    setShowNewObjectInput(true)
                                }else {
                                    handleObjectInputChange(e);
                                }
                            }}

                            sx={{width: { sm: '200px', md: '700px' }, height: 30, backgroundColor: "#ffffff",  }}
                        >
                            <MenuItem value="" disabled>Select {input}...</MenuItem>
                            {error && (
                                <MenuItem>
                                    <Alert severity="error">{error}</Alert>
                                </MenuItem>
                            )}
                            {loading ? (
                                <MenuItem>
                                    <div className="flex justify-center items-center"><CircularProgress /></div>
                                </MenuItem>
                            ) : (
                                data && data.length > 0 && objectName.map((type,index) => (
                                    <MenuItem key={index} value={type}>{type}</MenuItem>
                                ))
                            )}
                            <Divider style={{backgroundColor: '#171717'}}/>
                            <MenuItem value="Add new">Add new</MenuItem>
                        </Select>
                    </FormControl>

                    {showNewObjectInput && (
                        <div className="mt-2">
                            <FormControl>
                                <OutlinedInput
                                    type="text"
                                    placeholder={`Enter new ${input}`}
                                    value={newObjectName}
                                    onChange={handleNewObjectInputChange}
                                />
                                <button
                                    style={{
                                        backgroundColor: 'rgb(169, 77, 123)',
                                        color: '#fff',
                                        transition: '0.7s',
                                        outlineColor: 'transparent',
                                        outlineStyle: 'solid'
                                    }}
                                    type="button"
                                    onClick={handleAddNewObjectType}
                                >
                                    Add
                                </button>
                            </FormControl>
                        </div>
                    )}
                </Box>
            )}
        </div>
    );
};

export default Selector;
