import { Router } from 'express'

export declare namespace Server {
  interface IRoute {
    name: string,
    router: Router
  }
}
