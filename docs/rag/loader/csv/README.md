# CSV
<details>
<summary>原始CSV内容：</summary>

```csv
Category,Name,Description,PowerLevel
装备,铜云棒,一根结实的青铜棒，挥舞时能发出破空之声，适合近战攻击。,85
装备,百戏衬钱衣,一件精美的战斗铠甲，能够提供强大的防御并抵御剧毒伤害。,90
技能,天雷击,召唤天雷攻击敌人，造成大范围雷电伤害。,95
技能,火焰舞,施展火焰舞步，将敌人包围在炽热的火焰之中。,92
人物,悟空,主角，拥有七十二变和腾云驾雾的能力，行侠仗义。,100
人物,银角大王,强大的妖王之一，擅长操控各种法宝，具有极高的战斗力。,88
```
</details>

## CSVLoader
::: tip
[CSVLoader 文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.csv_loader.CSVLoader.html)
:::

```py
from langchain_community.document_loaders import CSVLoader

data_loader = CSVLoader(
  file_path="data/黑悟空/黑神话悟空.csv",
  encoding="utf-8",
  content_columns=("名称", "描述"), # 只加载这两列
  csv_args={
    "fieldnames": ["名称", "描述"] # 自定义列名
  }
)

documents = data_loader.load()

for document in documents[:3]:
  print(document.page_content)
  print("=" * 50)
```
输出结果：
```text
名称: Category
描述: Name
==================================================
名称: 装备
描述: 铜云棒
==================================================
名称: 装备
描述: 百戏衬钱衣
==================================================
```

## DirectoryLoader
::: tip
[DirectoryLoader 文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.directory.DirectoryLoader.html)
:::
可以使用`DirectoryLoader` + `CSVLoader`批量加载`.csv`文件。

```py
from langchain_community.document_loaders import DirectoryLoader, CSVLoader

data_loader = DirectoryLoader(
  path="./data/灭神纪",
  glob="**/*.csv",
  loader_cls=lambda path: CSVLoader(
    path,
    encoding="utf-8"
  )
)

documents = data_loader.load()

print(f"文档数据总数：{len(documents)}")
```

## UnstructuredCSVLoader
::: tip
[UnstructuredCSVLoader 文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.csv_loader.UnstructuredCSVLoader.html)
:::
可以使用`UnstructuredCSVLoader`把`.csv`文件转换为`html`结构：

```py
from langchain_community.document_loaders import UnstructuredCSVLoader

data_loader = UnstructuredCSVLoader(
  file_path="./data/黑悟空/黑神话悟空.csv",
  encoding="utf-8",
  mode="elements"
)

documents = data_loader.load()

print(documents[0].metadata.get('text_as_html'))
```
输出结果：
```py
<table>
  <tr>
    <td>Category</td>
    <td>Name</td>
    <td>Description</td>
    <td>PowerLevel</td>
  </tr>
  <tr>
    <td>装备</td>
    <td>铜云棒</td>
    <td>一根结实的青铜棒，挥舞时能发出破空之声，适合近战攻击。</td>
    <td>85</td>
  </tr>
  <tr>
    <td>装备</td>
    <td>百戏衬钱 衣</td>
    <td>一件精美的战斗铠甲，能够提供强大的防御并抵御剧毒伤害。</td>
    <td>90</td>
  </tr>
  <tr>
    <td>技能</td>
    <td>天雷击</td>
    <td>召唤天雷攻击敌人，造成大范围雷电伤害。</td>
    <td>95</td>
  </tr>
  <tr>
    <td>技能</td>
    <td>火焰舞</td>
    <td>施展火焰 舞步，将敌人包围在炽热的火焰之中。</td>
    <td>92</td>
  </tr>
  <tr>
    <td>人物</td>
    <td>悟空</td>
    <td>主角，拥有七十二变和腾云驾雾的能力，行侠仗义。</td>
    <td>100</td>
  </tr>
  <tr>
    <td>人物</td>
    <td>银角大王</td>
    <td>强大的妖王之一，擅长操控各种法 宝，具有极高的战斗力。</td>
    <td>88</td>
  </tr>
</table>
```