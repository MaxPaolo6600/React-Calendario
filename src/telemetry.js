import { trace, SpanStatusCode } from "@opentelemetry/api";

const tracer = trace.getTracer("calendario-react");

export async function withSpan(name, attributes, callback) {
    const span = tracer.startSpan(name);

    Object.entries(attributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
    });

    try {
        const result = await callback();

        span.setStatus({
            code: SpanStatusCode.OK,
        });

        return result;

    } catch (error) {
        span.recordException(error);

        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message,
        });

        throw error;

    } finally {
        span.end();
    }
}