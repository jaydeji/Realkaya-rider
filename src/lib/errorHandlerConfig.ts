// import NewRelic from 'newrelic-react-native-agent';
// import { Platform } from 'react-native';
// import * as appVersion from '../../package.json';

// const agentConfiguration = {
//   //Android Specific
//   // Optional:Enable or disable collection of event data.
//   analyticsEventEnabled: true,

//   // Optional:Enable or disable crash reporting.
//   crashReportingEnabled: true,

//   // Optional:Enable or disable interaction tracing. Trace instrumentation still occurs, but no traces are harvested. This will disable default and custom interactions.
//   interactionTracingEnabled: true,

//   // Optional:Enable or disable reporting successful HTTP requests to the MobileRequest event type.
//   networkRequestEnabled: true,

//   // Optional:Enable or disable reporting network and HTTP request errors to the MobileRequestError event type.
//   networkErrorRequestEnabled: true,

//   // Optional:Enable or disable capture of HTTP response bodies for HTTP error traces, and MobileRequestError events.
//   httpResponseBodyCaptureEnabled: true,

//   // Optional:Enable or disable agent logging.
//   loggingEnabled: true,

//   // Optional:Specifies the log level. Omit this field for the default log level.
//   // Options include: ERROR (least verbose), WARNING, INFO, VERBOSE, AUDIT (most verbose).
//   logLevel: NewRelic.LogLevel.INFO,

//   // iOS Specific
//   // Optional:Enable/Disable automatic instrumentation of WebViews
//   webViewInstrumentation: true,

//   // Optional:Set a specific collector address for sending data. Omit this field for default address.
//   collectorAddress: '',

//   // Optional:Set a specific crash collector address for sending crashes. Omit this field for default address.
//   crashCollectorAddress: '',
// };

// const initErrorHandler = () => {
//   console.log('Initialising new relic in ' + process.env.NODE_ENV + ' mode');

//   let appToken;

//   if (Platform.OS === 'ios') {
//     appToken = 'eu01xxd04a6547eda2c4ea068d7399b3bd5ae18a31-NRMA';
//   } else {
//     appToken = 'eu01xxb6b25c9f27a7f5f791111288dad505be6b25-NRMA';
//   }
//   NewRelic.startAgent(appToken, agentConfiguration);
//   NewRelic.setJSAppVersion(appVersion.version);
// };

import * as Sentry from 'sentry-expo';

const initErrorHandler = () => {
  console.log('hhybefub');
  // Sentry.Native.captureException(error);
  Sentry.Native.captureException(new Error('Oops!'));
  Sentry.Native.captureMessage(
    'Initialising new relic in ' + process.env.NODE_ENV + ' mode'
  );
  Sentry.init({
    dsn: 'https://811ba4d23c414b8f9a1abb445afd1ad1@o4504837634457600.ingest.sentry.io/4504837635899392',
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });
};

export { initErrorHandler };
