package com.example.be.dto.category;

import lombok.Data;

@Data
public class CategoryRequest {
    private String name;
    private String slug;
    private String description;
    private Integer parentId;
}
