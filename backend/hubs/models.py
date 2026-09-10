from django.db import models

class Hub(models.Model):
	name = models.CharField(max_length=120)
	latitude = models.FloatField()
	longitude = models.FloatField()
	icon_url = models.CharField(max_length=255, default='/images/drone_hub_icon.png')

	class Meta:
		ordering = ['name']

	def __str__(self):
		return self.name
