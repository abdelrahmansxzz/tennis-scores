// script.js

// 🚨 STEP 1: PASTE YOUR PUBLISHED CSV URL HERE
// This is the link you copied from File > Share > Publish to the web.
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1wcxIziwZl3-U3xYcFev6gObb13uyv5h-4Z1RvYjurNo/edit?gid=1781851050#gid=1781851050';

const tableBody = document.getElementById('scores-table-body');

async function fetchAndDisplayScores() {
    try {
        // Fetch the CSV data from the Google Sheets link
        const response = await fetch(GOOGLE_SHEET_URL);
        const csvText = await response.text();
        
        // Clear the "Loading scores..." message
        tableBody.innerHTML = '';
        
        // Split the text into individual rows (lines)
        // .slice(1) skips the header row (Player, R1_Status, R2_Opponent)
        const rows = csvText.trim().split('\n').slice(1); 
        
        rows.forEach(rowString => {
            // Split the row string by comma (CSV format)
            // Use regex to handle commas inside quotes, if needed, but simple split works for basic data
            const data = rowString.split(','); 
            
            // Ensure the row has at least the 3 expected columns (Player, Status, Opponent)
            if (data.length >= 3) {
                const row = document.createElement('tr');

                // data[0] = Player Name
                // data[1] = Round 1 Status (X)
                // data[2] = Round 2 Opponent
                row.innerHTML = `
                    <td class="player-name">${data[0]}</td>
                    <td class="round-status">${data[1]}</td>
                    <td class="opponent-name">${data[2]}</td>
                `;
                
                tableBody.appendChild(row);
            }
        });

    } catch (error) {
        console.error("Error fetching data from Google Sheet:", error);
        tableBody.innerHTML = `<tr><td colspan="3" style="color: red;">Could not load scores. Check the URL and internet connection.</td></tr>`;
    }
}

// Run the function to load scores when the page loads
fetchAndDisplayScores();
