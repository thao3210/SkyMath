import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";

import AddQuizView from "src/sections/quizAll/view/AddQuizView";



const AddQuizPage = () => {
    const { accessToken: currentToken } = useSelector((state) => state.auth);

    if (!currentToken) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Helmet>
                <title> Add Quiz | SkyMath </title>
            </Helmet>

            <AddQuizView />
        </>
    );
}

export default AddQuizPage;