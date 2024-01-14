import { Link } from "react-router-dom";
import "./Pdflist.css"
function Pdflist({subjectname,id,title,path}){
    console.log("this is id:",id)
    return (

        <li className="lists">
            <a className="a-tag" href={path} target="_blank" rel="noopener noreferrer">
                {title}
            </a>
            <Link  to={`/deletepdf/${subjectname}/${id}`} style={{color:'white',marginLeft:'20px'}}>
                delete 
            </Link>
        </li>
    );

}
export default Pdflist;
