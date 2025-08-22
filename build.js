const fs = require('fs-extra');
const path = require('path');
const { minify: minifyHTML } = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const { minify: minifyJS } = require('terser');

(async () => {
    try {
        const srcDir = 'src';
        const distDir = 'dist';

        // Cria o diretório de destino se não existir
        await fs.ensureDir(distDir);

        // Copia os arquivos estáticos
        console.log('📂 Copiando arquivos estáticos...');
        await fs.copy(srcDir, distDir, {
            filter: (file) => !file.endsWith('.html') // Ignora arquivos HTML, pois serão minificados separadamente
        });

        // Minifica HTML
        console.log('📄 Minificando HTML...');
        const htmlContent = await fs.readFile(path.join(srcDir, 'index.html'), 'utf8');
        const minifiedHTML = await minifyHTML(htmlContent, {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        });
        await fs.writeFile(path.join(distDir, 'index.html'), minifiedHTML);

        // Minifica CSS
        console.log('🎨 Minificando CSS...');
        const cssFiles = await fs.readdir(distDir);
        await Promise.all(
            cssFiles
                .filter((file) => file.endsWith('.css'))
                .map(async (file) => {
                    const filePath = path.join(distDir, file);
                    const fileContent = await fs.readFile(filePath, 'utf8');
                    const minifiedCSS = new CleanCSS().minify(fileContent).styles;
                    await fs.writeFile(filePath, minifiedCSS);
                })
        );

        // Minifica JavaScript
        console.log('📦 Minificando JavaScript...');
        const jsFiles = await fs.readdir(distDir);
        await Promise.all(
            jsFiles
                .filter((file) => file.endsWith('.js'))
                .map(async (file) => {
                    const filePath = path.join(distDir, file);
                    const fileContent = await fs.readFile(filePath, 'utf8');
                    const { code: minifiedJS } = await minifyJS(fileContent);
                    await fs.writeFile(filePath, minifiedJS);
                })
        );

        console.log('✅ Build concluído com sucesso!');
    } catch (error) {
        console.error('❌ Ocorreu um erro durante o build:', error);
    }
})();