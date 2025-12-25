// Google Apps Script for Japan Trip Voting
// This code runs in Google Sheets and handles vote submissions

// Deploy this as a web app with:
// - Execute as: Me
// - Who has access: Anyone

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    if (data.action === 'submitVote') {
      // Validate voter name
      if (!data.voter || typeof data.voter !== 'string' || data.voter.length > 100) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Invalid voter name'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      // Validate votes object
      if (!data.votes || typeof data.votes !== 'object') {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Invalid votes data'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      // Validate and sanitize vote values
      const validateScore = (score) => {
        const num = parseInt(score);
        if (isNaN(num)) return 50;
        return Math.min(100, Math.max(0, num));
      };

      // Check if voter already has a vote
      const existingRow = findVoterRow(sheet, data.voter);

      const timestamp = new Date();
      const rowData = [
        timestamp,
        data.voter,
        validateScore(data.votes.skiing),
        validateScore(data.votes.kyoto),
        validateScore(data.votes.kanazawa)
      ];

      if (existingRow > 0) {
        // Update existing vote
        sheet.getRange(existingRow, 1, 1, rowData.length).setValues([rowData]);
      } else {
        // Add new vote
        sheet.appendRow(rowData);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Vote recorded'
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    if (e.parameter.action === 'getVotes') {
      const data = sheet.getDataRange().getValues();
      
      // Skip header row if it exists
      const startRow = (data[0][0] === 'Timestamp') ? 1 : 0;
      
      const votes = [];
      for (let i = startRow; i < data.length; i++) {
        if (data[i][1]) { // If voter name exists
          votes.push({
            timestamp: data[i][0],
            voter: data[i][1],
            skiing: data[i][2],
            kyoto: data[i][3],
            kanazawa: data[i][4]
          });
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        votes: votes
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function findVoterRow(sheet, voterName) {
  const data = sheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === voterName) {
      return i + 1; // Sheet rows are 1-indexed
    }
  }
  return -1; // Not found
}

function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set up header row
  const headers = ['Timestamp', 'Voter', 'Skiing in Shiga Kogen', 'Culture in Kyoto', 'Samurai History in Kanazawa'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  
  // Set column widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 100); // Voter
  sheet.setColumnWidth(3, 180); // Activity 1
  sheet.setColumnWidth(4, 180); // Activity 2
  sheet.setColumnWidth(5, 200); // Activity 3
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  Logger.log('Sheet setup complete!');
}
