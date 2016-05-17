{
  files: [
    {
      path: '/Users/andy/workspace/postcss-debug/test/css/test.css',
      // maybe `error` object in here (message + stack trace) (snapshot will also be there in `snapshots`)
      snapshots: [
        {
          timestamp: 1462203864674,
          prevPlugin: null,
          nextPlugin: 'postcss-calc',
          content: `
          .test {
              color: black;
              &:hover {
                  margin-top: calc(10px + 20px)
              }
          }`
        },
        {
          timestamp: 1462203864674,
          prevPlugin: 'postcss-calc',
          nextPlugin: 'postcss-nested',
          content: `
          .test {
              color: black;
              &:hover {
                  margin-top: 30px
              }
          }`
        },
        {
          timestamp: 1462203864674,
          prevPlugin: 'postcss-nested',
          nextPlugin: null,
          content: `
          .test {
              color: black
          }
          .test:hover {
              margin-top: 30px
          }`
        }
      ]
    }
  ]
}
