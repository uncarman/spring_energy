package com.energy.mapper;

import com.energy.entity.Item;
import com.energy.entity.ItemGroup;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ItemMapper {

    public List<Map> getItemGroups(@Param("buildingId")Integer buildingId);
    public List<ItemGroup> getItemGroupByType(@Param("buildingId")Integer buildingId, @Param("type")String type,
                                        @Param("subType")String subType, @Param("parent")String parent);
    public ItemGroup getItemGroupById(Integer id);
    public List<ItemGroup> getItemGroupChildsById(Integer id);
    public Integer createItemGroup(ItemGroup itemGroup);
    public void updateItemGroup(ItemGroup itemGroup);
    public void deleteItemGroup(Integer itemGroup);

    public void deleteItemGroupMapper(@Param("groupId")Integer groupId);
    public void insertItemGroupMapper(@Param("groupId")Integer groupId, @Param("itemIds")List<String> itemIds);

    public List<Map> getItemsByGroupId(@Param("groupId")Integer groupId);
    public Item getItemById(@Param("id")Integer id);
    public void createItem(Item item);
    public void updateItem(Item item);
    public void deleteItem(@Param("id")Integer id);

}
