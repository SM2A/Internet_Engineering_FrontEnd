// import "../../assets/styles/product.css";

export default function CommentCard({comment}) {
    return (
        <div className="comment-card">
            <h3 className="comment-msg">{comment.text}</h3>
            <div className="comment-user-date">
                <p>{comment.date}</p>
                <p>&#x2022;</p>
                <p>{comment.userEmail}</p>
            </div>
            <div className="comment-rating-container">
                <p>Is this comment helpful?</p>
                <p>{comment.likes}</p>
                <img src={require("../../assets/images/thumbs-up.png")} alt="Thumbs up"/>
                <p>{comment.dislikes}</p>
                <img src={require("../../assets/images/thumbs-down.png")} alt="Thumbs Down"/>
            </div>
        </div>
    );
}