const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");


const dbConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Tiran321',
    database: 'autotrivo_backend'
};


const backupDir = "./backups";
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

const fileName = `backup_${Date.now()}.dump`;
const filePath = path.join(backupDir, fileName);

// Use custom dump format
const command = `PGPASSWORD=${dbConfig.password} pg_dump -h ${dbConfig.host} -p ${dbConfig.port} -U ${dbConfig.user} -d ${dbConfig.database} -F c -f ${filePath}`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error("Backup failed:", error.message);
        return;
    }
    if (stderr) console.error("pg_dump stderr:", stderr);
    console.log("Backup successful:", filePath);
});