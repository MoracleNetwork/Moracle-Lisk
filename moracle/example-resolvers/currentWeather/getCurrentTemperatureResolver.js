/* eslint-disable no-undef */
(async () => {
    // args is magically populated with the query sent to the resolver.
    const data =  await asyncGet(`https://api.darksky.net/forecast/d02672e210338b2e7c2409d12fc1b9d0/${args.lat},${args.long}`);
    return data.currently.temperature;
})();