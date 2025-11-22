import fs from "fs";
import path from "path";

const appDir = path.join(__dirname, "app");

function scanFolder(folder: string) {
  const files = fs.readdirSync(folder);

  files.forEach((file) => {
    const fullPath = path.join(folder, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanFolder(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      // Dynamically import using ts-node
      import(fullPath)
        .then((module) => {
          if (!module.default) {
            console.warn(`❌ Missing default export in ${fullPath}`);
          }
        })
        .catch((err) => {
          console.error(`⚠️ Cannot import ${fullPath}: ${err.message}`);
        });
    }
  });
}

scanFolder(appDir);
