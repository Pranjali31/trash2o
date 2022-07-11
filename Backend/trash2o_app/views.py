from rest_framework import generics

from .models import Refill_Point
from .serializers import RefillPointSerializer


class RefillPointAPIView(generics.ListCreateAPIView):
  queryset = Refill_Point.objects.all()
  serializer_class = RefillPointSerializer


class RefillPointDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Refill_Point.objects.all()
  serializer_class = RefillPointSerializer