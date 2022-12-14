import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import del from 'del';

export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return global.app.gulp.src(`${global.app.path.srcFolder}/fonts/*.otf`, {})
    // Конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    // Выгружаем в исходную папку
    .pipe(global.app.gulp.dest(`${global.app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return global.app.gulp.src(`${global.app.path.srcFolder}/fonts/*.ttf`, {})
    // Конвертируем в .woff
    .pipe(fonter({
      formats: ['woff']
    }))
    // Выгружаем в папку с исходниками
    .pipe(global.app.gulp.dest(`${global.app.path.srcFolder}/fonts/`))
    // Ищем файлы .ttf
    .pipe(global.app.gulp.src(`${global.app.path.srcFolder}/fonts/*.ttf`))
    // Конвертируем в .woff2
    .pipe(ttf2woff2())
    .pipe(global.app.gulp.dest(`${global.app.path.srcFolder}/fonts/`));
};

export const fontDrag = () => {
  // Ищем файлы .woff и .woff2 и выгружаем в папку с исходниками
  del([`${global.app.path.srcFolder}/fonts/*.*`, 
    `!${global.app.path.srcFolder}/fonts/*.woff`, 
    `!${global.app.path.srcFolder}/fonts/*.woff2`]);
  return global.app.gulp.src(`${global.app.path.srcFolder}/fonts/*.woff`, {})
    .pipe(global.app.gulp.dest(global.app.path.build.fonts))
    .pipe(global.app.gulp.src(`${global.app.path.srcFolder}/fonts/*.woff2`))
    .pipe(global.app.gulp.dest(global.app.path.build.fonts));
};

export const fontStyle = () => {
  // Файл стилей подключения шрифтов
  let fontsFile = `${global.app.path.srcFolder}/scss/partials/_fonts.scss`;
  // Проверяем существуют ли файлы шрифтов
  fs.readdir(global.app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() === 'thin' || fontWeight.toLowerCase() == 100) {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight' || fontWeight.toLowerCase() == 200) {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light' || fontWeight.toLowerCase() == 300) {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium' || fontWeight.toLowerCase() == 500) {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold' || fontWeight.toLowerCase() == 600) {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold' || fontWeight.toLowerCase() == 700) {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy' || fontWeight.toLowerCase() == 800) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black' || fontWeight.toLowerCase() == 900) {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            let fontStyle = fontFileName.toLowerCase().includes('italic') ? 'italic' : 'normal';
            fs.appendFile(fontsFile,
              `@font-face {\n\t font-family: ${fontName};\n\t font-display: swap;\n\t src: url("fonts/${fontFileName}.woff2") format("woff2"), url("fonts/${fontFileName}.woff") format("woff");\n\t font-weight: ${fontWeight};\n\t font-style: ${fontStyle};\n }\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        // Если файл есть, выводим сообщение
        console.log('Файл scss/font.scss уже существует. Для обновления файла нужно его удалить.');
      }
    }
  });

  return global.app.gulp.src(`${global.app.path.srcFolder}`);

  function cb() {}
};