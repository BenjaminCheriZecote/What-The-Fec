

const scriptControl = {
        //
        // scriptControl : triage num piece
        // 1. recherche des numéro de piece vide
        // 2. recherche des pieces isolées
        // 3. control des dates entre ecritureDate et pieceDate
        // 4. control des dates sur la meme piece
        // 5. différence code journal sur meme piece
        // 6. déséquilibre débit crédit

        // code couleur :
        // rouge : numéro de piece
        // vert : dates
        // bleu : code journal
        // violet : deb/cred

    sortByNumPiece: () => {
        // sheetJs
    },

    searchEmptyNumPiece: (ws) => {
        const emptyErrorPiece = [];
        ws.eachRow((row, rowNumber) => {
            console.log('Row ' + rowNumber + ' = ' + row.values);
            if (row.values[3] === '') {
                row.font ={
                    color: { argb: 'FFFF0000'}
                };
                emptyErrorPiece.push(rowNumber);
            }
        });
        const messageEmptyErrorPiece = `Vous avez des écritures sans numéro de pièces à la ligne :${emptyErrorPiece}`;
        return messageEmptyErrorPiece;
        
    },

    searchAlonePiece: (ws) => {
        ws.eachRow((row, rowNumber) => {
            if (row.values[3] === '') {
                row.font ={
                    color: { argb: 'FFFF0000'}
                };
                emptyErrorPiece.push(rowNumber);
            }
        });
    },

    checkDatesColumns: (ws) => {
        ws.eachRow((row, rowNumber) => {
            if (row.values[4] !== row.values[10]) {
                row.values[4].font = {
                    color: { argb: '#0000ff'}
                }
                row.values[10].font = {
                    color: { argb: 'FFFF0000'}
                }
            }
        })
    },

    checkSelfDatesPiece: () => {

    },
    checkJournalCodePiece: () => {

    },
    checkBalancePiece: () => {

    }

}

export default scriptControl;