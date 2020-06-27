## 能耗项目
提供表监测分析，统计数据，前后端分离<br>
前端项目: uiServer<br>
后端项目：当前目录

注: uiServer/static 等同于 src/main/resources/static目录
前者可以单独部署, 后者可以整合到spring项目自启动

当前打包已经排除了 recources/static目录, 配置再 pom.xml中
....
<build>
    ...
    <resources>
        
    </resources>
    ...
</build>
....



##启动后端服务
copy energy-1.0.jar 到当前目录<br>
执行 ./start.sh

## 启动UI服务
cd uiServer/src<br>
node index.js

------------

##注意事项
### 1. item_group.code 规则: XX XX XX
	第一个 XX 对应表类型 : 01 ~ 05 同 item 中 type 字段对应, 能耗分类: 电,水,...
	第二个 XX 一级分组编号 : 01 ~ 99
	第三个 XX 二级分组编号 : 01 ~ 99

### 2. 设备关联
building_id 关联 collector <br />
collector 关联 item <br />
item 中有 item_type 对应表类型

### 3. 能耗计算
a_energy_data.item_id -> 对应设备ID <br />
a_energy_data.indication -> 计量主指标当前值 <br />
a_energy_data.diff_indication -> 计量主指标和上次记录差值 <br />
a_energy_data.other_data -> 记录时的其他数据 

### 4. 数据统计->费用统计 statistics_fee
当前计算仅为固定费率计算  <br />
数据来源: a_item + a_item_type + a_rate + a_rate_data 连表获取  <br />
TODO: 待后期修改成 从表费率计算的结果中获取  <br />

------------

## 阈值报警业务
a_item_rule 对应设备配置, 一个设备一条记录, a_item_rule.rules 保存 [], 多个阈值规则
```json
rules: [
    {
        "description": "电压过高",
        "key": "电压",
        "val": "240",
        "compare": ">=",
        "warning_category" : "电过压",
        "severity": "严重",
        "err_msg": "电压过高, 请检查",
        "solution_ref": "切断电路",
    },
    {
        "description": "电流过大",
        "key": "电流",
        "val": "10",
        "compare": ">=",
        "warning_category" : "电负载超标",
        "severity": "严重",
        "err_msg": "电流过高",
        "solution_ref": "检查是否漏电, 或开启大功率设备",
    }
]
```
a_item_warning 为报警信息

------------

## 针对可充值电能表, 增加业务
#### AmmeterDataService.recordAmmeterDatas目前只支持配置: 正pa,剩余rm,尖pj,峰pf,平pp,谷pg
#### 费用入口(cash_flow/:id)只能通过商户管理(house_hold)进入

### 1. 表费率计算
item.item_type 关联 fee_policy.item_type 字段 <br />
fee_policy.charge_type -> 是否固定费率 <br />
fee_policy.rate -> 固定费率 <br />
fee_policy.rate_floating -> 动态费率  <br />

### 2. 费用
a_cash_flow.event -> 操作方式 recharge/withdraw <br />

------------

##接口文档
postman导入energy.postman_collection.json <br />

------------

####曼顿空开对接
#####服务端
生产环境接口地址：http://open.snd02.com <br />
APP_KEY:O000002789 <br />
APP_SECRET: 5FFD8F7EC80E453C9A04A174A7164299 <br />
REDIRECT_URI: http://open.snd02.com/demo.jsp（默认此地址，如果有其它自有地址，请提供后修改） <br />
用户名:daojiznkj01 <br />
密码:daoji888 <br />
开放平台的接口文档连接地址：http://open.snd02.com/apiDocs <br />

#####硬件对接
相关文档在 /曼顿资料/ <br />


