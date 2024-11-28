exports.greet = (req, res) => {
    const environment = process.env.ENVIRONMENT || 'unknown';
    res.json({
        message: 'Greetings from the backend!',
        environment: environment,
    });
};
