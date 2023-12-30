const fs = require("fs").promises;

const fileName = "./850291352FEC20211231_classique.txt";

async function file2SQL(fileName) {
  // lecture du fichier
  const data = await fs.readFile(fileName, "utf8");
  // séparation des lignes
  const lines = data.split("\n");
  // récupération dela première ligne (header)
  const header = lines[0].split("\t");
  // récupération du body
  let body = lines.slice(1);
  // séparation des colonnes
  body = body.map((line) => line.split("\t"));
  // création de la table
  // chaque nom de colonne de header, devient une colonne de la table
  let sql = `CREATE TABLE IF NOT EXISTS "data" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ${header.map((colName) => `"${colName}" TEXT`).join(",")});`;
  // insertion des données
  // chaque ligne de body devient une ligne de la table
  // on oublie pas de doubler les simple quotes (c'est ainsi qu'on échappe les quotes en SQL)
  sql += `INSERT INTO "data" (${header
    .map((colName) => `"${colName}"`)
    .join(",")}) VALUES (
    ${body
      .map(
        (line) =>
          `(${line.map((col) => `'${col.replace("'", "''")}'`).join(",")})`
      )
      .join(",")}
  )`;
  // écriture du fichier SQL
  await fs.writeFile("./data3.sql", sql);
    

}

file2SQL(fileName);
