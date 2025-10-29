import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import VueDevTools from "vite-plugin-vue-devtools";

const postCssScss = require("postcss-scss");
const postcssRTLCSS = require("postcss-rtlcss");

const viteCompressionFilter = /\.(js|mjs|json|css|html|svg)$/i;

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 5000,
        host: "0.0.0.0",
        strictPort: true,
        hmr: {
            clientPort: 443,
            protocol: 'wss'
        },
        // 👇 Add this section to allow Replit or any external host
        allowedHosts: [
            "localhost",
            "127.0.0.1",
            "3c1045a0-6390-414d-8ef4-8e4145eb03b3-00-akpdcsak50b2.sisko.replit.dev"
        ]
        // if you want to allow all hosts, replace above array with ['*']
    },
    define: {
        "FRONTEND_VERSION": JSON.stringify(process.env.npm_package_version),
        "process.env": {},
    },
    plugins: [
        vue(),
        visualizer({
            filename: "tmp/dist-stats.html"
        }),
        viteCompression({
            algorithm: "gzip",
            filter: viteCompressionFilter,
        }),
        viteCompression({
            algorithm: "brotliCompress",
            filter: viteCompressionFilter,
        }),
        VueDevTools(),
    ],
    css: {
        postcss: {
            parser: postCssScss,
            map: false,
            plugins: [postcssRTLCSS],
        },
    },
    build: {
        commonjsOptions: {
            include: [/.js$/],
        },
        rollupOptions: {
            output: {
                manualChunks(id, { getModuleInfo, getModuleIds }) {
                    // leave empty — default chunking
                },
            },
        },
    },
});
