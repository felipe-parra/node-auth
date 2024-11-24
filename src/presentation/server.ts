import express, { Router } from 'express'

interface Options {
  port?: number
  routes: Router
}

export class Server {
  public readonly app = express()
  private readonly port: number
  private readonly routes: Router

  constructor(options: Options) {
    const { port = 3100, routes } = options
    this.port = port
    this.routes = routes
  }

  async start() {
    // Middlewares
    this.app.use(express.json()) // Allow json
    this.app.use(express.urlencoded({ extended: true })) // Allow www-form

    // Assign routes
    this.app.use(this.routes)

    // Server running
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
