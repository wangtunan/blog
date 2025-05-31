import{_ as s,c as a,b as p,o as e}from"./app-OZJ_mqn6.js";const t={};function l(o,n){return e(),a("div",null,n[0]||(n[0]=[p(`<h1 id="密集嵌入" tabindex="-1"><a class="header-anchor" href="#密集嵌入"><span>密集嵌入</span></a></h1><p><strong>密集嵌入(Dense Embedding)</strong>：每个词或对象用一个低维、稠密向量表示。</p><h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点"><span>特点</span></a></h2><ul><li>维度：通常是几维到几千维，维度较低。</li><li>可解释性：难以理解单个维度的含义，可解释性差。</li><li>语义信息：通过模型训练出来的连续表示，包含语义信息。</li><li>效率：适合用余弦相似度/点积做相似度计算，效率较高。</li><li>上下文：包含上下文，例如<code>BERT</code>输出。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><ul><li><strong>词嵌入模型</strong>：<code>Word2Vec</code>、<code>GloVe</code>。</li><li><strong>上下文模型</strong>：<code>BERT</code>、<code>GPT</code>(基于<code>Transformer</code>编码)。</li><li><strong>推荐系统</strong>：矩阵分解(<code>MF</code>)、深度神经网络(如<code>YouTube DNN</code>)。</li></ul><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h2><ul><li><strong>文本处理</strong>：语义搜索、机器翻译。</li><li><strong>推荐系统</strong>：用户/物品的隐向量匹配。</li><li><strong>计算机视觉</strong>：<code>CNN</code>特征(如<code>ResNet</code>输出)。</li><li><strong>分类任务</strong>：深度学习模型(如<code>BERT</code>微调)。</li></ul><h2 id="实现案例" tabindex="-1"><a class="header-anchor" href="#实现案例"><span>实现案例</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://github.com/FlagOpen/FlagEmbedding" target="_blank" rel="noopener noreferrer">FlagEmbedding 文档</a></p></div><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> FlagEmbedding <span class="token keyword">import</span> BGEM3FlagModel</span>
<span class="line"></span>
<span class="line">passage <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;猢狲施展烈焰拳，击退妖怪；随后开启金刚体，抵挡神兵攻击。&quot;</span><span class="token punctuation">]</span></span>
<span class="line">model <span class="token operator">=</span> BGEM3FlagModel<span class="token punctuation">(</span></span>
<span class="line">  model_name_or_path<span class="token operator">=</span><span class="token string">&quot;BAAI/bge-m3&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  use_fp16<span class="token operator">=</span><span class="token boolean">True</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">passage_embedding <span class="token operator">=</span> model<span class="token punctuation">.</span>encode<span class="token punctuation">(</span></span>
<span class="line">  sentences<span class="token operator">=</span>passage<span class="token punctuation">,</span></span>
<span class="line">  return_sparse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> <span class="token comment"># 返回稀疏嵌入</span></span>
<span class="line">  return_dense<span class="token operator">=</span><span class="token boolean">True</span> <span class="token comment"># 返回密集嵌入</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"> <span class="token comment"># 分别提取稀疏嵌入、密集嵌入和多向量嵌入</span></span>
<span class="line">dense_vecs <span class="token operator">=</span> passage_embedding<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;dense_vecs&#39;</span><span class="token punctuation">)</span></span>
<span class="line">sparse_vecs <span class="token operator">=</span> passage_embedding<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;lexical_weights&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 展示稀疏嵌入和密集嵌入的示例</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;密集嵌入维度:&quot;</span><span class="token punctuation">,</span> dense_vecs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>shape<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;密集嵌入前10维:&quot;</span><span class="token punctuation">,</span> dense_vecs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment"># 仅显示前10维</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;稀疏嵌入总长度:&quot;</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>sparse_vecs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;稀疏嵌入前10个非零值:&quot;</span><span class="token punctuation">,</span> <span class="token builtin">list</span><span class="token punctuation">(</span>sparse_vecs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment"># 仅显示前10个非零值</span></span>
<span class="line"></span></code></pre></div><p>输出结果：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">密集嵌入维度: (1024,)</span>
<span class="line">密集嵌入前10维: [</span>
<span class="line">  0.0115688, </span>
<span class="line">  0.02439203,</span>
<span class="line">  -0.02763909,</span>
<span class="line">  -0.00984308,</span>
<span class="line">  -0.04426071,</span>
<span class="line">  -0.02911919,</span>
<span class="line">  0.03953099,</span>
<span class="line">  0.02165177,</span>
<span class="line">  0.01074664,</span>
<span class="line">  -0.03528614</span>
<span class="line">]</span>
<span class="line"></span>
<span class="line">稀疏嵌入总长度: 23</span>
<span class="line">稀疏嵌入前10个非零值: [</span>
<span class="line">  (&#39;6&#39;, np.float32(0.07353998)),</span>
<span class="line">  (&#39;28323&#39;, np.float32(0.07607669)),</span>
<span class="line">  (&#39;8869&#39;, np.float32(0.15832466)),</span>
<span class="line">  (&#39;48124&#39;, np.float32(0.16404563)),</span>
<span class="line">  (&#39;213212&#39;, np.float32(0.20880711)),</span>
<span class="line">  (&#39;75133&#39;, np.float32(0.25368175)),</span>
<span class="line">  (&#39;4&#39;, np.float32(0.05709494)),</span>
<span class="line">  (&#39;31833&#39;, np.float32(0.111040354)),</span>
<span class="line">  (&#39;12461&#39;, np.float32(0.18773092)),</span>
<span class="line">  (&#39;101184&#39;, np.float32(0.18636838))</span>
<span class="line">]</span>
<span class="line"></span></code></pre></div>`,13)]))}const i=s(t,[["render",l]]),u=JSON.parse('{"path":"/rag/embedding/dense/","title":"密集嵌入","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1748667955000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"4cae81a7be7882437e8f42d6762dbb92aa7d76e8","time":1748667955000,"email":"why583440138@gmail.com","author":"wangtunan","message":"blog RAG结构化文档向量存储文章撰写"}]},"filePathRelative":"rag/embedding/dense/README.md"}');export{i as comp,u as data};
