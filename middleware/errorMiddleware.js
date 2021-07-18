const catchError = (err, req, res, next) => {

    console.log(err);

    if (err.code === 11000) {
        res
            .status(404)
            .json({
                message: `${Object.keys(err.keyValue)} icin girdiginiz deger ${Object.values(err.keyValue)} daha once veritabaninda oldugu icin tekrar eklenemez ya da guncellenemez. Unique olmalidir`,
                errorCode: err.statusCode
            });
    } else if (err.code === 66) {
        res
            .status(400)
            .json({
                message: `Degistirilmez bir alani guncellemeye calistiniz.`,
                errorCode: 300
            });
    }


    res.status(err.statusCode || 500);
    res.json({
        message: err.message,
        errorCode: err.statusCode || 500
    });


}




module.exports = catchError;