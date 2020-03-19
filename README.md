## 能耗项目
提供表监测分析，统计数据，前后端分离<br>
前端项目: uiServer<br>
后端项目：当前目录


##启动后端服务
copy energy-1.0.jar 到当前目录<br>
执行 ./start.sh

## 启动UI服务
cd uiServer<br>
npm run prod

------------

##注意事项
1. item_group code 起名规则: XX XX XX
	第一个 XX 对应表类型 : 01 ~ 05 同 item 中 type 字段对应
	第二个 XX 一级分组编号 : 01 ~ 99
	第三个 XX 二级分组编号 : 01 ~ 99

2. 设备关联
building_id 关联 collector
collector 关联 item
item 中有 item_type 对应表类型

------------

##接口文档
postman导入energy.postman_collection.json

------------

####曼顿空开对接
#####服务端
生产环境接口地址：http://open.snd02.com
APP_KEY:O000002789
APP_SECRET: 5FFD8F7EC80E453C9A04A174A7164299
REDIRECT_URI: http://open.snd02.com/demo.jsp（默认此地址，如果有其它自有地址，请提供后修改）
用户名:daojiznkj01
密码:daoji888
开放平台的接口文档连接地址：http://open.snd02.com/apiDocs

#####硬件对接
相关文档在 /曼顿资料/

