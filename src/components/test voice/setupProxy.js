// //
// // Copyright (c) 2022-2023 Winlin
// //
// // SPDX-License-Identifier: AGPL-3.0-or-later
// //

// const { createProxyMiddleware } = require('http-proxy-middleware');

// const apiProxy = createProxyMiddleware({
//     target: 'http://localhost:8081',
//     changeOrigin: true,
//     onProxyRes: function(proxyRes, req, res) {
//         proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//         proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
//         proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
//     }
// });

// console.log('setupProxy for development reactjs');

// module.exports = function(app) {
//   app.use('/api/ai-talk/', apiProxy);
// };


