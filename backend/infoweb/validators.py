from django.core.exceptions import ValidationError
 
def email_validator(value):
    """Validate that the email address is from an allowed domain."""
    allowed_domains = ['revolvingsource.com','nexora.com', 'lemora.com']
    domain = value.split('@')[-1]
    if domain not in allowed_domains:
        raise ValidationError(f'Email domain "{domain}" is not allowed.')