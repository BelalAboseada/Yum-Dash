from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class ItemsList(viewsets.ModelViewSet):

    queryset = Items.objects.all()
    serializer_class = ItemsSerializer
    permission_classes = [IsAuthenticated]


class Categories(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ItemByCategory(ListAPIView):
    serializer_class = ItemsSerializer

    def get_queryset(self):
        category_id = self.kwargs["category_id"]
        return Items.objects.filter(category__id=category_id)
