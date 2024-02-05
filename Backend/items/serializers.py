from rest_framework import serializers
from .models import *


class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        exclude = ["slug"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        exclude = ["id"]


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        exclude = ["id"]
