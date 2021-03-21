const handleSignin  = (req, res, db, bcrypt) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)    
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); // compares passwords to see if they match
            if(isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0]) //if valid returns users
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else{
                res.status(400).json('wrong credentials') // if not valid returns message
            }
        })
        .catch(err =>res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}