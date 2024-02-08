from django.db import router
from django.urls import include, path
from .views import *
from rest_framework import routers


app_name = "items"

router = routers.DefaultRouter()
router.register("items", ItemsList)  # this endpoint for (item, items_list)
router.register("categories", Categories)  # this endpoint for (category, category_list)
  # this endpoint for (image, image_list)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "category/<int:category_id>/",
        ItemByCategory.as_view(),
        name="items-by-category",
    ),  # this endpoint for (item_by_category)

]
