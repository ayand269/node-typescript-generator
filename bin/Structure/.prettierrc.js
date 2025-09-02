module.exports = {
    arrowParens: 'always',
    bracketSameLine: false,
    bracketSpacing: true,
    singleQuote: true,
    trailingComma: 'none',
    tabWidth: 4,
    semi: true,
    endOfLine: 'lf',
    singleAttributePerLine: true,
    experimentalTernaries: false,
    printWidth: 100,
    overrides: [
        {
            files: '*.ts',
            options: {
                bracketSameLine: true,
                singleAttributePerLine: false
            }
        },
        {
            files: 'package.json',
            options: {
                tabWidth: 2
            }
        }
    ]
};