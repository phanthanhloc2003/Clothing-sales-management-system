package com.example.be.controller.category;

import com.example.be.dto.category.CategoryRequest;
import com.example.be.entity.category.Category;
import com.example.be.service.category.CategoryService;
import com.example.be.util.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody CategoryRequest request) {
        Category newCategory = categoryService.createCategory(request);
        return ResponseHandler.created(newCategory, "Category created successfully");
    }

    @GetMapping("/parents")
    public ResponseEntity<?> getParentCategories() {
        List<Category> parents = categoryService.getParentCategories();
        return ResponseHandler.success(parents, "Fetched parent categories successfully");
    }

    @GetMapping()
    public ResponseEntity<?> getAllCategories() {
        return ResponseHandler.success(categoryService.getAllCategories(),  "Fetched all categories successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
        return ResponseHandler.success(null, "Category deleted successfully");
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Integer id, @RequestBody CategoryRequest request) {
        Category updated = categoryService.updateCategory(id, request);
        return ResponseHandler.success(updated, "Category updated successfully");
    }
}
