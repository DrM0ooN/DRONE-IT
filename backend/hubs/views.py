from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Hub
from .serializers import HubSerializer


class HubListView(APIView):
	def get(self, request):
		hubs = Hub.objects.all()
		data = HubSerializer(hubs, many=True).data
		return Response({'hubs': data})
