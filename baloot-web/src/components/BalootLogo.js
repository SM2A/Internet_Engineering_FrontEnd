function BalootLogo(props) {
    return (
        <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Baloot logo"/>
            <h2 className="fw-bold mb-5">{props.text}</h2>
        </div>
    );
}

export default BalootLogo;