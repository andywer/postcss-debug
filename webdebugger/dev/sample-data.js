var sampleFile = {
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
      }`,
      highlightedContentHTML: `
      <pre class="midas"><code>
      <span class="midas__selector"><span class="midas__class">.test</span></span> <span class="midas__brace">{</span>
          <span class="midas__property">color</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__word">black</span></span><span class="midas__semicolon">;</span>
          <span class="midas__selector">&<span class="midas__pseudo">:hover</span></span> <span class="midas__brace">{</span>
              <span class="midas__property">margin-top</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__function"><span class="midas__function-name">calc</span><span class="midas__parenthesis">(</span><span class="midas__number">10px</span> <span class="midas__word">+</span> <span class="midas__number">20px</span><span class="midas__parenthesis">)</span></span></span>
          <span class="midas__brace">}</span>
      <span class="midas__brace">}</span>
      </code></pre>`
    },
    {
      timestamp: 1462203864676,
      prevPlugin: 'postcss-calc',
      nextPlugin: 'postcss-nested',
      content: `
      .test {
          color: black;
          &:hover {
              margin-top: 30px
          }
      }`,
      highlightedContentHTML: `
      <pre class="midas"><code>
      <span class="midas__selector"><span class="midas__class">.test</span></span> <span class="midas__brace">{</span>
          <span class="midas__property">color</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__word">black</span></span><span class="midas__semicolon">;</span>
          <span class="midas__selector">&<span class="midas__pseudo">:hover</span></span> <span class="midas__brace">{</span>
              <span class="midas__property">margin-top</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__number">30px</span></span>
          <span class="midas__brace">}</span>
      <span class="midas__brace">}</span>
      </code></pre>
      `
    },
    {
      timestamp: 1462203864676,
      prevPlugin: 'postcss-calc',
      nextPlugin: 'postcss-nested',
      content: `
      .test {
          color: black;
          &:hover {
              margin-top: 30px
          }
      }`,
      highlightedContentHTML: `
      <pre class="midas"><code>
      <span class="midas__selector"><span class="midas__class">.test</span></span> <span class="midas__brace">{</span>
          <span class="midas__property">color</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__word">black</span></span><span class="midas__semicolon">;</span>
          <span class="midas__selector">&<span class="midas__pseudo">:hover</span></span> <span class="midas__brace">{</span>
              <span class="midas__property">margin-top</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__number">30px</span></span>
          <span class="midas__brace">}</span>
      <span class="midas__brace">}</span>
      </code></pre>
      `
    },
    {
      timestamp: 1462203864676,
      prevPlugin: 'postcss-calc',
      nextPlugin: 'postcss-nested',
      content: `
      .test {
          color: black;
          &:hover {
              margin-top: 30px
          }
      }`,
      highlightedContentHTML: `
      <pre class="midas"><code>
      <span class="midas__selector"><span class="midas__class">.test</span></span> <span class="midas__brace">{</span>
          <span class="midas__property">color</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__word">black</span></span><span class="midas__semicolon">;</span>
          <span class="midas__selector">&<span class="midas__pseudo">:hover</span></span> <span class="midas__brace">{</span>
              <span class="midas__property">margin-top</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__number">30px</span></span>
          <span class="midas__brace">}</span>
      <span class="midas__brace">}</span>
      </code></pre>
      `
    },
    {
      timestamp: 1462203864676,
      prevPlugin: 'postcss-calc',
      nextPlugin: 'postcss-nested',
      content: `
      .test {
          color: black;
          &:hover {
              margin-top: 30px
          }
      }`,
      highlightedContentHTML: `
      <pre class="midas"><code>
      <span class="midas__selector"><span class="midas__class">.test</span></span> <span class="midas__brace">{</span>
          <span class="midas__property">color</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__word">black</span></span><span class="midas__semicolon">;</span>
          <span class="midas__selector">&<span class="midas__pseudo">:hover</span></span> <span class="midas__brace">{</span>
              <span class="midas__property">margin-top</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__number">30px</span></span>
          <span class="midas__brace">}</span>
      <span class="midas__brace">}</span>
      </code></pre>
      `
    },
    {
      timestamp: 1462203864676,
      prevPlugin: 'postcss-calc',
      nextPlugin: 'postcss-nested',
      content: `
      .test {
          color: black;
          &:hover {
              margin-top: 30px
          }
      }`,
      highlightedContentHTML: `
      <pre class="midas"><code>
      <span class="midas__selector"><span class="midas__class">.test</span></span> <span class="midas__brace">{</span>
          <span class="midas__property">color</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__word">black</span></span><span class="midas__semicolon">;</span>
          <span class="midas__selector">&<span class="midas__pseudo">:hover</span></span> <span class="midas__brace">{</span>
              <span class="midas__property">margin-top</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__number">30px</span></span>
          <span class="midas__brace">}</span>
      <span class="midas__brace">}</span>
      </code></pre>
      `
    },
    {
      timestamp: 1462203864677,
      prevPlugin: 'postcss-nested',
      nextPlugin: null,
      content: `
      .test {
          color: black
      }
      .test:hover {
          margin-top: 30px
      }`,
      highlightedContentHTML: `
      <pre class="midas"><code>
      <span class="midas__selector"><span class="midas__class">.test</span></span> <span class="midas__brace">{</span>
          <span class="midas__property">color</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__word">black</span></span>
      <span class="midas__brace">}</span>
      <span class="midas__selector"><span class="midas__class">.test</span><span class="midas__pseudo">:hover</span></span> <span class="midas__brace">{</span>
          <span class="midas__property">margin-top</span><span class="midas__colon">: </span><span class="midas__value"><span class="midas__number">30px</span></span>
      <span class="midas__brace">}</span>
      </code></pre>
      `
    }
  ]
}

module.exports = function createSampleData (filesCount) {
  var files = []

  for (var i = 0; i < filesCount; i++) {
    files.push(sampleFile)
  }

  return {
    files: files
  }
}
