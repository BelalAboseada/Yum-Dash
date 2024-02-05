from django.db import models
from django.utils.text import slugify

# Create your models here.


class Items(models.Model):
    id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length=100, unique=True)
    item_description = models.TextField()
    item_price = models.DecimalField(max_digits=5, decimal_places=2)
    category = models.ForeignKey("Category", on_delete=models.PROTECT)
    slug = models.SlugField(null=True, blank=True, unique=True)

    class Meta:
        ordering = ["item_name"]
        verbose_name_plural = "Items"

    def __str__(self):
        return self.item_name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.item_name)
        super(Items, self).save(*args, **kwargs)


class Category(models.Model):
    category_name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.category_name


class Images(models.Model):
    image = models.ImageField(upload_to="images/")
    item = models.ForeignKey(Items, related_name="images", on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Images"

    def __str__(self):
        return self.item.item_name
