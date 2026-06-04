const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    
    // Mask sensitive fields in request body
    const bodyCopy = { ...req.body };
    if (bodyCopy.password) {
        bodyCopy.password = "********";
    }

    const sessionInfo = req.user
        ? `[User: ${req.user.email} (${req.user.role})]`
        : "[Anonymous]";

    console.log(`[${timestamp}] ${sessionInfo} ${req.method} ${req.originalUrl}`);
    if (Object.keys(bodyCopy).length > 0) {
        console.log(`  -> Body: ${JSON.stringify(bodyCopy)}`);
    }
    if (Object.keys(req.query).length > 0) {
        console.log(`  -> Query: ${JSON.stringify(req.query)}`);
    }
    
    next();
};

module.exports = logger;
