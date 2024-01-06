

const scriptControl = {

        // code couleur :
        // ligne error couleur fff1f2f4

        // rouge : numéro de piece / code journal
        // bleu : dates
        // violet : deb/cred

    sortData: (protoBody) => {
        protoBody.sort((a, b) => { 
            if (a[0] === b[0]) {
                return a[2] - b[2];
            } else {
                return a[0].localeCompare(b[0]);
            }
        } );
        return protoBody;
    },

    searchEmptyNumPiece: (ws) => {
        const rowsError = [];
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
                rowsError.push(rowNumber);
            }
        });
        const messageError = `Vous avez des écritures sans numéro de pièces à la ligne : ${rowsError}`;
        console.log(messageError);
        return messageError;
    },

    searchAlonePieceIsolateDate: (ws) => {
        const rowsErrorIsolatePieces = [];
        const rowsErrorIsolateDates = [];

        if (ws._rows[0]._cells[0]._value.value !== ws._rows[1]._cells[0]._value.value) {
            ws._rows[0].fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF1F2F4' }
            };

            ws._rows[0]._cells[2].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };
            ws._rows[0]._cells[0].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };

            rowsErrorIsolatePieces.push(1);
        };

        if (ws._rows[ws._rows.length-1]._cells[0]._value.value !== ws._rows[ws._rows.length-2]._cells[0]._value.value) {

            ws._rows[ws._rows.length-1].fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF1F2F4' }
            };

            ws._rows[ws._rows.length-1]._cells[2].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };
            ws._rows[ws._rows.length-1]._cells[0].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };

            rowsErrorIsolatePieces.push(ws._rows.length);

        } else if (ws._rows[ws._rows.length-1]._cells[2]._value.value !== ws._rows[ws._rows.length-2]._cells[2]._value.value) {
            ws._rows[ws._rows.length-1].fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF1F2F4' }
            };

            ws._rows[ws._rows.length-1]._cells[2].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };

            rowsErrorIsolatePieces.push(ws._rows.length);
        };

        for (let index = 1; index < ws._rows.length-1; index++) {
            // si on est dans le meme code journal
            if (ws._rows[index-1]._cells[0]._value.value === ws._rows[index]._cells[0]._value.value) {
                
                // si p-1 !== p && p+1 !== p
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

                    rowsErrorIsolatePieces.push(index);
                };
                //si p-1 === p
                if (ws._rows[index-1]._cells[2]._value.value === ws._rows[index]._cells[2]._value.value) {
                    // si d-1 !== d
                    if (ws._rows[index-1]._cells[3]._value.value !== ws._rows[index]._cells[3]._value.value) {
                        ws._rows[index].fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFF1F2F4' }
                        };
                        ws._rows[index]._cells[3].font = {
                            color: { argb: 'FF0808CD' },
                            bold: true
                        };
                        rowsErrorIsolateDates.push(index);
                    };
                }

            } else if (ws._rows[index-1]._cells[0]._value.value !== ws._rows[index]._cells[0]._value.value && ws._rows[index+1]._cells[0]._value.value !== ws._rows[index]._cells[0]._value.value) {
                ws._rows[index].fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF1F2F4' }
                };

                ws._rows[index]._cells[2].font = {
                    color: { argb: 'ffe74141' },
                    bold: true
                };
                ws._rows[index]._cells[0].font = {
                    color: { argb: 'ffe74141' },
                    bold: true
                };

                rowsErrorIsolatePieces.push(index);
            }
        }

        const rowsErrorIsolatePiecesSorted = [...new Set(rowsErrorIsolatePieces)];

        const messageError = `Vous avez une ligne d'écriture isolé à la ligne : ${rowsErrorIsolatePiecesSorted} \n\n\nVous avez une date d'écriture différente sur une même pièce à la ligne : ${rowsErrorIsolateDates}`
        console.log(messageError);
        return messageError;
    },

    checkDatesColumns: (ws) => {
        const rowsError = []
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
                rowsError.push(rowNumber)
            }
        })

        const messageError = `Les dates des colonnes EcritureDate et PieceDate ne correspondent pas à la ligne : ${rowsError}`;
        console.log(messageError);
        return messageError;
    },

    // checkSelfDatesPiece: () => {

    // },

    checkBalancePiece: (body, ws2) => {
        const objectPieces = {};
        const rowsError = [];

        body.forEach(([JournalCode, JournalLib, EcritureNum, EcritureDate, CompteNum, CompteLib, CompAuxNum, CompAuxLib, PieceRef, PieceDate, EcritureLib, Debit, Credit, EcritureLet, DateLet, ValidDate, Montantdevise, Idevise], index) => {
            if (objectPieces.hasOwnProperty(`${JournalCode}${EcritureNum}`)) {
                objectPieces[`${JournalCode}${EcritureNum}`][3] += Debit;
                objectPieces[`${JournalCode}${EcritureNum}`][4] += Credit;
                objectPieces[`${JournalCode}${EcritureNum}`][5] = objectPieces[`${JournalCode}${EcritureNum}`][3] - objectPieces[`${JournalCode}${EcritureNum}`][4];

            } else {
                objectPieces[`${JournalCode}${EcritureNum}`] = [index+1, JournalCode, EcritureNum, Debit, Credit, Debit - Credit]
            }

        });

        const pieces = Object.values(objectPieces);

        const unbalancedPieces = pieces.filter(piece => piece[5] !== 0);
        unbalancedPieces.forEach((piece) => rowsError.push(piece[0]));

        unbalancedPieces.unshift(['Ligne', 'JournalCode', 'EcritureNum', 'Debit', 'Credit', 'Ecarts']);
        ws2.addRows(unbalancedPieces);
        
        const messageError = `Vous avez des pièces déséquilibrées aux lignes : ${rowsError}`;
        console.log(messageError);
        return messageError;
    }

}

export default scriptControl;