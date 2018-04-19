const local = {
  mongo: {
    host: 'localhost',
    port: 27017,
    database: 'reviews',
    get connectionUrl () {
      return `mongodb://${this.host}:${this.port}/${this.database}`
    }
  }
}

const enviroments = {
  local
}

module.exports = local //enviroments[process.env.NODE_ENV || 'production']
