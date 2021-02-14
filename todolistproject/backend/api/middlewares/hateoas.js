const { END_POINT, PORT } = process.env;

const hateoas = (resource, req, res, next) => {

    let result;

    if (resource instanceof Array) {

        result = {
            data: resource,
            links: [
                {
                    href: END_POINT + ":" + PORT + "/users",
                    rel: "collection",
                    type: "GET"
                },]
        };
    } else {
        result = {
            data: resource,
            links: [
                {
                    href: END_POINT + ":" + PORT + "/users",
                    rel: "collection",
                    type: "GET"
                },
                {
                    href: END_POINT + ":" + PORT + "/users/" + resource.uuid,
                    rel: "self",
                    type: "GET"
                },
            ]

        };
    }

    res.json(result);

}

module.exports = hateoas;