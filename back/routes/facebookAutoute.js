const passport = require('passport');

module.exports = function (app) {
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));

	app.get('/auth/facebook/callback', passport.authenticate('facebook'));

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user); //test auth flow
	});
};
