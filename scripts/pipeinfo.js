function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const doc = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('key'));
    const sheet = doc.getSheetByName('Sheet1');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();
    const nextRow = sheet.getLastRow() + 1;
    const newRow = headers.map(header => header === 'Date' ? new Date() : e.parameter[header]);
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    return ContentService.createTextOutput(JSON.stringify({ result: 'success', row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}   