import { chaosEval } from './cst';

export var checkEnvironment = () => {
  let isImportSupported = false;
  try {
    chaosEval('import.meta');
    isImportSupported = true;
  }
  catch { }

  if (isImportSupported) {
    // ES Module environment
    return 'ES Module';
  }

  else if (typeof module
    !== 'undefined'
    && module?.exports
    && typeof window
    === 'undefined') {
    // Node.js environment
    return 'Node';
  }

  else if (typeof window
    !== 'undefined'
    && typeof window?.document
    !== 'undefined') {
    // Browser environment
    return 'Browser';
  }

  else {
    // Unknown environment
    return 'Unknown';
  }
};
