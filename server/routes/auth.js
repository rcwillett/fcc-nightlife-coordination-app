const express = require('express');
const router = express.Router();
const request = require('request');
// const InstagramStrategy = require('passport-instagram').Strategy;
// const LocalStrategy = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
// const GitHubStrategy = require('passport-github').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
// const OpenIDStrategy = require('passport-openid').Strategy;
// const OAuthStrategy = require('passport-oauth').OAuthStrategy;
// const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

/**
 * OAuth authentication routes. (Sign in)
   UNCOMMENT THOSE YOU WISH TO USE
 */
// router.get('/instagram', passport.authenticate('instagram'));
// router.get('/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
// router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });
// router.get('/github', passport.authenticate('github'));
// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });
// router.get('/google', passport.authenticate('google', { scope: 'profile email' }));
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });
// router.get('/twitter', passport.authenticate('twitter'));
// router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });
// router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
// router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });
//
// /**
//  * OAuth authorization routes. (API examples)
//  */
// router.get('/foursquare', passport.authorize('foursquare'));
// router.get('/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), (req, res) => {
//   res.redirect('/api/foursquare');
// });
// router.get('/tumblr', passport.authorize('tumblr'));
// router.get('/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), (req, res) => {
//   res.redirect('/api/tumblr');
// });
// router.get('/steam', passport.authorize('openid', { state: 'SOME STATE' }));
// router.get('/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });
// router.get('/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
// router.get('/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/api/pinterest');
// });

module.exports = router;
