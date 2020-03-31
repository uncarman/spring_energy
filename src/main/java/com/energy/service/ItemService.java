package com.energy.service;

import com.energy.entity.Item;
import com.energy.entity.ItemGroup;
import com.energy.mapper.ItemMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class ItemService {

    @Resource
    private ItemMapper itemMapper = null;

    // 某建筑下所有[设备]
    public List<Item> getBuildingItems(Integer buildingId) {
        List<Item> list = itemMapper.getBuildingItems(buildingId);
        list.removeIf(Objects::isNull);
        return list;
    }

    // 某建筑下所有[设备分组]
    public List<Map> getItemGroups(Integer buildingId) {
        List<Map> list = itemMapper.getItemGroups(buildingId);
        list.removeIf(Objects::isNull);
        return list;
    }

    // [设备分组]信息
    public List<ItemGroup> getItemGroupByType(Integer buildingId, String type, String subType, String parent) {
        List<ItemGroup> list = itemMapper.getItemGroupByType(buildingId, type, subType, parent);
        list.removeIf(Objects::isNull);
        return list;
    }

    // 根据类型分类, 拿到一级itemGroup
    public ItemGroup getItemGroupIdByEnergyType(Integer buildingId, String type, String subType) {
        List<ItemGroup> list = itemMapper.getItemGroupByType(buildingId, type, subType, null);
        if( null != list && !list.isEmpty()) {
            return list.get(0);
        }
        return null;
    }


    // 更新设备分组和设备绑定关系
    @Transactional(rollbackFor = Exception.class)
    public void updateItemsGroupItems(Integer groupId, List<String>ItemIds) {
        itemMapper.deleteItemGroupMapper(groupId);
        itemMapper.insertItemGroupMapper(groupId, ItemIds);
    }

    public ItemGroup getItemGroupById(Integer id) {
        return itemMapper.getItemGroupById(id);
    }

    public List<ItemGroup> getItemGroupChildsById(Integer id) {
        List<ItemGroup> list = itemMapper.getItemGroupChildsById(id);
        list.removeIf(Objects::isNull);
        return list;
    }

    // 某个分组下的所有设备
    public List<Item> getItemsByGroupId(Integer groupId) {
        List<Item> list = itemMapper.getItemsByGroupId(groupId);
        list.removeIf(Objects::isNull);
        return list;
    }

    @Transactional(rollbackFor = Exception.class)
    public Integer createItemGroup(ItemGroup itemGroup) {
        return itemMapper.createItemGroup(itemGroup);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateItemGroup(ItemGroup itemGroup) {
        itemMapper.updateItemGroup(itemGroup);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteItemGroup(Integer id) {
        itemMapper.deleteItemGroup(id);
    }


    public Item getItemById(Integer id) {
        return itemMapper.getItemById(id);
    }

    public Map getItemCurrentData(Integer id) {
        return itemMapper.getItemCurrentData(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void createItem(Item item) {
        itemMapper.createItem(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateItem(Item item) {
        itemMapper.updateItem(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removeItem(Integer id) {
        itemMapper.deleteItem(id);
    }


}
