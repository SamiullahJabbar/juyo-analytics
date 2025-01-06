import re
from django.core.exceptions import ValidationError

class CustomPasswordValidator:
    def validate(self, password, user=None):
        if len(password) < 8:
            raise ValidationError("Password must be at least 8 characters long")
        if not re.search(r'\d', password):
            raise ValidationError("Password must include at least one number")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValidationError("Password must include at least one special character")

    def get_help_text(self):
        return "Your password must be at least 8 characters long, include a number, and a special character."
