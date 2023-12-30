// const XlsxPopulate = require('xlsx-populate');
// const xlsx = require('xlsx');

// conversion du fichier .text en .fichier xlsx
// const txt = xlsx.readFile('./mainFec.txt');
// const newFile = "./convertedFec.xlsx";
// xlsx.writeFile(txt, newFile);


const testFile = {
    readFile: async () => {
    const workbook = await XlsxPopulate.fromFileAsync(newFile);
    const value = workbook.sheet(0).cell("A1").value();
    console.log(value);
    },
    modifyFile: async () => {
        const workbook = await XlsxPopulate.fromFileAsync(newFile);
        workbook.sheet(0).cell("A1").value("testModifA1");
        // return workbook.toFileAsync("./out.xlsx");
        const value = workbook.sheet("Sheet1").cell("A1").value();
        console.log(value);
    },
    displayData: async () => {
        const workbook = await XlsxPopulate.fromFileAsync(newFile);
        const sheet1 = workbook.sheet(0);
        let i = 2;
        const dataOne = workbook.sheet(0).cell(`D${i+1}`).value();
        const dataTwo = workbook.sheet(0).cell(`J${i+1}`).value()
        // console.log(dataOne, dataTwo);
        const firstRow = workbook.sheet(0).row(2).cell();
        // console.log(dataThree._value);

        // if (firstRow._row._cells[4]._value !== firstRow._row._cells[10]._value) {
        //     console.log("sucess control");
        // } else {
        //     console.log("fail control");
        // }

        const allRows = workbook.sheet(0).row()._sheet._rows;
        
        const derL = allRows.length;
        const ecritureDate = sheet1.range(`D2:D${derL-1}`);
        const pieceDate = sheet1.range(`J2:J${derL-1}`);

        // const array = new Map();
        // array.set(ecritureDate.value(), pieceDate.value());

        // const checkDate = [];
        // for (let key of array.keys()) {
        //     // console.log(array.get(key))
        //      checkDate.push((key, array.get(key)))
        // }


        for (let i = 0; i < ecritureDate.value().length; i++) {
            if (ecritureDate.value()[i][0] !== pieceDate.value()[i][0]) {
                console.log("sucess control");
            }
        }

        // console.log(ecritureDate.value()[0][0]);
        // console.log(pieceDate.value()[0][0]);


        // console.log(array.values());


        // console.log(ecritureDate.value(), pieceDate.value());
        
        // console.log(firstRow._row._cells[1]._value);
        // return workbook.toFileAsync("./new.xlsx");
    }
};

// testFile.displayData();