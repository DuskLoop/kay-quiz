const execSync = require("child_process").execSync;
const paths = require("./paths");

const version = `kay-quiz@${require(paths.appPackageJson).version}`;

execSync(`sentry-cli releases new ${version}`, {
  stdio: "inherit",
});

execSync(`sentry-cli releases deploys ${version} new -e production`, {
  stdio: "inherit",
});

execSync(`sentry-cli releases set-commits --auto ${version}`, {
  stdio: "inherit",
});

execSync(`yarn build`, {
  stdio: "inherit",
});

execSync(`yarn deploy`, {
  stdio: "inherit",
});

execSync(`sentry-cli releases finalize ${version}`, {
  stdio: "inherit",
});
