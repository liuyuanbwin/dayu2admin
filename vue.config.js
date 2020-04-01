module.exports = {
  devServer: {
    open: true,
    port: 8868,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      }
    }
  }
}
