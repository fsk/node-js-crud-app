const admin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res
            .status(403)
            .json({
                message: "Admin olmayan kullanici. Erisim Engellendi"
            })
    }

    next();
};

module.exports = admin;