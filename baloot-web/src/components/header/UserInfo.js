import "../../assets/styles/header/UserInfo.css";

export default function UserInfo({user}) {
    return (
        <div className="d-flex justify-content-end header__userinfo">
            {/*todo: replace with user info*/}
            <h3>{user.username}</h3>
            <button type="button" className="btn btn-info">Cart 0</button>
        </div>
    );
}
