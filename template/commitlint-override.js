const { execSync } = require('child_process');
const fs = require('fs');

const msgPath = process.env.GIT_PARAMS || process.env.HUSKY_GIT_PARAMS;
const msg = fs.readFileSync(msgPath, 'utf-8').trim();

// ref: https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/scripts/init.js#L62
const CraInitializeCommitMessage = 'Initialize project using Create React App';

try {
  if (msg !== CraInitializeCommitMessage) {
    execSync('commitlint --edit $1', { encoding: 'utf-8', stdio: 'inherit' });
  }
} catch (err) {
  process.exit(1);
}
