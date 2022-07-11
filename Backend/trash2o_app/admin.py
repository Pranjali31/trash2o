from django.contrib import admin

from .models import (Refill_Point, Container)

@admin.register(Refill_Point)
class RefillAdmin(admin.ModelAdmin):
  list_display = ('description', 'location')
  search_fields = ('description', 'location')

@admin.register(Container)
class ContainerAdmin(admin.ModelAdmin):
  list_display=('quantity', 'category','brand', 'date_added')
  search_fields = ('category', 'brand')
