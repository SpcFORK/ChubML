import cst from './cst';
const { chaosEval } = cst;

import eobj from './eobj';

var checkEnvironment = () => {
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

export default eobj(checkEnvironment, ['checkEnvironment']).default;