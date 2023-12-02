# ROI-Calculator
## Overview

ROI Calculator for my application on Skillibrium

## Prerequisites

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [Supabase Account](https://supabase.io/) (for data storage)
- [SQLite](https://www.sqlite.org/index.html): Embedded database for local development.
## Getting Started
### 1. Install SQLite

Download and install SQLite from [https://www.sqlite.org/download.html](https://www.sqlite.org/download.html) according to your operating system.

### 2. Create SQLite Database and Table

- Open the DB Browser for SQLite
- Import the 'roi_data' (roi/calculator/src/roi_data.db) database.

## Setup and Run the App Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yeneyorel/ROI-Calculator.git
2. Installation
  - Make sure you have Node.js and npm install. Then, install the 'sqlite3' package:
  'npm install sqlite3'
  - Navigate to the project directory: 'cd roi/calculator/src
  - Install dependencies: npm install
3. run this to you CMD "node server.ts". "Server is running on port 3000" message will display on your CMD
4. Open the application in your browser (http://localhost:3000)
5. End Points
   - '/previousCalculations': Fetch previous ROI calculations
   - '/calculateROI': Calculate ROI and save to database

## Migration to Supabase
1. Create an account to supabase.
2. Create a new project.
3. Go to Database tab and create a 'roi' table Public schema with the same design on the local DB Browser.
4. Go to table 'roi' and disabled the RLS policies.
5. Install Node.js and npm
   - Ensure that Node.js and npm (Node Package Manager) are installed on your machine. You can download and install them from the official Node.js website: Node.js Downloads.
6. Install Typescript and Required Packages using the following command:
   - 'npm install typescript ts-node @supabase/supabase-js localforage idb'
7. Create a 'tsconfig.json' file in your project directory. You can create a basic configuration using the following command.
   - 'npx tsc --init'
7. Update the migrations.ts (roi/calculator/migration/migration.ts) file, adjust the 'supabaseUrl' and 'supabaseKey' base on you Supabase project.
8. Change your directory to the migration.ts file (cd roi/calculator/migration/migration/)
9. Run the typescript file. Use the 'ts-node; package to run you TypeScript file, run the following command.
   - 'npx ts-node migration.ts'
10. All records from local DB and 'Migration to Supabase successful' message will be displayed and ton your CMD.
11. To verify, go to SQL Editor and execute query to read the records from roi table.


# END
   
