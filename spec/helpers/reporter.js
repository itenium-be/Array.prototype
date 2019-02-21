const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displayPending: true
  }
}));

// const JasmineConsoleReporter = require('jasmine-console-reporter');
// const myReporter = new JasmineConsoleReporter({
//   colors: 1,           // (0|false)|(1|true)|2
//   cleanStack: 1,       // (0|false)|(1|true)|2|3
//   verbosity: 4,        // (0|false)|1|2|(3|true)|4
//   listStyle: 'indent', // "flat"|"indent"
//   timeUnit: 'ms',      // "ms"|"ns"|"s"
//   timeThreshold: { ok: 500, warn: 1000, ouch: 3000 }, // Object|Number
//   activity: false,     // boolean or string ("dots"|"star"|"flip"|"bouncingBar"|...)
//   emoji: true,
//   beep: true,
// });
// jasmine.getEnv().clearReporters();
// jasmine.getEnv().addReporter(myReporter);
