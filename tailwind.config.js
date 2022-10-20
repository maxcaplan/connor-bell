const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './_drafts/**/*.html',
        './_includes/**/*.html',
        './_layouts/**/*.html',
        './_posts/*.md',
        './*.md',
        './*.html',
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Manrope', ...defaultTheme.fontFamily.sans],
                'display': ['JetBrains Mono', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
    // Disables hover styling on mobile devices
    future: {
        hoverOnlyWhenSupported: true,
    },
}
