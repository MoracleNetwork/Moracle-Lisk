/* eslint-disable no-undef */
(async () => {
    // args is magically populated with the query sent to the resolver.
    return await asyncGet(args.url);
})();