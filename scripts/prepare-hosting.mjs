import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const source = resolve(root, "out");
const target = resolve(root, "dist");
const backend = resolve(root, "backend-php");
const vendorAutoload = resolve(backend, "vendor", "autoload.php");

if (!existsSync(source)) {
  throw new Error("Static export not found. Run `next build` first.");
}

if (!existsSync(vendorAutoload)) {
  throw new Error(
    "PHP dependencies are missing. Run Composer install in backend-php first.",
  );
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });

mkdirSync(resolve(target, "api"), { recursive: true });
copyFileSync(
  resolve(backend, "public", "contact.php"),
  resolve(target, "api", "contact.php"),
);

const privateBackend = resolve(target, "_backend");
mkdirSync(privateBackend, { recursive: true });
cpSync(resolve(backend, "src"), resolve(privateBackend, "src"), {
  recursive: true,
});
cpSync(resolve(backend, "vendor"), resolve(privateBackend, "vendor"), {
  recursive: true,
});

mkdirSync(resolve(privateBackend, "config"), { recursive: true });
copyFileSync(
  resolve(backend, "config", "config.example.php"),
  resolve(privateBackend, "config", "config.local.php.example"),
);

if (existsSync(resolve(backend, "composer.lock"))) {
  copyFileSync(
    resolve(backend, "composer.lock"),
    resolve(privateBackend, "composer.lock"),
  );
}

copyFileSync(
  resolve(root, "deployment", "apache-root.htaccess"),
  resolve(target, ".htaccess"),
);
copyFileSync(
  resolve(root, "deployment", "backend.htaccess"),
  resolve(privateBackend, ".htaccess"),
);
copyFileSync(resolve(root, "HOSTING.md"), resolve(target, "HOSTING.md"));

console.log(`Hosting package created: ${target}`);
