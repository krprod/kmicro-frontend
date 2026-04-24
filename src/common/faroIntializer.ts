// import { initializeFaro, getWebInstrumentations, WebVitalsInstrumentation } from '@grafana/faro-web-sdk';
// import { TracingInstrumentation } from '@grafana/faro-web-tracing';
/* initializeFaro({
  // required: the URL of the Grafana collector
   url: 'http://localhost:12347',   // Alloy OTLP endpoint
  app: {
    name: 'frontend-app',
    version: '1.0.0',
  },
}); */


// initializeFaro({
//   url: 'http://localhost:12347/collect', // Points to Alloy's Faro receiver
//   app: {
//     name: 'springmicro-frontend',
//     version: '1.0.0',
//     environment: 'development',
//   },
//   instrumentations: [
//     ...getWebInstrumentations(),
//     new TracingInstrumentation(), // Connects frontend clicks to backend traces
//     new WebVitalsInstrumentation()
//   ],
//   webVitalsInstrumentation: {
//     reportAllChanges: true,
//   },
// });


// const faro = initializeFaro({
//   url: 'https://faro-collector.example.com/collect',
//   app: {
//     name: 'my-web-app',
//     version: '1.0.0',
//     environment: 'production',
//   },

//   // Instrument specific features
//   instrumentations: {
//     // Track errors automatically
//     errors: {
//       enabled: true,
//       // Ignore specific errors
//       ignoreErrors: [
//         /^Network request failed$/,
//         /^Extension context invalidated$/,
//       ],
//     },

//     // Track console logs
//     console: {
//       enabled: true,
//       level: ['error', 'warn'],
//     },

//     // Track web vitals
//     webVitals: {
//       enabled: true,
//     },

//     // Track user interactions
//     interactions: {
//       enabled: true,
//     },

//     // Track XHR and fetch requests
//     fetch: {
//       enabled: true,
//     },
//   },

//   // Add custom metadata
// //   user: {
// //     id: getCurrentUserId(),
// //     attributes: {
// //       plan: 'premium',
// //       region: 'us-east',
// //     },
// //   },

//   // Session configuration
//   session: {
//     // Track session duration
//     trackSession: true,
//   },

//   // Batching configuration
//   batching: {
//     enabled: true,
//     sendTimeout: 5000,  // Send every 5 seconds
//   },
// });

// // Track custom events
// faro.api.pushEvent('checkout_completed', {
//   order_id: '12345',
// //   amount: 99.99,
// });