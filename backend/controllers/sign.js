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
    let path = (`${req.protocol}://${req.get('host')}/images/${req.file.filename}`);
    let datas = (req.body.body);
    console.log(datas.traduction);
    con.query(
        "select grade from user where userId = ?",
        [datas.signId],
        function(err, result){
            if(result =="admin"){
                if (datas.userId, datas.categoryId, datas.traduction, path){
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
                else{
                    return res.status(500).json("Il y a une erreur dans les données saisies")
                }
            }
            else if(result =='user'){
                if (datas.userId, datas.categoryId, datas.traduction, path){
                    con.query(
                        "insert into proposition (userId, categoryId, propositionTraduction, propositionUrl) VALUES (?,?,?,?)",
                        [datas.userId, datas.categoryId, datas.traduction, path],
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

exports.validProposition = (req, res, next) => {
    con.query(
        "select * from proposition where propositionId = ?",
        [req.body],
        function(err, results){
            if(err){
                return res.status(500).json("Proposition non trouvée")
            }
            con.query(
                "insert into sign (userId, categoryId, traduction, videoUrl) VALUES (?,?,?,?)",
                [results.userId, results.categoryId, results.propositionTraduction, results.propositionUrl],
                function(err, result){
                    if(err){
                        return res.status(500).json("Le signe n'a pas pu être validé")
                    }
                    con.query(
                        "delete from proposition where propositionId = ?",
                        [req.body],
                        function(err, result){
                            if(err){
                                return res.status(500).json("Ajouté aux signes mais proposition non supprimée")
                            }
                            return res.status(200).json("Proposition validée")
                        }
                    )
                }
            )
        }
    )
}

exports.modificationPropositionCategory = (req, res, next) => {
    let datas = req.body;
    con.query(
        "select userId from proposition where propositionId = ?",
        [datas.propositionId],
        function(err, result){
            if (err){
                return res.status(500).json("La proposition n'a pas été trouvée")
            }
            if(result == datas.userId){
                con.query(
                    "update proposition set categoryId = ? where propositionId = ?",
                    [datas.categoryId, datas.propositionId],
                    function(err, result){
                        if(err){
                            return res.status(500).json("La proposition n'a pas pu être mise à jour")
                        }
                        return res.status(200).json("Categorie mise à jour")
                    }
                )
            }
            else{
                return res.status(500).json("Vous n'avez pas l'autorisation requise")
            }
        }
    )
}

exports.modificationPropositionTraduction = (req, res, next) => {
    let datas = req.body;
    con.query(
        "select userId from proposition where propositionId = ?",
        [datas.propositionId],
        function(err, result){
            if (err){
                return res.status(500).json("La proposition n'a pas été trouvée")
            }
            if(result == datas.userId){
                con.query(
                    "update proposition set propositionTraduction = ? where signId = ?",
                    [datas.categoryId, datas.propositionId],
                    function(err, result){
                        if(err){
                            return res.status(500).json("La proposition n'a pas pu être mise à jour")
                        }
                        return res.status(200).json("Traduction mise à jour")
                    }
                )
            }
            else{
                return res.status(500).json("Vous n'avez pas l'autorisation requise")
            }
        }
    )
}

exports.addToKnown = (req, res, next) => {
    let datas = req.body;
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

exports.addToWork = (req, res, next) => {
    let datas = req.body;
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

exports.rmFromKnown =(req, res, next) => {
    let datas = req.body;
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

exports.rmFromToWork =(req, res, next) => {
    let datas = req.body;
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

exports.getPropositions = (req, res, next) => {
    con.query(
        "select * from proposition",
        function(err, results){
            if(err){
                return res.status(500).json("Erreur dans la requête");
            }
            return res.status(200).json(results);
        }
    )
}