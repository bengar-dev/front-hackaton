export function errorTranslator(errorCode, errorContent) {
    
    switch (errorCode) {
        case "register" : return {
            type: "register",
            msg: "Vous êtes bien enregistré",
            statut: "valid"
        }

        case "errRegister": return {
            type: "errRegister",
            msg: "Erreur de communication avec le serveur",
            statut: "error"
        }

        case "verifUsername": {
            let msg = ""
            if(errorContent === 1) msg = "Username déjà existant"
            else if(errorContent === 2)  msg = "Email déjà existant"
            else if(errorContent === 0) msg = ""
            return {
                type: "verifUsername",
                msg,
                statut: "error"
            }
        }

        case "errVerifUsername": return {
            type: "errRegister",
            msg: "Erreur de communication avec le serveur",
            statut: "error"
        }

        case "login": return {
            type:"login",
            msg: "Vous êtes bien authentifié",
            statut: "valid"
        }

        case "errCompare": return {
            type: "errCompage",
            msg: "Enlever un produit à comparer",
            statut: "error"
        }
    }
}

export function logoutApp() {
    const getStorage = localStorage.getItem('userInfo')
    if(getStorage) {
        localStorage.removeItem('userInfo')
        return true
    } else return false
}