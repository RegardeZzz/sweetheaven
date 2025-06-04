from django.contrib import admin

# Register your models here.
# reviews/admin.py
from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author', 'product', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('author', 'text', 'product__name')
