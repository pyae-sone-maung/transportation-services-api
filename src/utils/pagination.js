const paginateLinks = (host, limit, items, page, paginateUrl) => {
    if (limit === items && page === 1) {
        return {
            nextPage: host + paginateUrl + parseInt(page + 1),
        };
    } else if (limit === items && page > 1) {
        return {
            nextPage: host + paginateUrl + parseInt(page + 1),
            prevPage: host + paginateUrl + parseInt(page - 1),
        };
    } else if (limit != items && page > 1) {
        return {
            prevPage: host + paginateUrl + parseInt(page - 1),
        };
    }
};

module.exports = { paginateLinks };
