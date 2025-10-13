package com.example.be.service.category;

import com.example.be.dto.category.CategoryRequest;
import com.example.be.entity.category.Category;
import com.example.be.exception.CategoryNotFoundException;
import com.example.be.exception.SlugAlreadyExistsException;
import com.example.be.repository.category.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
