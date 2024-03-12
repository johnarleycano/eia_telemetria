from django.db import models
from django.contrib.auth.models import User

class Ubicaciones(models.Model):
    nombre = models.CharField(max_length=255)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add = True)

class Dispositivos(models.Model):
    unidad = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)
    ubicacion = models.ForeignKey(Ubicaciones, on_delete=models.CASCADE)

class Puntos(models.Model):
    valor = models.FloatField()
    fecha_creacion = models.DateField(auto_now_add = True)
    dispositivo = models.ForeignKey(Dispositivos, on_delete=models.CASCADE)