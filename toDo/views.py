from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import TaskSerializer
from .models import Task
# Create your views here.


@api_view(['GET'])
def api(request):
    api_urls = {
        'List': '/all-tasks/',
        'Detail': '/all-tasks/<str:pk>/',
        'Create': '/create-task/',
        'Update': '/update-task/<str:pk>/',
        'Delete': '/delete-task/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def listView(request):
    tasks = Task.objects.all()
    serilizer = TaskSerializer(tasks, many=True)
    return Response(serilizer.data) 

@api_view(['GET'])
def detailTask(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task)
    return Response(serializer.data) 

@api_view(['POST'])
def createTask(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def updateTask(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(data=request.data, instance=task)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE', 'GET'])
def deleteTask(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response("Item Deleted!")
    