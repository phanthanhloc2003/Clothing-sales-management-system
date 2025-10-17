package com.example.be.service.category;

import com.example.be.dto.category.CategoryRequest;
import com.example.be.entity.category.Category;
import com.example.be.exception.CategoryNotFoundException;
import com.example.be.exception.SlugAlreadyExistsException;
import com.example.be.repository.category.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    public Category createCategory(CategoryRequest request) {
        if (categoryRepository.existsBySlug(request.getSlug())) {
            throw new SlugAlreadyExistsException("Slug '" + request.getSlug() + "' đã tồn tại!");
        }

        Category parent = null;
        if (request.getParentId() != null) {
            parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new CategoryNotFoundException("Không tìm thấy category cha!"));
        }
        Category category = Category.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .description(request.getDescription())
                .parent(parent)
                .build();
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getParentCategories() {
        return categoryRepository.findByParentIsNull();
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public void deleteCategory(Integer id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Không tìm thấy category"));
        categoryRepository.delete(category);
    }

    @Override
    public Category updateCategory(Integer id, CategoryRequest request) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isEmpty()) {
            throw new CategoryNotFoundException("Category not found with id: " + id);
        }
        Category category = optionalCategory.get();
        if (request.getName() != null) {
            category.setName(request.getName());
        }
        if (request.getSlug() != null) {
            category.setSlug(request.getSlug());
        }
        if (request.getDescription() != null) {
            category.setDescription(request.getDescription());
        }
        if (request.getParentId() != null) {
            Category parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found"));
            category.setParent(parent);
        } else if (request.getParentId() == null) {
            category.setParent(null);
        }
        return categoryRepository.save(category);
    }

}
