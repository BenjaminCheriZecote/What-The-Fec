

const scriptControl = {
        //
        // scriptControl : triage num piece
        // 1. recherche des numéro de piece vide
        // 2. recherche des pieces isolées
        // 3. control des dates entre ecritureDate et pieceDate
        // 4. control des dates sur la meme piece
        // 5. différence code journal sur meme piece
        // 6. déséquilibre débit crédit

    sortByNumPiece: () => {
        // sheetJs
    },
    searchEmptyNumPiece: (body) => {
        // to do avec SheetJS
        body.forEach((data, index) => {
            if (data[2] === '') {
                // couleur
                const errorEmptyNumPiece = `Numéro de pièce manquante ligne : ${index}`
                console.log(errorEmptyNumPiece);
            }
        });
    },
    checkDatesColumns: () => {

    },
    checkSelfDatesPiece: () => {

    },
    checkJournalCodePiece: () => {

    },
    checkBalancePiece: () => {

    }

}

export default scriptControl;