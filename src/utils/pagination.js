const paginateLinks = (limit, items, page, paginateUrl) => {
    if (limit === items && page === 1) {
        return {
            nextPage: paginateUrl + parseInt(page + 1),
        };
    } else if (limit === items && page > 1) {
        return {
            nextPage: paginateUrl + parseInt(page + 1),
            prevPage: paginateUrl + parseInt(page - 1),
        };
    } else if (limit != items && page > 1) {
        return {
            prevPage: paginateUrl + parseInt(page - 1),
        };
    }
};

module.exports = { paginateLinks };
