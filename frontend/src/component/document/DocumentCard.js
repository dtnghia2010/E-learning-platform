import {Link} from "react-router-dom";

const DocumentCard = ({document}) => {
    return (
        <>
            <Link to={`/lecture/${document.document_id}`} className="h-32 sm:h-52 w-40 sm:w-64 cursor-pointer">
                <img src="/images/folderImg.png" alt="" className=" hover:shadow-xl"/>
                <div>
                    <p className="card-title">{document.document_name} </p>
                    <span className="card-author">{document.author_name}</span>
                </div>
            </Link>
        </>
    );
};

export default DocumentCard;
