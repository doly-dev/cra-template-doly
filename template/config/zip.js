const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const archiver = require('archiver');
const pkg = require('../package.json');

// 包文件前置文件路径
// 通常设置为 PUBLIC_URL，如 seashell/webapp/business/project/
const pathPrefix = '';

// 设置 zip 包文件路径，相对当前目录路径
const outputZipFile = `../zip/${pkg.name}-${pkg.version}.zip`;

// 构建输出的路径
const distDirectory = '../dist/';


function isDirectory(filePath) {
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      return true;
    }
  }
  return false;
}

function zip(target, output, prefix) {
  const targetResolvePath = path.resolve(__dirname, target);
  const zipResolvePath = path.resolve(__dirname, output);

  if (!isDirectory(targetResolvePath)) {
    console.log('zip error: ' + chalk.red(`'${target}' not a directory.`));
    console.log();
    return;
  }

  // 这里是防止文件路径不存在
  const { dir } = path.parse(zipResolvePath);
  mkdirp.sync(dir);

  const _output = fs.createWriteStream(zipResolvePath);

  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.pipe(_output);

  archive.directory(targetResolvePath, false, function (data) {
    // Mac下，只要在Finder访问过的文件夹，都会生成一个.DS_Store的文件
    if (data.name.indexOf('.DS_Store') > -1) {
      return false;
    }
    data.prefix = prefix;
    return data;
  }).finalize();

  console.log('zip file: ' + chalk.yellow(zipResolvePath));
  console.log();
}

zip(distDirectory, outputZipFile, pathPrefix);