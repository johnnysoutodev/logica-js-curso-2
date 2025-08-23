const fs = require('fs-extra');
const path = require('path');
const { minify: minifyHTML } = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const { minify: minifyJS } = require('terser');
const sharp = require('sharp');

const srcDir = './src';
const distDir = './dist';

async function build() {
    try {
        console.log('🚀 Iniciando build...');
        
        // 1. Limpa o diretório dist
        console.log('🧹 Limpando diretório dist...');
        await fs.remove(distDir);
        await fs.ensureDir(distDir);
        
        // 2. Copia e otimiza imagens
        console.log('📁 Otimizando imagens...');
        const imgSrcPath = path.join(srcDir, 'img');
        const imgDistPath = path.join(distDir, 'img');
        
        if (await fs.pathExists(imgSrcPath)) {
            await fs.ensureDir(imgDistPath);
            await optimizeImages(imgSrcPath, imgDistPath);
        }
        
        // 3. Minifica CSS
        console.log('🎨 Minificando CSS...');
        const cssSrcPath = path.join(srcDir, 'css', 'style.css');
        const cssDistPath = path.join(distDir, 'css', 'style.css');
        
        if (await fs.pathExists(cssSrcPath)) {
            const cssContent = await fs.readFile(cssSrcPath, 'utf8');
            const minifiedCSS = new CleanCSS({ 
                level: 2,
                returnPromise: false 
            }).minify(cssContent);
            
            await fs.ensureDir(path.join(distDir, 'css'));
            await fs.writeFile(cssDistPath, minifiedCSS.styles);
            
            console.log(`   ✅ CSS: ${cssContent.length} → ${minifiedCSS.styles.length} bytes`);
        }
        
        // 4. Minifica JavaScript
        console.log('⚡ Minificando JavaScript...');
        const jsSrcPath = path.join(srcDir, 'js', 'app.js');
        const jsDistPath = path.join(distDir, 'js', 'app.js');
        
        if (await fs.pathExists(jsSrcPath)) {
            const jsContent = await fs.readFile(jsSrcPath, 'utf8');
            const minifiedJS = await minifyJS(jsContent, {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    dead_code: true
                },
                mangle: true,
                format: {
                    comments: false
                }
            });
            
            await fs.ensureDir(path.join(distDir, 'js'));
            await fs.writeFile(jsDistPath, minifiedJS.code);
            
            console.log(`   ✅ JS: ${jsContent.length} → ${minifiedJS.code.length} bytes`);
        }
        
        // 5. Minifica HTML
        console.log('📄 Minificando HTML...');
        const htmlSrcPath = path.join(srcDir, 'index.html');
        const htmlDistPath = path.join(distDir, 'index.html');
        
        const htmlContent = await fs.readFile(htmlSrcPath, 'utf8');
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
            minifyURLs: true,
            removeAttributeQuotes: true,
            removeOptionalTags: true
        });
        
        await fs.writeFile(htmlDistPath, minifiedHTML);
        console.log(`   ✅ HTML: ${htmlContent.length} → ${minifiedHTML.length} bytes`);
        
        // 6. Relatório final
        console.log('\n📊 Relatório do Build:');
        const distStats = await getDirStats(distDir);
        console.log(`   📦 Arquivos gerados: ${distStats.files}`);
        console.log(`   💾 Tamanho total: ${(distStats.size / 1024).toFixed(2)} KB`);
        console.log('✅ Build concluído com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro durante o build:', error);
        process.exit(1);
    }
}

// Função auxiliar para estatísticas
async function getDirStats(dir) {
    let files = 0;
    let size = 0;
    
    async function traverse(currentDir) {
        const items = await fs.readdir(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stats = await fs.stat(fullPath);
            
            if (stats.isDirectory()) {
                await traverse(fullPath);
            } else {
                files++;
                size += stats.size;
            }
        }
    }
    
    await traverse(dir);
    return { files, size };
}

// Função para otimizar imagens
async function optimizeImages(srcPath, distPath) {
    const files = await fs.readdir(srcPath);
    let totalOriginal = 0;
    let totalOptimized = 0;
    
    for (const file of files) {
        const srcFile = path.join(srcPath, file);
        const distFile = path.join(distPath, file);
        const stats = await fs.stat(srcFile);
        
        if (stats.isDirectory()) {
            await fs.ensureDir(distFile);
            await optimizeImages(srcFile, distFile);
            continue;
        }
        
        const ext = path.extname(file).toLowerCase();
        totalOriginal += stats.size;
        
        try {
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                // Otimiza imagens com Sharp
                await sharp(srcFile)
                    .jpeg({ quality: 85, progressive: true })
                    .png({ compressionLevel: 9, quality: 85 })
                    .webp({ quality: 85 })
                    .toFile(distFile);
                
                const optimizedStats = await fs.stat(distFile);
                totalOptimized += optimizedStats.size;
                
                const reduction = ((stats.size - optimizedStats.size) / stats.size * 100).toFixed(1);
                console.log(`   ✅ ${file}: ${stats.size} → ${optimizedStats.size} bytes (-${reduction}%)`);
                
            } else if (['.svg'].includes(ext)) {
                // Para SVG, apenas copia (ou use svgo se quiser otimizar)
                await fs.copy(srcFile, distFile);
                totalOptimized += stats.size;
                console.log(`   📄 ${file}: copiado (SVG)`);
                
            } else {
                // Outros arquivos, apenas copia
                await fs.copy(srcFile, distFile);
                totalOptimized += stats.size;
                console.log(`   📄 ${file}: copiado`);
            }
            
        } catch (error) {
            console.log(`   ⚠️  ${file}: erro na otimização, copiando original`);
            await fs.copy(srcFile, distFile);
            totalOptimized += stats.size;
        }
    }
    
    if (totalOriginal > 0) {
        const totalReduction = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
        console.log(`   📊 Total de imagens: ${totalOriginal} → ${totalOptimized} bytes (-${totalReduction}%)`);
    }
}

// Executar build
build();