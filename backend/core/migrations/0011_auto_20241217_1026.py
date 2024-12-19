# Generated by Django 3.2.25 on 2024-12-17 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_alter_address_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='annual_income',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True, verbose_name='Annual Income'),
        ),
        migrations.AddField(
            model_name='customer',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='date_of_birth',
            field=models.DateField(blank=True, null=True, verbose_name='Date of Birth'),
        ),
        migrations.AddField(
            model_name='customer',
            name='employment_status',
            field=models.CharField(blank=True, max_length=50, verbose_name='Employment Status'),
        ),
        migrations.AddField(
            model_name='customer',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
