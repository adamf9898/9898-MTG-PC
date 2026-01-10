{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "Node",
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "allowJs": true,
        "checkJs": false,
        "resolveJsonModule": true
    },
    "include": ["src/**/*", "scripts/**/*", "*.js", "*.cjs", "*.mjs"],
    "exclude": ["node_modules", "dist", "build", "coverage", ".next", ".turbo"]
}