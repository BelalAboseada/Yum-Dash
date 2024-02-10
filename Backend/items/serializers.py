from rest_framework import serializers
from .models import *


class ItemsSerializer(serializers.ModelSerializer):

    category = serializers.StringRelatedField(
        source="category.category_name", read_only=False
    )

    class Meta:
        model = Items
        # exclude = ["slug"]
        fields = ["id", "title", "price", "description", "category", "image"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        exclude = ["id"]
