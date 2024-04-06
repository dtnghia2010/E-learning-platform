
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const CustomDivider = () => {
    return (
        <hr style={{
            border: "none",
            height: "1px",
            background: "black",
            backgroundImage: "linear-gradient(to right, black, black 50%, white 50%, white)",
            backgroundSize: "4px 100%"
        }}/>
    );
};

const Chapter = ({chapter}) => {
    return (
        <div>
            <header className="flex-row justify-center items-center">
                <Button component={Link} to="/chapter_list">Back to content</Button>
                <div className="text-2xl font-bold">
                    Lecture {chapter.chapterID}: {chapter.chapterName}
                </div>
                <Button component={Link} to="/chapter_list">Next chapter</Button>
            </header>
            <CustomDivider/>
            <div className="chapter-content">
                {chapter.Content}
            </div>
        </div>

    );
};

export default Chapter;
