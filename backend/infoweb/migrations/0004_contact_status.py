# Generated migration for Contact status field

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('infoweb', '0003_collection'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='status',
            field=models.CharField(
                choices=[('pending', 'Pending'), ('completed', 'Completed')],
                default='pending',
                max_length=20
            ),
        ),
    ]
