from django import forms
from .models import Collection,Business

class CollectionForm(forms.ModelForm):
    class Meta:
        model = Collection
        fields = ['business', 'name', 'description', 'image', 'price']
        widgets = {
            'business': forms.Select(attrs={'class': 'form-select'}),
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Collection Name'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'price': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
        }