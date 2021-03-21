const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    //Grabs parameter id
    db.select('*').from('users').where({id})
    .then(user =>{
        if(user.length){
            res.json(user[0])
        } else {
            res.status(400).json('Not Found')
        }
    })
    .catch(err => res.status(400).json('Error getting user'))
    // if (!found) {
    //     res.status(400).json('not found');
    // //If user not found return 'not found'
    // }
}

module.exports = {
    handleProfileGet: handleProfileGet
}