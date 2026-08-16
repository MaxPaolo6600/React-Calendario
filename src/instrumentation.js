import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

const exporter = new OTLPTraceExporter({url: "http://localhost:4318/v1/traces",});

const provider = new WebTracerProvider({spanProcessors: [new BatchSpanProcessor(exporter),],});

provider.register();

console.log("OpenTelemetry iniciado");