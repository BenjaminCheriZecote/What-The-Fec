

const mainController = {
    getHomePage: (req, res) => {
        res.render('homePage.ejs');
    },
    getTestingPage: (req, res) => {
        try {
            res.render('testingPage', {testPage: true});
        } catch (error) {
            
        }
    },
    getErrorPage: (req, res) => {
        res.render('errorPage');
    },
    test: (req, res) => {
        console.log("Testeuh");
        res.redirect('/testingFec');
    }
}


module.exports = mainController;