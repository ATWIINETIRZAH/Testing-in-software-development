from django.db import models

# # Create your models here.
# from django.db import models

# class User(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     # other fields...


from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name
