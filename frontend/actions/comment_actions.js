import * as CommentApiUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    };
};

export const receiveComment = (comment) => {
    return {
        type: RECEIVE_COMMENT,
        comment
    };
};

export const removeComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId
    };
};

export const receiveErrors = (errors) => {
    return {
        type: RECEIVE_ERRORS,
        errors
    };
};

export const fetchComments = () => dispatch => (
    CommentApiUtil.fetchComments().then(comments => (
        dispatch(receiveComments(comments))
    ), err => {
        return dispatch(receiveErrors(err.responseJSON))
    })
);

export const fetchComment = (id) => dispatch => (
    CommentApiUtil.fetchComment(id).then(comment => (
        dispatch(receiveComment(comment))
    ), err => {
        return dispatch(receiveErrors(err.responseJSON))
    })
);

export const createComment = (comment) => dispatch => (
    CommentApiUtil.createComment(comment).then(comment => (
        dispatch(receiveRoute(route))
    ), err => {
        return dispatch(receiveErrors(err.responseJSON))
    })
);

export const updateComment = (comment) => dispatch => (
    CommentApiUtil.updateComment(comment).then(comment => (
        dispatch(receiveComment(comment))
    ), err => {
        dispatch(receiveErrors(err.responseJSON))
    })
);

export const deleteComment = (id) => dispatch => (
    CommentApiUtil.deleteComment(id).then(id => (
        dispatch(removeComment(id))
    ), err => {
        dispatch(receiveErrors(err.responseJSON))
    })
);


