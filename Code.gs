const SHEET_ID   = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE'; // ← REPLACE THIS WITH YOUR ACTUAL SHEET ID
const SHEET_NAME = 'Feedback';

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp
                    .openById(SHEET_ID)
                    .getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error(
        'Sheet tab "' + SHEET_NAME + '" not found. ' +
        'Check SHEET_NAME in Code.gs matches your tab name exactly.'
      );
    }

    // Auto-create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Rating', 'Suggestion', 'Page', 'User Agent'
      ]);
      // Freeze header
      sheet.setFrozenRows(1);
      // Bold header
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    // Append the submission
    sheet.appendRow([
      data.timestamp   || new Date().toISOString(),
      parseInt(data.rating, 10) || data.rating || '',
      data.suggestion  || '',
      data.page        || '',
      data.userAgent   || '',
    ]);

    const output = ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;

  } catch (err) {
    const output = ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'stats') {
      const sheet = SpreadsheetApp
                      .openById(SHEET_ID)
                      .getSheetByName(SHEET_NAME);
      const lastRow = sheet.getLastRow();

      // No data yet (only header or empty)
      if (lastRow <= 1) {
        const output = ContentService
          .createTextOutput(JSON.stringify({ avgRating: 0, count: 0 }));
        output.setMimeType(ContentService.MimeType.JSON);
        return output;
      }

      // Ratings are in column B (index 2), rows 2 onward
      const ratings = sheet
        .getRange(2, 2, lastRow - 1, 1)
        .getValues()
        .flat()
        .filter(v => typeof v === 'number' && v > 0);

      const count     = ratings.length;
      const avgRating = count > 0
        ? Math.round((ratings.reduce((a, b) => a + b, 0) / count) * 10) / 10
        : 0;

      const output = ContentService
        .createTextOutput(JSON.stringify({ avgRating, count }));
      output.setMimeType(ContentService.MimeType.JSON);
      return output;
    }

    // Default GET — health check
    const output = ContentService
      .createTextOutput(JSON.stringify({ status: 'alive' }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;

  } catch (err) {
    const output = ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}
