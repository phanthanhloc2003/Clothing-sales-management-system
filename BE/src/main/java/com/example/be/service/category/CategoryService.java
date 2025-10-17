package com.example.be.service.category;

import com.example.be.dto.category.CategoryRequest;
import com.example.be.entity.category.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryRequest request);
    List<Category> getParentCategories();
    List<Category> getAllCategories();
    void deleteCategory(Integer id);
    Category updateCategory(Integer id, CategoryRequest request);
}
