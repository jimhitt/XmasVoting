# Japan Trip Voting - Setup Instructions

## Part 1: Set Up Google Sheets (5 minutes)

### Step 1: Create the Spreadsheet
1. Go to Google Sheets (sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Japan Trip Voting"

### Step 2: Add the Apps Script
1. In your spreadsheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy the **entire contents** of `GoogleAppsScript.gs` and paste it in
4. Click the **Save** icon (💾) or Ctrl+S
5. Name the project "Japan Trip Voting Script"

### Step 3: Run Setup (One Time Only)
1. In the Apps Script editor, find the function dropdown (it says "doPost" by default)
2. Select **setupSheet** from the dropdown
3. Click **Run** (▶️ button)
4. **IMPORTANT**: You'll get a permission warning:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to Japan Trip Voting Script (unsafe)"
   - Click "Allow"
5. Go back to your spreadsheet - you should now see formatted column headers!

### Step 4: Deploy as Web App
1. In Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description**: "Japan Trip Voting API"
   - **Execute as**: Me (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. **COPY THE WEB APP URL** - it will look like:
   ```
   https://script.google.com/macros/s/ABC123.../exec
   ```
7. Click "Done"

---

## Part 2: Update the HTML File

### Step 5: Configure the Voting Page
1. Open `japan-trip-voting-sheets.html` in a text editor
2. Find this line (around line 386):
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your web app URL from Step 4
4. Find this line (around line 379):
   ```html
   <a href="SPREADSHEET_URL_HERE" target="_blank">📊 View Full Spreadsheet</a>
   ```
5. Replace `SPREADSHEET_URL_HERE` with your Google Sheets URL (from the address bar)
6. Save the file

---

## Part 3: Deploy to GitHub Pages

### Step 6: Upload to GitHub
1. Create a new repository on GitHub
   - Name it something like "japan-trip-voting"
   - Make it public or private (your choice)
2. Rename `japan-trip-voting-sheets.html` to `index.html`
3. Upload `index.html` to your repository
4. Commit the file

### Step 7: Enable GitHub Pages
1. Go to your repository settings
2. Click **Pages** in the left sidebar
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait ~1 minute for deployment
6. Your site will be live at: `https://yourusername.github.io/japan-trip-voting/`

---

## Part 4: Share with Family

### Step 8: Send the Link
Share this URL with your family:
```
https://yourusername.github.io/japan-trip-voting/
```

Each person:
1. Opens the link on their phone/computer
2. Selects their name from the dropdown
3. Adjusts sliders for each activity
4. Clicks "Submit My Votes"
5. Can click "View Results" to see everyone's votes

---

## How It Works

✅ **Votes are saved to Google Sheets** in real-time
✅ **Everyone can see live results** by clicking "View Results"
✅ **You can update votes** - just vote again with the same name
✅ **View the spreadsheet directly** using the link at the bottom of results page

---

## Troubleshooting

### "Error submitting votes"
- Check that you pasted the correct SCRIPT_URL in the HTML
- Make sure the Google Apps Script is deployed with "Who has access: Anyone"
- Try redeploying the script (Deploy → Manage Deployments → Edit → New Version)

### "No votes showing in results"
- Check your Google Sheet - are votes appearing there?
- If yes, the issue is with fetching. Try redeploying the script.
- If no, the issue is with submission. Check the SCRIPT_URL.

### "Permission denied" in Google Sheets
- You need to run the `setupSheet` function once and authorize it
- Make sure you selected "Anyone" for "Who has access" when deploying

---

## Adding More Activities

To add more activities later:

1. **Update the HTML** - add to the `activities` array:
   ```javascript
   { id: 'sumo', name: 'Sumo Wrestling Match', emojis: ['😱', '😐', '😊', '🤩', '🤼'] }
   ```

2. **Update the Google Script** - modify the `setupSheet` function to add the new column header

3. **Re-run `setupSheet`** in Apps Script to update the spreadsheet

---

## Security Notes

- The Google Apps Script URL is public but hard to guess
- Only the voting spreadsheet is accessible (not your Drive)
- Worst case: someone finds the URL and submits fake votes (you can delete them)
- For extra security, you could add password protection to the HTML page

---

## Questions?

If you run into any issues, let me know and I'll help troubleshoot!
