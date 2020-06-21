from django.db.models import *
# Create your models here.
class Task(Model):
   
    label = CharField(max_length=150, null=True)
    time = TimeField()
    done = BooleanField(default=False, null=True, blank=True)
    important = BooleanField(default=False, null=True, blank=True)
    def __str__(self):
        return self.label