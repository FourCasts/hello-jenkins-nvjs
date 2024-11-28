exports.sayHello = (req, res) => {
    // res.json('Hello World!');
    const environment = process.env.ENVIRONMENT || 'unknown';
    res.json({
        message: 'Hello World!',
        environment: environment,
    });
};
