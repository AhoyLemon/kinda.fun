import fs from "fs";

// Function to get the actual count of billionaires from the data file
function getBillionaireCount() {
  try {
    const billionaireData = fs.readFileSync("./src/views/guillotine/js/data/_billionaires.js", "utf8");
    // Count the number of objects in the array by counting rank properties
    const matches = billionaireData.match(/rank: \d+/g);
    return matches ? matches.length : 1557; // fallback to old count if parsing fails
  } catch (error) {
    console.warn("⚠️  Could not read billionaire data file, using default count");
    return 1557;
  }
}

// Function to check if a year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Function to get days in a month
function getDaysInMonth(month, year = 2024) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return daysInMonth[month - 1];
}

// Function to generate all dates in MMDD format for a year
function generateAllDates(year = 2024) {
  const dates = [];

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = getDaysInMonth(month, year);

    for (let day = 1; day <= daysInMonth; day++) {
      const monthStr = month.toString().padStart(2, "0");
      const dayStr = day.toString().padStart(2, "0");
      dates.push(monthStr + dayStr);
    }
  }

  return dates;
}

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to generate warrants for all dates
function generateWarrants(billionairesPerDay = 20) {
  // Get the actual count of billionaires
  const totalBillionaires = getBillionaireCount();
  // Get all dates for the year
  const allDates = generateAllDates();
  const totalDays = allDates.length;

  console.log(`📅 Generating warrants for ${totalDays} days`);
  console.log(`👥 Using ${totalBillionaires} billionaires, ${billionairesPerDay} per day`);

  // Calculate total assignments needed
  const totalAssignments = totalDays * billionairesPerDay;
  console.log(`🎯 Total assignments needed: ${totalAssignments}`);

  // Create a pool of billionaire IDs (1 to totalBillionaires)
  // We'll repeat the pool multiple times to ensure we have enough
  const repetitions = Math.ceil(totalAssignments / totalBillionaires);
  console.log(`🔄 Repeating billionaire pool ${repetitions} times`);

  let billionairePool = [];
  for (let i = 0; i < repetitions; i++) {
    for (let j = 1; j <= totalBillionaires; j++) {
      billionairePool.push(j);
    }
  }

  // Shuffle the entire pool to randomize assignments
  billionairePool = shuffleArray(billionairePool);

  // Generate warrants object
  const warrants = {};
  let poolIndex = 0;

  for (const date of allDates) {
    const dayWarrants = [];

    // Assign unique billionaires for this day
    const usedForThisDay = new Set();

    while (dayWarrants.length < billionairesPerDay && poolIndex < billionairePool.length) {
      const billionaireId = billionairePool[poolIndex];

      // Ensure no duplicates within the same day
      if (!usedForThisDay.has(billionaireId)) {
        dayWarrants.push(billionaireId);
        usedForThisDay.add(billionaireId);
      }

      poolIndex++;

      // If we run out of pool, shuffle and restart (should not happen with our calculations)
      if (poolIndex >= billionairePool.length) {
        console.warn(`⚠️  Ran out of pool at date ${date}, reshuffling...`);
        billionairePool = shuffleArray(billionairePool);
        poolIndex = 0;
      }
    }

    // Sort the warrant numbers for consistent formatting
    dayWarrants.sort((a, b) => a - b);
    warrants[date] = dayWarrants;
  }

  return warrants;
}

// Function to format the warrants for JavaScript export
function formatWarrantsForExport(warrants) {
  const entries = Object.entries(warrants);

  const formattedEntries = entries.map(([date, billionaires]) => {
    // Format the array of billionaires with proper line breaks
    const formattedBillionaires = billionaires
      .map((id, index) => {
        if (index % 10 === 0 && index > 0) {
          return `\n    ${id}`;
        }
        return id.toString();
      })
      .join(", ");

    return `  "${date}": [\n    ${formattedBillionaires},\n  ]`;
  });

  return `export const allWarrants = {\n${formattedEntries.join(",\n")}\n};\n`;
}

// Main function
function main() {
  console.log("🎭 Generating arrest warrants...\n");

  // Generate warrants
  const warrants = generateWarrants();

  // Format for export
  const jsContent = formatWarrantsForExport(warrants);

  // Write to file
  const outputPath = "./src/views/guillotine/js/data/_warrants.js";
  fs.writeFileSync(outputPath, jsContent);

  console.log(`\n✅ Generated warrants file: ${outputPath}`);
  console.log(`📊 Statistics:`);
  console.log(`   - Total dates: ${Object.keys(warrants).length}`);
  console.log(`   - Total warrants issued: ${Object.values(warrants).reduce((sum, arr) => sum + arr.length, 0)}`);
  console.log(`   - Warrants per day: ${Object.values(warrants)[0]?.length || 0}`);

  // Show a sample of the generated data
  console.log(`\n📋 Sample warrants:`);
  const sampleDates = Object.keys(warrants).slice(0, 3);
  sampleDates.forEach((date) => {
    const month = date.substring(0, 2);
    const day = date.substring(2, 4);
    console.log(`   ${month}/${day}: [${warrants[date].slice(0, 5).join(", ")}...]`);
  });
}

// Run the script
main();
