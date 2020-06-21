from django.urls import path
from .views import *

urlpatterns = [
    path('', api, name='api'),
    path('all-tasks/', listView, name='list'),
    path('all-tasks/<str:pk>', detailTask, name='detail'),
    path('create-task/', createTask, name='create'),
    path('update-task/<str:pk>', updateTask, name='update'),
    path('delete-task/<str:pk>', deleteTask, name='delete'),
]
