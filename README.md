
1. item_group code 起名规则:
	XX XX XX
	第一个 XX 对应表类型 : 01 ~ 05
	第二个 XX 一级分组编号 : 01 ~ 99
	第三个 XX 二级分组编号 : 01 ~ 99


building_id 关联 collector
collector 关联 item
item 中有 item_type 对应表类型

item_group_mapper 需要表类型 和 code 类型对应


添加item时,需要和collector对应
添加collector需要和建筑对应


生产环境接口地址：http://open.snd02.com
APP_KEY:O000002789
APP_SECRET: 5FFD8F7EC80E453C9A04A174A7164299
REDIRECT_URI: http://open.snd02.com/demo.jsp（默认此地址，如果有其它自有地址，请提供后修改）
用户名:daojiznkj01
密码:daoji888
开放平台的接口文档连接地址：http://open.snd02.com/apiDocs

