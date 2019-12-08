import React from 'react';

class CreateComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            body: "",
            author_id: 0,
            route_id: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };
    
    update(field) {
        return (e => this.setState({
            [field]: e.target.value
        }));
    }
    
    handleSubmit(e) {
        e.preventDefault();
    
        if (this.state.body !== "") {
            const comment = {
                body: this.state.body,
                author_id: this.state.user,
                route_id: this.state.route_id.id
            };
        debugger
        this.props.createComment(comment);
        this.setState({ body: "" });
        }
    }

    render() {
        return (
            <div className="comment-form">
                <form className="comment-form-details" onSubmit={this.handleSubmit}>
                    <div className="comment-form-icon">
                        <i className="fas fa-comment">Comment</i>
                    </div>
                    <input className="comment-form-input" type="text" value={this.state.body} onChange={this.update('body')} placeholder="Write a comment..." />
                    <input className="comment-form-submit" type="submit" value="POST" />
                </form>
            </div> 
        )
    }
}

export default CreateComment;