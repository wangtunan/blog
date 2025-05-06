# JSON
::: tip
[JSONLoader文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.json_loader.JSONLoader.html)
:::

`JSON`格式的数据也可以使用`TextLoader`来加载，但与`JSONLoader`相比，它有以下两大缺点：
* 加载出来的只是纯文本，不包含格式。
* 只能加载全部内容，不能指定某个字段。

<details>
<summary>原始JSON内容：</summary>

```json
{
  "gameTitle": "西游记",
  "basicInfo": {
    "engine": "虚幻引擎5",
    "releaseDate": "2024-08-20",
    "genre": "动作角色扮演",
    "platforms": [
      "PC",
      "PS5",
      "Xbox Series X/S"
    ],
    "supportedLanguages": [
      "简体中文",
      "繁体中文",
      "英语",
      "日语",
      "韩语"
    ]
  },
  "mainCharacter": {
    "name": "孙悟空",
    "backstory": "混沌初开之时，盘古开天辟地，天地灵气凝结成仙石，其中孕育出一只石猴。这只石猴拜师菩提老祖，修得一身本领，后被赐名孙悟空。",
    "abilities": [
      "七十二变",
      "筋斗云",
      "火眼金睛",
      "金刚不坏之身"
    ],
    "weapons": [
      "如意金箍棒",
      "法器",
      "神通符咒"
    ],
    "combatStyle": "基于变身系统的高速格斗，结合中国传统神话元素的技能组合"
  },
  "supportCharacters": [
    {
      "name": "白龙马",
      "identity": "八部天龙之一",
      "background": "原为西海龙王三太子敖烈，因冒犯天条被贬为马，后随唐僧西行取经，成为孙悟空的伙伴",
      "abilities": [
        "水遁",
        "腾云驾雾",
        "变化"
      ]
    },
    {
      "name": "红孩儿",
      "identity": "圣婴大王",
      "background": "牛魔王与铁扇公主之子，修炼火焰三昧，掌握三昧真火",
      "abilities": [
        "三昧真火",
        "火眼",
        "战斗形态"
      ]
    },
    {
      "name": "六耳猕猴",
      "identity": "孙悟空分身",
      "background": "天地间与美猴王最像的存在，有着与孙悟空相似的能力",
      "abilities": [
        "七十二变",
        "法术",
        "分身术"
      ]
    }
  ],
  "gameFeatures": {
    "worldSetting": "基于西游记神话背景，融合虚构的玄幻世界",
    "combatSystem": "独特的变身战斗系统，结合高难度动作玩法",
    "progression": "技能树发展系统，解锁新的战斗技能和变身形态",
    "exploration": "开放式地图探索，丰富的支线任务和隐藏剧情",
    "graphics": "采用虚幻引擎5, 实现高质量画面表现和实时光线追踪"
  }
}
```
</details>

## 使用TextLoader加载
```py
from langchain_community.document_loaders import TextLoader

text_loader = TextLoader(
  file_path="./data/灭神纪/人物角色.json",
  encoding="utf-8"
)

documents = text_loader.load()
print(documents)
```

## 使用JSONLoader加载对象字段
::: tip
安装依赖包`pip install jq`
:::

```py
import json
from langchain_community.document_loaders import TextLoader, JSONLoader

json_loader = JSONLoader(
  file_path="./data/灭神纪/人物角色.json",
  jq_schema='.mainCharacter | "姓名：" + .name + "，背景：" + .backstory'
)

documents = json_loader.load()
print(documents)
```
输出结果：
```text
[
  Document(
    metadata={
      'source': './data/灭神纪/人物角色.json',
      'seq_num': 1
    },
    page_content='姓名：孙悟空，背景：混沌初开之时，盘古开天辟地，天地灵气凝结成仙石，其中孕育出一只石猴。
    这只石 猴拜师菩提老祖，修得一身本领，后被赐名孙悟空。'
  )
]
```

## 使用JSONLoader加载数组字段
::: tip
安装依赖包`pip install jq`
:::

```py
from langchain_community.document_loaders import JSONLoader

support_loader = JSONLoader(
  file_path="./data/灭神纪/人物角色.json",
  jq_schema='.supportCharacters[] | "姓名：" + .name + ", 背景：" + .background'
)

support_loader = support_loader.load()
print(support_loader)
```
输出结果：
```py
[
  Document(
    metadata={'source': './data/灭神纪/人物角色.json', 'seq_num': 1},
    page_content='姓名：白龙马, 背景：原为西海龙王三太子敖烈，因冒犯天条被贬为马，后随唐僧西行取经，成为孙悟空的 伙伴'
  ),
  Document(
    metadata={'source': './data/灭神纪/人物角色.json', 'seq_num': 2}, 
    page_content='姓名：红孩儿, 背景：牛魔王与铁扇公主之子，修炼火焰三昧，掌握三昧真火'
  ),
  Document(
    metadata={'source': './data/灭神纪/人物角色.json', 'seq_num': 3},
    page_content='姓名：六耳猕猴, 背景：天地间与美猴王最像的存在，有着与孙悟空相似的能力'
  )
]
```