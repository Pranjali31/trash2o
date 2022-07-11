from django.urls import path
from .views import RefillPointAPIView, RefillPointDetailAPIView


urlpatterns = [
  path('locations/', RefillPointAPIView.as_view()),
  path('locations/<int:pk>/', RefillPointDetailAPIView.as_view()),
]