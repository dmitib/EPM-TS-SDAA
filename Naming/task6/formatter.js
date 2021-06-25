const os = require('os');

const PLUS = '+';
const PIPE = '|';
const MINUS = '-';
const UNDERSCORE = ' _ ';

function repeat(symbol, times) {
    let result = '';
    for (let i = 0; i < times; i++) {
        result += symbol;
    }
    return result;
}

function formatKyeValue(key, value) {
    const content = key + UNDERSCORE + value;
    const minuses = repeat(MINUS, content.length);

    return PLUS + minuses + PLUS + os.EOL
         + PIPE + content + PIPE + os.EOL
         + PLUS + minuses + PLUS + os.EOL;
}

function main() {
    console.log(formatKyeValue('enable', 'true'));
    console.log(formatKyeValue('name', 'Bob'));
}

main();
