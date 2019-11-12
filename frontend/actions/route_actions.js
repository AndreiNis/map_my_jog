import * as RouteApiUtil from '../util/route_api_util';

export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveRoutes = (routes) => {
    return {
        type: RECEIVE_ROUTES,
        routes
    };
};

export const receiveRoute = (route) => {
    return {
        type: RECEIVE_ROUTE,
        route
    };
};

export const removeRoute = (routeId) => {
    return {
        type: REMOVE_ROUTE,
        routeId
    };
};

export const receiveErrors = (errors) => {
    return {
        type: RECEIVE_ERRORS,
        errors
    };
};

export const fetchRoutes = () => dispatch => (
    RouteApiUtil.fetchRoutes().then(routes => (
        dispatch(receiveRoutes(routes))
    ), err => {rec
        return dispatch(receiveErrors(err.responseJSON))
    })
);

export const fetchRoute = (id) => dispatch => (
    RouteApiUtil.fetchRoute(id).then(route => (
        dispatch(receiveRoute(route))
    ), err => {
        return dispatch(receiveErrors(err.responseJSON))
    })
);

export const createRoute = (route) => dispatch => (
    RouteApiUtil.createRoute(route).then(route => (
        dispatch(receiveRoute(route))
    ), err => {
        return dispatch(receiveErrors(err.responseJSON))
    })
);

export const updateRoute = (route) => dispatch => (
    RouteApiUtil.updateRoute(route).then(route => (
        dispatch(receiveRoute(route))
    ), err => {
        dispatch(receiveErrors(err.responseJSON))
    })
);

export const deleteRoute = (id) => dispatch => (
    RouteApiUtil.deleteRoute(id).then(id => (
        dispatch(removeRoute(id))
    ), err => {
        dispatch(receiveErrors(err.responseJSON))
    })
);