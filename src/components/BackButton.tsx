// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface BackButtonProps{
    text: string;
    path: string;
    children?: React.ReactElement
}

const BackButton: React.FC<BackButtonProps> = ({text, path, children}: BackButtonProps) => {
    const navigate = useNavigate();
    return(
            <Button  onClick={()=>navigate(path)}>
                {
                    //   !children && children || <FontAwesomeIcon icon={faArrowLeft} />  
                    children
                }
                {text}
            </Button>
    );
}

export default BackButton;