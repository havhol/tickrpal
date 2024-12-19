/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const csv = require("csv-parser");

const inputFilePath = "./input.csv"; // Path to your original CSV
const outputFilePath = "./output.csv"; // Path to save filtered CSV

const outputData = [];

// Read the CSV file
fs.createReadStream(inputFilePath)
  .pipe(
    csv({
      separator: ";", // Specify the delimiter
    })
  )
  .on("data", (row) => {
    // Extract only the name and ticker columns
    if (row["Name"] && row["Symbol"]) {
      outputData.push({
        name: row["Name"].trim(),
        ticker: row["Symbol"].trim(),
      });
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");

    // Write the filtered data to a new CSV file
    const header = "name,ticker\n";
    const rows = outputData
      .map((item) => `${item.name},${item.ticker}`)
      .join("\n");

    fs.writeFileSync(outputFilePath, header + rows, "utf8");
    console.log(`Filtered data saved to ${outputFilePath}`);
  })
  .on("error", (error) => {
    console.error("Error reading the CSV file:", error);
  });
