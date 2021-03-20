from django.shortcuts import render
from rest_framework.views import APIView
from myGain.models import Gain
from myGain.serializers import GainSerializer
from django.http import Http404
import json
import requests
from datetime import *
from rest_framework.response import Response

# Create your views here.

# Create your views here.
class Utilities():
    def get_object(id):
        try:
            return Gain.objects.get(tigId=id)
        except Gain.DoesNotExist: 
            return False

#Met à jour la table des gains lors d'une decrementation de la quantité d'un produit

class AddGain():
    def add(id,quantity,totalPrice,isSale):
        print(totalPrice)
        # today = date.today()
        prod = Utilities.get_object(id)
        # if prod.created.date() == today.strftime("%Y-%m-%d"):
        if quantity >= 0 and totalPrice >= 0:
            prod.quantity = prod.quantity + quantity 
            prod.totalPrice = prod.totalPrice + totalPrice
            print(prod.totalPrice,'total')
            prod.isSale = isSale
            prod.save()
            response = {}
            response['message'] = 'Cout ajouté'
            response['id'] = id
            return True
        else:
            return False
        # else:
        #     if quantity >= 0 and totalPrice >=0:
        #         serializer = CostSerializer(data={'tigId':str(id),'quantity':quantity,'totalPrice':totalPrice})
        #         if serializer.is_valid():
        #             serializer.save()
        #             return True
        #     else:
        #         return False

#Obtenir le coùt annuelle pour une année donnée
class TotalGainPerYear(APIView):

    def get(self,request,year):
        prods = Gain.objects.all()
        totalGainPerYear = 0
        if prods:
            for prod in prods:
                if prod.created.today().year == year:
                    totalGainPerYear += prod.totalPrice
                
            response = {}
            response['message']= 'Le coût total est :'
            response['totalGainPerYear']= totalGainPerYear
            return Response(response,status=200)
        else:
            erreur = {}
            erreur['message'] = 'Aucunes données trouvées'
            return Response(erreur,status=404)

