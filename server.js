import express from 'express'
import { createLightship } from 'lightship'
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import { body, validationResult } from 'express-validator'

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// Lightship will start a HTTP service on port 9000.
const lightship = await createLightship()

// App
const app = express()
app.use(express.json())

app.post('/chart',
    body('width').isInt({ min: 1, max: 9999, allow_leading_zeroes: false }),
    body('height').isInt({ min: 1, max: 9999, allow_leading_zeroes: false }),
    body('configuration').notEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: req.body.width, height: req.body.height })
            const image = await chartJSNodeCanvas.renderToBuffer(req.body.configuration)
            res.type('image/png')
            res.send(image)
        } catch (error) {
            next(error)
        }
    }
);

const server = app.listen(PORT, HOST, () => {
        lightship.signalReady()
    }).on('error', () => {
        lightship.shutdown();
    })

lightship.registerShutdownHandler(() => {
    server.close();
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    lightship.shutdown();
})

console.log(`Running on http://${HOST}:${PORT}`)
