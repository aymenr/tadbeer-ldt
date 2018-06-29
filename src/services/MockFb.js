const MockFb = {
  initializeAsync: () => new Promise((resolve) => resolve()),
  setLoadingProgress: (num) => {},
  startGameAsync: () => new Promise((resolve) => resolve())
}

module.exports = MockFb;
