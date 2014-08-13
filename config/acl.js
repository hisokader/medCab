// Permissions and roles config.
var roles = {
    medecin: {can: ['create article', 'read article', 'edit article']},
    secretaire: {can: ['read article']}
};

// Create Acl instance
var role = require('connect-acl')(roles);

// Global failure handlers (optional)
role.onAuthorizedFailure( function( req, res ){
	res.setHeader('Content-Type', 'application/json');
	res.send(500,{authorization:'failed'});
});
role.onUnauthorizedFailure( function( req, res ){
	res.setHeader('Content-Type', 'application/json');
    res.send(200,{authorization:'success'});
});

module.exports = role;