// ... (inside the dataRows.forEach loop)
        dataRows.forEach(rowString => {
            // ... (previous logic for splitting rows)
            const data = rowString.split(','); 
            
            // We expect 3 data points: Player, Score, Opponent
            if (data.length >= 3 && data[0].trim() !== '') {
                const row = document.createElement('tr');

                // data[0] = Player Name (New First Column)
                // data[1] = Match Score/Status (New Second Column)
                // data[2] = Opponent Name (New Third Column)
                row.innerHTML = `
                    <td class="player-name">${data[0].trim()}</td>
                    <td class="match-score">${data[1].trim()}</td>
                    <td class="opponent-name">${data[2].trim()}</td>
                `;
                
                tableBody.appendChild(row);
            }
        });
// ...
