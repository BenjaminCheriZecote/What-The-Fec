

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

    searchAlonePieceIsolateDate: (ws) => {

        if (ws._rows[0]._cells[0]._value.value !== ws._rows[1]._cells[0]._value.value) {
           console.log("Premieres ligne, code journal pièce isolées");
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

        };

        if (ws._rows[ws._rows.length-1]._cells[0]._value.value !== ws._rows[ws._rows.length-2]._cells[0]._value.value) {
            console.log("Dernière ligne, code journal pièce isolées");

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

        } else if (ws._rows[ws._rows.length-1]._cells[2]._value.value !== ws._rows[ws._rows.length-2]._cells[2]._value.value) {
            console.log("Dernière ligne, pièce isolées Num pièce");
            ws._rows[ws._rows.length-1].fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF1F2F4' }
            };

            ws._rows[ws._rows.length-1]._cells[2].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };
        };

        for (let index = 1; index < ws._rows.length-1; index++) {
            // si on est dans le meme code journal
            if (ws._rows[index-1]._cells[0]._value.value === ws._rows[index]._cells[0]._value.value) {
                
                console.log(`Comparaison de la ligne ${index}. Valeur : ${ws._rows[index]._cells[2]._value.value} \n 
                Ligne précédente ${index-1} : valeur ${ws._rows[index-1]._cells[2]._value.value} \n 
                Ligne suivante ${index+1} : valeur ${ws._rows[index+1]._cells[2]._value.value}`);
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

    checkBalancePiece: (body, ws2) => {
        const objectPieces = {};

        body.forEach(([JournalCode, JournalLib, EcritureNum, EcritureDate, CompteNum, CompteLib, CompAuxNum, CompAuxLib, PieceRef, PieceDate, EcritureLib, Debit, Credit, EcritureLet, DateLet, ValidDate, Montantdevise, Idevise]) => {
            if (objectPieces.hasOwnProperty(`${JournalCode}${EcritureNum}`)) {
                objectPieces[`${JournalCode}${EcritureNum}`][2] += Debit;
                objectPieces[`${JournalCode}${EcritureNum}`][3] += Credit;
                objectPieces[`${JournalCode}${EcritureNum}`][4] = objectPieces[`${JournalCode}${EcritureNum}`][2] - objectPieces[`${JournalCode}${EcritureNum}`][3];

            } else {
                objectPieces[`${JournalCode}${EcritureNum}`] = [JournalCode, EcritureNum, Debit, Credit, Debit - Credit]
            }
        });

        const pieces = Object.values(objectPieces);

        const unbalancedPieces = pieces.filter(piece => piece[4] !== 0);
        unbalancedPieces.unshift(['JournalCode', 'EcritureNum', 'Debit', 'Credit', 'Ecarts']);
        ws2.addRows(unbalancedPieces);
    }

}

export default scriptControl;