module.exports = {
    copyAssets: {
      src: ['{{SRC}}/assets/**/*'],
      dest: '{{WWW}}/assets'
    },
    copyIndexContent: {
      src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
      dest: '{{WWW}}'
    },
    copyFonts: {
      src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
      dest: '{{WWW}}/assets/fonts'
    },
    copyPolyfills: {
      src: [`{{ROOT}}/node_modules/ionic-angular/polyfills/${process.env.IONIC_POLYFILL_FILE_NAME}`],
      dest: '{{BUILD}}'
    },
    copySwToolbox: {
      src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
      dest: '{{BUILD}}'
    },
    copyPrimeNgCSS:{
      src:['{{ROOT}}/node_modules/primeicons/primeicons.css',
      '{{ROOT}}/node_modules/primeng/resources/themes/omega/theme.css',
      '{{ROOT}}/node_modules/primeng/resources/primeng.min.css'],
      dest: '{{BUILD}}/assets/css'
    },
    copyPrimengFonts: {
      src: ['{{ROOT}}/node_modules/primeicons/fonts/**'],
      dest: '{{BUILD}}/assets/css/fonts'
    },
    // copyFontAwesome: {
    //   src: ["{{ROOT}}/node_modules/font-awesome/fonts/**/*"],
    //   dest: "{{BUILD}}/assets/fonts"
    // }
  }