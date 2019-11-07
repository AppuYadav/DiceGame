module.exports = function(req,res,next) {
    if(req.method === 'GET') {
        res.end('GET method not supported');
    } else {
        next();
    }
};