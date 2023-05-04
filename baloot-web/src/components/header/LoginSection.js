import "../../assets/styles/header/LoginSection.css";

export default function LoginSection() {
    return (
        <div className="d-flex align-items-center">
            <a href="/login">
                <button type="button" className="btn  login-section btn-info mr-3">Login</button>
            </a>
            <a href="/signup">
                <button type="button" className="btn  login-section btn-info">Register</button>
            </a>
        </div>
    );
}