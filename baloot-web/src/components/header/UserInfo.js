import "../../assets/styles/header/UserInfo.css";

export default function UserInfo({user}) {
    return (
        <div className="d-flex justify-content-end header__userinfo">
            <h3><a href={"/users/" + user.username} >{user.username}</a></h3>
            <button type="button" className="btn btn-info">Cart 0</button>
        </div>
    );
}
