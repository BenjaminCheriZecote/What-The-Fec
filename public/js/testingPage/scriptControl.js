

const scriptControl = {
        //
        // scriptControl : triage num piece
        // 1. recherche des numéro de piece vide
        // 2. recherche des pieces isolées
        // 3. control des dates entre ecritureDate et pieceDate
        // 4. control des dates sur la meme piece
        // 5. déséquilibre débit crédit

        // code couleur :
        // ligne error couleur fff1f2f4

        // rouge : numéro de piece / code journal
        // bleu : dates
        // violet : deb/cred

    sortByNumPiece: () => {
        // sheetJs
    },

    searchEmptyNumPiece: (ws) => {
        const emptyErrorPiece = [];
        ws.eachRow((row, rowNumber) => {
            // console.log('Row ' + rowNumber + ' = ' + row.values);
            if (row.values[3] === '') {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF1F2F4' }
                };

                row._cells[2].fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'ffe74141' }
                }
                emptyErrorPiece.push(rowNumber);
            }
        });
        const messageEmptyErrorPiece = `Vous avez des écritures sans numéro de pièces à la ligne :${emptyErrorPiece}`;
        return messageEmptyErrorPiece;
    },

    searchAlonePiece: (ws) => {
        for (let index = 1; index < ws._rows.length-1; index++) {

            if (ws._rows[index-1]._cells[0]._value.value === ws._rows[index]._cells[0]._value.value) {
                // console.log(`Comparaison de ligne ${index}. Valeur : ${ws._rows[index]._cells[2]._value.value} \n 
                // Ligne précédente : ${index-1} valeur ${ws._rows[index-1]._cells[2]._value.value} \n 
                // Ligne suivante ${index+1} valeur ${ws._rows[index+1]._cells[2]._value.value}`);
                if (ws._rows[index-1]._cells[2]._value.value !== ws._rows[index]._cells[2]._value.value && ws._rows[index+1]._cells[2]._value.value !== ws._rows[index]._cells[2]._value.value) {
                    ws._rows[index].fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFF1F2F4' }
                    };
                    ws._rows[index]._cells[2].font = {
                        color: { argb: 'ffe74141' },
                        bold: true
                    };
                };
            } else if (ws._rows[index-1]._cells[0]._value.value !== ws._rows[index]._cells[0]._value.value && ws._rows[index+1]._cells[0]._value.value !== ws._rows[index]._cells[0]._value.value) {
                ws._rows[index].fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF1F2F4' }
                };

                ws._rows[index].font = {
                    bold: true
                };
                ws._rows[index]._cells[2].font = {
                    color: { argb: 'ffe74141' },
                    bold: true
                };
                ws._rows[index]._cells[0].font = {
                    color: { argb: 'ffe74141' },
                    bold: true
                };
            } else {
                console.log("Changement de code journal");
            }
        }
    },

    checkDatesColumns: (ws) => {
        ws.eachRow((row, rowNumber) => {
            if (row.values[4] !== row.values[10]) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF1F2F4' }
                };

                row._cells[3].font = {
                    color: { argb: 'FF0808CD' },
                    bold: true
                }

                row._cells[9].font = {
                    color: { argb: 'FF0808CD' },
                    bold: true
                }
            }
        })
    },

    checkSelfDatesPiece: () => {

    },
    checkBalancePiece: (ws) => {

    }

}

export default scriptControl;