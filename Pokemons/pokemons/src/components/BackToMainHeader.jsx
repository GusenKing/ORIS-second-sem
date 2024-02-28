import {useNavigate} from "react-router-dom";

function BackToMainHeader(){
    const navigate = useNavigate();

    function goBackToMain(){
        navigate("/");
    }

    return(
        <div className="back-to-main-header">
            <img className="go-back-arrow" onClick={goBackToMain} alt="go back arrow" src="/arrow_icon.png"/>
            <img className="details-pokeball-image" alt="pokeball" src="/pokeball.png"/>
        </div>
    )
}

export default BackToMainHeader;