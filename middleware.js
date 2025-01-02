'use strict';

const { context, trace, SpanKind } = require('@opentelemetry/api');

function customMiddleware(req, res, next) {
  const tracer = trace.getTracer('my-custom-tracer');

  const span = tracer.startSpan('custom-middleware-span', {
    kind: SpanKind.INTERNAL,
  });

  span.setAttribute('http.method', req.method);
  span.setAttribute('http.url', req.originalUrl);

  const ctx = trace.setSpan(context.active(), span);

  res.on('finish', () => {
    span.setAttribute('http.status_code', res.statusCode);

    span.end();
  });

  return next();
}

module.exports = {
  customMiddleware,
};
