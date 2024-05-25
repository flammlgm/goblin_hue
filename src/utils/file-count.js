

const dirFileCount = (directoryPath) => {
  const fs = require('fs');
  let fileCount = 0;
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log('Ошибка при чтении директории:', err);
      return -1;
    }

    files.forEach(file => {
      fileCount++;
    });

    console.log(`Количество файлов в директории: ${fileCount}`);
    return fileCount
  });
}

export default dirFileCount;