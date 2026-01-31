from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import User

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_staff_member', 'is_approved', 'is_staff', 'is_superuser')
    list_filter = ('is_staff_member', 'is_approved')
    search_fields = ('username', 'email')
    actions = ['approve_staff']

    def approve_staff(self, request, queryset):
        updated = queryset.update(is_approved=True)
        self.message_user(request, f"{updated} staff members approved successfully.")
    approve_staff.short_description = "Approve selected staff"