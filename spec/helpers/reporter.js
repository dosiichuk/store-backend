import { SpecReporter } from 'jasmine-spec-reporter';

jasmine.getEnv().clearReporters(); // Remove default reporter
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayPending: true, // Show pending tests
      displayDuration: true, // Show test duration
    },
  })
);
