var userSchema = db.Schema({
    name: String,
    password: String,
    nickname: { type: String, default: '' },
    email: { type: String }
});

module.exports = db.model('UserModel', userSchema);