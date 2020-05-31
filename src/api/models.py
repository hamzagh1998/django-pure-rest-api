from django.db import models
from django.conf import settings

def uploadLocation(instance, filename):
    return 'Posts/{title}/{filename}'.format(title=instance.title, filename=filename)

class Post(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False)
    content = models.TextField(blank=False, null=False)
    image = models.URLField(null=True, blank=True)
    date_posted = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    @property
    def summary(self):
        return self.content[:10]

    def __str__(self):
        return self.title
