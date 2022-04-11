// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
    // Handles a POST /login request
    rest.get('/article', (req, res, ctx) => {
        const count = req.url.searchParams.get('count')
        const type = req.url.searchParams.get('type')
        const data = new Array(Number(count)).fill('').map((item, index) => {
            return {
                title: `${type} news ${index}${Math.random()}`,
                uniquekey: index
            }
        })
        console.log(2345, count, type)
        return res(
            ctx.status(200),
            ctx.json(data),
        )
    }),
    rest.get('/picture', (req, res, ctx) => {
        const count = req.url.searchParams.get('count')
        const type = req.url.searchParams.get('type')
        const data = new Array(Number(count)).fill('').map((item, index) => {
            return {
                title: `${type} ${index}`,
                uniquekey: index
            }
        })
        return res(
            ctx.status(200),
            ctx.json(data),
        )
    })
]