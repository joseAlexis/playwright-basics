const exceljs = require("exceljs");

export async function openExcelFile(filePath: string, worksheetNo): Promise<any[]> {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(worksheetNo);
  return worksheet
}

export async function updateValues(worksheet, columnName:string, values:string[]) {
  let columnNumber = -1;
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === columnName) {
        columnNumber = colNumber;
      }
    });
  });
}