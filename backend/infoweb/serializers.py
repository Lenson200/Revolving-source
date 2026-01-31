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
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.is_staff_member = True  # ✅ ensures they appear in the pending list
        user.is_approved = False     # ✅ wait for approval
        user.save()
        return user