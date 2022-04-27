const paginateLinks = (req, limit, items, page, paginateUrl) => {
    if (limit === items && page === 1) {
        return {
            nextPage: req.headers.host + paginateUrl + parseInt(page + 1),
        };
    } else if (limit === items && page > 1) {
        return {
            nextPage: req.headers.host + paginateUrl + parseInt(page + 1),
            prevPage: req.headers.host + paginateUrl + parseInt(page - 1),
        };
    } else if (limit != items && page > 1) {
        return {
            prevPage: req.headers.host + paginateUrl + parseInt(page - 1),
        };
    }
};

module.exports = { paginateLinks };
