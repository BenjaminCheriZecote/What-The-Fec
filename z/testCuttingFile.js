const str = `1 the 126 name
2 of  127 very
3 to  128 through
4 and 129 just
5 a   130 form`;

const lines = str.split('\n');
const firstColumn = [];
lines.forEach(line => {
   firstColumn.push(line.split(' ')[0]);
});

const header = lines;


// const header = lines.split("\t");
// const header1 = header[0].split(' ');
// const firstHeader = header1[0];

// const coloumns = str.split('\t');

// console.log(header1);
// console.log(firstHeader);

// console.log(lines);

console.log(firstColumn);
// console.log(header);







