const hide_password = (resource, req, res, next) => {

    if (resource instanceof Array) {
        resource.map(a_user => {
            delete (a_user.password);//remove password field on each user, to not show it in json result
        });
    } else {
        delete resource.password;
    }

    next(resource);
}

module.exports = hide_password;