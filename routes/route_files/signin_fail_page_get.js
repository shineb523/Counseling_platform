// If sign-in fails, ID password confirmation message is output.
module.exports = function(req, res) {

    console.log('/signin_fail_page path is called.');
    res.render('signin_fail.ejs');
    return;
}