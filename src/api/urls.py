from api import views
from django.urls import path

app_name = "api"

urlpatterns = [
    path('posts/', views.postsView, name="posts"),
    path('posts/<int:id>/', views.postDetailView, name="post_detail"),
    path('posts/delete/<int:id>/', views.deletePost, name="post_delete"),
]
