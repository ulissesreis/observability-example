'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const OTEL_COLLECTOR_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:51667/v1/traces';
console.log('OTEL_COLLECTOR_ENDPOINT', OTEL_COLLECTOR_ENDPOINT)
const traceExporter = new OTLPTraceExporter({
  url: OTEL_COLLECTOR_ENDPOINT,
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
  sdk.start();
  console.log(`OpenTelemetry inicializado e enviando traces para ${OTEL_COLLECTOR_ENDPOINT}`);
} catch (error) {
  console.error('Erro ao inicializar o OpenTelemetry:', error);
}

module.exports = sdk;
