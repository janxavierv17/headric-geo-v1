# Generated by Django 3.2.25 on 2024-12-17 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_auto_20241217_1028'),
    ]

    operations = [
        migrations.AddField(
            model_name='rentalapplication',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='rentalapplication',
            name='credit_score',
            field=models.IntegerField(blank=True, null=True, verbose_name='Credit Score'),
        ),
        migrations.AddField(
            model_name='rentalapplication',
            name='desired_move_in_date',
            field=models.DateField(null=True, verbose_name='Desired Move-in Date'),
        ),
        migrations.AddField(
            model_name='rentalapplication',
            name='employment_verification',
            field=models.FileField(blank=True, null=True, upload_to='employment_docs/', verbose_name='Employment Verification'),
        ),
        migrations.AddField(
            model_name='rentalapplication',
            name='has_pets',
            field=models.BooleanField(default=False, verbose_name='Has Pets'),
        ),
        migrations.AddField(
            model_name='rentalapplication',
            name='lease_term_length',
            field=models.IntegerField(null=True, verbose_name='Desired Lease Term (months)'),
        ),
        migrations.AddField(
            model_name='rentalapplication',
            name='number_of_occupants',
            field=models.IntegerField(default=1, verbose_name='Number of Occupants'),
        ),
        migrations.AddField(
            model_name='rentalapplication',
            name='pet_details',
            field=models.TextField(blank=True, verbose_name='Pet Details'),
        ),
        migrations.AddField(
            model_name='rentalapplication',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
