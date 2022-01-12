var con = require('../middleware/connect');
var fs = require('fs');

exports.getOne = (req, res, next) => {
    con.query(
        "select * from `sign` natural join category where `signId` = " + req.params.signId,
        function(err, results){
            if(err){
                return res.status(500).json("Le signe n'est pas disponible");
            }
            return res.status(200).json(results);
        }
    )
}

exports.getAllSigns = (req, res, next) => {
    con.query(
        "select * from sign",
        function(err, results){
            if(err){
                return res.status(500).json("Les signes ne sont pas disponible");
            }
            return res.status(200).json(results);
        }
    )
}

exports.getOneCategory = (req, res, next) => {
    con.query(
        "select * from `sign` natural join `category` where `categoryId` = " + (req.params.categoryId) ,
        function(err, results){
            if(err){
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        }
    )
}

exports.getAllCategories = (req, res, next) => {
    con.query(
        "select * from category",
        function(err, results){
            if(err){
                return res.status(500).json("Erreur serveur");
            }
            return res.status(200).json(results);
        }
    )
}

exports.createSign = (req, res, next) => {
    let datas = (req.body);
    console.log(datas);
    con.query(
        "select grade from user where userId = ?",
        [datas.userId],
        function(err, result){
            console.log(result[0].grade)
            if(result[0].grade =="admin"){
                if (datas.userId, datas.categoryId, datas.traduction, datas.url){
                    con.query(
                        "insert into sign (userId, categoryId, traduction, videoUrl) VALUES (?,?,?,?)",
                        [datas.userId, datas.categoryId, datas.traduction, datas.url],
                        function(err, result){
                            if(err){
                                return res.status(500).json("Il y a une erreur dans les données saisies")
                            }
                            return res.status(200).json(result)
                        }
                    )
                }
                else{
                    return res.status(500).json("Il y a une erreur dans les données saisies")
                }
            }
            else{
                return res.status(500).json("Erreur")
            }
        }
    )
}

exports.modifyTraduction = (req, res, next) => {
    let datas = req.body;
    con.query(
        "select grade from user where userId = ?",
        [datas.signId],
        function(err, result){
            if(err){
                return res.status(500).json("Utilisateur non validé")
            }
            if(result === 'admin'){
                con.query(
                    "update sign set traduction = ? where signId = ?",
                    [datas.traduction, datas.signId],
                    function(err, result){
                        if(err){
                            return res.status(500).json("Le signe n'a pas été trouvé")
                        }
                        return res.status(200).json("Modification effectuée")
                    }
                )
            }
            else{
                return res.status(500).json("Vous ne disposez pas de ce droit")
            }
        }
    )
}

exports.modifyCategory = (req, res, next) => {
    let datas = req.body;
    con.query(
        "select grade from user where userId = ?",
        [datas.signId],
        function(err, result){
            if(err){
                return res.status(500).json("Utilisateur non validé")
            }
            if(result === 'admin'){
                con.query(
                    "update sign set categoryId = ? where signId = ?",
                    [datas.categoryId, datas.signId],
                    function(err, result){
                        if(err){
                            return res.status(500).json("Le signe n'a pas été trouvé")
                        }
                        return res.status(200).json("Modification effectuée")
                    }
                )
            }
            else{
                return res.status(500).json("Vous ne disposez pas de ce droit")
            }
        }
    )
}

exports.deleteSign = (req, res, next) => {
    let datas = req.body;
    con.query(
        "select grade from user where userId = ?",
        [datas.signId],
        function(err, result){
            if(err){
                return res.status(500).json("Utilisateur non validé")
            }
            if(result === 'admin'){
                con.query(
                    "delete from sign where signId = ?",
                    [datas.signId],
                    function(err, result){
                        if(err){
                            return res.status(500).json("Le signe n'a pas été trouvé")
                        }
                        return res.status(200).json("Le signe a bien été supprimé")
                    }
                )
            }
            else{
                return res.status(500).json("Vous ne disposez pas de ce droit")
            }
        }
    )
}

exports.getToWork = (req, res, next) => {
    let datas = req.body;
    con.query(
        'select signId, traduction, videoUrl from toWork natural join sign where userId = ? ',
        [datas.userId],
        function(err, result){
            if(err){
                return res.status(500).json("Error")
            }
            return res.status(200).json(result)
        }
    )
}

exports.getOneToWork = (req, res, next) => {
    let datas = req.body;
    con.query(
        'select signId from toWork where userId = ? and signId = ?',
        [datas.userId, datas.signId],
        function(err, result){
            if(err){
                return res.status(500).json("Error")
            }
            return res.status(200).json(result)
        }
    )
}

exports.getOneKnown = (req, res, next) => {
    let datas = req.body;
    con.query(
        'select signId from known where userId = ? and signId = ? ',
        [datas.userId, datas.signId],
        function(err, result){
            if(err){
                return res.status(500).json("Error")
            }
            return res.status(200).json(result)
        }
    )
}

exports.getKnown = (req, res, next) => {
    let datas = req.body;
    con.query(
        'select signId, traduction, videoUrl from known natural join sign where userId = ? ',
        [datas.userId],
        function(err, result){
            if(err){
                return res.status(500).json("Error")
            }
            return res.status(200).json(result)
        }
    )
}

exports.addToKnown = (req, res, next) => {
    let datas = req.body;
    if(req.params.statement === 'checked'){
        con.query(
            "delete from known where userId = ? AND signId = ?",
            [datas.userId, datas.signId],
            function(err, result){
                if(err){
                    return res.status(500).json("Le signe n'était pas dans votre liste 'Connu'")
                }
                return res.status(200).json("Bien supprimé de 'Connu'")
            }
        )
    }
    if(req.params.statement === 'unchecked'){
        con.query(
            "insert into known (userId, signId) values (?, ?)",
            [datas.userId, datas.signId],
            function(err, result){
                if(err){
                    return res.status(500).json("Le signe est déjà dans votre liste 'Connu'")
                }
                return res.status(200).json("Bien ajouté à 'Connu'")
            }
        )
    }
}

exports.addToWork = (req, res, next) => {
    let datas = req.body;
    console.log(datas)
    if(req.params.statement === 'checked'){
        con.query(
            "delete from toWork where userId = ? AND signId = ?",
            [datas.userId, datas.signId],
            function(err, result){
                if(err){
                    return res.status(500).json("Le signe n'était pas dans votre liste 'A travailler'")
                }
                return res.status(200).json("Bien supprimé de 'A travailler'")
            }
        )
    }
    else if(req.params.statement === 'unchecked'){
        con.query(
            "insert into toWork (userId, signId) values (?, ?)",
            [datas.userId, datas.signId],
            function(err, result){
                if(err){
                    return res.status(500).json("Le signe est déjà dans votre liste 'A travailler'")
                }
                return res.status(200).json("Bien ajouté à 'A travailler'")
            }
        )
    }
}
