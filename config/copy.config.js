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
    copyNgxFont: {
        src: ['{{ROOT}}/node_modules/@swimlane/ngx-datatable/release/assets/fonts/data-table.ttf',
        '{{ROOT}}/node_modules/@swimlane/ngx-datatable/release/assets/fonts/data-table.woff'],
        dest: '{{BUILD}}/fonts'
    },
    copyNgxCSS: {
        src: ['{{ROOT}}/node_modules/@swimlane/ngx-datatable/release/themes/bootstrap.css',
        '{{ROOT}}/node_modules/@swimlane/ngx-datatable/release/themes/dark.css',
        '{{ROOT}}/node_modules/@swimlane/ngx-datatable/release/themes/material.css',
        '{{ROOT}}/node_modules/@swimlane/ngx-datatable/release/index.css'],
        dest: '{{BUILD}}/assets/css'
    },
    copyPrimeNgCSS:{
      src:['{{ROOT}}/node_modules/primeicons/primeicons.css',
      '{{ROOT}}/node_modules/primeng/resources/themes/omega/theme.css',
      '{{ROOT}}/node_modules/primeng/resources/primeng.min.css'],
      dest: '{{BUILD}}/assets/css'
    },
    copyFontAwesome: {
      src: ["{{ROOT}}/node_modules/font-awesome/font-awesome.min.css"],
      dest: "{{BUILD}}/assets/css"
      }
  }