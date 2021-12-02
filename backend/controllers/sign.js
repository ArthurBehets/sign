var con = require('../middleware/connect');
var fs = require('fs');

exports.getOne = (req, res, next) => {
    con.query(
        "select * from sign where signId = ?"
        [req.params],
        function(err, results){
            if(err){
                return res.status(500).json("Le signe n'est pas disponible");
            }
            return res.status(200).json(results);
        }
    )
}

exports.getOneCategory = (req, res, next) => {
    con.query(
        "select * from sign where categoryId = ?"
        [req.params],
        function(err, results){
            if(err){
                return res.status(500).json("Le signe n'est pas disponible");
            }
            return res.status(200).json(results);
        }
    )
}

exports.createSign = (req, res, next) => {
    let path = (`${req.protocol}://${req.get('host')}/images/${req.file.filename}`);
    let datas = (req.body.body);
    console.log(datas.traduction);
    if (datas.userId, datas.categoryId, datas.traduction, path){
        con.query(
            "select grade from user where userId = ?",
            [datas.userId],
            function(err, result){
                if(err){
                    return res.status(500).json("Utilisateur non reconnu");
                }
                if(result === "admin"){
                    con.query(
                        "insert into sign (userId, categoryId, traduction, videoUrl) VALUES (?,?,?,?)",
                        [datas.userId, datas.categoryId, datas.traduction, path],
                        function(err, result){
                            if(err){
                                return res.status(500).json("Il y a une erreur dans les données saisies")
                            }
                            return res.status(200).json(result)
                        }
                    )
                }
            }
        )
    }
    else{
        return res.status(500).json("Il y a une erreur dans les données saisies")
    }
}

exports.modifySign = (req, res, next) => {

}

exports.deleteSign = (req, res, next) => {

}

exports.createProposition = (req, res, next) => {

}

exports.modificationProposition = (req, res, next) => {

}

exports.addToKnown = (req, res, next) => {

}