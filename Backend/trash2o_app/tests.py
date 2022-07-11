from django.test import TestCase
from django.contrib.auth.models import User

from .models import Refill_Point, Container


class RefillPointModelTest(TestCase):
  'Test Refill location creation'

  @classmethod
  def setUpTestData(cls):
    Refill_Point.objects.create(description='Big Building', location='wyandotte St W')

  def test_description_content(self):
    rp = Refill_Point.objects.get(id=1)
    expected_object_name = f'{rp.description}'
    self.assertEquals(expected_object_name, 'Big Building') 

  
  def test_location_content(self):
    rp = Refill_Point.objects.get(id=1)
    expected_object_name = f'{rp.location}'
    self.assertEquals(expected_object_name, 'wyandotte St W')


class ContainerTest(TestCase):
  'Test container creation'

  @classmethod
  def setUpTestData(cls):
    testuser1 = User.objects.create_user(username='testuser1', password='abc123')
    testuser1.save()
  
  # Add a container
  test_container = Container.objects.create(
                                          user=testuser1,
                                          brand='Tim Hortons',
                                          category='Coffee',
                                          quantity=2.
                                          )
  

  def test_contaniner_content(self):
    container = Container.objects.get(id=1)
    user = f'{container.user}'
    self.assertEqual(user, 'testuser1')