const XlsxPopulate = require('xlsx-populate');
const xlsx = require('xlsx');

const newFile = "./convertedFec.xlsx";


const scriptControl = {
    initScript: () => {
        // conversion du fichier .text en .fichier xlsx
        const txt = xlsx.readFile('./mainFec');
        xlsx.writeFile(txt, newFile);
        //
    },
    // triage par num piece

    sortNumPiece: async (request, response) => {
        const txt = xlsx.readFile('./mainFec.txt');
        xlsx.writeFile(txt, newFile);
        const workbook = await XlsxPopulate.fromFileAsync(newFile);
        const sheet1 = workbook.sheet(0);
        const allRows = sheet1.row()._sheet._rows;
        console.log(allRows[1]._cells[3]._value);
        let body = allRows.slice(1);
        const toto = JSON.parse(body)

        // response.json(toto);
    },
    // 
    // 1. recherche des numéro de piece vide
    // 2. recherche des pieces isolées

    // 3. control des dates entre ecritureDate et pieceDate
    checkDatesColumns: async () => {
        const workbook = await XlsxPopulate.fromFileAsync(newFile);
        const sheet1 = workbook.sheet(0);
        const allRows = sheet1.row()._sheet._rows;
        const derL = allRows.length;
        const ecritureDate = sheet1.range(`D2:D${derL-1}`);
        const pieceDate = sheet1.range(`J2:J${derL-1}`);

        for (let i = 0; i < ecritureDate.value().length; i++) {
            if (ecritureDate.value()[i][0] !== pieceDate.value()[i][0]) {
                console.log("sucess control");
            }
        }
    },

    // 4. control des dates sur la meme piece
    // 5. différence code journal sur meme piece
    // 6. déséquilibre débit crédit

    doScript: () => {
        scriptControl.initScript();
        scriptControl.checkDatesColumns();
        scriptControl.sortNumPiece();
    }
}

// scriptControl.doScript();

module.exports = scriptControl;

