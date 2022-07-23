from django.urls import path
from .views import RefillPointAPIView, RefillPointDetailAPIView,UserListAPIView,UserDetailAPIView, ContainerListAPIView,ContainerDetailAPIView,LeaderBoardAPIView


urlpatterns = [
  path('locations/', RefillPointAPIView.as_view()),
  path('locations/<int:pk>/', RefillPointDetailAPIView.as_view()),
  path('users/', UserListAPIView.as_view()),
  path('users/<int:pk>/', UserDetailAPIView.as_view()),
  path('containers/', ContainerListAPIView.as_view()),
  path('containers/<int:pk>/', ContainerDetailAPIView.as_view()),
  path('leaders/', LeaderBoardAPIView.as_view()),
]