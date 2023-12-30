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
                    
                    
                    
                    const workbook = XLSX.utils.book_new();
                    const lines = textContent.split('\n');
                    const data = lines.map(line => line.split('\t'));
                    const body = data.slice(1)
                    const worksheet = XLSX.utils.aoa_to_sheet(data);
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille1');
                    console.log("Body :", body);

                    // XLSX.writeFile(workbook, "WhatTheFEC.xlsx");
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

    uploadExcelFileResult: (textFile, nameFile) => {
        const workbook = XLSX.utils.book_new();
        // scriptControl : spérateur point virgule
        const lines = textFile.split('\n');
        const data = lines.map(line => line.split('\t'));
        const body = data.slice(1);
        // scriptControl : triage num piece
        // 1. recherche des numéro de piece vide
        // scriptControl.searchEmptyNumPiece(body);

        // 2. recherche des pieces isolées
        // 3. control des dates entre ecritureDate et pieceDate
        // 4. control des dates sur la meme piece
        // 5. différence code journal sur meme piece
        // 6. déséquilibre débit crédit

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille1');


        XLSX.writeFile(workbook, `WTF-${nameFile}.xlsx`);
    }
}



export default file;

