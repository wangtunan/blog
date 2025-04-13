import{_ as n,o as a,c as t,d as e}from"./app-c9515a38.js";const p={};function o(c,s){return a(),t("div",null,s[0]||(s[0]=[e(`<h1 id="支持jest自动化测试" tabindex="-1"><a class="header-anchor" href="#支持jest自动化测试" aria-hidden="true">#</a> 支持Jest自动化测试</h1><p>如果需要支持<code>Jest</code>自动化测试，需要我们安装额外的<code>npm</code>包：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装jest</span>
$ <span class="token function">npm</span> <span class="token function">install</span> jest <span class="token parameter variable">-D</span>
</code></pre></div><p>因为要测试的文件是包含<code>ts</code>代码，因此我们需要再安装其它的包：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> babel-jest ts-jest <span class="token parameter variable">-D</span>
</code></pre></div><p>安装完毕后，在根目录下新建<code>jest.config.js</code>文件，并填写配置：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">preset</span><span class="token operator">:</span> <span class="token string">&#39;ts-jest&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">testMatch</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;**/tests/**/*.(spec|test).(js|jsx|ts|tsx)&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">collectCoverage</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">coverageDirectory</span><span class="token operator">:</span> <span class="token string">&#39;&lt;rootDir&gt;/tests/coverage&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">collectCoverageFrom</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;src/**/*.(js|jsx|ts|tsx)&#39;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>配置说明：</p><ul><li><code>preset</code>：要测试的代码，包含<code>ts</code>的内容，使用<code>ts-jest</code>来处理。</li><li><code>testMatch</code>：测试哪些文件，以上配置表明我们要测试<code>tests</code>目录下所有<code>.(spce|test).(js|jsx|ts|tsx)</code>。</li><li><code>collectCoverage</code>：生成测试报告。</li><li><code>coverageDirectory</code>: 测试报告存放位置。</li><li><code>collectCoverageFrom</code>：测试报告收集范围。</li></ul><p>配置文件撰写完毕后，我们在根目录下新建一个<code>tests</code>目录，并添加一个测试文件<code>index.test.js</code>。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 如果需要使用import，需要自己额外的配置</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> add <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../src/index&#39;</span><span class="token punctuation">)</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;index.ts&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;test add func&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>最后，需要在<code>package.json</code>文件中添加一条测试命令：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c rollup.dev.config.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -c rollup.prod.config.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jest&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>运行<code>npm run jest</code>命令，它会在控制台输出一些测试覆盖率的信息。</p><div class="language-text" data-ext="text"><pre class="language-text"><code>PASS tests/index.test.js
  index.ts
    √ test add func (2 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   83.33 |      100 |      50 |      75 | 
 index.ts |   83.33 |      100 |      50 |      75 | 6
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.345 s
Ran all test suites.
</code></pre></div>`,15)]))}const r=n(p,[["render",o],["__file","index.html.vue"]]);export{r as default};
