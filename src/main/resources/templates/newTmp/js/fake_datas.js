

var normalAmmeterDaily = 5000;
var monitorSummary = {
	"code": "10000",
	"msg": "success",
	"sub_code": "",
	"sub_msg": "success",
	"result": {
		"from": "2019-06-08",
		"to": "2019-06-08",
		"building": {
			"id": 1,
			"name": "大楼一号",
			"capacity": 12000,
			"capacity_text": "日耗电1.2w度",
			"area": 10000,
			"fee_policy": "{\r\n\t\"ammeter\": 0.85,\r\n\t\"watermeter\": 2.2,\r\n\t\"gasmeter\": 1.9,\r\n\t\"vapormeter\": 3.5\r\n}",
			"status": "已建成",
			"type": "政府项目",
			"photo": "images/img.jpg",
			"address": "浙江省宁波市宁海县金港路26号",
			"latitude": 29.304051000000001,
			"longitude": 121.62177800000001,
			"location_id": 61,
			"owner_id": 1,
			"note": null,
			"created_at": "2019-02-11 18:00:36",
			"updated_at": "2019-02-11 18:00:36"
		},
		"summaryData": {
			"internationalValue": 0.14999999999999999,
			"total1Name": "总电量",
			"total1Unit": "kwh",
			"total1": "310303.2000",
			"totalCompare1Month": "0",
			"totalCompare1Year": "0",
			"total2Name": "总水量",
			"total2Unit": "吨",
			"total2": 0,
			"totalCompare2Month": 0,
			"totalCompare2Year": 0,
			"total3Name": "总燃气量",
			"total3Unit": "立方米",
			"total3": 0,
			"totalCompare3Month": 0,
			"totalCompare3Year": 0,
			"total4Name": "总蒸汽量",
			"total4Unit": "吨",
			"total4": 0,
			"totalCompare4Month": 0,
			"totalCompare4Year": 0
		},
		"chartDatas": {
			"ammeter": {
				"datas": [],
				"key": "record_date",
				"val": "useValue",
				"unit": "kwh",
				"prop_area": 10000,
				"name": "电量",
				"area": 10000,
				"fee_policy": 0.84999999999999998
			},
			"watermeter": {
				"datas": [],
				"key": "record_date",
				"val": "useValue",
				"unit": "吨",
				"prop_area": 10000,
				"name": "水量",
				"area": 10000,
				"fee_policy": 2.2000000000000002
			},
			"gasmeter": {
				"datas": [],
				"key": "record_date",
				"val": "useValue",
				"unit": "立方米",
				"prop_area": 10000,
				"name": "燃气量",
				"area": 10000,
				"fee_policy": 1.8999999999999999
			},
			"vapormeter": {
				"datas": [],
				"key": "record_date",
				"val": "useValue",
				"unit": "吨",
				"prop_area": 10000,
				"name": "蒸汽费",
				"area": 10000,
				"fee_policy": 3.5
			}
		},
		"totalVal": [{
			"name": "总电量",
			"val": "310303.2000"
		}, {
			"name": "总水量",
			"val": 0
		}, {
			"name": "总燃气量",
			"val": 0
		}, {
			"name": "总蒸汽量",
			"val": 0
		}],
		"dailyList": {
			"title": ["日期", "总电量", "总电量密度", "总水量", "总水量密度", "总燃气量", "总燃气量密度", "总蒸汽量", "总蒸汽量密度"],
			"data": [
				["2019-06-08", 4710.3599999999997, 0.46999999999999997, 0, 0, 0, 0, 0, 0]
			]
		}
	}
};



var monitorAmmeterSummary = {
	"code": "10000",
	"msg": "success",
	"sub_code": "",
	"sub_msg": "success",
	"result": {
		"from": "2019-06-18",
		"to": "2019-06-25",
		"building": {
			"id": 1,
			"name": "大楼一号",
			"capacity": 12000,
			"capacity_text": "日耗电1.2w度",
			"area": 10000,
			"fee_policy": "{\r\n\t\"ammeter\": 0.85,\r\n\t\"watermeter\": 2.2,\r\n\t\"gasmeter\": 1.9,\r\n\t\"vapormeter\": 3.5\r\n}",
			"status": "已建成",
			"type": "政府项目",
			"photo": "https:\/\/static-pvm.sunallies.com\/business.jpg",
			"address": "浙江省宁波市宁海县金港路26号",
			"latitude": 29.304051000000001,
			"longitude": 121.62177800000001,
			"location_id": 61,
			"owner_id": 1,
			"note": null,
			"created_at": "2019-02-11 18:00:36",
			"updated_at": "2019-02-11 18:00:36"
		},
		"types": [{
			"id": 9,
			"name": "能耗分项"
		}, {
			"id": 10,
			"name": "建筑区域"
		}, {
			"id": 11,
			"name": "组织机构"
		}, {
			"id": 12,
			"name": "自定义类别"
		}],
		"typeGroups": [],
		"old": [{
			"val": "310303.2000"
		}, {
			"val": "0.0000"
		}, {
			"val": "0.0000"
		}, {
			"val": "310303.2000"
		}, {
			"val": "0.0000"
		}],
		"summaryData": {
			"internationalValue": 0.15,
			"totalName": "总用电量",
			"totalUnit": "kwh",
			"total": "310303.2000",
			"totalCompareMonth": "0",
			"totalCompareYear": "0",
			"total1Name": "当量标煤(吨)",
			"total1Unit": "吨",
			"total1": 100848.54000000001,
			"totalCompare1Month": "0",
			"totalCompare1Year": "0",
			"total2Name": "累计碳排放量(吨)",
			"total2Unit": "吨",
			"total2": 284579.06472000002,
			"totalCompare2Month": "0",
			"totalCompare2Year": "0",
			"total3Name": "能耗密度",
			"total3Unit": "kwh\/m2",
			"total3": 31.03032,
			"totalCompare3Month": "0",
			"totalCompare3Year": "0",
			"total4Name": "费用",
			"total4Unit": "元",
			"total4": 263757.72000000003,
			"totalCompare4Month": "0",
			"totalCompare4Year": "0"
		},
		"chartDatas": {
			"datas": [],
			"key": "record_date",
			"val": "useValue",
			"unit": "kwh",
			"prop_area": 10000,
			"name": "用电量",
			"area": 10000,
			"coal": 0.32500000000000001,
			"co2": 0.91710000000000003,
			"fee_policy": 0.84999999999999998
		},
		"chartCompareDatas": {
			"datas": [],
			"key": "record_date",
			"val": "useValue",
			"unit": "kwh",
			"prop_area": 10000
		},
		"totalVal": "310303.2000",
		"dailyList": {
			"title": ["日期", "总用电量(kwh)", "当量标煤(吨)", "能耗密度(kwh/m2)", "费用(元)"],
			"data": []
		}
	}
}



var monitorAmmeterType = {
	"code": "10000",
	"msg": "success",
	"sub_code": "",
	"sub_msg": "success",
	"result": {
		"from": "2019-06-19",
		"to": "2019-06-26",
		"building": {
			"id": 1,
			"name": "大楼一号",
			"capacity": 12000,
			"capacity_text": "日耗电1.2w度",
			"area": 10000,
			"fee_policy": "{\r\n\t\"ammeter\": 0.85,\r\n\t\"watermeter\": 2.2,\r\n\t\"gasmeter\": 1.9,\r\n\t\"vapormeter\": 3.5\r\n}",
			"status": "已建成",
			"type": "政府项目",
			"photo": "https:\/\/static-pvm.sunallies.com\/business.jpg",
			"address": "浙江省宁波市宁海县金港路26号",
			"latitude": 29.304051000000001,
			"longitude": 121.62177800000001,
			"location_id": 61,
			"owner_id": 1,
			"note": null,
			"created_at": "2019-02-11 18:00:36",
			"updated_at": "2019-02-11 18:00:36"
		},
		"types": [{
			"id": 9,
			"name": "能耗分项"
		}, {
			"id": 10,
			"name": "建筑区域"
		}, {
			"id": 11,
			"name": "组织机构"
		}, {
			"id": 12,
			"name": "自定义类别"
		}],
		"typeGroups": [
		{
			"id": 1,
			"building_id": 1,
			"group_type": 9,
			"name": "照明与插座",
			"parent_id": 0,
			"prop_area": 10000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:08:50",
			"updated_at": "2019-02-01 18:08:50"
		}, {
			"id": 6,
			"building_id": 1,
			"group_type": 9,
			"name": "空调用电",
			"parent_id": 0,
			"prop_area": 5000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:08:48",
			"updated_at": "2019-02-01 18:08:48"
		}, {
			"id": 11,
			"building_id": 1,
			"group_type": 9,
			"name": "动力用电",
			"parent_id": 0,
			"prop_area": 5000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:09:08",
			"updated_at": "2019-02-01 18:09:08"
		}, {
			"id": 15,
			"building_id": 1,
			"group_type": 9,
			"name": "特殊用电",
			"parent_id": 0,
			"prop_area": 15000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:09:13",
			"updated_at": "2019-02-01 18:09:13"
		}, {
			"id": 2,
			"building_id": 1,
			"group_type": 9,
			"name": "照明",
			"parent_id": 1,
			"prop_area": 10000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:04",
			"updated_at": "2019-02-01 18:10:04"
		}, {
			"id": 3,
			"building_id": 1,
			"group_type": 9,
			"name": "插座",
			"parent_id": 1,
			"prop_area": 10000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:04",
			"updated_at": "2019-02-01 18:10:04"
		}, {
			"id": 4,
			"building_id": 1,
			"group_type": 9,
			"name": "公共区域照明",
			"parent_id": 1,
			"prop_area": 10000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:04",
			"updated_at": "2019-02-01 18:10:04"
		}, {
			"id": 5,
			"building_id": 1,
			"group_type": 9,
			"name": "室外景观照明",
			"parent_id": 1,
			"prop_area": 10000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:04",
			"updated_at": "2019-02-01 18:10:04"
		}, {
			"id": 7,
			"building_id": 1,
			"group_type": 9,
			"name": "冷热站",
			"parent_id": 6,
			"prop_area": 5000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:14",
			"updated_at": "2019-02-01 18:10:14"
		}, {
			"id": 8,
			"building_id": 1,
			"group_type": 9,
			"name": "空调末端",
			"parent_id": 6,
			"prop_area": 5000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:14",
			"updated_at": "2019-02-01 18:10:14"
		}, {
			"id": 9,
			"building_id": 1,
			"group_type": 9,
			"name": "净化系统",
			"parent_id": 6,
			"prop_area": 5000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:14",
			"updated_at": "2019-02-01 18:10:14"
		}, {
			"id": 10,
			"building_id": 1,
			"group_type": 9,
			"name": "大型独立空调",
			"parent_id": 6,
			"prop_area": 5000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:14",
			"updated_at": "2019-02-01 18:10:14"
		}, {
			"id": 12,
			"building_id": 1,
			"group_type": 9,
			"name": "电梯",
			"parent_id": 11,
			"prop_area": 5000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:20",
			"updated_at": "2019-02-01 18:10:20"
		}, {
			"id": 13,
			"building_id": 1,
			"group_type": 9,
			"name": "水泵",
			"parent_id": 11,
			"prop_area": 5000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:20",
			"updated_at": "2019-02-01 18:10:20"
		}, {
			"id": 14,
			"building_id": 1,
			"group_type": 9,
			"name": "通风机",
			"parent_id": 11,
			"prop_area": 5000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:20",
			"updated_at": "2019-02-01 18:10:20"
		}, {
			"id": 16,
			"building_id": 1,
			"group_type": 9,
			"name": "网络机房",
			"parent_id": 15,
			"prop_area": 15000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:28",
			"updated_at": "2019-02-01 18:10:28"
		}, {
			"id": 17,
			"building_id": 1,
			"group_type": 9,
			"name": "洗衣房",
			"parent_id": 15,
			"prop_area": 15000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:28",
			"updated_at": "2019-02-01 18:10:28"
		}, {
			"id": 18,
			"building_id": 1,
			"group_type": 9,
			"name": "厨房",
			"parent_id": 15,
			"prop_area": 15000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:28",
			"updated_at": "2019-02-01 18:10:28"
		}, {
			"id": 19,
			"building_id": 1,
			"group_type": 9,
			"name": "电话机房",
			"parent_id": 15,
			"prop_area": 15000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:28",
			"updated_at": "2019-02-01 18:10:28"
		}, {
			"id": 20,
			"building_id": 1,
			"group_type": 9,
			"name": "开闭站",
			"parent_id": 15,
			"prop_area": 15000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:28",
			"updated_at": "2019-02-01 18:10:28"
		}, {
			"id": 21,
			"building_id": 1,
			"group_type": 9,
			"name": "消防用电",
			"parent_id": 15,
			"prop_area": 15000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:28",
			"updated_at": "2019-02-01 18:10:28"
		}, {
			"id": 22,
			"building_id": 1,
			"group_type": 9,
			"name": "租户用电",
			"parent_id": 15,
			"prop_area": 15000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:28",
			"updated_at": "2019-02-01 18:10:28"
		}, {
			"id": 23,
			"building_id": 1,
			"group_type": 9,
			"name": "其他",
			"parent_id": 15,
			"prop_area": 15000,
			"prop_num": 50,
			"created_at": "2019-02-01 18:10:28",
			"updated_at": "2019-02-01 18:10:28"
		}],
		"dailyDatas": [{
			"datas": [{
				"val": "1935.6000",
				"key": "2019-06-19"
			}, {
				"val": "826.8000",
				"key": "2019-06-20"
			}, {
				"val": "368.4000",
				"key": "2019-06-21"
			}, {
				"val": "777.6000",
				"key": "2019-06-22"
			}, {
				"val": "4992.0000",
				"key": "2019-06-23"
			}, {
				"val": "3922.8000",
				"key": "2019-06-24"
			}, {
				"val": "4242.0000",
				"key": "2019-06-25"
			}, {
				"val": "5286.0000",
				"key": "2019-06-26"
			}],
			"key": "record_date",
			"val": "useValue",
			"unit": "kwh",
			"prop_area": 10000,
			"prop_num": 50,
			"name": "照明与插座",
			"gid": 1
		}, {
			"datas": [{
				"val": "3080.4000",
				"key": "2019-06-19"
			}, {
				"val": "1989.6000",
				"key": "2019-06-20"
			}, {
				"val": "693.6000",
				"key": "2019-06-21"
			}, {
				"val": "954.0000",
				"key": "2019-06-22"
			}, {
				"val": "4522.8000",
				"key": "2019-06-23"
			}, {
				"val": "3934.8000",
				"key": "2019-06-24"
			}, {
				"val": "3337.2000",
				"key": "2019-06-25"
			}, {
				"val": "5001.6000",
				"key": "2019-06-26"
			}],
			"key": "record_date",
			"val": "useValue",
			"unit": "kwh",
			"prop_area": 5000,
			"prop_num": 50,
			"name": "空调用电",
			"gid": 6
		}, {
			"datas": [{
				"val": "4017.6000",
				"key": "2019-06-19"
			}, {
				"val": "3618.0000",
				"key": "2019-06-20"
			}, {
				"val": "972.0000",
				"key": "2019-06-21"
			}, {
				"val": "669.6000",
				"key": "2019-06-22"
			}, {
				"val": "4210.8000",
				"key": "2019-06-23"
			}, {
				"val": "4398.0000",
				"key": "2019-06-24"
			}, {
				"val": "1960.8000",
				"key": "2019-06-25"
			}, {
				"val": "4940.4000",
				"key": "2019-06-26"
			}],
			"key": "record_date",
			"val": "useValue",
			"unit": "kwh",
			"prop_area": 5000,
			"prop_num": 50,
			"name": "动力用电",
			"gid": 11
		}, {
			"datas": [{
				"val": "11604.0000",
				"key": "2019-06-19"
			}, {
				"val": "8947.2000",
				"key": "2019-06-20"
			}, {
				"val": "2672.4000",
				"key": "2019-06-21"
			}, {
				"val": "2762.4000",
				"key": "2019-06-22"
			}, {
				"val": "10538.4000",
				"key": "2019-06-23"
			}, {
				"val": "10084.8000",
				"key": "2019-06-24"
			}, {
				"val": "5725.2000",
				"key": "2019-06-25"
			}, {
				"val": "11750.4000",
				"key": "2019-06-26"
			}],
			"key": "record_date",
			"val": "useValue",
			"unit": "kwh",
			"prop_area": 15000,
			"prop_num": 50,
			"name": "特殊用电",
			"gid": 15
		}],
		"summaryDatas": []
	}
}


var fake_data = {
	"/undefined/monitor/ajaxAmmeterGroupsSummaryDaily/undefined": {"code":"10000","msg":"success","sub_code":"","sub_msg":"success","result":{"from":"2019-06-19","to":"2019-06-26","building":{"id":1,"name":"大楼一号","capacity":12000,"capacity_text":"日耗电1.2w度","area":10000,"fee_policy":"{\r\n\t\"ammeter\": 0.85,\r\n\t\"watermeter\": 2.2,\r\n\t\"gasmeter\": 1.9,\r\n\t\"vapormeter\": 3.5\r\n}","status":"已建成","type":"政府项目","photo":"https:\/\/static-pvm.sunallies.com\/business.jpg","address":"浙江省宁波市宁海县金港路26号","latitude":29.304051000000001,"longitude":121.62177800000001,"location_id":61,"owner_id":1,"note":null,"created_at":"2019-02-11 18:00:36","updated_at":"2019-02-11 18:00:36"},"types":[{"id":9,"name":"能耗分项"},{"id":10,"name":"建筑区域"},{"id":11,"name":"组织机构"},{"id":12,"name":"自定义类别"}],"typeGroups":[{"id":1,"building_id":1,"group_type":9,"name":"照明与插座","parent_id":0,"prop_area":10000,"prop_num":50,"created_at":"2019-02-01 18:08:50","updated_at":"2019-02-01 18:08:50"},{"id":6,"building_id":1,"group_type":9,"name":"空调用电","parent_id":0,"prop_area":5000,"prop_num":50,"created_at":"2019-02-01 18:08:48","updated_at":"2019-02-01 18:08:48"},{"id":11,"building_id":1,"group_type":9,"name":"动力用电","parent_id":0,"prop_area":5000,"prop_num":50,"created_at":"2019-02-01 18:09:08","updated_at":"2019-02-01 18:09:08"},{"id":15,"building_id":1,"group_type":9,"name":"特殊用电","parent_id":0,"prop_area":15000,"prop_num":50,"created_at":"2019-02-01 18:09:13","updated_at":"2019-02-01 18:09:13"},{"id":2,"building_id":1,"group_type":9,"name":"照明","parent_id":1,"prop_area":10000,"prop_num":50,"created_at":"2019-02-01 18:10:04","updated_at":"2019-02-01 18:10:04"},{"id":3,"building_id":1,"group_type":9,"name":"插座","parent_id":1,"prop_area":10000,"prop_num":50,"created_at":"2019-02-01 18:10:04","updated_at":"2019-02-01 18:10:04"},{"id":4,"building_id":1,"group_type":9,"name":"公共区域照明","parent_id":1,"prop_area":10000,"prop_num":50,"created_at":"2019-02-01 18:10:04","updated_at":"2019-02-01 18:10:04"},{"id":5,"building_id":1,"group_type":9,"name":"室外景观照明","parent_id":1,"prop_area":10000,"prop_num":50,"created_at":"2019-02-01 18:10:04","updated_at":"2019-02-01 18:10:04"},{"id":7,"building_id":1,"group_type":9,"name":"冷热站","parent_id":6,"prop_area":5000,"prop_num":50,"created_at":"2019-02-01 18:10:14","updated_at":"2019-02-01 18:10:14"},{"id":8,"building_id":1,"group_type":9,"name":"空调末端","parent_id":6,"prop_area":5000,"prop_num":50,"created_at":"2019-02-01 18:10:14","updated_at":"2019-02-01 18:10:14"},{"id":9,"building_id":1,"group_type":9,"name":"净化系统","parent_id":6,"prop_area":5000,"prop_num":50,"created_at":"2019-02-01 18:10:14","updated_at":"2019-02-01 18:10:14"},{"id":10,"building_id":1,"group_type":9,"name":"大型独立空调","parent_id":6,"prop_area":5000,"prop_num":50,"created_at":"2019-02-01 18:10:14","updated_at":"2019-02-01 18:10:14"},{"id":12,"building_id":1,"group_type":9,"name":"电梯","parent_id":11,"prop_area":5000,"prop_num":50,"created_at":"2019-02-01 18:10:20","updated_at":"2019-02-01 18:10:20"},{"id":13,"building_id":1,"group_type":9,"name":"水泵","parent_id":11,"prop_area":5000,"prop_num":50,"created_at":"2019-02-01 18:10:20","updated_at":"2019-02-01 18:10:20"},{"id":14,"building_id":1,"group_type":9,"name":"通风机","parent_id":11,"prop_area":5000,"prop_num":50,"created_at":"2019-02-01 18:10:20","updated_at":"2019-02-01 18:10:20"},{"id":16,"building_id":1,"group_type":9,"name":"网络机房","parent_id":15,"prop_area":15000,"prop_num":50,"created_at":"2019-02-01 18:10:28","updated_at":"2019-02-01 18:10:28"},{"id":17,"building_id":1,"group_type":9,"name":"洗衣房","parent_id":15,"prop_area":15000,"prop_num":50,"created_at":"2019-02-01 18:10:28","updated_at":"2019-02-01 18:10:28"},{"id":18,"building_id":1,"group_type":9,"name":"厨房","parent_id":15,"prop_area":15000,"prop_num":50,"created_at":"2019-02-01 18:10:28","updated_at":"2019-02-01 18:10:28"},{"id":19,"building_id":1,"group_type":9,"name":"电话机房","parent_id":15,"prop_area":15000,"prop_num":50,"created_at":"2019-02-01 18:10:28","updated_at":"2019-02-01 18:10:28"},{"id":20,"building_id":1,"group_type":9,"name":"开闭站","parent_id":15,"prop_area":15000,"prop_num":50,"created_at":"2019-02-01 18:10:28","updated_at":"2019-02-01 18:10:28"},{"id":21,"building_id":1,"group_type":9,"name":"消防用电","parent_id":15,"prop_area":15000,"prop_num":50,"created_at":"2019-02-01 18:10:28","updated_at":"2019-02-01 18:10:28"},{"id":22,"building_id":1,"group_type":9,"name":"租户用电","parent_id":15,"prop_area":15000,"prop_num":50,"created_at":"2019-02-01 18:10:28","updated_at":"2019-02-01 18:10:28"},{"id":23,"building_id":1,"group_type":9,"name":"其他","parent_id":15,"prop_area":15000,"prop_num":50,"created_at":"2019-02-01 18:10:28","updated_at":"2019-02-01 18:10:28"}],"dailyDatas":[{"datas":[{"val":"1935.6000","key":"2019-06-19"},{"val":"826.8000","key":"2019-06-20"},{"val":"368.4000","key":"2019-06-21"},{"val":"777.6000","key":"2019-06-22"},{"val":"4992.0000","key":"2019-06-23"},{"val":"3922.8000","key":"2019-06-24"},{"val":"4242.0000","key":"2019-06-25"},{"val":"5286.0000","key":"2019-06-26"}],"key":"record_date","val":"useValue","unit":"kwh","prop_area":10000,"prop_num":50,"name":"照明与插座","gid":1},{"datas":[{"val":"3080.4000","key":"2019-06-19"},{"val":"1989.6000","key":"2019-06-20"},{"val":"693.6000","key":"2019-06-21"},{"val":"954.0000","key":"2019-06-22"},{"val":"4522.8000","key":"2019-06-23"},{"val":"3934.8000","key":"2019-06-24"},{"val":"3337.2000","key":"2019-06-25"},{"val":"5001.6000","key":"2019-06-26"}],"key":"record_date","val":"useValue","unit":"kwh","prop_area":5000,"prop_num":50,"name":"空调用电","gid":6},{"datas":[{"val":"4017.6000","key":"2019-06-19"},{"val":"3618.0000","key":"2019-06-20"},{"val":"972.0000","key":"2019-06-21"},{"val":"669.6000","key":"2019-06-22"},{"val":"4210.8000","key":"2019-06-23"},{"val":"4398.0000","key":"2019-06-24"},{"val":"1960.8000","key":"2019-06-25"},{"val":"4940.4000","key":"2019-06-26"}],"key":"record_date","val":"useValue","unit":"kwh","prop_area":5000,"prop_num":50,"name":"动力用电","gid":11},{"datas":[{"val":"11604.0000","key":"2019-06-19"},{"val":"8947.2000","key":"2019-06-20"},{"val":"2672.4000","key":"2019-06-21"},{"val":"2762.4000","key":"2019-06-22"},{"val":"10538.4000","key":"2019-06-23"},{"val":"10084.8000","key":"2019-06-24"},{"val":"5725.2000","key":"2019-06-25"},{"val":"11750.4000","key":"2019-06-26"}],"key":"record_date","val":"useValue","unit":"kwh","prop_area":15000,"prop_num":50,"name":"特殊用电","gid":15}],"summaryDatas":[]}},
	"/undefined/statistics/ajaxMeterSummary": {"code":"10000","msg":"success","sub_code":"","sub_msg":"success","result":{"from":"2019-06-19","to":"2019-06-26","building":{"id":1,"name":"大楼一号","capacity":12000,"capacity_text":"日耗电1.2w度","area":10000,"fee_policy":"{\r\n\t\"ammeter\": 0.85,\r\n\t\"watermeter\": 2.2,\r\n\t\"gasmeter\": 1.9,\r\n\t\"vapormeter\": 3.5\r\n}","status":"已建成","type":"政府项目","photo":"https:\/\/static-pvm.sunallies.com\/business.jpg","address":"浙江省宁波市宁海县金港路26号","latitude":29.304051000000001,"longitude":121.62177800000001,"location_id":61,"owner_id":1,"note":null,"created_at":"2019-02-11 18:00:36","updated_at":"2019-02-11 18:00:36"},"summaryData":{"internationalValue":0.14999999999999999,"total1Name":"总电量","total1Unit":"kwh","total1":"310303.2000","totalCompare1Month":"0","totalCompare1Year":"0","total2Name":"总水量","total2Unit":"吨","total2":0,"totalCompare2Month":0,"totalCompare2Year":0,"total3Name":"总燃气量","total3Unit":"立方米","total3":0,"totalCompare3Month":0,"totalCompare3Year":0,"total4Name":"总蒸汽量","total4Unit":"吨","total4":0,"totalCompare4Month":0,"totalCompare4Year":0},"chartDatas":{"ammeter":{"datas":[{"val":6522.8999999999996,"key":"2019-06-19"},{"val":6124.0799999999999,"key":"2019-06-20"},{"val":4129.9800000000005,"key":"2019-06-21"},{"val":6112.8600000000006,"key":"2019-06-22"},{"val":7569.4200000000001,"key":"2019-06-23"},{"val":9318.7200000000012,"key":"2019-06-24"},{"val":8973.9600000000009,"key":"2019-06-25"},{"val":10318.32,"key":"2019-06-26"}],"key":"record_date","val":"useValue","unit":"kwh","prop_area":10000,"name":"电量","area":10000,"fee_policy":0.84999999999999998},"watermeter":{"datas":[],"key":"record_date","val":"useValue","unit":"吨","prop_area":10000,"name":"水量","area":10000,"fee_policy":2.2000000000000002},"gasmeter":{"datas":[],"key":"record_date","val":"useValue","unit":"立方米","prop_area":10000,"name":"燃气量","area":10000,"fee_policy":1.8999999999999999},"vapormeter":{"datas":[],"key":"record_date","val":"useValue","unit":"吨","prop_area":10000,"name":"蒸汽费","area":10000,"fee_policy":3.5}},"totalVal":[{"name":"总电量","val":"310303.2000"},{"name":"总水量","val":0},{"name":"总燃气量","val":0},{"name":"总蒸汽量","val":0}],"dailyList":{"title":["日期","总电量","总电量密度","总水量","总水量密度","总燃气量","总燃气量密度","总蒸汽量","总蒸汽量密度"],"data":[["2019-06-19",6522.8999999999996,0.65000000000000002,0,0,0,0,0,0],["2019-06-20",6124.0799999999999,0.60999999999999999,0,0,0,0,0,0],["2019-06-21",4129.9799999999996,0.40999999999999998,0,0,0,0,0,0],["2019-06-22",6112.8599999999997,0.60999999999999999,0,0,0,0,0,0],["2019-06-23",7569.4200000000001,0.76000000000000001,0,0,0,0,0,0],["2019-06-24",9318.7199999999993,0.93000000000000005,0,0,0,0,0,0],["2019-06-25",8973.9599999999991,0.90000000000000002,0,0,0,0,0,0],["2019-06-26",10318.32,1.03,0,0,0,0,0,0]]}}},
	"/undefined/warning/ajaxWarning": {"code":"10000","msg":"success","sub_code":"","sub_msg":"success","result":{"from":"2019-06-01","to":"2019-06-26","types":[{"id":9,"name":"能耗分项"},{"id":10,"name":"建筑区域"},{"id":11,"name":"组织机构"},{"id":12,"name":"自定义类别"}],"warningSummary":[{"name":"电","unDealNum":2,"monthNum":2,"totalNum":5},{"name":"水","unDealNum":0,"monthNum":0,"totalNum":0},{"name":"天然气","unDealNum":0,"monthNum":0,"totalNum":0},{"name":"蒸汽","unDealNum":0,"monthNum":0,"totalNum":0},{"name":"室内环境","unDealNum":0,"monthNum":0,"totalNum":0}],"warningList":{"title":{"id":"序号","type":"报警类型","recorded_at":"报警时间","device_name":"设备名称","device_type":"设备类型","plant_use":"计划使用(kwh)","actual_use":"实际使用(kwh)","present":"超出比例"},"data":[{"id":10001,"type":"能耗计划","recorded_at":"2019-06-26 00:36:52","device_name":"2F 空调","device_type":"ammeter","plant_use":227,"actual_use":270,"present":"15.93%"},{"id":10002,"type":"能耗计划","recorded_at":"2019-06-25 00:55:54","device_name":"2F 空调","device_type":"ammeter","plant_use":112,"actual_use":143,"present":"21.68%"},{"id":10003,"type":"能耗计划","recorded_at":"2019-06-23 23:44:12","device_name":"2F 空调","device_type":"ammeter","plant_use":269,"actual_use":296,"present":"9.12%"},{"id":10004,"type":"能耗计划","recorded_at":"2019-06-22 23:55:06","device_name":"2F 空调","device_type":"ammeter","plant_use":419,"actual_use":431,"present":"2.78%"},{"id":10005,"type":"能耗计划","recorded_at":"2019-06-22 00:32:32","device_name":"2F 空调","device_type":"ammeter","plant_use":178,"actual_use":203,"present":"12.32%"},{"id":10006,"type":"能耗计划","recorded_at":"2019-06-21 01:03:59","device_name":"2F 空调","device_type":"ammeter","plant_use":254,"actual_use":302,"present":"15.89%"},{"id":10007,"type":"能耗计划","recorded_at":"2019-06-19 22:30:50","device_name":"2F 空调","device_type":"ammeter","plant_use":344,"actual_use":393,"present":"12.47%"},{"id":10008,"type":"能耗计划","recorded_at":"2019-06-19 00:51:43","device_name":"2F 空调","device_type":"ammeter","plant_use":59,"actual_use":101,"present":"41.58%"},{"id":10009,"type":"能耗计划","recorded_at":"2019-06-17 22:35:23","device_name":"2F 空调","device_type":"ammeter","plant_use":102,"actual_use":146,"present":"30.14%"}]}}},
	"/undefined/warning/ajaxAlertList": {"code":"10000","msg":"success","sub_code":"","sub_msg":"success","result":{"warningList":{"title":{"id":"序号","type_txt":"报警类型","name":"管理员","sendTo":"发送","from":"最早时间","to":"最晚时间","span":"时间间隔(分钟)","status":"状态"},"data":[{"id":1,"type":"email","type_txt":"邮件","name":"老王","sendTo":"sam@123.com","from":"08:00","to":"21:00","span":"60","status":"正常"},{"id":1,"type":"sms","type_txt":"短信","name":"老王","sendTo":"15821111111","from":"08:00","to":"21:00","span":"60","status":"正常"}]}}},
	"/undefined/settings/ajaxGroupTree": {"code":"10000","msg":"success","sub_code":"","sub_msg":"success","result":{"building":{"id":1,"name":"大楼一号","capacity":12000,"capacity_text":"日耗电1.2w度","area":10000,"fee_policy":"{\r\n\t\"ammeter\": 0.85,\r\n\t\"watermeter\": 2.2,\r\n\t\"gasmeter\": 1.9,\r\n\t\"vapormeter\": 3.5\r\n}","status":"已建成","type":"政府项目","photo":"https:\/\/static-pvm.sunallies.com\/business.jpg","address":"浙江省宁波市宁海县金港路26号","latitude":29.304051000000001,"longitude":121.62177800000001,"location_id":61,"owner_id":1,"note":null,"created_at":"2019-02-11 18:00:36","updated_at":"2019-02-11 18:00:36"},"groups":[{"id":"-9","name":"能耗分项","children":[{"id":1,"name":"照明与插座","children":[{"id":2,"name":"照明","children":[]},{"id":3,"name":"插座","children":[]},{"id":4,"name":"公共区域照明","children":[]},{"id":5,"name":"室外景观照明","children":[]}]},{"id":6,"name":"空调用电","children":[{"id":7,"name":"冷热站","children":[]},{"id":8,"name":"空调末端","children":[]},{"id":9,"name":"净化系统","children":[]},{"id":10,"name":"大型独立空调","children":[]}]},{"id":11,"name":"动力用电","children":[{"id":12,"name":"电梯","children":[]},{"id":13,"name":"水泵","children":[]},{"id":14,"name":"通风机","children":[]}]},{"id":15,"name":"特殊用电","children":[{"id":16,"name":"网络机房","children":[]},{"id":17,"name":"洗衣房","children":[]},{"id":18,"name":"厨房","children":[]},{"id":19,"name":"电话机房","children":[]},{"id":20,"name":"开闭站","children":[]},{"id":21,"name":"消防用电","children":[]},{"id":22,"name":"租户用电","children":[]},{"id":23,"name":"其他","children":[]}]}]},{"id":"-10","name":"建筑区域","children":[{"id":24,"name":"出租楼层","children":[{"id":25,"name":"1F","children":[]},{"id":26,"name":"2F","children":[]}]},{"id":28,"name":"自用楼层","children":[{"id":27,"name":"3F","children":[]}]}]},{"id":"-11","name":"组织机构","children":[{"id":34,"name":"商场","children":[{"id":37,"name":"A区","children":[]},{"id":38,"name":"B区","children":[]},{"id":39,"name":"C区","children":[]}]},{"id":35,"name":"地下车库","children":[{"id":40,"name":"A区","children":[]},{"id":41,"name":"B区","children":[]},{"id":42,"name":"C区","children":[]}]},{"id":36,"name":"办公楼层","children":[{"id":43,"name":"公共区域","children":[]},{"id":44,"name":"使用区域","children":[]}]}]},{"id":"-12","name":"自定义类别","children":[]}]}},
	"/undefined/settings/ajaxDeviceList": {"code":"10000","msg":"success","sub_code":"","sub_msg":"success","result":{"building":{"id":1,"name":"大楼一号","capacity":12000,"capacity_text":"日耗电1.2w度","area":10000,"fee_policy":"{\r\n\t\"ammeter\": 0.85,\r\n\t\"watermeter\": 2.2,\r\n\t\"gasmeter\": 1.9,\r\n\t\"vapormeter\": 3.5\r\n}","status":"已建成","type":"政府项目","photo":"https:\/\/static-pvm.sunallies.com\/business.jpg","address":"浙江省宁波市宁海县金港路26号","latitude":29.304051000000001,"longitude":121.62177800000001,"location_id":61,"owner_id":1,"note":null,"created_at":"2019-02-11 18:00:36","updated_at":"2019-02-11 18:00:36"},"collecors":[{"id":1,"build_id":"1","name":"采集器1","sn":"9414-0040-0000-0000-1040-b595-d040-0c48","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 15:39:56","updated_at":"2019-01-30 15:39:56","type":"collector","type_txt":"采集器"},{"id":2,"build_id":"1","name":"采集器2","sn":"2e48-0040-0000-0000-1040-0d64-8000-0654","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 16:37:31","updated_at":"2019-01-30 16:37:31","type":"collector","type_txt":"采集器"},{"id":3,"build_id":"1","name":"采集器3","sn":"3250-0040-0000-0000-1040-0d64-8080-0c4c","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 16:37:34","updated_at":"2019-01-30 16:37:34","type":"collector","type_txt":"采集器"},{"id":4,"build_id":"1","name":"采集器4","sn":"841d-0040-0000-0000-1040-cd98-9880-0834","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-31 13:53:02","updated_at":"2019-01-31 13:53:02","type":"collector","type_txt":"采集器"},{"id":5,"build_id":"1","name":"采集器5","sn":"e671-0040-0000-0000-1040-b595-d080-0d84","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 16:10:24","updated_at":"2019-01-30 16:10:24","type":"collector","type_txt":"采集器"},{"id":6,"build_id":"1","name":"采集器6","sn":"841d-0040-0000-0000-1040-cd98-9880-0834","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 16:10:46","updated_at":"2019-01-30 16:10:46","type":"collector","type_txt":"采集器"},{"id":7,"build_id":"1","name":"采集器7","sn":"2c7e-0040-0000-0000-1040-b595-d0c0-0c74","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 16:11:17","updated_at":"2019-01-30 16:11:17","type":"collector","type_txt":"采集器"},{"id":8,"build_id":"1","name":"采集器8","sn":"\t\r\n0663-0040-0000-0000-1040-b595-d080-0fd4","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 15:42:41","updated_at":"2019-01-30 15:42:41","type":"collector","type_txt":"采集器"},{"id":9,"build_id":"1","name":"采集器9","sn":"d02e-0040-0000-0000-1040-0d64-8040-0b70","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 15:42:48","updated_at":"2019-01-30 15:42:48","type":"collector","type_txt":"采集器"},{"id":10,"build_id":"1","name":"采集器100","sn":"9601-0040-0000-0000-1040-8df0-70c0-0eb8","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 15:51:37","updated_at":"2019-01-30 15:51:37","type":"collector","type_txt":"采集器"},{"id":11,"build_id":"1","name":"采集器101","sn":"2e27-0040-0000-0000-1040-551f-a0c0-0624","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 15:51:54","updated_at":"2019-01-30 15:51:54","type":"collector","type_txt":"采集器"},{"id":12,"build_id":"1","name":"采集器102","sn":"ee68-0040-0000-0000-1040-8df0-70c0-0938","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 15:52:08","updated_at":"2019-01-30 15:52:08","type":"collector","type_txt":"采集器"},{"id":16,"build_id":"1","name":"采集器200","sn":"2e27-0040-0000-0000-1040-551f-a0c0-0624","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-15 14:25:00","updated_at":"2019-01-15 14:25:00","type":"collector","type_txt":"采集器"}],"meters":[{"bid":1,"id":1,"name":"主表1","sn":"10010866837","cid":1,"is_main":1,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":2,"name":"主表2","sn":"1541817142","cid":2,"is_main":1,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":3,"name":"主表3","sn":"1541817143","cid":2,"is_main":1,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":4,"name":"主表4","sn":"10015693022","cid":3,"is_main":1,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":5,"name":"1F 照明","sn":"0400419832","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":6,"name":"2F 照明","sn":"0400422331","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":7,"name":"3F 照明","sn":"0400422334","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":8,"name":"1F 空调","sn":"0400422330","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":9,"name":"2F 空调","sn":"0400422329","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":10,"name":"3F 空调","sn":"10010810055","cid":10,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":11,"name":"电梯","sn":"10010807694","cid":11,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":12,"name":"水泵","sn":"10010810254","cid":12,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":13,"name":"通风机","sn":"10010810057","cid":13,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":14,"name":"1F 洗衣房","sn":"10010810083","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":15,"name":"1F 厨房","sn":"10010810084","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":16,"name":"3F 网络机房","sn":"10010810085","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":17,"name":"3F 电话机房","sn":"10010810117","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":18,"name":"1F 开闭站","sn":"10010813634","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":19,"name":"1F 消防用电","sn":"0400422338","cid":6,"is_main":0,"rate":"120","note":null,"type":"ammeter","type_txt":"电表"},{"bid":1,"id":20,"name":"1F 租户用电","sn":"0400422336","cid":6,"is_main":0,"rate":"120","note":null,"type":"ammeter","type_txt":"电表"},{"bid":1,"id":21,"name":"2F 租户用电","sn":"0400422331","cid":6,"is_main":0,"rate":"120","note":null,"type":"ammeter","type_txt":"电表"},{"bid":1,"id":1,"name":"水表总","sn":"10015695087","cid":10,"is_main":1,"rate":"1","note":null,"type":"watermeter","type_txt":"水表"},{"bid":1,"id":2,"name":"水表高层","sn":"10010813636","cid":11,"is_main":0,"rate":"1","note":null,"type":"watermeter","type_txt":"水表"},{"bid":1,"id":3,"name":"水表底层","sn":"10006719828","cid":12,"is_main":0,"rate":"1","note":null,"type":"watermeter","type_txt":"水表"}],"collectorList":{"title":{"id":"编号","type_txt":"类型","name":"名称","sn":"SN","from":"厂家","sim":"sim","note":"备注"},"data":[{"id":1,"build_id":"1","name":"采集器1","sn":"9414-0040-0000-0000-1040-b595-d040-0c48","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 15:39:56","updated_at":"2019-01-30 15:39:56","type":"collector","type_txt":"采集器"},{"id":2,"build_id":"1","name":"采集器2","sn":"2e48-0040-0000-0000-1040-0d64-8000-0654","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 16:37:31","updated_at":"2019-01-30 16:37:31","type":"collector","type_txt":"采集器"},{"id":3,"build_id":"1","name":"采集器3","sn":"3250-0040-0000-0000-1040-0d64-8080-0c4c","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 16:37:34","updated_at":"2019-01-30 16:37:34","type":"collector","type_txt":"采集器"},{"id":4,"build_id":"1","name":"采集器4","sn":"841d-0040-0000-0000-1040-cd98-9880-0834","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-31 13:53:02","updated_at":"2019-01-31 13:53:02","type":"collector","type_txt":"采集器"},{"id":5,"build_id":"1","name":"采集器5","sn":"e671-0040-0000-0000-1040-b595-d080-0d84","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 16:10:24","updated_at":"2019-01-30 16:10:24","type":"collector","type_txt":"采集器"},{"id":6,"build_id":"1","name":"采集器6","sn":"841d-0040-0000-0000-1040-cd98-9880-0834","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 16:10:46","updated_at":"2019-01-30 16:10:46","type":"collector","type_txt":"采集器"},{"id":7,"build_id":"1","name":"采集器7","sn":"2c7e-0040-0000-0000-1040-b595-d0c0-0c74","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 16:11:17","updated_at":"2019-01-30 16:11:17","type":"collector","type_txt":"采集器"},{"id":8,"build_id":"1","name":"采集器8","sn":"\t\r\n0663-0040-0000-0000-1040-b595-d080-0fd4","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 15:42:41","updated_at":"2019-01-30 15:42:41","type":"collector","type_txt":"采集器"},{"id":9,"build_id":"1","name":"采集器9","sn":"d02e-0040-0000-0000-1040-0d64-8040-0b70","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 15:42:48","updated_at":"2019-01-30 15:42:48","type":"collector","type_txt":"采集器"},{"id":10,"build_id":"1","name":"采集器100","sn":"9601-0040-0000-0000-1040-8df0-70c0-0eb8","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 15:51:37","updated_at":"2019-01-30 15:51:37","type":"collector","type_txt":"采集器"},{"id":11,"build_id":"1","name":"采集器101","sn":"2e27-0040-0000-0000-1040-551f-a0c0-0624","status":"正常","from":"和远智能","sim":"","note":"通讯管理机","created_at":"2019-01-30 15:51:54","updated_at":"2019-01-30 15:51:54","type":"collector","type_txt":"采集器"},{"id":12,"build_id":"1","name":"采集器102","sn":"ee68-0040-0000-0000-1040-8df0-70c0-0938","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-30 15:52:08","updated_at":"2019-01-30 15:52:08","type":"collector","type_txt":"采集器"},{"id":16,"build_id":"1","name":"采集器200","sn":"2e27-0040-0000-0000-1040-551f-a0c0-0624","status":"正常","from":"ruff","sim":"","note":null,"created_at":"2019-01-15 14:25:00","updated_at":"2019-01-15 14:25:00","type":"collector","type_txt":"采集器"}]},"meterList":{"title":{"id":"编号","type_txt":"类型","name":"名称","sn":"SN","is_main":"主表","rate":"倍率","note":"备注"},"data":[{"bid":1,"id":1,"name":"主表1","sn":"10010866837","cid":1,"is_main":1,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":2,"name":"主表2","sn":"1541817142","cid":2,"is_main":1,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":3,"name":"主表3","sn":"1541817143","cid":2,"is_main":1,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":4,"name":"主表4","sn":"10015693022","cid":3,"is_main":1,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":5,"name":"1F 照明","sn":"0400419832","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":6,"name":"2F 照明","sn":"0400422331","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":7,"name":"3F 照明","sn":"0400422334","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":8,"name":"1F 空调","sn":"0400422330","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":9,"name":"2F 空调","sn":"0400422329","cid":6,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":10,"name":"3F 空调","sn":"10010810055","cid":10,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":11,"name":"电梯","sn":"10010807694","cid":11,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":12,"name":"水泵","sn":"10010810254","cid":12,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":13,"name":"通风机","sn":"10010810057","cid":13,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":14,"name":"1F 洗衣房","sn":"10010810083","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":15,"name":"1F 厨房","sn":"10010810084","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":16,"name":"3F 网络机房","sn":"10010810085","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":17,"name":"3F 电话机房","sn":"10010810117","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":18,"name":"1F 开闭站","sn":"10010813634","cid":14,"is_main":0,"rate":"120","note":"","type":"ammeter","type_txt":"电表"},{"bid":1,"id":19,"name":"1F 消防用电","sn":"0400422338","cid":6,"is_main":0,"rate":"120","note":null,"type":"ammeter","type_txt":"电表"},{"bid":1,"id":20,"name":"1F 租户用电","sn":"0400422336","cid":6,"is_main":0,"rate":"120","note":null,"type":"ammeter","type_txt":"电表"},{"bid":1,"id":21,"name":"2F 租户用电","sn":"0400422331","cid":6,"is_main":0,"rate":"120","note":null,"type":"ammeter","type_txt":"电表"},{"bid":1,"id":1,"name":"水表总","sn":"10015695087","cid":10,"is_main":1,"rate":"1","note":null,"type":"watermeter","type_txt":"水表"},{"bid":1,"id":2,"name":"水表高层","sn":"10010813636","cid":11,"is_main":0,"rate":"1","note":null,"type":"watermeter","type_txt":"水表"},{"bid":1,"id":3,"name":"水表底层","sn":"10006719828","cid":12,"is_main":0,"rate":"1","note":null,"type":"watermeter","type_txt":"水表"}]}}},
	"/ajaxBuildingList": {"code":"10000","msg":"success","sub_code":"","sub_msg":"success","result":{"buildingList":{"title":{"photo":"图片","name":"名称","address":"地址","area":"面积"},"data":[{"id":1,"name":"大楼一号","capacity":12000,"capacity_text":"日耗电1.2w度","area":10000,"fee_policy":"{\r\n\t\"ammeter\": 0.85,\r\n\t\"watermeter\": 2.2,\r\n\t\"gasmeter\": 1.9,\r\n\t\"vapormeter\": 3.5\r\n}","status":"已建成","type":"政府项目","photo":"images\/img.jpg","address":"浙江省宁波市宁海县金港路26号","latitude":29.304051000000001,"longitude":121.62177800000001,"location_id":61,"owner_id":1,"note":null,"created_at":"2019-02-11 18:00:36","updated_at":"2019-02-11 18:00:36"},{"id":2,"name":"大楼二号","capacity":900,"capacity_text":"节能演示","area":10000,"fee_policy":"{\r\n\t\"ammeter\": 0.85,\r\n\t\"watermeter\": 2.2,\r\n\t\"gasmeter\": 1.9,\r\n\t\"vapormeter\": 3.5\r\n}","status":"已建成","type":"测试项目","photo":"images\/img.jpg","address":"浙江省宁波市宁海县桃源街道","latitude":29.335837000000001,"longitude":121.45603,"location_id":null,"owner_id":1,"note":null,"created_at":"2019-02-11 17:59:17","updated_at":"2019-02-11 17:59:17"}]}}},




	"ajax/login": {"code": 200, "msg": "success", "data": { id: 1, name: "sam", "email": "sam@123.com", "photo_url": null}},
	"ajax/getUserBuildings": {"code":200,"msg":"success","data":[{"id":56,"code":"110105C001","name":"嘉兴市融通商务中心4号楼","type":"A","province":null,"city":null,"build_year":"2017","floor_num":10,"area":"10932.00","refrigeration_area":"7920.00","heating_area":"7920.00","air_conditioning":"B","heating":"A","coefficient":null,"ratio":null,"structure":"B","wall_material":"A","wall_warm":"A","window":"A","glass":"A","window_frame":"A","longitude":"116.44","latitude":"39.87","address":"浙江省嘉兴市南湖区文桥路505号融通商务中心4号楼","owner":"人民卫生出版社有限公司","intro":"","photo_url":null,"insert_date":"2017-05-23 11:24:51","monitoring":0}]},
	"ajax/getBuildingSummaryData": {"code": 200, "msg": "success", "data": {}},

	"ajax/getItemGroups": {"code":200,"msg":"success","data":[{"id":1,"code":"010000","type":"能耗分项","name":"电（总）","parent":null,"note":null,"area":null,"building_id":56,"itemNum":3},{"id":2,"code":"010100","type":"能耗分项","name":"照明插座用电","parent":1,"note":null,"area":null,"building_id":56,"itemNum":2},{"id":3,"code":"010200","type":"能耗分项","name":"空调用电","parent":1,"note":null,"area":null,"building_id":56,"itemNum":1},{"id":4,"code":"010300","type":"能耗分项","name":"动力用电","parent":1,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":5,"code":"010400","type":"能耗分项","name":"特殊用电","parent":1,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":6,"code":"010101","type":"能耗分项","name":"照明与插座","parent":2,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":7,"code":"010102","type":"能耗分项","name":"照明","parent":2,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":8,"code":"010103","type":"能耗分项","name":"插座","parent":2,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":9,"code":"010104","type":"能耗分项","name":"公共区域照明","parent":2,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":10,"code":"010105","type":"能耗分项","name":"室外景观照明","parent":2,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":11,"code":"010201","type":"能耗分项","name":"冷热站","parent":3,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":12,"code":"010202","type":"能耗分项","name":"空调末端","parent":3,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":13,"code":"010203","type":"能耗分项","name":"净化系统","parent":3,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":14,"code":"010204","type":"能耗分项","name":"大型独立空调","parent":3,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":15,"code":"010301","type":"能耗分项","name":"电梯","parent":4,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":16,"code":"010302","type":"能耗分项","name":"水泵","parent":4,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":17,"code":"010303","type":"能耗分项","name":"通风机","parent":4,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":18,"code":"010401","type":"能耗分项","name":"网络机房","parent":5,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":19,"code":"010402","type":"能耗分项","name":"洗衣房","parent":5,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":20,"code":"010403","type":"能耗分项","name":"厨房","parent":5,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":21,"code":"010404","type":"能耗分项","name":"电话机房","parent":5,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":22,"code":"010405","type":"能耗分项","name":"开闭站","parent":5,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":23,"code":"010406","type":"能耗分项","name":"消防用电","parent":5,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":24,"code":"010407","type":"能耗分项","name":"租户用电","parent":5,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":35,"code":"010418","type":"能耗分项","name":"其他","parent":5,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":36,"code":"020000","type":"能耗分项","name":"水（总）","parent":null,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":37,"code":"020100","type":"能耗分项","name":"办公用水","parent":36,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":38,"code":"020200","type":"能耗分项","name":"厨房用水","parent":36,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":99,"code":"030000","type":"能耗分项","name":"燃气（总）","parent":null,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":100,"code":"030110","type":"能耗分项","name":"燃气（分）","parent":99,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":101,"code":"110000","type":"组织机构","name":"电（总）","parent":null,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":102,"code":"110100","type":"组织机构","name":"食堂","parent":101,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":103,"code":"110200","type":"组织机构","name":"3F","parent":101,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":104,"code":"110300","type":"组织机构","name":"4F","parent":101,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":105,"code":"110400","type":"组织机构","name":"5F","parent":101,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":106,"code":"110500","type":"组织机构","name":"6F","parent":101,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":107,"code":"110600","type":"组织机构","name":"7F","parent":101,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":108,"code":"120000","type":"组织机构","name":"水（总）","parent":null,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":109,"code":"120100","type":"组织机构","name":"水（分）","parent":108,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":110,"code":"130000","type":"组织机构","name":"燃气（总）","parent":null,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":111,"code":"130100","type":"组织机构","name":"燃气（分）","parent":110,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":112,"code":"210000","type":"建筑区域","name":"电（总）","parent":null,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":113,"code":"210100","type":"建筑区域","name":"2F餐厅","parent":112,"note":null,"area":"","building_id":56,"itemNum":0},{"id":114,"code":"210200","type":"建筑区域","name":"3F办公","parent":112,"note":null,"area":"","building_id":56,"itemNum":0},{"id":115,"code":"210300","type":"建筑区域","name":"4F办公","parent":112,"note":null,"area":"","building_id":56,"itemNum":0},{"id":116,"code":"210400","type":"建筑区域","name":"5F办公","parent":112,"note":null,"area":"","building_id":56,"itemNum":0},{"id":117,"code":"210500","type":"建筑区域","name":"6F办公","parent":112,"note":null,"area":"","building_id":56,"itemNum":0},{"id":118,"code":"210600","type":"建筑区域","name":"7F办公","parent":112,"note":null,"area":"","building_id":56,"itemNum":0},{"id":119,"code":"210700","type":"建筑区域","name":"楼顶动力","parent":112,"note":null,"area":"","building_id":56,"itemNum":0},{"id":120,"code":"220000","type":"建筑区域","name":"水（总）","parent":null,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":121,"code":"220100","type":"建筑区域","name":"水（分）","parent":120,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":122,"code":"230000","type":"建筑区域","name":"燃气（总）","parent":null,"note":null,"area":null,"building_id":56,"itemNum":0},{"id":123,"code":"230100","type":"建筑区域","name":"燃气（分）","parent":122,"note":null,"area":null,"building_id":56,"itemNum":0}]},
    "ajax/getItems": {"code":200,"msg":"success","data":[{"id":1,"collector_id":1,"item_type":1,"code":"1","name":"1#进线","description":"1#进线","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":2,"collector_id":1,"item_type":1,"code":"2","name":"2#进线","description":"2#进线","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":79,"collector_id":4,"item_type":1,"code":"192","name":"7F 综合办1、领导室、领导室、领导室、领导室","description":"7F 综合办1、领导室、领导室、领导室、领导室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":80,"collector_id":4,"item_type":1,"code":"193","name":"7F 717（待定）、718（待定）","description":"7F 717（待定）、718（待定）","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":81,"collector_id":4,"item_type":1,"code":"194","name":"7F 会议室","description":"7F 会议室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":82,"collector_id":2,"item_type":1,"code":"50","name":"2F 烹饪区、面点间、切配区","description":"2F 烹饪区、面点间、切配区","data_type":11,"data_unit":"kwh","coefficient":"50.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":83,"collector_id":2,"item_type":1,"code":"51","name":"2F 售菜区","description":"2F 售菜区","data_type":11,"data_unit":"kwh","coefficient":"20.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":84,"collector_id":2,"item_type":1,"code":"52","name":"2F 餐厅","description":"2F 餐厅","data_type":11,"data_unit":"kwh","coefficient":"20.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":85,"collector_id":2,"item_type":1,"code":"53","name":"2F 仓库、粗加工间、男更衣室兼淋浴、女更衣室兼淋浴","description":"2F 仓库、粗加工间、男更衣室兼淋浴、女更衣室兼淋浴","data_type":11,"data_unit":"kwh","coefficient":"10.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":86,"collector_id":2,"item_type":1,"code":"54","name":"2F 包厢","description":"2F 包厢","data_type":11,"data_unit":"kwh","coefficient":"10.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":87,"collector_id":2,"item_type":1,"code":"55","name":"2F 超市","description":"2F 超市","data_type":11,"data_unit":"kwh","coefficient":"10.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":89,"collector_id":2,"item_type":1,"code":"57","name":"-1F 一层营业大厅","description":"-1F 一层营业大厅","data_type":11,"data_unit":"kwh","coefficient":"80.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":90,"collector_id":2,"item_type":1,"code":"58","name":"-1F 原有公共照明","description":"-1F 原有公共照明","data_type":11,"data_unit":"kwh","coefficient":"20.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":91,"collector_id":2,"item_type":1,"code":"59","name":"-1F 新增公共照明","description":"-1F 新增公共照明","data_type":11,"data_unit":"kwh","coefficient":"20.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":92,"collector_id":2,"item_type":1,"code":"60","name":"-1F 原有客梯1","description":"-1F 原有客梯1","data_type":11,"data_unit":"kwh","coefficient":"35.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":93,"collector_id":2,"item_type":1,"code":"61","name":"-1F 指挥中心","description":"-1F 指挥中心","data_type":11,"data_unit":"kwh","coefficient":"25.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":94,"collector_id":2,"item_type":1,"code":"62","name":"-1F 一层营业大厅","description":"-1F 一层营业大厅","data_type":11,"data_unit":"kwh","coefficient":"70.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":95,"collector_id":2,"item_type":1,"code":"63","name":"-1F 原有公共照明","description":"-1F 原有公共照明","data_type":11,"data_unit":"kwh","coefficient":"20.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":96,"collector_id":2,"item_type":1,"code":"64","name":"-1F 新增公共照明","description":"-1F 新增公共照明","data_type":11,"data_unit":"kwh","coefficient":"20.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":97,"collector_id":2,"item_type":1,"code":"65","name":"-1F 原有客梯2 ","description":"-1F 原有客梯2","data_type":11,"data_unit":"kwh","coefficient":"35.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":98,"collector_id":2,"item_type":1,"code":"66","name":"-1F 指挥中心","description":"-1F 指挥中心","data_type":11,"data_unit":"kwh","coefficient":"25.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":99,"collector_id":3,"item_type":1,"code":"3","name":"7F新风","description":"7F新风","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":100,"collector_id":3,"item_type":1,"code":"4","name":"6F 备用","description":"6F 备用","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":101,"collector_id":3,"item_type":1,"code":"5","name":"6F 监理办公室（8人）、资料室","description":"6F 监理办公室（8人）、资料室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":102,"collector_id":3,"item_type":1,"code":"6","name":"6F新风+感应门","description":"6F新风+感应门","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":103,"collector_id":3,"item_type":1,"code":"8","name":"5F 会客室、备用、营销室仓库","description":"5F 会客室、备用、营销室仓库","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":104,"collector_id":3,"item_type":1,"code":"9","name":"5F新风+感应门","description":"5F新风+感应门","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":105,"collector_id":3,"item_type":1,"code":"10","name":"4F 会议室","description":"4F 会议室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":106,"collector_id":3,"item_type":1,"code":"11","name":"4F 低压用检组、快响中心仓库、资料室、保洁休息室","description":"4F 低压用检组、快响中心仓库、资料室、保洁休息室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":107,"collector_id":3,"item_type":1,"code":"12","name":"4F新风+感应门","description":"4F新风+感应门","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":108,"collector_id":3,"item_type":1,"code":"13","name":"13  3F(空)","description":"13  3F(空)","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":109,"collector_id":3,"item_type":1,"code":"14","name":"14  3F(空)","description":"14  3F(空)","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":110,"collector_id":3,"item_type":1,"code":"15","name":"15 3F(空)","description":"15 3F(空)","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":111,"collector_id":4,"item_type":1,"code":"195","name":"7F 大会议室","description":"7F 大会议室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":112,"collector_id":4,"item_type":1,"code":"196","name":"6F 备用、运检组长室、运检室、资料室","description":"6F 备用、运检组长室、运检室、资料室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":113,"collector_id":4,"item_type":1,"code":"197","name":"6F 613（待定）、工程管理资料室","description":"6F 613（待定）、工程管理资料室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":114,"collector_id":4,"item_type":1,"code":"198","name":"6F 会议室","description":"6F 会议室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":115,"collector_id":4,"item_type":1,"code":"199","name":"6F 行政值班室、应急备班室","description":"6F 行政值班室、应急备班室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":116,"collector_id":4,"item_type":1,"code":"200","name":"5F  驾驶员室、营销组长室、营销室、资料室","description":"5F  驾驶员室、营销组长室、营销室、资料室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":117,"collector_id":4,"item_type":1,"code":"201","name":"5F 农电平台主任室","description":"5F 农电平台主任室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":118,"collector_id":4,"item_type":1,"code":"202","name":"5F 仓库","description":"5F 仓库","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":206,"collector_id":5,"item_type":2,"code":"4","name":"2F","description":"2F","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":207,"collector_id":5,"item_type":2,"code":"21","name":"3上","description":"3上","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":208,"collector_id":5,"item_type":2,"code":"6","name":"3下","description":"3下","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":209,"collector_id":5,"item_type":2,"code":"15","name":"4上","description":"4上","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":210,"collector_id":5,"item_type":2,"code":"9","name":"4下","description":"4下","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":211,"collector_id":5,"item_type":2,"code":"1","name":"5上","description":"5上","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":212,"collector_id":5,"item_type":2,"code":"8","name":"5下","description":"5下","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":213,"collector_id":5,"item_type":2,"code":"3","name":"6上","description":"6上","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":256,"collector_id":4,"item_type":1,"code":"203","name":"5F 接待室","description":"5F 接待室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":257,"collector_id":4,"item_type":1,"code":"204","name":"4F 主任室（2人）、副主任室（2人）、大客户经理组（12人）","description":"4F 主任室（2人）、副主任室（2人）、大客户经理组（12人）","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":258,"collector_id":4,"item_type":1,"code":"205","name":"4F  接待室","description":"4F  接待室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":259,"collector_id":4,"item_type":1,"code":"206","name":"4F  内勤室（6人）","description":"4F  内勤室（6人）","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":260,"collector_id":4,"item_type":1,"code":"207","name":"4F  207","description":"4F  207","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":261,"collector_id":4,"item_type":1,"code":"208","name":"3F  计量组、计量组长室、低压抄收组、材料库、资料室、更衣室","description":"3F  计量组、计量组长室、低压抄收组、材料库、资料室、更衣室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":262,"collector_id":4,"item_type":1,"code":"209","name":"3F 配表库房、分区空位","description":"3F 配表库房、分区空位","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":263,"collector_id":4,"item_type":1,"code":"210","name":"3F 会议室","description":"3F 会议室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":264,"collector_id":4,"item_type":1,"code":"211","name":"3F  211","description":"3F  211","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":265,"collector_id":3,"item_type":1,"code":"1","name":"7F 综合办2（4人）","description":"7F 综合办2（4人）","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":266,"collector_id":3,"item_type":1,"code":"2","name":"7F 应急指挥中心、党员活动室","description":"7F 应急指挥中心、党员活动室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":267,"collector_id":3,"item_type":1,"code":"7","name":"5F 会议室","description":"5F 会议室","data_type":11,"data_unit":"kwh","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":268,"collector_id":3,"item_type":1,"code":"16","name":"空调主机1","description":"空调主机1","data_type":11,"data_unit":"kwh","coefficient":"40.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":269,"collector_id":3,"item_type":1,"code":"17","name":"空调主机2","description":"空调主机2","data_type":11,"data_unit":"kwh","coefficient":"40.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":270,"collector_id":3,"item_type":1,"code":"18","name":"消防电梯","description":"消防电梯","data_type":11,"data_unit":"kwh","coefficient":"10.0000","max_value":10000,"state":0,"type_code":"01","type_name":"电表"},{"id":275,"collector_id":5,"item_type":2,"code":"13","name":"6下","description":"6下","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":276,"collector_id":5,"item_type":2,"code":"11","name":"7上","description":"7上","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"},{"id":278,"collector_id":5,"item_type":2,"code":"95","name":"7下","description":"7下","data_type":12,"data_unit":"吨","coefficient":"1.0000","max_value":10000,"state":0,"type_code":"02","type_name":"水表"}]},
    "ajax/getItemsByGroupId" : {"code":200,"msg":"success","data":[{"id":1,"code":"1","name":"1#进线"},{"id":2,"code":"2","name":"2#进线"},{"id":79,"code":"192","name":"7F 综合办1、领导室、领导室、领导室、领导室"}]},
    "ajax/getBaseDatas": {"code":200,"msg":"success","data":[{"id":1,"type":1,"name":"建筑类型","basic_code":"A","basic_name":"办公建筑"},{"id":2,"type":1,"name":"建筑类型","basic_code":"B","basic_name":"商场建筑"},{"id":3,"type":1,"name":"建筑类型","basic_code":"C","basic_name":"宾馆饭店建筑"},{"id":4,"type":1,"name":"建筑类型","basic_code":"D","basic_name":"文化教育建筑"},{"id":5,"type":1,"name":"建筑类型","basic_code":"E","basic_name":"医疗卫生建筑"},{"id":6,"type":1,"name":"建筑类型","basic_code":"F","basic_name":"体育建筑"},{"id":7,"type":1,"name":"建筑类型","basic_code":"H","basic_name":"综合建筑"},{"id":8,"type":1,"name":"建筑类型","basic_code":"J","basic_name":"其他建筑"},{"id":9,"type":2,"name":"空调系统形式","basic_code":"A","basic_name":"全空气系统"},{"id":10,"type":2,"name":"空调系统形式","basic_code":"B","basic_name":"风机盘管+新风系统"},{"id":11,"type":2,"name":"空调系统形式","basic_code":"C","basic_name":"分体式空调或变制冷剂流量多联式分体空调机组"},{"id":12,"type":2,"name":"空调系统形式","basic_code":"D","basic_name":"其他"},{"id":13,"type":3,"name":"采暖系统形式","basic_code":"A","basic_name":"散热器采暖"},{"id":14,"type":3,"name":"采暖系统形式","basic_code":"B","basic_name":"地板辐射采暖"},{"id":15,"type":3,"name":"采暖系统形式","basic_code":"C","basic_name":"电辐射采暖"},{"id":16,"type":3,"name":"采暖系统形式","basic_code":"D","basic_name":"其他"},{"id":17,"type":4,"name":"建筑结构形式","basic_code":"A","basic_name":"砖混结构"},{"id":18,"type":4,"name":"建筑结构形式","basic_code":"B","basic_name":"混凝土结构"},{"id":19,"type":4,"name":"建筑结构形式","basic_code":"C","basic_name":"钢结构"},{"id":20,"type":4,"name":"建筑结构形式","basic_code":"D","basic_name":"木结构"},{"id":21,"type":4,"name":"建筑结构形式","basic_code":"E","basic_name":"其他"},{"id":22,"type":5,"name":"建筑外墙材料类型","basic_code":"A","basic_name":"实心黏土砖"},{"id":23,"type":5,"name":"建筑外墙材料类型","basic_code":"B","basic_name":"空心黏土砖（多孔）"},{"id":24,"type":5,"name":"建筑外墙材料类型","basic_code":"C","basic_name":"灰砂砖"},{"id":25,"type":5,"name":"建筑外墙材料类型","basic_code":"D","basic_name":"加气混凝土砌砖"},{"id":26,"type":5,"name":"建筑外墙材料类型","basic_code":"E","basic_name":"玻璃幕墙"},{"id":27,"type":5,"name":"建筑外墙材料类型","basic_code":"F","basic_name":"其他"},{"id":28,"type":6,"name":"建筑外墙保温形式","basic_code":"A","basic_name":"内保温"},{"id":29,"type":6,"name":"建筑外墙保温形式","basic_code":"B","basic_name":"外保温"},{"id":30,"type":6,"name":"建筑外墙保温形式","basic_code":"C","basic_name":"夹芯保温"},{"id":31,"type":6,"name":"建筑外墙保温形式","basic_code":"D","basic_name":"其他"},{"id":32,"type":7,"name":"建筑外窗类型","basic_code":"A","basic_name":"单玻单层窗"},{"id":33,"type":7,"name":"建筑外窗类型","basic_code":"B","basic_name":"单玻双层窗"},{"id":34,"type":7,"name":"建筑外窗类型","basic_code":"C","basic_name":"单玻单层窗+单玻双层窗"},{"id":35,"type":7,"name":"建筑外窗类型","basic_code":"D","basic_name":"中空双层玻璃窗"},{"id":36,"type":7,"name":"建筑外窗类型","basic_code":"E","basic_name":"中空三层玻璃窗"},{"id":37,"type":7,"name":"建筑外窗类型","basic_code":"F","basic_name":"中空充惰性气体"},{"id":38,"type":7,"name":"建筑外窗类型","basic_code":"G","basic_name":"其他"},{"id":39,"type":8,"name":"建筑玻璃类型","basic_code":"A","basic_name":"普通玻璃"},{"id":40,"type":8,"name":"建筑玻璃类型","basic_code":"B","basic_name":"镀膜玻璃"},{"id":41,"type":8,"name":"建筑玻璃类型","basic_code":"C","basic_name":"Low-E玻璃"},{"id":42,"type":8,"name":"建筑玻璃类型","basic_code":"D","basic_name":"其他"},{"id":43,"type":9,"name":"建筑窗框材料类型","basic_code":"A","basic_name":"钢窗"},{"id":44,"type":9,"name":"建筑窗框材料类型","basic_code":"B","basic_name":"铝合金窗"},{"id":45,"type":9,"name":"建筑窗框材料类型","basic_code":"C","basic_name":"木窗"},{"id":46,"type":9,"name":"建筑窗框材料类型","basic_code":"D","basic_name":"断热窗"},{"id":47,"type":9,"name":"建筑窗框材料类型","basic_code":"E","basic_name":"其他"},{"id":48,"type":10,"name":"碳排放计算系数","basic_code":"carbon","basic_name":"0.5"},{"id":49,"type":10,"name":"当量标煤计算系数","basic_code":"coal","basic_name":"0.404"},{"id":50,"type":11,"name":"报表类型","basic_code":"A","basic_name":"电能报表"},{"id":51,"type":11,"name":"报表类型","basic_code":"B","basic_name":"水量报表"},{"id":52,"type":11,"name":"报表类型","basic_code":"C","basic_name":"天然气报表"},{"id":53,"type":11,"name":"报表类型","basic_code":"E","basic_name":"蒸汽量报表"},{"id":54,"type":11,"name":"报表类型","basic_code":"O","basic_name":"全能耗报表"},{"id":55,"type":12,"name":"电能耗图表Y轴功能","basic_code":"A","basic_name":"能耗"},{"id":56,"type":12,"name":"电能耗图表Y轴功能","basic_code":"B","basic_name":"费用"},{"id":57,"type":12,"name":"电能耗图表Y轴功能","basic_code":"C","basic_name":"标煤"},{"id":58,"type":12,"name":"电能耗图表Y轴功能","basic_code":"D","basic_name":"碳排放量"},{"id":59,"type":12,"name":"电能耗图表Y轴功能","basic_code":"E","basic_name":"能耗密度"},{"id":60,"type":13,"name":"其他能耗图表Y轴功能","basic_code":"F","basic_name":"能耗"},{"id":61,"type":13,"name":"其他能耗图表Y轴功能","basic_code":"G","basic_name":"费用"},{"id":62,"type":14,"name":"管道压力图表Y轴功能","basic_code":"H","basic_name":"压力值"},{"id":63,"type":15,"name":"能耗类型","basic_code":"A","basic_name":"电"},{"id":64,"type":15,"name":"能耗类型","basic_code":"B","basic_name":"水"},{"id":65,"type":15,"name":"能耗类型","basic_code":"C","basic_name":"燃气"},{"id":66,"type":15,"name":"能耗类型","basic_code":"E","basic_name":"蒸汽量"},{"id":67,"type":15,"name":"能耗类型","basic_code":"O","basic_name":"全能耗"},{"id":68,"type":16,"name":"冷热量类型","basic_code":"D1","basic_name":"冷量"},{"id":69,"type":16,"name":"冷热量类型","basic_code":"D2","basic_name":"热量"},{"id":70,"type":16,"name":"管道压力类型","basic_code":"F1","basic_name":"气体压力"},{"id":71,"type":16,"name":"管道压力类型","basic_code":"F2","basic_name":"液体压力"},{"id":72,"type":17,"name":"气体压力报警正常区间值1","basic_code":"F1A","basic_name":"110.86"},{"id":73,"type":17,"name":"气体压力报警正常区间值2","basic_code":"F1B","basic_name":"150.47"},{"id":74,"type":17,"name":"液体压力报警正常区间值1","basic_code":"F2A","basic_name":"30"},{"id":75,"type":17,"name":"液体压力报警正常区间值2","basic_code":"F2B","basic_name":"50"},{"id":76,"type":18,"name":"天气预报城市编码","basic_code":"weather","basic_name":"101200101"}]},

}