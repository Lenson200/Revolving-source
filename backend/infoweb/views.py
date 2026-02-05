from django.shortcuts import render
from rest_framework import viewsets, status
from .serializers import BusinessSerializer,ContactSerializer,staffRegisterSerializer
from .models import Business,Contact,User,Collection
from django.contrib import messages
from django.shortcuts import redirect,get_object_or_404
from .forms import CollectionForm
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes
from django.contrib.auth import authenticate, login,logout


# Create your views here.
def index(request):
    return render(request, 'infoweb/index.html')

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Your message has been received!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def staff_register(request):
    serializer = staffRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response( {'message': 'Registration successful. Await admin approval.'},
            status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@authentication_classes([])  
def staff_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=400)

    user = authenticate(username=user_obj.username, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=400)

    login(request, user)
    return Response({'message': 'Login successful'})  
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})

@api_view(['GET'])
def pending_staff_list(request):
    """Return all unapproved staff members."""
    users = User.objects.filter(is_staff=True, is_approved=False)
    data = [
        {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'date_joined': user.date_joined,
        }
        for user in users
    ]
    print("Pending staff users:", data)  # Debugging line
    return render(request, 'infoweb/pending_staff.html', {'pending_staff': data})
@api_view(['POST'])
def approve_staff_user(request, pk):
    """Approve a specific staff user."""
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user.is_approved = True
    user.save()
    return Response({'message': f"{user.username} approved successfully."})

@api_view(['GET'])
def list_contacts(request):
    if not request.user.is_staff:
        return Response({'detail': 'Forbidden'}, status=403)

    contacts = Contact.objects.all().order_by('-submitted_at')
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
def update_contact_status(request, pk):
    print("🔥 PATCH VIEW HIT")
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response({'detail': 'Not found'}, status=404)

    status_value = request.data.get('status')
    valid_statuses = ['new', 'in_progress', 'resolved']  # ✅ match frontend
    if status_value not in valid_statuses:
        return Response({'detail': 'Invalid status'}, status=400)
    print("Updating contact ID", pk, "to status", status_value)  # Debugging line

    contact.status = status_value  # ✅ use a proper status field
    contact.save()
    serializer = ContactSerializer(contact)
    return Response(serializer.data)  

def create_collection(request):
    if request.method == 'POST':
        form = CollectionForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "✅ Collection added successfully!")
            return redirect('create-collection')
    else:
        form = CollectionForm()

    collections = Collection.objects.select_related('business').order_by('-created_at')
    return render(request, 'infoweb/add_collection.html', {'form': form, 'collections': collections})

@api_view(['GET'])
def collections_by_business(request, business_id):
    business = get_object_or_404(Business, type=business_id)
    collections = business.collections.all()
    data = {
        "business": {
            "id": business.type,
            "title": business.title,
            "description": business.description,
        },
        "collections": [
            {
                "id": c.id,
                "name": c.name,
                "description": c.description,
                "price": c.price,
                "image_url": request.build_absolute_uri(c.image.url) if c.image else "",
            }
            for c in collections
        ],
    }
    return Response(data)