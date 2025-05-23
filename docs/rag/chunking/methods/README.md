# 分块方法

## 固定字符数分块
::: tip
[CharacterTextSplitter 文档](https://python.langchain.com/api_reference/text_splitters/character/langchain_text_splitters.character.CharacterTextSplitter.html)
:::

```py
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter

data_loader = TextLoader(
  file_path="data/山西文旅/云冈石窟.txt",
  encoding="utf-8"
)

documents = data_loader.load()

splitter = CharacterTextSplitter(
  chunk_size=1000, # 每个chunk的大小
  chunk_overlap=200, # 每个chunk的overlap
)

chunks = splitter.split_documents(documents)

print("\n========= 文档分块结果 =========")
for chunk in chunks[:5]:
  print(f"内容: {chunk.page_content}")
  print("=" * 50)
```
输出结果：
```text
文档分块数量: 9

========= 文档分块结果 =========
内容: 云冈石窟
云冈石窟位于中国北部山西省大同市西郊17公里处的武周山南麓，石窟依山开凿，东西绵延1公里。存有主要洞窟45个，大小窟龛252个，石雕造像51000余 
躯，为中国规模最大的古代石窟群之一，与敦煌莫高窟、洛阳龙门石窟和天水麦积山石窟并称为中国四大石窟艺术宝库。 1961年被国务院公布为全国首批 
重点文物保护单位，2001年12月14日被联合国教科文组织列入世界遗产名录，2007年5月8日被国家旅游局评为首批国家5A级旅游景区。
==================================================
内容: 云冈五华洞
位于云冈石窟中部的第 9——13窟。这五窟因清代施泥彩绘云冈石窟景观而得名。五华洞雕饰绮丽，丰富多彩，是研究北魏历史、艺术、音乐、舞蹈、书法和
建筑的珍贵资料，为云冈石窟群的重要组成部分。
==================================================
内容: 塔洞
云冈东部窟群，指云冈石窟东端1——4，均为塔洞。第1、2窟为同期开的一组，凿于孝文帝迁洛前，窟内中央雕造方形塔柱，四面开龛造像。
第一窟主像是弥勒，塔南面下层雕释迦多宝像，上层雕释迦像。浮雕五层小塔，是研究北魏建筑的形象资料。
第二窟是释迦像，塔南面下层雕释迦多宝像，上层雕三世佛。
两窟南壁窟门两侧都雕有维摩、文殊。第三窟为云冈石窟中规模最大的洞窟，前立壁高约25米，传为昙曜译经楼。
==================================================
内容: 武州山
武周山，亦名武州山，在大同城西山中。宋《太平寰宇记》引《冀州图》云：“武周山在郡西北，东西数百里，南北五十里。山之南面，千仞壁立。”云冈石
窟即因武周山南缘斩山开凿。
==================================================
内容: 昙曜五窟
第十六至二十窟，是云冈石窟最早开业凿的五个洞窟，通称“昙曜五窟。”十六窟为平面呈椭圆形。
正中主像释迦像，高13.5米，立于莲花座上，周壁雕有千佛和佛龛。第11窟第十七窟，主像是三世佛，正中为交弥勒坐像，高15.6米。
东、西两壁各雕龛，东为坐像，西为立像。
明窗东侧的北魏太和十三年(公元489年)佛龛，是以后补刻的。
景点地址云冈石窟位于中国北部山西省大同市西郊17公里处的武周山南麓
==================================================
```

## 递归分块
::: tip
[RecursiveCharacterTextSplitter 文档](https://python.langchain.com/api_reference/text_splitters/character/langchain_text_splitters.character.RecursiveCharacterTextSplitter.html)
:::

```py
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

data_loader = TextLoader(
  file_path="data/山西文旅/云冈石窟.txt",
  encoding="utf-8"
)

documents = data_loader.load()

# 定义分割符列表，按优先级依次使用
separators = ["\n\n", ".", "，", " "]

splitter = RecursiveCharacterTextSplitter(
  chunk_size=200,
  chunk_overlap=10,
  separators=separators
)

chunks = splitter.split_documents(documents)

print(f"文档分块数量: {len(chunks)}")
print("\n========= 文档分块结果 =========")
for chunk in chunks[:5]:
  print(f"内容: {chunk.page_content}")
  print("=" * 50)
```
输出结果：
```text
文档分块数量: 12

========= 文档分块结果 =========
内容: 云冈石窟
云冈石窟位于中国北部山西省大同市西郊17公里处的武周山南麓，石窟依山开凿，东西绵延1公里。
存有主要洞窟45个，大小窟龛252个，石雕造像51000余 躯，为中国规模最大的古代石窟群之一，
与敦煌莫高窟、洛阳龙门石窟和天水麦积山石窟并称为中国四大石窟艺术宝库。 
1961年被国务院公布为全国首批 重点文物保护单位，2001年12月14日被联合国教科文组织列入世界遗产名录
==================================================
内容: ，2007年5月8日被国家旅游局评为首批国家5A级旅游景区。
==================================================
内容: 云冈五华洞
位于云冈石窟中部的第 9——13窟。这五窟因清代施泥彩绘云冈石窟景观而得名。五华洞雕饰绮丽，丰富多彩，
是研究北魏历史、艺术、音乐、舞蹈、书法和建筑的珍贵资料，为云冈石窟群的重要组成部分。
==================================================
内容: 塔洞
云冈东部窟群，指云冈石窟东端1——4，均为塔洞。第1、2窟为同期开的一组，凿于孝文帝迁洛前，窟内中央雕造方形塔柱，四面开龛造像。
第一窟主像是弥勒，塔南面下层雕释迦多宝像，上层雕释迦像。
浮雕五层小塔，是研究北魏建筑的形象资料。
第二窟是释迦像，塔南面下层雕释迦多宝像，上层雕三世佛。两窟南壁窟门两侧都雕有维摩、文殊。
第三窟为云冈石窟中规模最大的洞窟，前立壁高约25米，传为昙曜译经楼。
==================================================
内容: 武州山
武周山，亦名武州山，在大同城西山中。宋《太平寰宇记》引《冀州图》云：“武周山在郡西北，东西数百里，南北五十里。
山之南面，千仞壁立。”云冈石窟即因武周山南缘斩山开凿。
==================================================
```

## 为代码分块
::: tip
`langchain_text_splitters`中已内置了一些语言的分隔符号。
:::

```py
from langchain_text_splitters import Language, RecursiveCharacterTextSplitter

print(RecursiveCharacterTextSplitter.get_separators_for_language(Language.PYTHON))
print(RecursiveCharacterTextSplitter.get_separators_for_language(Language.JS))
```

<details>

<summary>原始代码块：</summary>

```py
class CombatSystem:
  def __init__(self):
      self.health = 100
      self.stamina = 100
      self.state = "IDLE"
      self.attack_patterns = {
          "NORMAL": 10,
          "SPECIAL": 30,
          "ULTIMATE": 50
      }
  def update(self, delta_time):
      self._update_stats(delta_time)
      self._handle_combat()
  def _update_stats(self, delta_time):
      self.stamina = min(100, self.stamina + 5 * delta_time)
  def _handle_combat(self):
      if self.state == "ATTACKING":
          self._execute_attack()
  def _execute_attack(self):
      if self.stamina >= self.attack_patterns["SPECIAL"]:
          damage = 50
          self.stamina -= self.attack_patterns["SPECIAL"]
          return damage
      return self.attack_patterns["NORMAL"]
class InventorySystem:
   def __init__(self):
       self.items = {}
       self.capacity = 20
       self.gold = 0
   def add_item(self, item_id, quantity):
       if len(self.items) < self.capacity:
           if item_id in self.items:
               self.items[item_id] += quantity
           else:
               self.items[item_id] = quantity
   def remove_item(self, item_id, quantity):
       if item_id in self.items:
           self.items[item_id] -= quantity
           if self.items[item_id] <= 0:
               del self.items[item_id]
   def get_item_count(self, item_id):
       return self.items.get(item_id, 0)
class QuestSystem:
   def __init__(self):
       self.active_quests = {}
       self.completed_quests = set()
       self.quest_log = []
   def add_quest(self, quest_id, quest_data):
       if quest_id not in self.active_quests:
           self.active_quests[quest_id] = quest_data
           self.quest_log.append(f"Started quest: {quest_data['name']}")
   def complete_quest(self, quest_id):
       if quest_id in self.active_quests:
           self.completed_quests.add(quest_id)
           del self.active_quests[quest_id]
   def get_active_quests(self):
       return list(self.active_quests.keys())
```
</details>

```py

from langchain_text_splitters import Language, RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter.from_language(
  language=Language.PYTHON,
  chunk_size=1000,
  chunk_overlap=0
)

chunks = splitter.create_documents([code])

print(f"文档分块数量: {len(chunks)}")
print("\n========= 文档分块结果 =========")
for chunk in chunks[:5]:
  print(f"内容: {chunk.page_content}")
  print("=" * 50)
```

输出结果：
```text
文档分块数量: 3

========= 文档分块结果 =========
内容: class CombatSystem:
   def __init__(self):
       self.health = 100
       self.stamina = 100
       self.state = "IDLE"
       self.attack_patterns = {
           "NORMAL": 10,
           "SPECIAL": 30,
           "ULTIMATE": 50
       }
   def update(self, delta_time):
       self._update_stats(delta_time)
       self._handle_combat()
   def _update_stats(self, delta_time):
       self.stamina = min(100, self.stamina + 5 * delta_time)
   def _handle_combat(self):
       if self.state == "ATTACKING":
           self._execute_attack()
   def _execute_attack(self):
       if self.stamina >= self.attack_patterns["SPECIAL"]:
           damage = 50
           self.stamina -= self.attack_patterns["SPECIAL"]
           return damage
       return self.attack_patterns["NORMAL"]
==================================================
内容: class InventorySystem:
   def __init__(self):
       self.items = {}
       self.capacity = 20
       self.gold = 0
   def add_item(self, item_id, quantity):
       if len(self.items) < self.capacity:
           if item_id in self.items:
               self.items[item_id] += quantity
           else:
               self.items[item_id] = quantity
   def remove_item(self, item_id, quantity):
       if item_id in self.items:
           self.items[item_id] -= quantity
           if self.items[item_id] <= 0:
               del self.items[item_id]
   def get_item_count(self, item_id):
       return self.items.get(item_id, 0)
==================================================
```