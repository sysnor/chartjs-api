# chartjs-api

A Chart.js API server based on [ChartjsNodeCanvas](https://github.com/SeanSobey/ChartjsNodeCanvas) written in NodeJS.

## Installation

A [Docker](https://github.com/orgs/sysnor/packages/container/package/chartjs-api) image exists for running the server e.g. on Kubernetes. It exposes port 8080.

## Usage

There is one endpoint /chart which expects a POST with a JSON body. The configuration parameter is the Chart.JS [config](https://www.chartjs.org/docs/latest/getting-started/usage.html) passed to the chart class.

Example (POST /chart):

```json
{
    "width": 800,
    "height": 800,
    "configuration": {
        "type": "line",
        "data": {
            "labels": [
                "A",
                "B",
                "C"
            ],
            "datasets": [
                {
                    "label": "Line1",
                    "fill": false,
                    "backgroundColor": "rgba(141, 196, 81, .75)",
                    "borderColor": "rgba(141, 196, 81, 1)",
                    "pointBackgroundColor": "rgba(141, 196, 81, 1)",
                    "pointBorderColor": "#fff",
                    "pointHoverBackgroundColor": "#fff",
                    "pointHoverBorderColor": "rgba(141, 196, 81, 1)",
                    "data": [
                        20,
                        40,
                        60
                    ]
                },
                {
                    "label": "Line2",
                    "fill": false,
                    "backgroundColor": "rgba(6, 101, 208, .75)",
                    "borderColor": "rgba(6, 101, 208, 1)",
                    "pointBackgroundColor": "rgba(6, 101, 208, 1)",
                    "pointBorderColor": "#fff",
                    "pointHoverBackgroundColor": "#fff",
                    "pointHoverBorderColor": "rgba(6, 101, 208, 1)",
                    "data": [
                        60,
                        40,
                        20
                    ]
                }
            ]
        },
        "options": {
            "stacked": false,
            "scales": {
                "xAxes": [
                    {
                        "gridLines": {
                            "display": false
                        }
                    }
                ],
                "yAxes": [
                    {
                        "gridLines": {
                            "display": false
                        },
                        "ticks": {
                            "beginAtZero": true,
                            "max": 100,
                            "min": 0
                        }
                    }
                ]
            }
        }
    }
}
```

## Kubernetes

When running on K8s the service has health check endpoints provided by [Lightship](https://github.com/gajus/lightship#lightship-usage-kubernetes-container-probe-configuration).
