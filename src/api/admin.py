from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostModel(admin.ModelAdmin):
    list_display = ['title', 'summary', 'date_posted', 'date_updated']
    list_filter = ['date_posted', 'date_updated']
    search_fields = ['title', 'summary', 'date_posted', 'date_updated']
