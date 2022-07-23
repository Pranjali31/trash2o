from rest_framework import generics
from django.contrib.auth.models import User
from django.db.models import Sum

from .models import Refill_Point, Container
from .serializers import RefillPointSerializer, UserSerializer, ContainerSerializer


class RefillPointAPIView(generics.ListCreateAPIView):
  queryset = Refill_Point.objects.all()
  serializer_class = RefillPointSerializer


class RefillPointDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Refill_Point.objects.all()
  serializer_class = RefillPointSerializer

class ContainerListAPIView(generics.ListCreateAPIView):
  queryset = Container.objects.all()
  serializer_class = ContainerSerializer

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

class ContainerDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Container.objects.all()
  serializer_class =ContainerSerializer


class UserListAPIView(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer


class UserDetailAPIView(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer



class LeaderBoardAPIView(generics.ListAPIView):
  serializer_class = ContainerSerializer

  
  def get_queryset(self):
    'Leaderboard'

    from datetime import datetime, timedelta
    one_week_ago = datetime.today() - timedelta(days=7)


    queryset = Container.objects.filter(date_added__lte=one_week_ago)
    users = User.objects.all()
    
    for user in users:
      queryset = queryset.filter(user=user)#.aggregate(Sum('quantity'))
      
    return queryset.order_by('quantity')