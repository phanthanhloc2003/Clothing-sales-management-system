package com.example.be.repository.category;

import com.example.be.entity.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    boolean existsBySlug(String slug);
    List<Category> findByParentIsNull();

}
