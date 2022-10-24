const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './_drafts/**/*.html',
        './_includes/**/*.html',
        './_layouts/**/*.html',
        './_posts/*.md',
        './projects/*.md',
        './*.md',
        './*.html',
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Manrope', ...defaultTheme.fontFamily.sans],
                'display': ['JetBrains Mono', ...defaultTheme.fontFamily.sans],
            },

            // tailwind typography theme
            typography: theme => {
                // console.log(theme())

                return {
                    DEFAULT: {
                        css: {
                            'h1,h2,h3,h4,h5,h6': {
                                fontFamily: theme('fontFamily.display').join(", "),
                                fontWeight: 700,
                            },

                            pre: {
                                backgroundColor: theme('colors.neutral.800'),
                                borderRadius: theme('borderRadius.DEFAULT'),
                            },

                            code: {
                                fontFamily: theme('fontFamily.display').join(", "),
                                backgroundColor: theme('colors.neutral.800'),
                                padding: `${theme('padding.[0.5]')} ${theme('padding.1')}`,
                                margin: `0 ${theme('padding.[0.5]')}`,
                                borderRadius: theme('borderRadius.DEFAULT'),
                                display: 'inline-block'
                            },

                            'code::before': {
                                content: '""',
                            },
                            'code::after': {
                                content: '""',
                            },
                        },
                    },
                }
            }
        },
    },
    plugins: [require('@tailwindcss/typography')],
    // Disables hover styling on mobile devices
    future: {
        hoverOnlyWhenSupported: true,
    },
}
