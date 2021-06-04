const printMessage = require('print-message')

printMessage(
  [
    "welcome keeblord, don't just sit there, start typing",
    'type this to run everything: yarn keeb',
    'type this to run web: yarn web',
    'type this to run the graph: yarn graph',
  ],
  {
    border: true, // Enable border
    color: 'green', // Default text color from console
    borderColor: 'green', // Border color is yellow
    borderSymbol: '─', // Symbol that uses for border
    sideSymbol: '│', // Symbol that uses for side separators
    leftTopSymbol: 'K', // Symbol that uses for left top corner
    rightTopSymbol: 'H', // Symbol that uses for right top corner
    marginTop: 1, // Margin before border is begins
    marginBottom: 1, // Margin after border is ends
    paddingTop: 1, // Padding after border begins
    paddingBottom: 1, // Padding before border ends
  }
)
