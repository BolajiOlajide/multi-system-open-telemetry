
'use strict'

const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const { APP_NAME } = require('./constants');


// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const consoleExporter = new ConsoleSpanExporter();
const zipkinExporter = new ZipkinExporter({
  serviceName: APP_NAME,
  url: 'http://zipkin:9411/api/v2/spans'
});

const spanProcessor = new SimpleSpanProcessor(consoleExporter);

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: APP_NAME,
  }),
  traceExporter: zipkinExporter,
  spanProcessor,
  instrumentations: [getNodeAutoInstrumentations()]
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()
  .then(() => console.log(`Tracing initialized for ${APP_NAME}`))
  .catch((error) => console.log(`Error initializing tracing for ${APP_NAME}`, error));

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log(`Tracing terminated for ${APP_NAME}`))
    .catch((error) => console.log(`Error terminating tracing for ${APP_NAME}`, error))
    .finally(() => process.exit(0));
});