const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    };
  }

  return {
    /* config options for all phases except development here */
  };
};

module.exports = {
  images: {
    domains: [
      "localhost",
      "api.piotrmedynski.pl",
      "centrumdruku.online",
      "api.centrumdruku.online",
    ],
  },
};
