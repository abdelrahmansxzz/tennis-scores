// script.js

// 🚨 STEP 1: PASTE YOUR PUBLISHED CSV URL HERE
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1wcxIziwZl3-U3xYcFev6gObb13uyv5h-4Z1RvYjurNo/edit?gid=1781851050#gid=1781851050'; // PASTE YOUR URL HERE

const tableBody = document.getElementById('scores-table-body');

async function fetchAndDisplayScores() {
    try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const csvText = await response.text();
        
        tableBody.innerHTML = ''; // Clear existing content
        
        // 1. Split the text into lines, trim whitespace, and filter out any empty lines.
        const rows = csvText.trim().split('\n').filter(line => line.trim() !== '');
        
        // 2. Skip the header row (the first row in the array)
        const dataRows = rows.slice(1);
        
        if (dataRows.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="3">No score entries found. Check your Google Sheet structure.</td></tr>`;
            return;
        }

        dataRows.forEach(rowString => {
            // Use a simple split by comma, assuming clean data from the CSV publish
            const data = rowString.split(','); 
            
            // We expect at least 3 columns of data based on the table headers
            if (data.length >= 3 && data[0].trim() !== '') {
                const row = document.createElement('tr');

                // data[0] = Player Name (Entry List)
                // data[1] = Round 1 Status (e.g., 'X' or 'Score')
                // data[2] = Round 2 Opponent
                row.innerHTML = `
                    <td class="player-name">${data[0].trim()}</td>
                    <td class="round-status">${data[1].trim()}</td>
                    <td class="opponent-name">${data[2].trim()}</td>
                `;
                
                tableBody.appendChild(row);
            }
        });

    } catch (error) {
        console.error("Error fetching data from Google Sheet:", error);
        tableBody.innerHTML = `<tr><td colspan="3" style="color: red;">Error: Could not load scores. Check the sheet URL.</td></tr>`;
    }
}

fetchAndDisplayScores();
