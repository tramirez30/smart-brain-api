const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => { // create transcation when you need to execute more than two things
            trx.insert({ // use 'trx' instead of DB to do these operations
                hash: hash,
                email: email
            })
            .into('login') //inserts new email into the login db
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0], 
                    name: name,
                    joined: new Date()
                }).then(user => {
                    res.json(user[0]);//Grabs last item in the array
                })
            })
            .then(trx.commit) // use this, in order for it to get added
            .catch(trx.rollback)
        })

            .catch(err => res.status(400).json('Unable to register'))
}

module.exports = {
    handleRegister: handleRegister
};