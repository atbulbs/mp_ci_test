import WebpackDevServer from 'webpack-dev-server'

const devServerConfig: WebpackDevServer.Configuration = {
  host: '0.0.0.0',
  port: 8000,
  overlay: {
    errors: true,
  },
  hot: true,
  useLocalIp: true,
  open: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:36515',
      pathRewrite: { '^/api': '' },
    },
  },
}

module.exports = devServerConfig
