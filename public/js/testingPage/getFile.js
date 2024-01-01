import scriptControl from "./scriptControl.js";



const file = {
    
    getFile: () => {
        const inputFileElement = document.querySelector('#file');
        const formElement = document.querySelector('#main-testingPage-form');
        // const buttonFormElement = document.querySelector('#main-testingPage-form--btn');
        
        const clientListFEC = []
        

        formElement.addEventListener('click', () => {
            inputFileElement.click();
        });
        inputFileElement.addEventListener('change', () => {
            const pElement = document.querySelector('.testA');
            const clientFile = inputFileElement.files[0];
            clientListFEC.push(clientFile);
            console.log('Sélectionné?', clientFile);
            console.log('Tableau client', clientListFEC);

            if (clientFile.type === "text/plain") {

                const reader = new FileReader();
                reader.addEventListener('load', async () => {
                    const textContent = reader.result; // textContent contient la string du fichier txt
                    pElement.style.height = '10rem';
                    pElement.innerText = textContent;

                    file.createListFile(clientFile.name, textContent);
                    
                    // const workbook = XLSX.utils.book_new();

                    const wb = new ExcelJS.Workbook();
                    const ws = wb.addWorksheet('Feuille1');

                    const lines = textContent.split('\n');
                    // console.log(lines)
                    const data = lines.map(line => line.split('\t'));
                    const header = lines[0];
                    const protoBody = data.slice(1);
                    console.log("Body :", protoBody);

                    const body = protoBody.map( line => {
                        const modifiedLine = [...line];
                        modifiedLine[11] = parseInt(modifiedLine[11]);
                        modifiedLine[12] = parseInt(modifiedLine[12]);
                        return modifiedLine;
                    })

                    console.log("body converti est : ", body);

                    // const pieces = {};

                    // body.forEach(([JournalCode, JournalLib, EcritureNum, EcritureDate, CompteNum, CompteLib, CompAuxNum, CompAuxLib, PieceRef, PieceDate, EcritureLib, Debit, Credit, EcritureLet, DateLet, ValidDate, Montantdevise, Idevise]) => {
                    //     if (pieces.hasOwnProperty(`${JournalCode}${EcritureNum}`)) {
                    //         pieces[`${JournalCode}${EcritureNum}`][2] += Debit;
                    //         pieces[`${JournalCode}${EcritureNum}`][3] += Credit;
                    //     } else {
                    //         pieces[`${JournalCode}${EcritureNum}`] = [JournalCode, EcritureNum, Debit, Credit]
                    //     }
                    // });

                    // const arrayPieces = Object.values(pieces);

                    // console.log("Le tableau des pieces est :", arrayPieces)




                    
                    
                    
                    
                    // const worksheet = XLSX.utils.aoa_to_sheet(data);
                    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille1');


                    // Ajouter des données à la feuille de calcul
                    ws.addRows(body);
                    

                    

                    

                    

                    

                    
                    // ...
                    // Enregistrez le fichier Excel
                    // const buffer = await wb.xlsx.writeBuffer();
                    // saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'WhatTheFECT2.xlsx');

                });
                reader.readAsText(clientFile); // A remplacer par l'aperçu du fichier excel  

            } else {
                console.log('Error type file');
            }
        });
    },

    createListFile: (nameFile, textFile) => {
        const sectionParentElement = document.querySelector('.progress-area');

        const liElement = document.createElement('li');
        liElement.classList.add('row');

        const iElement = document.createElement('i');
        iElement.classList.add('bx');
        iElement.classList.add('bxs-file-blank');

        const divContentElement = document.createElement('div');
        divContentElement.classList.add('content');

        const divDetailsElement = document.createElement('div');
        divDetailsElement.classList.add('details');

        const spanNameElement = document.createElement('span');
        spanNameElement.classList.add('name');
        spanNameElement.textContent = nameFile; // NAME FILE

        const spanPercentElement = document.createElement('span');
        spanPercentElement.classList.add('percent');
        spanPercentElement.textContent = '100%';

        const divProgressBarElement = document.createElement('div');
        divProgressBarElement.classList.add('progress-bar');

        const divProgressElement = document.createElement('div');
        divProgressElement.classList.add('progress');

        const buttonUploaderElement = document.createElement('button');
        buttonUploaderElement.textContent = 'Télécharger';
        buttonUploaderElement.classList.add('btn');

        file.listenerButtonUploader(buttonUploaderElement, textFile, nameFile); // écoute les clicks sur les bouton Télécharger

        sectionParentElement.appendChild(liElement);

        liElement.appendChild(iElement);
        liElement.appendChild(divContentElement);
        liElement.appendChild(buttonUploaderElement);

        divContentElement.appendChild(divDetailsElement);
        divContentElement.appendChild(divProgressBarElement);

        divDetailsElement.appendChild(spanNameElement);
        divDetailsElement.appendChild(spanPercentElement);

        divProgressBarElement.appendChild(divProgressElement);
    },

    listenerButtonUploader: (buttonElement, textFile, nameFile) => {
        buttonElement.addEventListener('click', () => {
            file.uploadExcelFileResult(textFile, nameFile)
        });
    },

    uploadExcelFileResult: async (textFile, nameFile) => {
        // const workbook = XLSX.utils.book_new();
        // const worksheet = XLSX.utils.aoa_to_sheet(data);
        // XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille1');

        // scriptControl : spérateur point virgule

        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet('Fichier Control');
        const ws2 = wb.addWorksheet('Debit Credit');
        const lines = textFile.split('\n');
        const data = lines.map(line => line.split('\t'));
        const header = data[0];
        const protoBody = data.slice(1);

        // triage par Num pièce et code journal
        scriptControl.sortData(protoBody);

        const body = protoBody.map( line => {
            const modifiedLine = [...line];
            modifiedLine[11] = parseInt(modifiedLine[11]);
            modifiedLine[12] = parseInt(modifiedLine[12]);
            return modifiedLine;
        });

        // body.unshift(header);
        ws.addRows(body);
        

        // 1. recherche des numéro de piece vide
        scriptControl.searchEmptyNumPiece(ws);

        // 2. recherche des pieces isolées
        scriptControl.searchAlonePiece(ws);

        // 3. control des dates entre ecritureDate et pieceDate
        scriptControl.checkDatesColumns(ws);

        // control des dates sur la meme piece

        // 6. déséquilibre débit crédit
        scriptControl.checkBalancePiece(body, ws2);

        ws.addRows(header);

        const buffer = await wb.xlsx.writeBuffer();
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `WTFEC-${nameFile}.xlsx`);
    }
}



export default file;

