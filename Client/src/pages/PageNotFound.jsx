import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
     <div className="Page404 text-center text-danger">
        <h1 className="m-4">Page Not Found!</h1>
        <Link to="/" className="addTOCart__btn m-3">
            Go Home
        </Link>
     </div>
    )
}

export default PageNotFound