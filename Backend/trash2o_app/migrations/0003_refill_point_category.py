# Generated by Django 3.2.12 on 2022-07-22 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trash2o_app', '0002_container_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='refill_point',
            name='category',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
