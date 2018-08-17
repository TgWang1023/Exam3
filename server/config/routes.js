const restautants = require('../controllers/restraurants.js');

module.exports = function(app) {
    app.get('/rest', function(req, res) {
        restautants.all(req, res);
    });
    app.get('/rest/:id', function(req, res) {
        restautants.one(req, res);
    });
    app.post('/rest', function(req, res) {
        restautants.create(req, res);
    });
    app.put('/rest/:id', function(req, res) {
        restautants.update(req, res);
    });
    app.delete('/rest/:id', function(req, res) {
        restautants.remove(req, res);
    });
    app.post('/reviews/:id', function(req, res){
        restautants.create_r(req, res);
    });
}