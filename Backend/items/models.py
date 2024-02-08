from django.db import models
from django.utils.text import slugify

# Create your models here.


class Items(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    category = models.ForeignKey("Category", related_name="category" ,on_delete=models.PROTECT)
    description = models.TextField()
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    slug = models.SlugField(null=True, blank=True, unique=True)

    class Meta:
        ordering = ["title"]
        verbose_name_plural = "Items"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Items, self).save(*args, **kwargs)


class Category(models.Model):
    category_name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.category_name




    
