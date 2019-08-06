export const fetchRoutes = () => {
    return $.ajax ({
        method: 'get',
        url: 'api/routes'
    });
};

export const fetchRoute = (id) => {
    return $.ajax ({
        method: 'get',
        url: `api/routes/${id}`
    });
};

export const createRoute = (route) => {
    return $.ajax ({
        method: 'post',
        url: 'api/routes',
        data: { route }
    });
};

export const updateRoute = (route) => {
    return $.ajax ({
        method: 'patch',
        url: `api/routes/${route.id}`,
        data: { route }
    });
};

export const deleteRoute = (id) => {
    return $.ajax ({
        method: 'delete',
        url: `/api/routes/${id}`
    })
}