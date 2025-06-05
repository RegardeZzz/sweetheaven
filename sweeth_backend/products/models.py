from django.db import models
from django.utils import timezone
from django.utils.text import slugify



class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название категории')
    slug = models.SlugField(unique=True, verbose_name='URL-идентификатор')

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255, verbose_name='Название продукта')
    slug = models.SlugField(max_length=255, unique=True, verbose_name="URL-идентификатор")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена')
    image = models.URLField(verbose_name="Изображение")
    short_description = models.CharField(max_length=255, verbose_name='Краткое описание', blank=True)
    weight_grams = models.PositiveIntegerField(null=True, blank=True, verbose_name='Вес (г)')
    shelf_life_days = models.PositiveIntegerField(null=True, blank=True, verbose_name='Срок хранения (дней)')
    semi_finished_hours = models.PositiveIntegerField(null=True, blank=True, verbose_name="Срок хранения (часов)")
    description = models.TextField(verbose_name="Полное описание")
    composition = models.TextField(verbose_name="Состав", blank=True, null=True)
    nutrition = models.TextField(verbose_name="Калорийность", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")  # ТОЛЬКО auto_now_add
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"
        ordering = ['-created_at']

    def __str__(self):
        return self.name


    def save(self, *args, **kwargs):
            if not self.slug:  # Генерируем только если slug пустой
                self.slug = slugify(self.name)
            super().save(*args, **kwargs)