package com.energy.mapper;

import com.energy.entity.Item;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ItemWarningMapper {
    public List<Map> getWarningList(@Param("buildingId")Integer buildingId,
                                 @Param("itemType")String itemType,
                                 @Param("hasFixed")String hasFixed,
                                 @Param("flowStatus")String flowStatus,
                                 @Param("limit")String limit,
                                 @Param("offset")String offset);

    public int getWarningCount(@Param("buildingId")Integer buildingId,
                                   @Param("itemType")String itemType,
                                   @Param("hasFixed")String hasFixed,
                                   @Param("flowStatus")String flowStatus,
                                   @Param("from")String from,
                                   @Param("to")String to);

    public void updateItemWarning(@Param("id")Integer id, @Param("operator")String operator,
                                  @Param("flowStatus")String flowStatus, @Param("note")String note);

    public void deleteItemWarning(@Param("id")Integer id);
}
