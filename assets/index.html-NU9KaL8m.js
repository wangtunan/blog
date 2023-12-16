import{_ as a,o as n,c as e,d as s}from"./app-Yrao4a_x.js";const t="/blog/assets/1-WT2xMzzG.png",o="/blog/assets/2-wmCyqBQz.png",c="/blog/assets/3-g-BtDMC7.png",d="/blog/assets/4-LlzWfK40.png",i="/blog/assets/5-AK3wo6rH.png",p={},r=s('<h1 id="精通git" tabindex="-1"><a class="header-anchor" href="#精通git" aria-hidden="true">#</a> 精通Git</h1><h2 id="起步" tabindex="-1"><a class="header-anchor" href="#起步" aria-hidden="true">#</a> 起步</h2><h3 id="版本控制" tabindex="-1"><a class="header-anchor" href="#版本控制" aria-hidden="true">#</a> 版本控制</h3><p>版本控制<code>VCS</code>是一套系统，该系统按时间顺序记录某一个或一系列文件的变更，让我们可以查看其以前的特定版本，其有三种类别：<strong>本地版本控制系统</strong>、<strong>集中式版本控制系统</strong>、<strong>分布式版本控制系统</strong>。</p><h4 id="本地版本控制系统" tabindex="-1"><a class="header-anchor" href="#本地版本控制系统" aria-hidden="true">#</a> 本地版本控制系统</h4><p>很多人控制版本的方式是将文件复制到另一个文件目录，甚至还会给目录加上一个时间戳，这种做法很常见，而且很容易实现。但这种方式也同样出错，随后衍生出来的<code>RCS</code>工具，它是一种常见的<code>VCS</code>工具，它会在磁盘上以一种特殊的格式保存补丁集。</p><p><img src="'+t+'" alt="本地版本控制系统"></p><h4 id="集中式版本控制系统" tabindex="-1"><a class="header-anchor" href="#集中式版本控制系统" aria-hidden="true">#</a> 集中式版本控制系统</h4><p>由于本地版本控制系统无法解决多人协作问题，集中式版本控制系统<code>CVCS</code>也就应运而生了。它与本地版本控制系统相比，有多方面的优势：</p><ul><li>所有人在一定程度上知道其他人在项目里做了什么。</li><li>管理员可以精细的控制每一个人的权限。</li><li>维护一个集中式版本控制系统要比在每台客户机上都维护一个数据库简单得多。</li></ul><p>但集中式版本控制系统也不是没有缺点的，它最大的缺点是故障问题：如果集中式服务器存在故障宕机，那么这期间任何人都不能协作或者提交更改；如果中央数据库所在的硬盘受损，备份也没有保住的情况下，代码将会面临全面丢失的风险。</p><p><img src="'+o+'" alt="集中式版本控制系统"></p><h4 id="分布式版本控制系统" tabindex="-1"><a class="header-anchor" href="#分布式版本控制系统" aria-hidden="true">#</a> 分布式版本控制系统</h4><p>为了针对解决以上集中式版本控制系统所存在的潜在问题，进而出现了分布式版本控制系统<code>DVCS</code>。对于一个分布式版本控制系统来说，客户端冰粉仅仅是检出文件的最新快照，而是对代码仓库进行完整的镜像。这样一来，无论哪一个服务器出现故障，任何一个客户端都可以使用自己本地的镜像来恢复服务器。</p><p><img src="'+c+'" alt="分布式版本控制系统"></p><p>除了以上提到的有点，分布式版本控制系统可以很好的处理多个远程仓库。</p><h3 id="简史" tabindex="-1"><a class="header-anchor" href="#简史" aria-hidden="true">#</a> 简史</h3><p>同许多伟大的事物一样，<code>Git</code>的诞生伴随着许多颠覆式的创新以及激烈的争论。</p><ul><li>2002年，<code>Linux</code>内核项目开始采用一款叫做<code>BitKeeper</code>的专用分布式版本控制系统。</li><li>2005年，<code>Linux</code>开发者社区与<code>BitKeeper</code>研发公司关系破裂，该公司回收了软件的免费使用权，这个事情促使了<code>Linux</code>开发社区决定开发自己的版本控制系统。</li><li>2005年，<code>Git</code>版本控制系统诞生。</li></ul><p><code>Git</code>开发之初，它的设计目标如下：</p><ul><li>速度快</li><li>设计简洁</li><li>对于非线性开发强有力的支持</li><li>完全的分布式设计</li><li>能够有效的处理大象项目</li></ul><h3 id="git基础" tabindex="-1"><a class="header-anchor" href="#git基础" aria-hidden="true">#</a> Git基础</h3><h4 id="快照-而非差异" tabindex="-1"><a class="header-anchor" href="#快照-而非差异" aria-hidden="true">#</a> 快照，而非差异</h4><p><code>Git</code>与其他版本控制系统相比，最大的不同在于其对待数据的方式。</p><ul><li>其他版本控制系统：将其存储的信息视为一组文件以及对这些文件随时间所作出的变更。</li></ul><p><img src="'+d+'" alt="其他版本控制系统"></p><ul><li><code>Git</code>版本控制系统：每次提交或在<code>Git</code>中保存项目的状态时，<code>Git</code>会抓取一张所有文件当前状态的快照，然后存储一个指向该快照的引用。 <img src="'+i+`" alt="Git控制系统"></li></ul><h4 id="git的完整性" tabindex="-1"><a class="header-anchor" href="#git的完整性" aria-hidden="true">#</a> Git的完整性</h4><p><code>Git</code>的所有数据在存储前都会执行校验和计算，随后以校验和来引用对应的数据，其采用的校验和机制叫做<code>SHA-1</code>散列，它是一个由<code>40</code>个十六进制字符所组成的字符串，它是根据文件内容或<code>Git</code>的目录结构计算所得到的。一个<code>SHA-1</code>散列的案例如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>24b9da6552252987aa493b52f8696cd6d3b00373
</code></pre></div><h4 id="三种状态" tabindex="-1"><a class="header-anchor" href="#三种状态" aria-hidden="true">#</a> 三种状态</h4><p>在<code>Git</code>中，文件可以处于以下三种状态之一：</p><ul><li>已修改<code>modified</code>：已修改表示已经改动了文件，但尚未提交到数据库。</li><li>已暂存<code>staged</code>：已暂存表示对已修改文件的当前版本做出了标识并将其加入到下一次提交的快照中。</li><li>已提交<code>committed</code>：已提交表示数据已经被安全地存入本地数据库中。</li></ul><p>根据以上文件的三种状态，由此便引入了<code>Git</code>的三个主要区域的概念：</p><ul><li>工作目录：是项目某个版本的单次检出</li><li>暂存区：是一个文件，一般位于<code>Git</code>目录中，它保存了下一次所要提交内容的相关信息。</li><li><code>Git目录</code>：是保存项目元数据和对象数据库的地方，它是<code>Git</code>最核心最重要的部分。</li></ul><p>根据以上的概念，我们不难推测出<code>Git</code>的基本工作流：</p><ul><li>修改工作目录中的文件。</li><li>暂存文件，将这些文件的快照加入暂存区。</li><li>提交暂存区中的文件，将快照永久的保存在<code>Git</code>目录中。</li></ul><h2 id="git基础-1" tabindex="-1"><a class="header-anchor" href="#git基础-1" aria-hidden="true">#</a> Git基础</h2><p>在安装完毕<code>Git</code>后，我们首先需要做的就是配置<code>Git</code>信息配置：</p><div class="custom-container tip"><p class="custom-container-title">参数说明</p><p><code>--global</code>参数代表在当前计算机中全局配置，如果不带此参数，则代表仅在当前的<code>Git</code>目录下配置用户名和邮箱地址。</p></div><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&#39;your name&#39;</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&#39;you email&#39;</span>
</code></pre></div><p>注意：配置用户名和电子邮件地址非常重要，因为<code>Git</code>的每一次提交都会用到这些信息，而且还会被写入到所创建的提交中，不可更改。</p><p>在配置完用户名和邮箱地址后，我们可以使用如下命令查看我们的相关配置信息：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列举所有配置</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--list</span>
<span class="token assign-left variable">user.email</span><span class="token operator">=</span>your email
<span class="token assign-left variable">user.name</span><span class="token operator">=</span>your name

<span class="token comment"># 查看单个配置后</span>
$ <span class="token function">git</span> config user.name
your name
</code></pre></div><h3 id="获取git仓库" tabindex="-1"><a class="header-anchor" href="#获取git仓库" aria-hidden="true">#</a> 获取Git仓库</h3><p>建立<code>Git</code>项目的方法主要有两种：第一种是把现有项目或者目录导入到<code>Git</code>中，另外一种是从服务器上克隆现有的<code>Git</code>仓库。</p><p>在现有目录下，使用如下命令可以把项目进行<code>Git</code>管理：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> init
</code></pre></div><p>这个命令会在当前目录下，新建一个<code>.git</code>文件夹，这个文件夹包含了构成<code>Git</code>仓库骨架的所有必须文件。</p><p>克隆仓库需要使用<code>git clone [url]</code>命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 克隆现有仓库</span>
$ <span class="token function">git</span> clone https://github.com/wangtunan/blog
</code></pre></div><p>执行这段命令后，会创建一个叫做<code>blog</code>的目录，并在其中初始化<code>.git</code>目录，然后将远程仓库中所有的数据拉取到本地并检出最新版本的可用副本。</p><p>如果我们在克隆的时候，需要更改创建目录的名字，可以如下方式：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 克隆现有仓库，新创建的目录名字叫做newblog</span>
$ <span class="token function">git</span> clone https://github.com/wangtunan/blog newblog
</code></pre></div><h3 id="记录更改到仓库" tabindex="-1"><a class="header-anchor" href="#记录更改到仓库" aria-hidden="true">#</a> 记录更改到仓库</h3><p>在<code>Git</code>工作目录中，每一个文件都处于两种状态之一：</p><ul><li>已跟踪：是指上一次快照中包含的文件，这些文件又可以分为未修改、已修改或已暂存三种状态。</li><li>未跟踪：工作目录中排出已跟踪文件之外的所有文件。</li></ul><h4 id="查看当前文件的状态" tabindex="-1"><a class="header-anchor" href="#查看当前文件的状态" aria-hidden="true">#</a> 查看当前文件的状态</h4><p>如果我们在<code>git init</code>或者克隆仓库后立即使用<code>git status</code>命令来检查文件的状态，将会输出以下信息：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> status
On branch master
No commits yet
nothing to commit <span class="token punctuation">(</span>create/copy files and use <span class="token string">&quot;git add&quot;</span> to track<span class="token punctuation">)</span>
</code></pre></div><p>以上说明代表我们的工作目录是干净的，这个时候如果我们新建了一个<code>README.md</code>文件，再次使用<code>git status</code>后，它的输出信息就会变成如下所示：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> status
On branch master
No commits yet
Untracked files:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to include <span class="token keyword">in</span> what will be committed<span class="token punctuation">)</span>

        README.md

nothing added to commit but untracked files present <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> to track<span class="token punctuation">)</span>
</code></pre></div><p>在以上代码的提示中我们可以看到，新创建的<code>README.md</code>文件处于未跟踪状态。<br> 在<code>Git</code>中判断一个文件是否已跟踪是根据上一次的快照为基础进行对比的。需要注意的是<code>Git</code>并不会主动的帮我们把这些文件包含到下一次提交的文件范围中，这样做是为了避免不小心把编译生成的二进制文件或者其他我们不想跟踪的文件包含进来。</p><p><strong>注意</strong>：如果你觉得<code>git status</code>命令的输出消息过于全面，<code>Git</code>提供了一种显示简短状态命令行的选项，添加<code>--short</code>参数：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 显示简短信息</span>
$ <span class="token function">git</span> status <span class="token parameter variable">-s</span>
<span class="token comment"># 或者</span>
$ <span class="token function">git</span> status <span class="token parameter variable">--short</span>
A  README.md
</code></pre></div><p>简写说明：</p><ul><li><code>??</code>：表示未被跟踪的新文件。</li><li><code>A</code>：表示已暂存的新文件。</li><li><code>M</code>：表示已修改的文件。</li><li><code>MM</code>：表示被修改过两次的文件。</li></ul><h4 id="跟踪新文件" tabindex="-1"><a class="header-anchor" href="#跟踪新文件" aria-hidden="true">#</a> 跟踪新文件</h4><p>在以上案例中，我们新创建的<code>README.md</code>处于未跟踪状态，我们可以使用<code>git add</code>命令来让<code>Git</code>跟踪此文件：</p><div class="custom-container tip"><p class="custom-container-title">参数说明</p><p><code>git add</code>命令接受一个文件、多个文件或目录的路径名作为参数，如果提供的参数是目录，该命令会递归地添加该目录下的所有文件。</p></div><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 跟踪README.md文件</span>
$ <span class="token function">git</span> <span class="token function">add</span> README.md
<span class="token comment"># 跟踪完毕后，查看文件状态</span>
$ <span class="token function">git</span> status
On branch master
No commits yet
Changes to be committed:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git rm --cached &lt;file&gt;...&quot;</span> to unstage<span class="token punctuation">)</span>

        new file:   README.md
</code></pre></div><h4 id="忽略文件" tabindex="-1"><a class="header-anchor" href="#忽略文件" aria-hidden="true">#</a> 忽略文件</h4><p>有时候我们并不想某一类文件被<code>Git</code>自动添加，这个时候我们可以在根目录下新建<code>.gitignore</code>文件，然后把不想要被<code>Git</code>跟踪的文件名或者其他匹配模式填写进去即可：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>package-lock.json <span class="token comment"># 不跟踪单个文件</span>
node_modules/     <span class="token comment"># 不跟踪node_modules目录下的所有文件</span>
dist/             <span class="token comment"># 不跟踪dist目录下的所有文件</span>
*.txt             <span class="token comment"># 不跟踪所有.txt文件</span>
</code></pre></div><h4 id="查看已暂存和未暂存的变更" tabindex="-1"><a class="header-anchor" href="#查看已暂存和未暂存的变更" aria-hidden="true">#</a> 查看已暂存和未暂存的变更</h4><p>如果<code>git status</code>命名显示的信息对你来说信息太过于泛泛，你想要知道具体修改了哪些内容，而不仅仅是更改了哪些文件，这时可以使用<code>git diff</code>命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看未添加到暂存区的变更</span>
$ <span class="token function">git</span> <span class="token function">diff</span>
<span class="token function">diff</span> <span class="token parameter variable">--git</span> a/README.md b/README.md
index 5628bfe<span class="token punctuation">..</span>c557f44 <span class="token number">100644</span>
--- a/README.md
+++ b/README.md
@@ <span class="token parameter variable">-1</span> +1,3 @@
-<span class="token comment"># 精通Git</span>
<span class="token punctuation">\\</span> No newline at end of <span class="token function">file</span>
+<span class="token comment"># 精通Git</span>
+
+嘤嘤嘤
<span class="token punctuation">\\</span> No newline at end of <span class="token function">file</span>
</code></pre></div><p>以上命令仅仅只是查看未添加到暂存区的变更，可以添加<code>--staged</code>参数，查看哪些已暂存的内容会进入下一次提交：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看哪些已暂存的内容下一次会被提交</span>
$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--staged</span>
<span class="token comment"># 或者</span>
$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--cached</span>
<span class="token function">diff</span> <span class="token parameter variable">--git</span> a/README.md b/README.md
new <span class="token function">file</span> mode <span class="token number">100644</span>
index 0000000<span class="token punctuation">..</span>5628bfe
--- /dev/null
+++ b/README.md
@@ -0,0 +1 @@
+<span class="token comment"># 精通Git</span>
<span class="token punctuation">\\</span> No newline at end of <span class="token function">file</span>
</code></pre></div><h4 id="提交变更" tabindex="-1"><a class="header-anchor" href="#提交变更" aria-hidden="true">#</a> 提交变更</h4><p>假如我们的暂存区已经准备完毕，那么可以使用<code>git commit</code>命令来提交：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 提交变更，并在命令行中键入提交信息</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token function">add</span> README.md
<span class="token punctuation">[</span>master <span class="token punctuation">(</span>root-commit<span class="token punctuation">)</span> 7aca891<span class="token punctuation">]</span> <span class="token function">add</span>
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">3</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> README.md
</code></pre></div><p>在<code>Git</code>，暂存区非常有用，但就工作流而言，它有时候显得过于繁琐。如果我们想跳过暂存区直接提交，<code>Git</code>为我们提供了更快捷的方式：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加-a参数，跳过暂存区，直接提交</span>
$ <span class="token function">git</span> commit  <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update README.md&quot;</span>
<span class="token punctuation">[</span>master <span class="token number">6444834</span><span class="token punctuation">]</span> update README.md
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">3</span> deletions<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
</code></pre></div><h4 id="重命名文件" tabindex="-1"><a class="header-anchor" href="#重命名文件" aria-hidden="true">#</a> 重命名文件</h4><p>如果我们重命名了文件，那么<code>Git</code>会检测到这种变动，同时我们可以使用<code>git mv</code>命令来重命名：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重命名</span>
$ <span class="token function">git</span> <span class="token function">mv</span> README.md readme.md
<span class="token comment"># 查看重命名后的变更</span>
$ <span class="token function">git</span> status
On branch master
Changes to be committed:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git reset HEAD &lt;file&gt;...&quot;</span> to unstage<span class="token punctuation">)</span>

        renamed:    README.md -<span class="token operator">&gt;</span> readme.md
</code></pre></div><p>值得一提的是，虽然我们只键入了一条命令，但它相当于下面三条命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">mv</span> README.md readme.md
$ <span class="token function">git</span> <span class="token function">rm</span> README.md
$ <span class="token function">git</span> <span class="token function">add</span> readme.md
</code></pre></div><h3 id="查看提交历史" tabindex="-1"><a class="header-anchor" href="#查看提交历史" aria-hidden="true">#</a> 查看提交历史</h3><p>在我们完成了几次提交以后，我们可以使用<code>git log</code>命令来查看提交历史：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看提交历史</span>
$ <span class="token function">git</span> log
commit 6444834e8debf9e407c26ee29ae5fb42b9b99511 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span>
Author: xxx <span class="token operator">&lt;</span>xxx@gmail.com<span class="token operator">&gt;</span>
Date:   Mon Mar <span class="token number">30</span> <span class="token number">15</span>:19:28 <span class="token number">2020</span> +0800

    update README.md

commit 7aca89161b709f1f16f637703020815c0afb14ea
Author: xxx <span class="token operator">&lt;</span>xxx@gmail.com<span class="token operator">&gt;</span>
Date:   Mon Mar <span class="token number">30</span> <span class="token number">15</span>:13:38 <span class="token number">2020</span> +0800

    <span class="token function">add</span>
</code></pre></div><p>你可以从以上看到，<code>git log</code>默认不加参数的情况下，会按时间顺序列出仓库中所有提交，其中最新的提交显示在最前面。</p><p>如果你觉得上述信息太过于繁琐，可以使用<code>--pretty=oneline</code>参数让以上信息显示在一行：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 一行显示提交历史信息</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline
6444834e8debf9e407c26ee29ae5fb42b9b99511 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> update README.md
7aca89161b709f1f16f637703020815c0afb14ea <span class="token function">add</span>
</code></pre></div><p><code>--stat</code>参数可以查看每次提交的简要统计信息：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看简要统计信息</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--stat</span>
commit 6444834e8debf9e407c26ee29ae5fb42b9b99511 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span>
Author: xxx <span class="token operator">&lt;</span>xxx@gmail.com<span class="token operator">&gt;</span>
Date:   Mon Mar <span class="token number">30</span> <span class="token number">15</span>:19:28 <span class="token number">2020</span> +0800

    update README.md

 README.md <span class="token operator">|</span> <span class="token number">4</span> +---
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">3</span> deletions<span class="token punctuation">(</span>-<span class="token punctuation">)</span>

commit 7aca89161b709f1f16f637703020815c0afb14ea
Author: xxx <span class="token operator">&lt;</span>xxx@gmail.com<span class="token operator">&gt;</span>
Date:   Mon Mar <span class="token number">30</span> <span class="token number">15</span>:13:38 <span class="token number">2020</span> +0800

    <span class="token function">add</span>

 README.md <span class="token operator">|</span> <span class="token number">3</span> +++
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">3</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
</code></pre></div><p>最后一个比较有意思的地方是<code>--graph</code>参数，它会使用<code>ASCII</code>字符形式的简单图来显示<code>Git</code>分支以及合并历史：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 图形显示提交历史</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--graph</span>
* commit 6444834e8debf9e407c26ee29ae5fb42b9b99511 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span>
<span class="token operator">|</span> Author: xxx <span class="token operator">&lt;</span>xxx@gmail.com<span class="token operator">&gt;</span>
<span class="token operator">|</span> Date:   Mon Mar <span class="token number">30</span> <span class="token number">15</span>:19:28 <span class="token number">2020</span> +0800
<span class="token operator">|</span>
<span class="token operator">|</span>     update README.md
<span class="token operator">|</span>
* commit 7aca89161b709f1f16f637703020815c0afb14ea
  Author: xxx <span class="token operator">&lt;</span>xxx@gmail.com<span class="token operator">&gt;</span>
  Date:   Mon Mar <span class="token number">30</span> <span class="token number">15</span>:13:38 <span class="token number">2020</span> +0800

      <span class="token function">add</span>
</code></pre></div><p><code>git log</code>还有一些其他参数，下列表格列举了常用的选项：</p><table><thead><tr><th>选项</th><th>描述</th></tr></thead><tbody><tr><td><code>-p</code></td><td>按补丁格式显示每个提交引入的更改</td></tr><tr><td><code>--stat</code></td><td>显示每个提交中被更改的文件的统计信息</td></tr><tr><td><code>--shortstat</code></td><td>只显示上述<code>--stat</code>输出中包含“已更改/新增/删除”行的统计信息</td></tr><tr><td><code>--name-only</code></td><td>只显示每个提交信息后显示被更改的文件列表</td></tr><tr><td><code>--name-status</code></td><td>在上一个选项输出基础上还显示出“已更改/新增/删除”的统计信息</td></tr><tr><td><code>--abbrev-commit</code></td><td>只显示完整的<code>SHA-1</code>40位校验和字符串中的前几位</td></tr><tr><td><code>--relative-data</code></td><td>显示相对日期</td></tr><tr><td><code>--graph</code></td><td>在提交历史旁边显示<code>ASCII</code>图表，用于展示分支和合并的历史信息</td></tr><tr><td><code>--pretty</code></td><td>用一种可选格式显示提交，选项有<code>oneline</code>、<code>short</code>、<code>full</code>、<code>fuller</code>、<code>format</code></td></tr></tbody></table><h4 id="限制提交历史的显示范围" tabindex="-1"><a class="header-anchor" href="#限制提交历史的显示范围" aria-hidden="true">#</a> 限制提交历史的显示范围</h4><p>用于限制<code>git log</code>显示范围的常用选项如下表：</p><table><thead><tr><th>选项</th><th>描述</th></tr></thead><tbody><tr><td><code>-(n)</code></td><td>只显示最新的<code>n</code>次提交</td></tr><tr><td><code>--since</code>, <code>--after</code></td><td>只输出指定日期之后的提交</td></tr><tr><td><code>--until</code>, <code>--before</code></td><td>只输出指定日期之前的提交</td></tr><tr><td><code>--author</code></td><td>只输出与指定字符相匹配作者的提交</td></tr><tr><td><code>--commit</code></td><td>只输出与指定字符相匹配提交者的提交</td></tr><tr><td><code>--grep</code></td><td>只输出与指定字符相匹配提交信息的提交</td></tr><tr><td><code>--S</code></td><td>只输出包含“添加或删除指定字符串”的更改的提交</td></tr></tbody></table><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 只显示最近一次的提交</span>
$ <span class="token function">git</span> log <span class="token parameter variable">-1</span>
<span class="token comment"># 只显示作者为xxx的提交</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--author</span><span class="token operator">=</span>wangtunan
<span class="token comment"># 只显示2020年3月31日之前的提交</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--before</span><span class="token operator">=</span><span class="token string">&#39;2020-03-31&#39;</span>
</code></pre></div><h3 id="撤销操作" tabindex="-1"><a class="header-anchor" href="#撤销操作" aria-hidden="true">#</a> 撤销操作</h3><p>有一种撤销操作的场景场景是提交之后发现自己忘记添加某些文件或者写错了提交信息，此时如果想重新提交，可以使用如下命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重新添加提交信息</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token parameter variable">--amend</span>
</code></pre></div><p>注意：使用<code>--amend</code>重新提交，只会产生一个提交，这是因为重新提交的命令修改了第一个提交的结果。</p><h4 id="撤销已暂存的文件" tabindex="-1"><a class="header-anchor" href="#撤销已暂存的文件" aria-hidden="true">#</a> 撤销已暂存的文件</h4><p>假设我们不小心把不该提交的文件使用了<code>git add</code>命令暂存了，可以使用<code>git status</code>命令的提示信息来撤销已暂存的文件：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 错误提交了README.md文件</span>
$ <span class="token function">git</span> <span class="token function">add</span> README.md
<span class="token comment"># 查看文件状态</span>
$ <span class="token function">git</span> status
On branch master
Changes to be committed:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git reset HEAD &lt;file&gt;...&quot;</span> to unstage<span class="token punctuation">)</span>

        deleted:    README.md
</code></pre></div><p>在以上提示信息中，我们可以发现使用<code>git reset</code>命令可以取消已暂存的文件：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 取消已暂存的文件</span>
$ <span class="token function">git</span> reset HEAD README.md
</code></pre></div><h4 id="撤销对文件的修改" tabindex="-1"><a class="header-anchor" href="#撤销对文件的修改" aria-hidden="true">#</a> 撤销对文件的修改</h4><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p><code>git checkout -- [file]</code>是一条危险的命令，因为它会丢弃已经修改的内容，而且这种撤销是不可恢复的，在执行这条命令之前务必确保一定不在需要某个文件的修改。</p></div><p>在某些情况下，我们发现不再需要对某个文件的修改了，可以使用<code>git checkout</code>命令来帮着我们撤销已经修改的文件：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看文件的状态</span>
$ <span class="token function">git</span> status
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to update what will be committed<span class="token punctuation">)</span>
  <span class="token punctuation">(</span>use <span class="token string">&quot;git checkout -- &lt;file&gt;...&quot;</span> to discard changes <span class="token keyword">in</span> working directory<span class="token punctuation">)</span>

        modified:   README.md
</code></pre></div><p>我们可以发现，提示的<code>git checkout -- [file]</code>命令可以帮助我们撤销对于<code>README.md</code>文件的修改：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 撤销README.md文件的修改</span>
$ <span class="token function">git</span> checkout -- README.md
</code></pre></div><h3 id="远程仓库" tabindex="-1"><a class="header-anchor" href="#远程仓库" aria-hidden="true">#</a> 远程仓库</h3><h4 id="显示远程仓库" tabindex="-1"><a class="header-anchor" href="#显示远程仓库" aria-hidden="true">#</a> 显示远程仓库</h4><p>当我们使用<code>git clone</code>命令克隆远程仓库后，我们使用<code>git remote</code>显示远程仓库的信息：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 克隆远程仓库</span>
$ <span class="token function">git</span> clone xxxxxxx
<span class="token comment"># 显示远程仓库</span>
$ <span class="token function">git</span> remote
origin
</code></pre></div><p>使用<code>git clone</code>时，默认情况下，<code>Git</code>给克隆服务器取一个叫做<code>origin</code>的默认名称。</p><p>我们也可以在使用<code>git remote</code>时，添加<code>-v</code>参数，来显示每一个远程仓库以及它对应的地址：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 显示远程仓库信息</span>
$ <span class="token function">git</span> remote <span class="token parameter variable">-v</span>
origin  https://github.com/wangtunan/blog.git <span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
origin  https://github.com/wangtunan/blog.git <span class="token punctuation">(</span>push<span class="token punctuation">)</span>
</code></pre></div><h4 id="添加远程仓库" tabindex="-1"><a class="header-anchor" href="#添加远程仓库" aria-hidden="true">#</a> 添加远程仓库</h4><p>要添加远程仓库，并给其取一个名字，可以使用<code>git remote add [shortname] [url]</code>命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加远程仓库</span>
$ <span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/wangtunan/blog.git
</code></pre></div><h4 id="从远程仓库拉取数据" tabindex="-1"><a class="header-anchor" href="#从远程仓库拉取数据" aria-hidden="true">#</a> 从远程仓库拉取数据</h4><p>要想从远程仓库拉取数据，可以使用<code>git fetch [remote-name]</code>命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 从远程仓库拉取数据</span>
$ <span class="token function">git</span> fetch origin
</code></pre></div><p><strong>注意</strong>：<code>git fetch</code>命令只会把数据拉取到本地仓库，然而它并不会自动将这些数据合并到本地的工作成果中，也不会修改当前工作目录下的任何数据。如果要进行合并，可以使用<code>git pull [remote-name]</code>命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 拉取远程仓库代码并合并到本地</span>
$ <span class="token function">git</span> pull origin
</code></pre></div><h4 id="将数据推送到远程仓库" tabindex="-1"><a class="header-anchor" href="#将数据推送到远程仓库" aria-hidden="true">#</a> 将数据推送到远程仓库</h4><p>将数据推送到远程仓库，只需要使用<code>git push [remote-name] [branch-name]</code>命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将数据推送到远程仓库</span>
$ <span class="token function">git</span> push origin master
</code></pre></div><h4 id="检查远程仓库" tabindex="-1"><a class="header-anchor" href="#检查远程仓库" aria-hidden="true">#</a> 检查远程仓库</h4><p>想要查看远程仓库的更多信息，可以使用<code>git remote show [remote-name]</code>命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看远程仓库的更多信息</span>
$ <span class="token function">git</span> remote show origin
  Fetch URL: https://github.com/wangtunan/blog.git
  Push  URL: https://github.com/wangtunan/blog.git
  HEAD branch: master
  Remote branches:
    gh-pages tracked
    master   tracked
  Local branch configured <span class="token keyword">for</span> <span class="token string">&#39;git pull&#39;</span><span class="token builtin class-name">:</span>
    master merges with remote master
  Local ref configured <span class="token keyword">for</span> <span class="token string">&#39;git push&#39;</span><span class="token builtin class-name">:</span>
    master pushes to master <span class="token punctuation">(</span>fast-forwardable<span class="token punctuation">)</span>
</code></pre></div><h4 id="删除和重命名远程仓库" tabindex="-1"><a class="header-anchor" href="#删除和重命名远程仓库" aria-hidden="true">#</a> 删除和重命名远程仓库</h4><p>可以使用<code>git remote rename [oldName] [newName]</code>命令来重命名远程仓库：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重命名远程仓库</span>
$ <span class="token function">git</span> remote <span class="token function">rename</span> origin newOrigin
</code></pre></div><p>可以使用<code>git remote rm [remote-name]</code>命令来删除远程仓库：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 删除远程仓库</span>
$ <span class="token function">git</span> remote <span class="token function">rm</span> origin
</code></pre></div><h3 id="标记" tabindex="-1"><a class="header-anchor" href="#标记" aria-hidden="true">#</a> 标记</h3><p>就像大多数版本控制系统一样，<code>Git</code>可以把特定的历史版本标记为重要的版本，其典型应用场景是标出发布版本。</p><h4 id="列举标签" tabindex="-1"><a class="header-anchor" href="#列举标签" aria-hidden="true">#</a> 列举标签</h4><p>使用<code>git tag</code>命令来列举所有可用的标签：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列举所有可用的标签</span>
$ <span class="token function">git</span> tag
v0.1
v0.3
v0.5
v1.0
v1.2
v1.4
</code></pre></div><p>注意：<code>git tag</code>命令列举的标签会按照字母顺序列出，列举顺序的前后和标签的重要性无关。</p><p>如果标签过多，可以使用指定的字符串去匹配：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用指定的字符串去匹配标签</span>
$ <span class="token function">git</span> tag <span class="token parameter variable">-l</span> <span class="token string">&quot;v0.&quot;</span>
v0.1
v0.3
v0.5
</code></pre></div><h4 id="创建标签" tabindex="-1"><a class="header-anchor" href="#创建标签" aria-hidden="true">#</a> 创建标签</h4><p>在<code>Git</code>中，标签分为两种类型：</p><ul><li>轻量标签：轻量标签很像是一个不变的分支，它只是一个指向某次提交的指针。</li><li>注释标签：注释标签则会作为完整的对象存储在<code>Git</code>数据库中，一般推荐创建注释标签，因为它包含的信息比较多。</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建轻量标签</span>
$ <span class="token function">git</span> tag v2.0.0

<span class="token comment"># 创建注释标签，携带-a参数</span>
$ <span class="token function">git</span> tag <span class="token parameter variable">-a</span>  v2.1.0 <span class="token parameter variable">-m</span> <span class="token string">&#39;注释标签的提交信息&#39;</span>
</code></pre></div><p>添加完以上标签后，可以使用<code>git show [tag-name]</code>命令来显示标签对应的信息：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 显示注释标签的信息</span>
$ <span class="token function">git</span> show v2.1.0
</code></pre></div><h4 id="追加标签" tabindex="-1"><a class="header-anchor" href="#追加标签" aria-hidden="true">#</a> 追加标签</h4><p>我们已经知道可以使用<code>git log</code>查看提交历史，如果我们想要给以前某个的提交历史追加标签，可以像下面这样做：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看提交历史</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline
6444834e8debf9e407c26ee29ae5fb42b9b99511 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> update README.md
7aca89161b709f1f16f637703020815c0afb14ea <span class="token function">add</span>

<span class="token comment"># 为7aca89161b709f1f16f637703020815c0afb14ea这次提交追加标签</span>
$ <span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.0 7aca8916
</code></pre></div><h4 id="共享标签" tabindex="-1"><a class="header-anchor" href="#共享标签" aria-hidden="true">#</a> 共享标签</h4><p>默认情况下，<code>git push</code>命令不会把标签传输到远程服务器，在创建标签后，必须明确的将标签提交到共享服务器上：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 推送本地v1.0标签</span>
$ <span class="token function">git</span> push origin v1.0

<span class="token comment"># 推送本地全部标签</span>
$ <span class="token function">git</span> push origin <span class="token parameter variable">--tags</span>
</code></pre></div><h3 id="git别名" tabindex="-1"><a class="header-anchor" href="#git别名" aria-hidden="true">#</a> Git别名</h3><p>在掌握了以上基本的<code>Git</code>操作后，如果你觉得完整的键入某些<code>Git</code>命令太繁琐的话，可以为某些命令进行配置别名：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置别名</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.ck checkout
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.br branch

<span class="token comment"># 使用别名：切换到develop分支</span>
$ <span class="token function">git</span> ck develop
</code></pre></div><h2 id="git分支" tabindex="-1"><a class="header-anchor" href="#git分支" aria-hidden="true">#</a> Git分支</h2><h3 id="分支机制" tabindex="-1"><a class="header-anchor" href="#分支机制" aria-hidden="true">#</a> 分支机制</h3><h3 id="基本的分支与合并操作" tabindex="-1"><a class="header-anchor" href="#基本的分支与合并操作" aria-hidden="true">#</a> 基本的分支与合并操作</h3><h3 id="分支管理" tabindex="-1"><a class="header-anchor" href="#分支管理" aria-hidden="true">#</a> 分支管理</h3><h3 id="与分支有关的工作流" tabindex="-1"><a class="header-anchor" href="#与分支有关的工作流" aria-hidden="true">#</a> 与分支有关的工作流</h3><h3 id="远程分支" tabindex="-1"><a class="header-anchor" href="#远程分支" aria-hidden="true">#</a> 远程分支</h3><h3 id="变基" tabindex="-1"><a class="header-anchor" href="#变基" aria-hidden="true">#</a> 变基</h3><h2 id="服务器上的git" tabindex="-1"><a class="header-anchor" href="#服务器上的git" aria-hidden="true">#</a> 服务器上的Git</h2><h3 id="协议" tabindex="-1"><a class="header-anchor" href="#协议" aria-hidden="true">#</a> 协议</h3><h3 id="在服务器上搭建git" tabindex="-1"><a class="header-anchor" href="#在服务器上搭建git" aria-hidden="true">#</a> 在服务器上搭建Git</h3><h3 id="生成ssh公钥" tabindex="-1"><a class="header-anchor" href="#生成ssh公钥" aria-hidden="true">#</a> 生成SSH公钥</h3><h3 id="配置服务器" tabindex="-1"><a class="header-anchor" href="#配置服务器" aria-hidden="true">#</a> 配置服务器</h3><h3 id="git守护进程" tabindex="-1"><a class="header-anchor" href="#git守护进程" aria-hidden="true">#</a> Git守护进程</h3><h3 id="smart-http" tabindex="-1"><a class="header-anchor" href="#smart-http" aria-hidden="true">#</a> Smart HTTP</h3><h3 id="gitweb" tabindex="-1"><a class="header-anchor" href="#gitweb" aria-hidden="true">#</a> GitWeb</h3><h3 id="gitlab" tabindex="-1"><a class="header-anchor" href="#gitlab" aria-hidden="true">#</a> GitLab</h3><h2 id="分布式git" tabindex="-1"><a class="header-anchor" href="#分布式git" aria-hidden="true">#</a> 分布式Git</h2><h3 id="分布式工作流程" tabindex="-1"><a class="header-anchor" href="#分布式工作流程" aria-hidden="true">#</a> 分布式工作流程</h3><h3 id="对项目做出贡献" tabindex="-1"><a class="header-anchor" href="#对项目做出贡献" aria-hidden="true">#</a> 对项目做出贡献</h3><h3 id="维护项目" tabindex="-1"><a class="header-anchor" href="#维护项目" aria-hidden="true">#</a> 维护项目</h3><h2 id="git工具" tabindex="-1"><a class="header-anchor" href="#git工具" aria-hidden="true">#</a> Git工具</h2><h3 id="选择修订版本" tabindex="-1"><a class="header-anchor" href="#选择修订版本" aria-hidden="true">#</a> 选择修订版本</h3><h3 id="交互式暂存" tabindex="-1"><a class="header-anchor" href="#交互式暂存" aria-hidden="true">#</a> 交互式暂存</h3><h3 id="存储与清理" tabindex="-1"><a class="header-anchor" href="#存储与清理" aria-hidden="true">#</a> 存储与清理</h3><h3 id="签署工作" tabindex="-1"><a class="header-anchor" href="#签署工作" aria-hidden="true">#</a> 签署工作</h3><h3 id="搜索" tabindex="-1"><a class="header-anchor" href="#搜索" aria-hidden="true">#</a> 搜索</h3><h3 id="重写历史" tabindex="-1"><a class="header-anchor" href="#重写历史" aria-hidden="true">#</a> 重写历史</h3><h3 id="重置揭秘" tabindex="-1"><a class="header-anchor" href="#重置揭秘" aria-hidden="true">#</a> 重置揭秘</h3><h3 id="高级合并" tabindex="-1"><a class="header-anchor" href="#高级合并" aria-hidden="true">#</a> 高级合并</h3><h3 id="refere" tabindex="-1"><a class="header-anchor" href="#refere" aria-hidden="true">#</a> Refere</h3><h3 id="使用git调试" tabindex="-1"><a class="header-anchor" href="#使用git调试" aria-hidden="true">#</a> 使用Git调试</h3><h3 id="子模块" tabindex="-1"><a class="header-anchor" href="#子模块" aria-hidden="true">#</a> 子模块</h3><h3 id="打包" tabindex="-1"><a class="header-anchor" href="#打包" aria-hidden="true">#</a> 打包</h3><h3 id="替换" tabindex="-1"><a class="header-anchor" href="#替换" aria-hidden="true">#</a> 替换</h3><h3 id="凭证存储" tabindex="-1"><a class="header-anchor" href="#凭证存储" aria-hidden="true">#</a> 凭证存储</h3><h2 id="自定义git" tabindex="-1"><a class="header-anchor" href="#自定义git" aria-hidden="true">#</a> 自定义Git</h2><h3 id="配置git" tabindex="-1"><a class="header-anchor" href="#配置git" aria-hidden="true">#</a> 配置Git</h3><h3 id="git属性" tabindex="-1"><a class="header-anchor" href="#git属性" aria-hidden="true">#</a> Git属性</h3><h3 id="git钩子" tabindex="-1"><a class="header-anchor" href="#git钩子" aria-hidden="true">#</a> Git钩子</h3><h3 id="使用强制策略" tabindex="-1"><a class="header-anchor" href="#使用强制策略" aria-hidden="true">#</a> 使用强制策略</h3><h2 id="git内部原理" tabindex="-1"><a class="header-anchor" href="#git内部原理" aria-hidden="true">#</a> Git内部原理</h2><h3 id="底层命令和高层命令" tabindex="-1"><a class="header-anchor" href="#底层命令和高层命令" aria-hidden="true">#</a> 底层命令和高层命令</h3><h3 id="git对象" tabindex="-1"><a class="header-anchor" href="#git对象" aria-hidden="true">#</a> Git对象</h3><h3 id="git引用" tabindex="-1"><a class="header-anchor" href="#git引用" aria-hidden="true">#</a> Git引用</h3><h3 id="包文件" tabindex="-1"><a class="header-anchor" href="#包文件" aria-hidden="true">#</a> 包文件</h3><h3 id="引用规格" tabindex="-1"><a class="header-anchor" href="#引用规格" aria-hidden="true">#</a> 引用规格</h3><h3 id="传输协议" tabindex="-1"><a class="header-anchor" href="#传输协议" aria-hidden="true">#</a> 传输协议</h3><h3 id="维护与数据恢复" tabindex="-1"><a class="header-anchor" href="#维护与数据恢复" aria-hidden="true">#</a> 维护与数据恢复</h3><h3 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h3>`,218),l=[r];function h(u,g){return n(),e("div",null,l)}const b=a(p,[["render",h],["__file","index.html.vue"]]);export{b as default};
