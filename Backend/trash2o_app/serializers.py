from rest_framework import serializers
from .models import Refill_Point, Container
from django.contrib.auth.models import User


class RefillPointSerializer(serializers.ModelSerializer):
  class Meta:
    model = Refill_Point
    fields = '__all__'

class ContainerSerializer(serializers.ModelSerializer):
  user = serializers.ReadOnlyField(source='user.username')

  class Meta:
    model = Container
    fields = ['id','user','brand','category','quantity','date_added']


class UserSerializer(serializers.ModelSerializer):
  container = serializers.StringRelatedField(many=True)

  class Meta:
    model = User
    fields = ['id', 'username','container']