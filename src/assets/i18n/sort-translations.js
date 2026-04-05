const fs = require('node:fs');
const readline = require('readline');

console.log(__dirname);

const localizationFiles = fs.readdirSync(__dirname);

for (let index = 0; index < localizationFiles.length; index++) {
    const element = localizationFiles[index];

    if (!element.endsWith('json'))
        continue;

    const filePath = `${__dirname}\\${element}`;

    console.log(`Reading file \"${filePath}\"...`);

    const data = fs.readFileSync(filePath, 'utf8');
    // const clean = data.replace(/^\uFEFF/, ''); --> When files are saved with BOM.
    const jsonData = JSON.parse(data);

    let localizationMap = new Map();

    for (const [key, value] of Object.entries(jsonData)) {
        localizationMap.set(key, value);
    }

    const sortedLocalizationMap = new Map([...localizationMap.entries()].sort());

    const localizationObject = Object.fromEntries(sortedLocalizationMap);

    const localizationObjectJsonString = JSON.stringify(localizationObject, null, 4);

    fs.writeFileSync(filePath, localizationObjectJsonString, 'utf8');

    console.log(`\"${filePath}\" sorted successfully.\n`);
}