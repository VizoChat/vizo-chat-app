
// const crypto = require("crypto")
// console.log('Random ID:',crypto.randomBytes(16).toString('hex'));

// Local time and time zone
const localTime = new Date();
const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Target global time zone
const targetTimeZone = 'America/New_York'; // example target time zone

// Convert local time to target global time
const targetTime = new Date(localTime.toLocaleString('en-US', { timeZone: targetTimeZone }));

// Output the results
console.log(`Local time: ${localTime.toLocaleString()} (${localTimeZone})`);
console.log(`Target global time: ${targetTime.toLocaleString()} (${targetTimeZone})`);

console.log('--------------------------');
// Get current UTC time
const currentUTC = new Date().toISOString();

// Format current UTC time to display in a specific time zone
const targetTimeZone2 = 'America/New_York'; // example target time zone
const options = { timeZone: targetTimeZone2, hour12: false };
const formattedTime = new Date(currentUTC).toLocaleString('en-US', options);

// Output the results
console.log(`Current UTC time: ${currentUTC} | ${new Date(currentUTC)}`);
console.log(`Formatted time in ${targetTimeZone2}: ${formattedTime}`);
