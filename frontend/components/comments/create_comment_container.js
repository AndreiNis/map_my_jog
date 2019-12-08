import { connect } from 'react-redux';
import { createComment } from '../../actions/comment_actions';
import { clearErrors } from '../../actions/session_actions';
import { receiveErrors } from '../../actions/comment_actions';
import CreateComment from './create_comment';

const msp = (state) => {
    return {
        user_id: state.session.id,
        comments: Object.values(state.entities.comments),
        errors: state.errors,
    }
};

const mdp = (dispatch) => ({
    createComment: (comment) => dispatch(createComment(comment)),
    clearErrors: () => dispatch(clearErrors()),
    receiveErrors: (error) => dispatch(receiveErrors(error)),
});

export default connect(msp, mdp)(CreateComment);