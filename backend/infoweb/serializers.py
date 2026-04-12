from rest_framework import serializers
from .models import Business , Contact,User

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class staffRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'designation']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        designation = validated_data.get('designation', 'staff')
        password = validated_data.pop('password')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=password,
            designation=designation,
        )
        user.is_staff_member = True

        if designation == 'director':
            user.is_approved = True
            user.is_staff = True
        else:
            user.is_approved = False

        user.save()
        return user