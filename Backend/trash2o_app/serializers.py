from rest_framework import serializers
from .models import Refill_Point


class RefillPointSerializer(serializers.ModelSerializer):
  class Meta:
    model = Refill_Point
    fields = '__all__'