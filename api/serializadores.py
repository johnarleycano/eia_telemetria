from rest_framework import serializers

class UbicacionesSerializador(serializers.Serializer):
    id = serializers.IntegerField()
    nombre = serializers.CharField(max_length=255)
    usuario_id = serializers.IntegerField()