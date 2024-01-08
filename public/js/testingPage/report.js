// compte rendu des erreurs

// cas des séparateur ;

// cas des header sens 1/-1

// gestion du cookie de la session coté back

// page Conformité légale

// https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027804775/2013-08-02
// 1° Les caractères utilisés appartiennent à l'un des jeux de caractères ASCII, norme ISO 8859-15 ou EBCDIC ;
// 2° Les valeurs numériques sont exprimées en mode caractère et en base décimale, cadrées à droite et complétées à gauche par des zéros pour les zones de longueur fixe. Le signe est indiqué par le premier caractère à partir de la gauche. La virgule sépare la fraction entière de la partie décimale. Aucun séparateur de millier n'est accepté ;
// 3° Les zones alphanumériques sont cadrées à gauche et complétées à droite par des espaces ;
// 4° Les dates sont exprimées au format AAAAMMJJ sans séparateur. Les heures sont exprimées au format HH : MM : SS.

// 1° Fichiers à plat, à organisation séquentielle et structure zonée remplissant les critères suivants :
// a. Les enregistrements sont séparés par le caractère de contrôle Retour chariot et/ ou Fin de ligne ;
// b. La longueur des enregistrements peut être fixe ou variable ;
// c. Les zones sont obligatoirement séparées par une tabulation ou le caractère " | " ;

// Le "Comment ça marche" de la page d'acceuil

const scriptControlFile = {

    // structure du fichier :

    // nombre de colonne : 18, 21, 22
    // erreur synthaxe colonne
    // colonnes débit/crédit ou montnt sens

    // base décimal pour les colonnes débits et crédits
    // date au format AAAAMMJJ
    // zones séparées par une tabulation ou caractère " | "
    

    headerColumns: (header) => {
        const structure18 = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Debit', 'Credit', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise\r'];
        const structure18bis = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Montant', 'Sens', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise\r'];

        const structure21 = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Debit', 'Credit', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise', 'DateRglt', 'ModeRglt', 'NatOp\r'];
        const structure21bis = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Montant', 'Sens', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise\r'];
        
        const structure22 = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Debit', 'Credit', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise', 'DateRglt', 'ModeRglt', 'NatOp', 'IdClient\r'];
        const structure22bis = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Montant', 'Sens', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise\r'];

        function isEqual(header, tableau2) {
            const error = [];
          
            header.forEach((value, index) => { 
                if (value !== tableau2[index]) {
                    error.push(value);
                    console.log(error)
                }
            });

            if (error.length !== 0) {
                const messageError = `La strucure du fichier est invalide. Vérifiez l'orhographe du nom de la colonne : ${error}`;
                return messageError;
            } else {
                const message = "La structure du fichier est correcte. Le nombre de colonne est autorisée, les entêtes de colonnes correspondent aux attentes légales.";
                return message;
            }
        }

        if (header[11] === structure18[11]) {
            if (header.length === 18) {
                let result = isEqual(header, structure18);
                return result;
            } else if (header.length === 21) {
                let result = isEqual(header, structure21);
                return result;
            } else if (header.length === 22) {
                let result = isEqual(header, structure22);
                return result;
            } else {
                const messageError = "La strucure du fichier est invalide. Vous ne disposez pas du nombre de colonnes autorisées";
                return messageError;
            }
        } else {
            if (header.length === 18) {
                let result = isEqual(header, structure18bis);
                return result;
            } else if (header.length === 21) {
                let result = isEqual(header, structure21bis);
                return result;
            } else if (header.length === 22) {
                let result = isEqual(header, structure22bis);
                return result;
            } else {
                const messageError = "La strucure du fichier est invalide. Vous ne disposez pas du nombre de colonnes autorisées";
                return messageError;
            }
        }
        
    },

    formatDebCred: (data) => {

    },

    formatDate: (data) => {
        // regex
        function estFormatAAAAMMJJ(date) {
            // Définir l'expression régulière pour le format AAAAMMJJ
            var regex = /^(19|20)\d\d(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
          
            // Vérifier si la date correspond au format
            return regex.test(date);
          }
          
          // Exemple d'utilisation
          var maDate = "20240108"; // Remplacez cela par la date que vous souhaitez vérifier
          if (estFormatAAAAMMJJ(maDate)) {
            console.log("La date est au format AAAAMMJJ.");
          } else {
            console.log("La date n'est pas au format AAAAMMJJ.");
          }
    }
};

export default scriptControlFile;

