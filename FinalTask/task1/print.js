const os = require('os');

const END_OF_LINE_CHARACTER = os.EOL;
const HORIZONTAL_BORDER_CHARACTER = '═';
const VERTICAL_BORDER_CHARACTER = '║';
const TOP_BORDER_SYMBOLS = {
  LEFT: '╔',
  MIDDLE: '╦',
  RIGHT: '╗'
};
const MIDDLE_BORDER_SYMBOLS = {
  LEFT: '╠',
  MIDDLE: '╬',
  RIGHT: '╣'
}
const BOTTOM_BORDER_SYMBOLS = {
  LEFT: '╚',
  MIDDLE: '╩',
  RIGHT: '╝'
}
const SPACE_CHARACTER = ' ';

function appendEndOfLine(string) {
  return string + END_OF_LINE_CHARACTER;
}

function getEmptyTable(tableName) {
  const textEmptyTable = getEmptyTableText(tableName);

  return getRowBorder(0, textEmptyTable.length - 2, TOP_BORDER_SYMBOLS) 
          + appendEndOfLine(textEmptyTable) 
          + getBottomBorder(0, textEmptyTable.length - 2);
}

function getLine(length, character) {
  let result = '';

  for (let i = 0; i < length; i++) {
    result += character;
  }

  return result;
}

function getEmptyTableText(tableName) {
  return `${VERTICAL_BORDER_CHARACTER} Table "${tableName}" is empty or does not exist ${VERTICAL_BORDER_CHARACTER}`;
}

function getMaxColumnSize(dataSets) {
  if (dataSets.length > 0) {
    const columnNameLentghs = dataSets[0].getColumnNames().map(column => column.length);
    const columnValueLengths = dataSets.flatMap(set => set.getValues().map(value => value.toString().length));

    return Math.max(...columnNameLentghs, ...columnValueLengths);
  }
  
  return 0;
}

function getColumnCount(dataSets) {
  const result = 0;

  if (dataSets.length > 0) {
    return dataSets[0].getColumnNames().length;
  }

  return result;
}

function getHeaderWithTopBorder(dataSets, columnCount, maxColumnSize) {
  const values = dataSets[0].getColumnNames();

  return getRowBorder(columnCount, maxColumnSize, TOP_BORDER_SYMBOLS) + getDataRow(values, maxColumnSize);
}

function getAdditionalColumnSize(maxColumnSize) {
  return maxColumnSize % 2 ? 3 : 2;
}

function getRowBorder(columnCount, maxColumnSize, borderSymbols) {
  let result = '';

  result += borderSymbols.LEFT;

  for (let j = 1; j < columnCount; j++) {
    result += getLine(maxColumnSize, HORIZONTAL_BORDER_CHARACTER);
    result += borderSymbols.MIDDLE;
  }

  result += getLine(maxColumnSize, HORIZONTAL_BORDER_CHARACTER);
  result += appendEndOfLine(borderSymbols.RIGHT);

  return result;
}

function getDataRow(values, maxColumnSize) {
  const paddedCells = values.map(value => getCellWithPadding(value.toString(), maxColumnSize));

  return appendEndOfLine(VERTICAL_BORDER_CHARACTER + paddedCells.join(VERTICAL_BORDER_CHARACTER) + VERTICAL_BORDER_CHARACTER);
}

function getBottomBorder(columnCount, maxColumnSize) {
  return getRowBorder(columnCount, maxColumnSize, BOTTOM_BORDER_SYMBOLS);
}

function getTableBody(dataSets, columnCount, maxColumnSize) {
  const dataRows = dataSets.map(set => getDataRow(set.getValues(), maxColumnSize));
  const rowBorder = getRowBorder(columnCount, maxColumnSize, MIDDLE_BORDER_SYMBOLS)

  return rowBorder + dataRows.join(rowBorder);
}

function getCellWithPadding(value, maxColumnSize) {
  let result = '';
  const valueLength = value.length;
  const leftPaddingSize = Math.trunc((maxColumnSize - valueLength) / 2);
  const rightPaddingSize = Math.ceil((maxColumnSize - valueLength) / 2)

  return getLine(leftPaddingSize, SPACE_CHARACTER) + value + getLine(rightPaddingSize, SPACE_CHARACTER);

}

function getTableWithData(data) {
  const columnCount = getColumnCount(data);
  let maxColumnSize = getMaxColumnSize(data);
  maxColumnSize += getAdditionalColumnSize(maxColumnSize);

  return getHeaderWithTopBorder(data, columnCount, maxColumnSize) + getTableBody(data, columnCount, maxColumnSize) + getBottomBorder(columnCount, maxColumnSize);
} 

function getTableString(data, tableName) {
  const maxColumnSize = getMaxColumnSize(data);
  
  if (maxColumnSize === 0) {
    return getEmptyTable(tableName);
  } else {
    return getTableWithData(data);
  }
}

module.exports = class Print {
  constructor(view, manager) {
    this.view = view;
    this.manager = manager;
  }

  canProcess(command) {
    return command.startsWith('print ');
  }

  process(input) {
    const command = input.split(SPACE_CHARACTER);

    if (command.length !== 2) {
      throw new TypeError('Incorrect number of parameters. Expected 1, got ' + (command.length - 1));
    }

    const tableName = command[1];
    const data = this.manager.getTableData(tableName);
    this.view.write(getTableString(data, tableName));
  }
};
