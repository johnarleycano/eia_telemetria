from rest_framework import serializers

class UbicacionesSerializador(serializers.Serializer):
    id = serializers.IntegerField()
    nombre = serializers.CharField(max_length=255)
    usuario_id = serializers.IntegerField()

class DispositivosSerializador(serializers.Serializer):
    unidad = serializers.CharField(max_length=255)
    nombre = serializers.CharField(max_length=255)
    ubicacion_id = serializers.IntegerField()

class PuntosSerializador(serializers.Serializer):
    id = serializers.IntegerField()
    valor = serializers.CharField(max_length=255)
    fecha_creacion = serializers.DateField()
    dispositivo_id = serializers.IntegerField()