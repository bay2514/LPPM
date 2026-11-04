import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve(import.meta.dirname, "../src");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(SRC_DIR);
let errors = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const relPath = path.relative(SRC_DIR, file);

  // Check public/
  if (relPath.startsWith("public/")) {
    if (/@admin\b/.test(content)) {
      console.error(`[RULE VIOLATION] public file '${relPath}' imports from @admin`);
      errors++;
    }
  }

  // Check admin/
  if (relPath.startsWith("admin/")) {
    if (/@public\b/.test(content)) {
      console.error(`[RULE VIOLATION] admin file '${relPath}' imports from @public`);
      errors++;
    }
  }

  // Check shared/
  if (relPath.startsWith("shared/")) {
    if (/@public\b/.test(content) || /@admin\b/.test(content)) {
      console.error(`[RULE VIOLATION] shared file '${relPath}' imports from @public or @admin`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`Found ${errors} import boundaries violation(s).`);
  process.exit(1);
} else {
  console.log("✓ All import boundaries between public, admin, and shared are strictly preserved.");
}
