from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import BasePermission
from .serializers import BusinessSerializer,ContactSerializer,staffRegisterSerializer
from .models import Business,Contact,User,Collection
from django.contrib import messages
from django.shortcuts import redirect,get_object_or_404
from .forms import CollectionForm
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes
from django.contrib.auth import authenticate, login,logout


class IsStaffOrCreateOnly(BasePermission):
    """Allow anyone to create a contact, but require staff for everything else."""

    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        return bool(request.user and request.user.is_staff)


# Create your views here.
def index(request):
    return render(request, 'infoweb/index.html')

def staff_login_page(request):
    """Render the staff login page."""
    if request.user.is_authenticated:
        return redirect('index')
    return render(request, 'infoweb/staff_login.html')

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsStaffOrCreateOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Your message has been received!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def staff_register(request):
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        confirm_password = request.POST.get('confirm_password', '')
        designation = request.POST.get('designation', 'staff')

        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'infoweb/staff_register.html', {
                'username': username,
                'email': email,
                'designation': designation,
                'designations': User.DESIGNATION_CHOICES,
            })

        data = {
            'username': username,
            'email': email,
            'password': password,
            'designation': designation,
        }

        serializer = staffRegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            messages.success(request, 'Registration successful! Please log in or continue from the homepage.')
            return redirect('index')

        errors = serializer.errors
        for field, field_errors in errors.items():
            for error in field_errors:
                messages.error(request, f"{field}: {error}")

        return render(request, 'infoweb/staff_register.html', {
            'username': username,
            'email': email,
            'designation': designation,
            'designations': User.DESIGNATION_CHOICES,
        })

    return render(request, 'infoweb/staff_register.html', {
        'designations': User.DESIGNATION_CHOICES,
    })

@api_view(['POST'])
@authentication_classes([])  
def staff_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    # Validate email domain
    allowed_domains = ['revolvingsource.com', 'test.com']
    domain = email.split('@')[-1] if '@' in email else ''
    if domain not in allowed_domains:
        return Response({'error': 'wrong email address'}, status=400)

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=400)
    
    if not user_obj.is_approved:
        return Response({'error': 'Your account is pending approval from a director'}, status=403)

    user = authenticate(username=user_obj.username, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=400)

    login(request, user)
    return Response({'message': 'Login successful', 'designation': user_obj.designation})  
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})

def logout_page(request):
    """Handle logout and redirect to index."""
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('index')

def pending_staff_list(request):
    """Return all unapproved staff members - only directors can view."""
    if not request.user.is_authenticated:
        messages.error(request, 'You must be logged in to access this page')
        return redirect('index')

    # Check if user has designation attribute
    if not hasattr(request.user, 'designation'):
        messages.error(request, 'Database migration required. Please run: python manage.py migrate')
        return redirect('index')

    if request.user.designation != 'director':
        messages.error(request, 'Only directors can access this page')
        return redirect('index')

    try:
        users = User.objects.filter(is_staff_member=True, is_approved=False).order_by('-date_joined')
        return render(request, 'infoweb/pending_staff.html', {'pending_staff': users})
    except Exception as e:
        messages.error(request, f'Database error: {str(e)}. Please check migrations.')
        return redirect('index')
def approve_staff_user(request, pk):
    """Approve a specific staff user - only directors can approve."""
    if not request.user.is_authenticated:
        messages.error(request, 'You must be logged in to approve staff')
        return redirect('index')

    # Check if user has designation attribute
    if not hasattr(request.user, 'designation'):
        messages.error(request, 'User account is not properly configured. Please contact admin.')
        return redirect('index')

    if request.user.designation != 'director':
        messages.error(request, 'Only directors can approve staff')
        return redirect('index')

    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        messages.error(request, 'User not found')
        return redirect('pending-staff-list')

    user.is_approved = True
    user.is_staff = True  # Make them a Django staff user
    user.save()
    messages.success(request, f"{user.username} has been approved successfully!")
    return redirect('pending-staff-list')

@api_view(['GET'])
def list_contacts(request):
    if not request.user.is_staff:
        return Response({'detail': 'Forbidden'}, status=403)

    contacts = Contact.objects.all().order_by('-submitted_at')
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)

def contact_management(request):
    """Manage and view all contacts - staff only."""
    if not request.user.is_authenticated:
        messages.error(request, 'You must be logged in to access contacts')
        return redirect('index')

    if not request.user.is_staff:
        messages.error(request, 'You must be staff to access contacts')
        return redirect('index')

    contacts = Contact.objects.all().order_by('-submitted_at')

    # Filter by status if provided
    status_filter = request.GET.get('status')
    if status_filter:
        contacts = contacts.filter(status=status_filter)

    context = {
        'contacts': contacts,
        'status_filter': status_filter,
        'statuses': Contact._meta.get_field('status').choices,
    }
    return render(request, 'infoweb/contact_management.html', context)


def update_contact_status(request, pk):
    """Update contact status - only staff can update."""
    if not request.user.is_authenticated:
        messages.error(request, 'You must be logged in to update contacts')
        return redirect('index')

    if not request.user.is_staff:
        messages.error(request, 'You must be staff to update contacts')
        return redirect('contact-management')

    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        messages.error(request, 'Contact not found')
        return redirect('contact-management')

    status_value = request.POST.get('status') or request.data.get('status')
    valid_statuses = ['pending', 'completed']
    if status_value not in valid_statuses:
        messages.error(request, 'Invalid status')
        return redirect('contact-management')

    contact.status = status_value
    contact.save()
    messages.success(request, f"Contact status updated to {status_value}")
    return redirect('contact-management')  

def create_collection(request):
    if request.method == 'POST':
        form = CollectionForm(request.POST, request.FILES)
        if form.is_valid():
            collection = form.save(commit=False)
            
            # Explicitly save the image file
            if 'image' in request.FILES:
                image_file = request.FILES['image']
                collection.image = image_file
            
            collection.save()
            messages.success(request, "✅ Collection added successfully!")
            return redirect('create-collection')
    else:
        form = CollectionForm()

    collections = Collection.objects.select_related('business').order_by('-created_at')
    return render(request, 'infoweb/add_collection.html', {'form': form, 'collections': collections})

@api_view(['GET'])
def collections_by_business(request, business_id):
    try:
        business = Business.objects.get(type=business_id)
        collections = business.collections.all()
        business_data = {
            "id": business.type,
            "title": business.title,
            "description": business.description,
        }
    except Business.DoesNotExist:
        # Return empty collections for non-existent business types
        business_data = None
        collections = []
    
    collection_list = [
        {
            "id": c.id,
            "name": c.name,
            "description": c.description,
            "price": str(c.price) if c.price else None,
            "image_url": request.build_absolute_uri(c.image.url) if c.image else "",
        }
        for c in collections
    ]
    
    data = {
        "business": business_data,
        "collections": collection_list,
    }
    return Response(data, status=status.HTTP_200_OK)

def business_list(request):
    businesses = Business.objects.all()
    return render(request, "infoweb/business_list.html", {
        "businesses": businesses
    })
def collection_list(request):
    collections = Collection.objects.select_related('business').order_by('-created_at')
    return render(request, "infoweb/collection_list.html", {
        "collections": collections
    })
@api_view(['GET', 'PUT', 'PATCH'])
def update_business(request, business_type):
    business = get_object_or_404(Business, type=business_type)

    # 👉 1. HANDLE GET (Render Template)
    if request.method == 'GET':
        return render(request, "infoweb/manage_business.html", {
            "business_type": business.type,
            "business": business
        })

    # 👉 2. HANDLE UPDATE (PUT / PATCH)
    serializer = BusinessSerializer(business, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Updated successfully",
            "data": serializer.data
        })

    return Response(serializer.errors, status=400)